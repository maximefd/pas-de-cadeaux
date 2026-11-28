// src/lib/util.ts
var trimToNull = (s) => {
	if (!s) return null;
	const sTrimed = s.trim();
	if (sTrimed.length === 0) return null;
	return sTrimed;
};

export { trimToNull as t };
//# sourceMappingURL=util.js-DnrKSOpr.js.map
