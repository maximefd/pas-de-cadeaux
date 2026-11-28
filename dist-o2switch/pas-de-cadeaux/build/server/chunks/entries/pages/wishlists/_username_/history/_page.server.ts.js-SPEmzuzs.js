import { c as client } from '../../../../../chunks/prisma.js-iNNVyVix.js';
import { g as getActiveMembership } from '../../../../../chunks/group-membership.js-CDZ-5kqi.js';
import { g as getFormatter } from '../../../../../chunks/i18n.js-D1Rw55oM.js';
import { b as requireLogin } from '../../../../../chunks/auth.js-C7-cSOnT.js';
import { g as getConfig } from '../../../../../chunks/config.js-465rpi-p.js';
import { c as getItems } from '../../../../../chunks/list.js-B0L9113F.js';
import { x as error } from '../../../../../chunks/utils.js-CAPFIGDr.js';

// src/routes/wishlists/[username]/history/+page.server.ts
var load = async ({ params, depends }) => {
	const user = requireLogin();
	const $t = await getFormatter();
	const activeMembership = await getActiveMembership(user);
	const config = await getConfig(activeMembership.groupId);
	const lists = await client.list.findMany({
		select: {
			id: true,
			owner: { select: {
				id: true,
				name: true,
				username: true
			} },
			managers: { select: { userId: true } }
		},
		where: {
			owner: { username: params.username },
			groupId: activeMembership.groupId
		}
	});
	if (lists.length === 0) error(404, $t("errors.list-not-found"));
	if (lists.some((list) => list.owner.id === user.id || list.managers.some(({ userId }) => userId === user.id))) error(404, $t("errors.list-not-found"));
	const received = /* @__PURE__ */ new Map();
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
		for (const item of items) if (item.offered && !received.has(item.id)) {
			const offeredAt = item.offeredAt ?? /* @__PURE__ */ new Date();
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
	const years = /* @__PURE__ */ new Map();
	for (const item of [...received.values()].sort((a, b) => b.offeredAt - a.offeredAt)) years.set(item.year, [...years.get(item.year) ?? [], item]);
	depends("data:items");
	return {
		owner: {
			...lists[0].owner,
			isMe: false
		},
		listId: lists[0].id,
		years: [...years.entries()].map(([year, items]) => ({
			year,
			items
		}))
	};
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-SPEmzuzs.js.map
