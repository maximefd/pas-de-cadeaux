import { c as client } from '../../../chunks/prisma.js-iNNVyVix.js';
import { g as getActiveMembership } from '../../../chunks/group-membership.js-CDZ-5kqi.js';
import { t as toItemOnListDTO } from '../../../chunks/item-mapper.js-DUyKoq81.js';
import { b as requireLogin } from '../../../chunks/auth.js-C7-cSOnT.js';
import { d as decodeMultiValueFilter } from '../../../chunks/sort-filter-util.js-B1LxSaRF.js';
import { g as getConfig } from '../../../chunks/config.js-465rpi-p.js';

// src/routes/claims/+page.server.ts
var load = async ({ url, cookies, depends }) => {
	const user = requireLogin();
	const activeMembership = await getActiveMembership(user);
	const config = await getConfig(activeMembership.groupId);
	const viewPreference = cookies.get("listViewPreference");
	const userIdFilter = decodeMultiValueFilter(url.searchParams.get("users"));
	const items = await client.item.findMany({
		where: {
			claims: { some: {
				claimedById: user.id,
				list: { groupId: activeMembership.groupId }
			} },
			lists: { some: { list: { groupId: activeMembership.groupId } } },
			userId: { in: userIdFilter.length > 0 ? userIdFilter : void 0 }
		},
		include: {
			lists: {
				select: {
					listId: true,
					list: { select: {
						id: true,
						ownerId: true,
						managers: { select: { userId: true } }
					} },
					approved: true,
					displayOrder: true,
					addedBy: { select: {
						id: true,
						name: true
					} }
				},
				where: { list: { groupId: activeMembership.groupId } }
			},
			claims: {
				select: {
					id: true,
					listId: true,
					purchased: true,
					quantity: true,
					claimedBy: { select: {
						id: true,
						name: true,
						UserGroupMembership: { select: { groupId: true } }
					} },
					publicClaimedBy: { select: {
						id: true,
						name: true
					} }
				},
				where: { list: { groupId: activeMembership.groupId } }
			},
			user: { select: {
				id: true,
				name: true
			} },
			itemPrice: true,
			_count: { select: { lists: true } }
		}
	});
	depends("data:items");
	const itemDTOs = items.filter((item) => !item.offered || item.userId === user.id).map((item) => {
		const claim = item.claims.find((c) => c.claimedBy?.id === user.id);
		const visible = item.userId === user.id ? {
			...item,
			offered: false,
			offeredAt: null,
			claims: [claim]
		} : item;
		return toItemOnListDTO(visible, claim.listId);
	});
	return {
		user: {
			...user,
			activeGroupId: activeMembership.groupId
		},
		items: itemDTOs,
		initialViewPreference: viewPreference || "list",
		config,
		anyoneCanDeleteItems: config.anyoneCanDeleteItems
	};
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-BcgM5b-9.js.map
