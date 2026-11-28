// node_modules/.pnpm/@zag-js+utils@1.39.1/node_modules/@zag-js/utils/dist/number.mjs
var isNaN = (v) => Number.isNaN(v);
var nan = (v) => isNaN(v) ? 0 : v;
var isValueWithinRange = (v, vmin, vmax) => {
	const value = nan(v);
	return (value >= vmin) && (vmax == null || value <= vmax);
};
var getValuePercent = (v, vmin, vmax) => (nan(v) - vmin) / (vmax - vmin);
var toPx = (v) => typeof v === "number" ? `${v}px` : v;

export { getValuePercent as g, isValueWithinRange as i, toPx as t };
//# sourceMappingURL=number.js-B87QIgOI.js.map
