// src/lib/comparators.ts
function itemSorter(opts) {
	return (a, b) => {
		if (opts.listOwnerId !== opts.userId || opts.isSelfClaimable) {
			const claimStatus = compareClaimStatus(a, b, opts.userId);
			if (claimStatus != 0) return claimStatus;
		}
		if (opts.sort === "price") {
			const reversed = opts.dir === "desc";
			const price = comparePrice(a, b, {
				reversed,
				nullsLast: reversed
			});
			if (price !== 0) return price;
		}
		return compareDisplayOrder(a, b);
	};
}
function comparePrice(a, b, opts) {
	if (a.itemPrice === null && b.itemPrice === null) return 0;
	if (a.itemPrice === null) return opts?.reversed && !opts?.nullsLast ? -1 : 1;
	if (b.itemPrice === null) return opts?.reversed && !opts?.nullsLast ? 1 : -1;
	const comp = a.itemPrice.value - b.itemPrice.value;
	return opts?.reversed ? -comp : comp;
}
function compareDisplayOrder(a, b) {
	return (a.displayOrder ?? Infinity) - (b.displayOrder ?? Infinity);
}
function compareClaimStatus(a, b, userId) {
	const userHasClaimedA = a.claims.find((c) => userId && c.claimedBy?.id === userId);
	const userHasClaimedB = b.claims.find((c) => userId && c.claimedBy?.id === userId);
	if (a.isClaimable && !userHasClaimedA && !(b.isClaimable && !userHasClaimedB)) return -1;
	else if (!(a.isClaimable && !userHasClaimedA) && b.isClaimable && !userHasClaimedB) return 1;
	else return 0;
}

export { itemSorter as i };
//# sourceMappingURL=comparators.js-DkswRRoE.js.map
