import { g as getConfig } from '../../../../chunks/config.js-465rpi-p.js';
import { g as getFormatter } from '../../../../chunks/i18n.js-D1Rw55oM.js';
import { b as getById, c as getItems } from '../../../../chunks/list.js-B0L9113F.js';
import { g as getActiveMembership } from '../../../../chunks/group-membership.js-CDZ-5kqi.js';
import { c as client } from '../../../../chunks/prisma.js-iNNVyVix.js';
import { a as getNewItemIds, m as markListVisited } from '../../../../chunks/visits.js-DfcJaALN.js';
import { B as redirect, x as error } from '../../../../chunks/utils.js-CAPFIGDr.js';

// src/routes/lists/[id]/+page.server.ts
var load = (async ({ params, url, locals, depends, cookies }) => {
	const $t = await getFormatter();
	const list = await getById(params.id);
	let activeMembership;
	if (!locals.user) {
		if (!list || !list.public) {
			const redirectTo = url.pathname + url.search;
			const params = new URLSearchParams({ redirectTo });
			redirect(307, `/login?${params}`);
		}
	} else {
		activeMembership = await getActiveMembership(locals.user);
		if (!list || !list.public && list.groupId !== activeMembership.groupId) error(404, $t("errors.list-not-found"));
		if (list.owner.id === locals.user.id && list?.public && list.groupId !== activeMembership.groupId) error(401, $t("errors.user-must-be-in-the-correct-group"));
	}
	const config = await getConfig(list.groupId);
	const isSelfClaimable = list.allowSelfClaims || list.notForMe;
	const options = {
		filter: url.searchParams.get("filter"),
		sort: url.searchParams.get("sort"),
		sortDir: url.searchParams.get("dir"),
		suggestionMethod: config.suggestions.method,
		listOwnerId: list.owner.id,
		listManagers: new Set(list.managers.map(({ userId }) => userId)),
		loggedInUserId: locals.user?.id || null,
		isSelfClaimable,
		hideOffered: (list.owner.id === locals.user?.id || list.managers.some(({ userId }) => userId === locals.user?.id)) && !(isSelfClaimable || config.claims.showForOwner)
	};
	const items = await getItems(list.id, options);
	depends("data:items");
	let newItemIds = [];
	if (locals.user && list.owner.id !== locals.user.id) {
		const visible = new Set(items.map((item) => item.id));
		newItemIds = (await getNewItemIds(locals.user.id, list.id)).filter((id) => visible.has(id));
		await markListVisited(locals.user.id, list.id);
	}
	const commentCounts = {};
	const ownerSide = list.owner.id === locals.user?.id || list.managers.some(({ userId }) => userId === locals.user?.id);
	if (locals.user && (isSelfClaimable || !ownerSide) && items.length > 0) {
		const grouped = await client.itemComment.groupBy({
			by: ["itemId"],
			where: { itemId: { in: items.map((item) => item.id) } },
			_count: { _all: true }
		});
		for (const row of grouped) commentCounts[row.itemId] = row._count._all;
	}
	const viewPreference = cookies.get("listViewPreference");
	return {
		list: {
			...list,
			isSelfClaimable,
			owner: {
				...list.owner,
				isMe: list.owner.id === locals.user?.id,
				activeGroupId: list.groupId
			},
			isManager: list.managers.find(({ userId }) => userId === locals.user?.id) !== void 0,
			items
		},
		loggedInUser: locals.user ? {
			id: locals.user.id,
			username: locals.user.username,
			name: locals.user.name,
			activeGroupId: activeMembership.groupId
		} : void 0,
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
});

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-DhdCg-pn.js.map
