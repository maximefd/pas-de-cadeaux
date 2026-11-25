import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { client } from "$lib/server/prisma";
import { getActiveMembership } from "$lib/server/group-membership";
import { getFormatter } from "$lib/server/i18n";
import { requireLogin } from "$lib/server/auth";
import { getConfig } from "$lib/server/config";
import { getItems } from "$lib/server/list";

// "Historique des cadeaux": ideas marked as offered on a person's lists, grouped by year.
// Visibility is delegated to getItems(), so a recipient never sees ideas hidden from them (surprise mode)
// nor the identity/date of the giver (neither is stored).
export const load: PageServerLoad = async ({ params, depends }) => {
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

    // The recipient (and the managers of their lists) must never see what was offered to them:
    // only the other members can read this history. Same filter as ideas suggested by others.
    if (lists.some((list) => list.owner.id === user.id || list.managers.some(({ userId }) => userId === user.id))) {
        error(404, $t("errors.list-not-found"));
    }

    type GiftItem = { id: number; name: string; url: string | null; listId: string; year: number; offeredAt: number };
    const received = new Map<number, GiftItem>();
    for (const list of lists) {
        const items = await getItems(list.id, {
            filter: null,
            sort: null,
            sortDir: null,
            suggestionMethod: config.suggestions.method,
            listOwnerId: list.owner.id,
            listManagers: new Set(list.managers.map(({ userId }) => userId)),
            loggedInUserId: user.id,
            includeOffered: true
        });
        for (const item of items) {
            if (item.offered && !received.has(item.id)) {
                const offeredAt = item.offeredAt ?? new Date();
                received.set(item.id, {
                    id: item.id,
                    name: item.name,
                    url: item.url,
                    listId: list.id,
                    year: offeredAt.getFullYear(),
                    offeredAt: offeredAt.getTime()
                });
            }
        }
    }

    // Most recent year first, and within a year the most recent gift first
    const years = new Map<number, GiftItem[]>();
    for (const item of [...received.values()].sort((a, b) => b.offeredAt - a.offeredAt)) {
        years.set(item.year, [...(years.get(item.year) ?? []), item]);
    }

    depends("data:items");

    return {
        owner: { ...lists[0].owner, isMe: false },
        listId: lists[0].id,
        years: [...years.entries()].map(([year, items]) => ({ year, items }))
    };
};
