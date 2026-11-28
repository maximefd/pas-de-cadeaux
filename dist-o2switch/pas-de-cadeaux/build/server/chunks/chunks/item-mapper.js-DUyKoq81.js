// src/lib/dtos/item-mapper.ts
/**
* La personne concernée (et les gestionnaires de sa liste) ne doivent jamais savoir qu'une idée
* est réservée ou offerte : on retire ces informations avant de les envoyer au navigateur.
*/
var hideSecretsFromOwner = (item) => ({
	...item,
	offered: false,
	offeredAt: null,
	claims: []
});
var toItemOnListDTO = (item, listId) => {
	const { lists, claims, _count, ...restOfItem } = item;
	const list = lists.find((l) => l.list.id === listId);
	if (!list) throw new Error(`Couldn't find related list with id=${listId} on item with id=${item.id}`);
	return {
		...restOfItem,
		...list,
		claims: claims.map((claim) => {
			if (claim.claimedBy) {
				const { UserGroupMembership, ...user } = claim.claimedBy;
				const claimedBy = {
					...user,
					groups: UserGroupMembership.map(({ groupId }) => groupId)
				};
				return {
					claimId: claim.id,
					quantity: claim.quantity,
					claimedBy,
					purchased: claim.purchased,
					listId: claim.listId
				};
			}
			return {
				claimId: claim.id,
				quantity: claim.quantity,
				publicClaimedBy: claim.publicClaimedBy,
				listId: claim.listId
			};
		}),
		listCount: _count.lists,
		get claimedQuantity() {
			return this.claims.map(({ quantity }) => quantity).reduce((a, b) => a + b, 0);
		},
		get remainingQuantity() {
			return this.quantity === null ? Infinity : this.quantity - this.claimedQuantity;
		},
		get isClaimable() {
			return this.approved && (this.quantity === null || this.quantity > this.claimedQuantity);
		}
	};
};

export { hideSecretsFromOwner as h, toItemOnListDTO as t };
//# sourceMappingURL=item-mapper.js-DUyKoq81.js.map
