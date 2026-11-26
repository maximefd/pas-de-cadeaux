import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getConfig } from "$lib/server/config";
import { getFormatter } from "$lib/server/i18n";
import { getById, getItems, type GetItemsOptions } from "$lib/server/list";
import { getActiveMembership } from "$lib/server/group-membership";
import { client } from "$lib/server/prisma";
import { getNewItemIds, markListVisited } from "$lib/server/visits";
import type { UserGroupMembership } from "$lib/generated/prisma/client";

export const load = (async ({ params, url, locals, depends, cookies }) => {
    const $t = await getFormatter();

    const list = await getById(params.id);

    let activeMembership: UserGroupMembership | undefined;
    if (!locals.user) {
        // Unauthenticated users can only view public lists
        if (!list || !list.public) {
            // Redirect to login so we don't expose details if the list does exist
            const redirectTo = url.pathname + url.search;
            const params = new URLSearchParams({ redirectTo });
            redirect(307, `/login?${params}`);
        }
    } else {
        // Logged in users must be in the correct group, or viewing a public list
        activeMembership = await getActiveMembership(locals.user);
        if (!list || (!list.public && list.groupId !== activeMembership.groupId)) {
            error(404, $t("errors.list-not-found"));
        }
        // Owners of the public list need to be in the correct group still
        if (list.owner.id === locals.user.id && list?.public && list.groupId !== activeMembership.groupId) {
            error(401, $t("errors.user-must-be-in-the-correct-group"));
        }
    }

    const config = await getConfig(list.groupId);

    const isSelfClaimable = list.allowSelfClaims || list.notForMe;
    const options: GetItemsOptions = {
        filter: url.searchParams.get("filter"),
        sort: url.searchParams.get("sort"),
        sortDir: url.searchParams.get("dir"),
        suggestionMethod: config.suggestions.method,
        listOwnerId: list.owner.id,
        listManagers: new Set(list.managers.map(({ userId }) => userId)),
        loggedInUserId: locals.user?.id || null,
        isSelfClaimable,
        hideOffered:
            (list.owner.id === locals.user?.id || list.managers.some(({ userId }) => userId === locals.user?.id)) &&
            !(isSelfClaimable || config.claims.showForOwner)
    };

    const items = await getItems(list.id, options);

    depends("data:items");

    // Idées arrivées depuis ta dernière visite (jamais sur ta propre liste), puis on note cette visite.
    // Seules les idées déjà visibles pour toi sont comptées.
    let newItemIds: number[] = [];
    if (locals.user && list.owner.id !== locals.user.id) {
        const visible = new Set(items.map((item) => item.id));
        newItemIds = (await getNewItemIds(locals.user.id, list.id)).filter((id) => visible.has(id));
        await markListVisited(locals.user.id, list.id);
    }

    // Nombre de commentaires par idée : jamais pour la personne concernée ni ses gestionnaires
    // (sauf liste auto-réservable), comme pour les commentaires eux-mêmes.
    const commentCounts: Record<number, number> = {};
    const ownerSide =
        list.owner.id === locals.user?.id || list.managers.some(({ userId }) => userId === locals.user?.id);
    if (locals.user && (isSelfClaimable || !ownerSide) && items.length > 0) {
        const grouped = await client.itemComment.groupBy({
            by: ["itemId"],
            where: { itemId: { in: items.map((item) => item.id) } },
            _count: { _all: true }
        });
        for (const row of grouped) commentCounts[row.itemId] = row._count._all;
    }

    // Read view preference from cookie (for SSR to prevent flicker)
    const viewPreference = cookies.get("listViewPreference") as "list" | "tile" | undefined;

    return {
        list: {
            ...list,
            isSelfClaimable,
            owner: {
                ...list.owner,
                isMe: list.owner.id === locals.user?.id,
                activeGroupId: list.groupId
            },
            isManager: list.managers.find(({ userId }) => userId === locals.user?.id) !== undefined,
            items
        },
        loggedInUser: locals.user
            ? {
                  id: locals.user.id,
                  username: locals.user.username,
                  name: locals.user.name,
                  activeGroupId: activeMembership!.groupId
              }
            : undefined,
        newItemIds,
        commentCounts,
        listMode: config.listMode,
        showClaimedName: config.claims.showName,
        showNameAcrossGroups: config.claims.showNameAcrossGroups,
        showClaimForOwner: config.claims.showForOwner || list.notForMe,
        showPublicClaimName: config.claims.showNamePublic,
        requireClaimEmail: config.claims.requireEmail,
        suggestionsEnabled: config.suggestions.enable,
        anyoneCanDeleteItems: config.anyoneCanDeleteItems,
        initialViewPreference: viewPreference || "list"
    };
}) satisfies PageServerLoad;
