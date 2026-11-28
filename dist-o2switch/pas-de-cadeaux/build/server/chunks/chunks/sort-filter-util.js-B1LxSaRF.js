// src/lib/server/sort-filter-util.ts
var claimFilter = (filter, userId) => {
	if (filter === "unclaimed") return (item) => item.isClaimable;
	else if (filter === "claimed") return (item) => {
		const userHasClaimed = item.claims.find((c) => userId && c.claimedBy?.id === userId);
		return !item.isClaimable || userHasClaimed;
	};
	return (_item) => true;
};
var decodeMultiValueFilter = (filter) => {
	if (filter === null) return [];
	return decodeURIComponent(filter).split(",");
};

export { claimFilter as c, decodeMultiValueFilter as d };
//# sourceMappingURL=sort-filter-util.js-B1LxSaRF.js.map
