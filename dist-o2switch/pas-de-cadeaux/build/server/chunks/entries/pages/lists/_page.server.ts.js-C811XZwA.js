import { c as client } from '../../../chunks/prisma.js-iNNVyVix.js';
import { g as getActiveMembership } from '../../../chunks/group-membership.js-CDZ-5kqi.js';
import { g as getConfig } from '../../../chunks/config.js-465rpi-p.js';
import { d as decodeMultiValueFilter } from '../../../chunks/sort-filter-util.js-B1LxSaRF.js';
import { b as requireLogin } from '../../../chunks/auth.js-C7-cSOnT.js';
import { g as getListIdsWithNews } from '../../../chunks/visits.js-DfcJaALN.js';
import { b as private_env } from '../../../chunks/shared-server.js-B6_G0tAr.js';
import { B as redirect } from '../../../chunks/utils.js-CAPFIGDr.js';

// src/lib/server/onboarding.ts
var needsWelcome = (user) => private_env.SKIP_WELCOME !== "true" && !user.onboardedAt;
// src/routes/lists/+page.server.ts
var load = (async ({ url }) => {
	const user = requireLogin();
	if (needsWelcome(user)) redirect(302, "/bienvenue");
	const activeMembership = await getActiveMembership(user);
	const config = await getConfig(activeMembership.groupId);
	if (config.listMode === "registry") {
		const list = await client.list.findFirst({
			select: { id: true },
			where: {
				ownerId: user.id,
				groupId: activeMembership.groupId
			}
		});
		if (list) redirect(302, `/lists/${list.id}`);
		return {
			myLists: [],
			otherLists: [],
			users: [{
				id: user.id,
				name: user.name,
				picture: user.picture || null
			}]
		};
	}
	const userIdFilter = decodeMultiValueFilter(url.searchParams.get("users"));
	const userListsQuery = client.list.findMany({
		where: {
			ownerId: user.id,
			groupId: activeMembership.groupId
		},
		orderBy: { name: "asc" },
		select: {
			id: true,
			name: true,
			icon: true,
			iconColor: true,
			hideOwner: true,
			owner: { select: {
				id: true,
				name: true,
				username: true,
				picture: true
			} },
			items: {
				select: {
					id: true,
					item: { select: { quantity: true } }
				},
				where: { addedBy: config.suggestions.enable && config.suggestions.method === "surprise" ? { username: user.username } : void 0 }
			},
			_count: { select: { items: { where: { approved: false } } } }
		}
	});
	const otherListsQuery = client.list.findMany({
		where: {
			ownerId: { not: user.id },
			groupId: activeMembership.groupId
		},
		orderBy: [{ owner: { name: "asc" } }, { name: "asc" }],
		select: {
			id: true,
			name: true,
			icon: true,
			iconColor: true,
			hideOwner: true,
			owner: { select: {
				id: true,
				name: true,
				username: true,
				picture: true
			} },
			items: { select: {
				id: true,
				approved: true,
				item: { select: {
					id: true,
					quantity: true,
					claims: { select: {
						id: true,
						quantity: true
					} }
				} }
			} }
		}
	});
	const [myLists, otherLists] = await Promise.all([userListsQuery, otherListsQuery]);
	const listsWithNews = await getListIdsWithNews(user.id, otherLists.map((list) => list.id));
	const users = [{
		id: user.id,
		name: user.name,
		picture: user.picture || null
	}, ...new Set(otherLists.map((list) => ({
		id: list.owner.id,
		name: list.owner.name,
		picture: list.owner.picture || null
	})))];
	return {
		myLists: myLists.filter((list) => userIdFilter.length === 0 || userIdFilter.includes(list.owner.id)).map((list) => {
			return {
				id: list.id,
				name: list.name,
				icon: list.icon,
				iconColor: list.iconColor,
				hideOwner: list.hideOwner,
				owner: list.owner,
				claimedCount: void 0,
				itemCount: list.items.reduce((accum, { item }) => accum + (item.quantity || 1), 0),
				unapprovedCount: list._count.items
			};
		}),
		otherLists: otherLists.filter((list) => userIdFilter.length === 0 || userIdFilter.includes(list.owner.id)).map((list) => {
			const claimedCount = list.items.filter((it) => it.approved).reduce((accum, { item }) => {
				if (item.quantity === null) return accum;
				const itemClaimed = item.claims.reduce((a, { quantity }) => a + quantity, 0);
				return accum + Math.min(itemClaimed, item.quantity);
			}, 0);
			const itemCount = list.items.filter((it) => it.approved).reduce((accum, { item }) => accum + (item.quantity || 1), 0);
			const items = list.items.map((it) => ({ id: it.item.id }));
			return {
				id: list.id,
				name: list.name,
				icon: list.icon,
				iconColor: list.iconColor,
				hideOwner: list.hideOwner,
				owner: list.owner,
				claimedCount,
				itemCount,
				items,
				hasNewItems: listsWithNews.has(list.id)
			};
		}),
		users
	};
});

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-C811XZwA.js.map
