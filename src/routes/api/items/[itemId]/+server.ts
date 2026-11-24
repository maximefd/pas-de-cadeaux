import { getFormatter } from "$lib/server/i18n";
import { itemEmitter } from "$lib/server/events/emitters";
import { ItemEvent } from "$lib/events";
import { tryDeleteImage } from "$lib/server/image-util";
import { client } from "$lib/server/prisma";
import { error, type RequestHandler } from "@sveltejs/kit";
import { requireLoginOrError } from "$lib/server/auth";
import { getConfig } from "$lib/server/config";
import type { List as PrismaList, Item as PrismaItem } from "$lib/generated/prisma/client";

interface List extends Pick<PrismaList, "groupId"> {
    managers: string[];
}

interface Item extends Pick<PrismaItem, "id" | "createdById" | "userId"> {
    lists: List[];
}

const validateItem = async (itemId: string | undefined) => {
    const $t = await getFormatter();

    if (!itemId) {
        error(400, $t("errors.must-specify-an-item-to-delete"));
    } else if (isNaN(parseInt(itemId))) {
        error(400, $t("errors.item-id-must-be-a-number"));
    }

    const item = await client.item.findUnique({
        where: {
            id: parseInt(itemId)
        },
        select: {
            id: true,
            createdById: true,
            userId: true,
            lists: {
                select: {
                    list: {
                        select: {
                            groupId: true,
                            managers: {
                                select: {
                                    userId: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    if (!item) {
        error(404, $t("errors.item-not-found"));
    }

    const { lists, ...rest } = item;
    return {
        ...rest,
        lists: lists.map((li) => ({
            groupId: li.list.groupId,
            managers: li.list.managers.map(({ userId }) => userId)
        }))
    };
};

const isItemOnManagedList = (item: Item, user: LocalUser) => {
    if (item.lists.length > 1 || item.lists.length === 0) {
        return false;
    }
    return item.lists[0].managers.find((userId) => user.id === userId) !== undefined;
};

/**
 * Who may delete an item:
 * - its creator, or a manager of the (single) list it is on;
 * - the owner, unless the item is hidden from them ("surprise" mode and added by someone else);
 * - any other member of the list's group, if the admin enabled "anyoneCanDeleteItems".
 */
const canDeleteItem = async (item: Item, user: LocalUser) => {
    if (user.id === item.createdById || isItemOnManagedList(item, user)) {
        return true;
    }

    const lists = item.lists;
    const configs = await Promise.all(lists.map((list) => getConfig(list.groupId)));

    if (user.id === item.userId) {
        // In "surprise" mode the owner can't see items added by others, so they can't delete them either
        const hiddenFromOwner = configs.some((config) => config.suggestions.method === "surprise");
        return !hiddenFromOwner;
    }

    if (!configs.some((config) => config.anyoneCanDeleteItems)) {
        return false;
    }

    const membership = await client.userGroupMembership.findFirst({
        where: {
            userId: user.id,
            groupId: { in: lists.map((list) => list.groupId) }
        },
        select: { id: true }
    });
    return membership !== null;
};

export const DELETE: RequestHandler = async ({ params }) => {
    const user = await requireLoginOrError();
    const $t = await getFormatter();
    const item = await validateItem(params?.itemId);

    if (!(await canDeleteItem(item, user))) {
        error(403, $t("errors.not-authorized"));
    }

    try {
        const deletedItem = await client.item.delete({
            where: {
                id: item.id
            },
            select: {
                id: true,
                userId: true,
                lists: {
                    select: {
                        list: {
                            select: {
                                id: true
                            }
                        }
                    }
                },
                imageUrl: true
            }
        });

        const { lists, ...rest } = deletedItem;
        const itemToReturn = {
            ...rest,
            lists: lists.map((li) => ({ ...li.list }))
        };

        itemEmitter.emit(ItemEvent.ITEM_DELETE, itemToReturn);

        if (itemToReturn.imageUrl) {
            await tryDeleteImage(itemToReturn.imageUrl);
        }

        return new Response(JSON.stringify(item), { status: 200 });
    } catch {
        error(404, $t("errors.item-not-found"));
    }
};
