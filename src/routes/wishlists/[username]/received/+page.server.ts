import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { client } from "$lib/server/prisma";
import { getActiveMembership } from "$lib/server/group-membership";
import { getFormatter } from "$lib/server/i18n";
import { requireLogin } from "$lib/server/auth";
import { getConfig } from "$lib/server/config";
import { getItems } from "$lib/server/list";

// "Received" tab: items marked as offered on a person's lists.
// Visibility is delegated to getItems(), so a recipient never sees ideas hidden from them (surprise mode)
// nor the identity/date of the giver (neither is stored).
export const load: PageServerLoad = async ({ params }) => {
    const user = requireLogin();
    const $t = await getFormatter();

    const activeMembership = await getActiveMembership(user);
    const config = await getConfig(activeMembership.groupId);

    const lists = await client.list.findMany({
        select: {
            id: true,
            owner: { select: { id: true, name: true, username: true } },
            managers: { select: { userId: true } }
        },
        where: {
            owner: { username: params.username },
            groupId: activeMembership.groupId
        }
    });

    if (lists.length === 0) {
        error(404, $t("errors.list-not-found"));
    }

    const received = new Map<number, { id: number; name: string; url: string | null; imageUrl: string | null }>();
    for (const list of lists) {
        const items = await getItems(list.id, {
            filter: null,
            sort: null,
            sortDir: null,
            suggestionMethod: config.suggestions.method,
            listOwnerId: list.owner.id,
            listManagers: new Set(list.managers.map(({ userId }) => userId)),
            loggedInUserId: user.id
        });
        for (const item of items) {
            if (item.offered && !received.has(item.id)) {
                received.set(item.id, { id: item.id, name: item.name, url: item.url, imageUrl: item.imageUrl });
            }
        }
    }

    return {
        owner: { ...lists[0].owner, isMe: lists[0].owner.id === user.id },
        listId: lists[0].id,
        items: [...received.values()]
    };
};
