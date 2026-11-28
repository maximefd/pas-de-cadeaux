// src/lib/server/items.ts
var getItemInclusions = (listId) => {
	return {
		lists: {
			select: {
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
			where: { listId }
		},
		claims: { select: {
			id: true,
			quantity: true,
			purchased: true,
			listId: true,
			claimedBy: { select: {
				id: true,
				name: true,
				UserGroupMembership: { select: { groupId: true } }
			} },
			publicClaimedBy: { select: {
				id: true,
				name: true
			} }
		} },
		user: { select: {
			id: true,
			name: true
		} },
		itemPrice: true,
		_count: { select: { lists: true } }
	};
};

export { getItemInclusions as g };
//# sourceMappingURL=items.js-C_2ihKyH.js.map
