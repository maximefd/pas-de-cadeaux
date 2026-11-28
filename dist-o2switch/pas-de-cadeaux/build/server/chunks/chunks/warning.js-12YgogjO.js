// node_modules/.pnpm/@zag-js+utils@1.39.1/node_modules/@zag-js/utils/dist/guard.mjs
var isArray = (v) => Array.isArray(v);
var isBoolean = (v) => v === true || v === false;
var isObjectLike = (v) => v != null && typeof v === "object";
var isObject = (v) => isObjectLike(v) && !isArray(v);
var isNumber = (v) => typeof v === "number" && !Number.isNaN(v);
var isString = (v) => typeof v === "string";
var isFunction = (v) => typeof v === "function";
var isNull = (v) => v == null;
var hasProp = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
var baseGetTag = (v) => Object.prototype.toString.call(v);
var fnToString = Function.prototype.toString;
var objectCtorString = fnToString.call(Object);
var isPlainObject = (v) => {
	if (!isObjectLike(v) || baseGetTag(v) != "[object Object]" || isFrameworkElement(v)) return false;
	const proto = Object.getPrototypeOf(v);
	if (proto === null) return true;
	const Ctor = hasProp(proto, "constructor") && proto.constructor;
	return typeof Ctor == "function" && Ctor instanceof Ctor && fnToString.call(Ctor) == objectCtorString;
};
var isReactElement = (x) => typeof x === "object" && x !== null && "$$typeof" in x && "props" in x;
var isVueElement = (x) => typeof x === "object" && x !== null && "__v_isVNode" in x;
var isFrameworkElement = (x) => isReactElement(x) || isVueElement(x);
// node_modules/.pnpm/@zag-js+utils@1.39.1/node_modules/@zag-js/utils/dist/functions.mjs
var runIfFn = (v, ...a) => {
	return (typeof v === "function" ? v(...a) : v) ?? void 0;
};
var identity = (v) => v();
var noop = () => {};
var callAll = (...fns) => (...a) => {
	fns.forEach(function(fn) {
		fn?.(...a);
	});
};
var uuid = /* @__PURE__ */ (() => {
	let id = 0;
	return () => {
		id++;
		return id.toString(36);
	};
})();
function match(key, record, ...args) {
	if (key in record) {
		const fn = record[key];
		return isFunction(fn) ? fn(...args) : fn;
	}
	const error = /* @__PURE__ */ new Error(`No matching key: ${JSON.stringify(key)} in ${JSON.stringify(Object.keys(record))}`);
	Error.captureStackTrace?.(error, match);
	throw error;
}
var toChar = (code) => String.fromCharCode(code + (code > 25 ? 39 : 97));
function toName(code) {
	let name = "";
	let x;
	for (x = Math.abs(code); x > 52; x = x / 52 | 0) name = toChar(x % 52) + name;
	return toChar(x % 52) + name;
}
function toPhash(h, x) {
	let i = x.length;
	while (i) h = h * 33 ^ x.charCodeAt(--i);
	return h;
}
var hash = (value) => toName(toPhash(5381, value) >>> 0);
// node_modules/.pnpm/@zag-js+utils@1.39.1/node_modules/@zag-js/utils/dist/object.mjs
function compact(obj) {
	if (!isPlainObject(obj) || obj === void 0) return obj;
	const keys = Reflect.ownKeys(obj).filter((key) => typeof key === "string");
	const filtered = {};
	for (const key of keys) {
		const value = obj[key];
		if (value !== void 0) filtered[key] = compact(value);
	}
	return filtered;
}
function splitProps(props, keys) {
	const rest = {};
	const result = {};
	const keySet = new Set(keys);
	const ownKeys = Reflect.ownKeys(props);
	for (const key of ownKeys) if (keySet.has(key)) result[key] = props[key];
	else rest[key] = props[key];
	return [result, rest];
}
var createSplitProps = (keys) => {
	return function split(props) {
		return splitProps(props, keys);
	};
};
// node_modules/.pnpm/@zag-js+utils@1.39.1/node_modules/@zag-js/utils/dist/warning.mjs
function warn(...a) {
	const m = a.length === 1 ? a[0] : a[1];
	if ((a.length === 2 ? a[0] : true) && process.env.NODE_ENV !== "production") console.warn(m);
}
function invariant(...a) {
	const m = a.length === 1 ? a[0] : a[1];
	if ((a.length === 2 ? a[0] : true) && process.env.NODE_ENV !== "production") throw new Error(m);
}
function ensure(c, m) {
	if (c == null) throw new Error(m());
}
function ensureProps(props, keys, scope) {
	let missingKeys = [];
	for (const key of keys) if (props[key] == null) missingKeys.push(key);
	if (missingKeys.length > 0) throw new Error(`[zag-js${scope ? ` > ${scope}` : ""}] missing required props: ${missingKeys.join(", ")}`);
}

export { isFunction as a, isString as b, callAll as c, invariant as d, ensure as e, compact as f, createSplitProps as g, isObject as h, identity as i, hasProp as j, isNull as k, ensureProps as l, isNumber as m, noop as n, match as o, isBoolean as p, hash as q, runIfFn as r, uuid as u, warn as w };
//# sourceMappingURL=warning.js-12YgogjO.js.map
