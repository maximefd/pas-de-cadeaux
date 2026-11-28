import { ae as onDestroy, A as setContext, ad as getContext, n as noop$1, af as run, V as derived } from './index-server.js-CIVHNbBm.js';
import { e as ensure, i as identity, c as callAll, a as isFunction, b as isString, w as warn, d as invariant, f as compact } from './warning.js-12YgogjO.js';

// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/internal/create-context.js
function createContext(defaultValue) {
	const key = Symbol();
	return {
		key,
		consume() {
			return getContext(key) || defaultValue;
		},
		provide(value) {
			return setContext(key, value);
		}
	};
}
// node_modules/.pnpm/@zag-js+utils@1.39.1/node_modules/@zag-js/utils/dist/array.mjs
function toArray(v) {
	if (v == null) return [];
	return Array.isArray(v) ? v : [v];
}
var fromLength = (length) => Array.from(Array(length).keys());
var first = (v) => v[0];
var last = (v) => v[v.length - 1];
var has = (v, t) => v.indexOf(t) !== -1;
var add = (v, ...items) => v.concat(items);
var remove = (v, ...items) => v.filter((t) => !items.includes(t));
var addOrRemove = (v, item) => has(v, item) ? remove(v, item) : add(v, item);
function flatArray(arr) {
	return arr.reduce((flat, item) => {
		if (Array.isArray(item)) return flat.concat(flatArray(item));
		return flat.concat(item);
	}, []);
}
// node_modules/.pnpm/@zag-js+core@1.39.1/node_modules/@zag-js/core/dist/merge-props.mjs
var clsx = (...args) => args.map((str) => str?.trim?.()).filter(Boolean).join(" ");
var CSS_REGEX$1 = /((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g;
var serialize$1 = (style) => {
	const res = {};
	let match;
	while (match = CSS_REGEX$1.exec(style)) res[match[1]] = match[2];
	return res;
};
var css = (a, b) => {
	if (isString(a)) {
		if (isString(b)) return `${a};${b}`;
		a = serialize$1(a);
	} else if (isString(b)) b = serialize$1(b);
	return Object.assign({}, a ?? {}, b ?? {});
};
function mergeProps$1(...args) {
	let result = {};
	for (let props of args) {
		if (!props) continue;
		for (let key in result) {
			if (key.startsWith("on") && typeof result[key] === "function" && typeof props[key] === "function") {
				result[key] = callAll(props[key], result[key]);
				continue;
			}
			if (key === "className" || key === "class") {
				result[key] = clsx(result[key], props[key]);
				continue;
			}
			if (key === "style") {
				result[key] = css(result[key], props[key]);
				continue;
			}
			result[key] = props[key] !== void 0 ? props[key] : result[key];
		}
		for (let key in props) if (result[key] === void 0) result[key] = props[key];
		const symbols = Object.getOwnPropertySymbols(props);
		for (let symbol of symbols) result[symbol] = props[symbol];
	}
	return result;
}
// node_modules/.pnpm/@zag-js+core@1.39.1/node_modules/@zag-js/core/dist/state.mjs
var STATE_DELIMITER = ".";
var ABSOLUTE_PREFIX = "#";
var stateIndexCache = /* @__PURE__ */ new WeakMap();
var stateIdIndexCache = /* @__PURE__ */ new WeakMap();
function joinStatePath(parts) {
	return parts.join(STATE_DELIMITER);
}
function isAbsoluteStatePath(value) {
	return value.includes(STATE_DELIMITER);
}
function isExplicitAbsoluteStatePath(value) {
	return value.startsWith(ABSOLUTE_PREFIX);
}
function isChildTarget(value) {
	return value.startsWith(STATE_DELIMITER);
}
function stripAbsolutePrefix(value) {
	return isExplicitAbsoluteStatePath(value) ? value.slice(ABSOLUTE_PREFIX.length) : value;
}
function appendStatePath(base, segment) {
	return base ? `${base}${STATE_DELIMITER}${segment}` : segment;
}
function buildStateIndex(machine) {
	const index = /* @__PURE__ */ new Map();
	const idIndex = /* @__PURE__ */ new Map();
	const visit = (basePath, state) => {
		index.set(basePath, state);
		const stateId = state.id;
		if (stateId) {
			if (idIndex.has(stateId)) invariant(`[zag-js] Duplicate state id: "${stateId}"`);
			idIndex.set(stateId, basePath);
		}
		const childStates = state.states;
		if (!childStates) return;
		ensure(state.initial, () => `[zag-js] Compound state "${basePath}" has child states but no "initial" property`);
		if (!(state.initial in childStates)) invariant(`[zag-js] Compound state "${basePath}" has initial "${String(state.initial)}" which is not a child state`);
		for (const [childKey, childState] of Object.entries(childStates)) {
			if (!childState) continue;
			const childPath = appendStatePath(basePath, childKey);
			visit(childPath, childState);
		}
	};
	for (const [topKey, topState] of Object.entries(machine.states)) {
		if (!topState) continue;
		visit(topKey, topState);
	}
	return {
		index,
		idIndex
	};
}
function ensureStateIndex(machine) {
	const cached = stateIndexCache.get(machine);
	if (cached) return cached;
	const { index, idIndex } = buildStateIndex(machine);
	stateIndexCache.set(machine, index);
	stateIdIndexCache.set(machine, idIndex);
	return index;
}
function getStatePathById(machine, stateId) {
	ensureStateIndex(machine);
	return stateIdIndexCache.get(machine)?.get(stateId);
}
function toSegments(value) {
	if (!value) return [];
	return String(value).split(STATE_DELIMITER).filter(Boolean);
}
function getStateChain(machine, state) {
	if (!state) return [];
	const stateIndex = ensureStateIndex(machine);
	const segments = toSegments(state);
	const chain = [];
	const statePath = [];
	for (const segment of segments) {
		statePath.push(segment);
		const path = joinStatePath(statePath);
		const current = stateIndex.get(path);
		if (!current) break;
		chain.push({
			path,
			state: current
		});
	}
	return chain;
}
function resolveAbsoluteStateValue(machine, value) {
	const stateIndex = ensureStateIndex(machine);
	const segments = toSegments(value);
	if (!segments.length) return value;
	const resolved = [];
	for (const segment of segments) {
		resolved.push(segment);
		const path = joinStatePath(resolved);
		if (!stateIndex.has(path)) return value;
	}
	let resolvedPath = joinStatePath(resolved);
	let current = stateIndex.get(resolvedPath);
	while (current?.initial) {
		const nextPath = `${resolvedPath}${STATE_DELIMITER}${current.initial}`;
		const nextState = stateIndex.get(nextPath);
		if (!nextState) break;
		resolvedPath = nextPath;
		current = nextState;
	}
	return resolvedPath;
}
function hasStatePath(machine, value) {
	return ensureStateIndex(machine).has(value);
}
function resolveStateValue(machine, value, source) {
	const stateValue = String(value);
	if (isExplicitAbsoluteStatePath(stateValue)) {
		const stateId = stripAbsolutePrefix(stateValue);
		const statePath = getStatePathById(machine, stateId);
		ensure(statePath, () => `[zag-js] Unknown state id: "${stateId}"`);
		return resolveAbsoluteStateValue(machine, statePath);
	}
	if (isChildTarget(stateValue) && source) return resolveAbsoluteStateValue(machine, appendStatePath(source, stateValue.slice(1)));
	if (!isAbsoluteStatePath(stateValue) && source) {
		const sourceSegments = toSegments(source);
		for (let index = sourceSegments.length - 1; index >= 1; index--) {
			const candidate = appendStatePath(sourceSegments.slice(0, index).join(STATE_DELIMITER), stateValue);
			if (hasStatePath(machine, candidate)) return resolveAbsoluteStateValue(machine, candidate);
		}
		if (hasStatePath(machine, stateValue)) return resolveAbsoluteStateValue(machine, stateValue);
	}
	return resolveAbsoluteStateValue(machine, stateValue);
}
function findTransition(machine, state, eventType) {
	const chain = getStateChain(machine, state);
	for (let index = chain.length - 1; index >= 0; index--) {
		const transition = (chain[index]?.state.on)?.[eventType];
		if (transition) return {
			transitions: transition,
			source: chain[index]?.path
		};
	}
	return {
		transitions: machine.on?.[eventType],
		source: void 0
	};
}
function getExitEnterStates(machine, prevState, nextState, reenter) {
	const prevChain = prevState ? getStateChain(machine, prevState) : [];
	const nextChain = getStateChain(machine, nextState);
	let commonIndex = 0;
	while (commonIndex < prevChain.length && commonIndex < nextChain.length && prevChain[commonIndex]?.path === nextChain[commonIndex]?.path) commonIndex += 1;
	let exiting = prevChain.slice(commonIndex).reverse();
	let entering = nextChain.slice(commonIndex);
	const sameLeaf = prevChain.at(-1)?.path === nextChain.at(-1)?.path;
	if (reenter && sameLeaf) {
		exiting = prevChain.slice().reverse();
		entering = nextChain;
	}
	return {
		exiting,
		entering
	};
}
function matchesState(current, value) {
	if (!current) return false;
	return current === value || current.startsWith(`${value}${STATE_DELIMITER}`);
}
function hasTag(machine, state, tag) {
	return getStateChain(machine, state).some((item) => item.state.tags?.includes(tag));
}
// node_modules/.pnpm/@zag-js+core@1.39.1/node_modules/@zag-js/core/dist/create-machine.mjs
function createGuards() {
	return {
		and: (...guards) => {
			return function andGuard(params) {
				return guards.every((str) => params.guard(str));
			};
		},
		or: (...guards) => {
			return function orGuard(params) {
				return guards.some((str) => params.guard(str));
			};
		},
		not: (guard) => {
			return function notGuard(params) {
				return !params.guard(guard);
			};
		}
	};
}
function createMachine(config) {
	ensureStateIndex(config);
	return config;
}
function setup() {
	return {
		guards: createGuards(),
		createMachine: (config) => {
			return createMachine(config);
		},
		choose: (transitions) => {
			return function chooseFn({ choose }) {
				return choose(transitions)?.actions;
			};
		}
	};
}
// node_modules/.pnpm/@zag-js+core@1.39.1/node_modules/@zag-js/core/dist/types.mjs
var MachineStatus = /* @__PURE__ */ ((MachineStatus2) => {
	MachineStatus2["NotStarted"] = "Not Started";
	MachineStatus2["Started"] = "Started";
	MachineStatus2["Stopped"] = "Stopped";
	return MachineStatus2;
})(MachineStatus || {});
var INIT_STATE = "__init__";
// node_modules/.pnpm/@zag-js+dom-query@1.39.1/node_modules/@zag-js/dom-query/dist/chunk-QZ7TP4HQ.mjs
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {
	enumerable: true,
	configurable: true,
	writable: true,
	value
}) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
// node_modules/.pnpm/@zag-js+dom-query@1.39.1/node_modules/@zag-js/dom-query/dist/shared.mjs
var wrap = (v, idx) => {
	return v.map((_, index) => v[(Math.max(idx, 0) + index) % v.length]);
};
var noop = () => void 0;
var isObject = (v) => typeof v === "object" && v !== null;
var MAX_Z_INDEX = 2147483647;
var dataAttr = (guard) => guard ? "" : void 0;
var ariaAttr = (guard) => guard ? "true" : void 0;
// node_modules/.pnpm/@zag-js+dom-query@1.39.1/node_modules/@zag-js/dom-query/dist/node.mjs
var ELEMENT_NODE = 1;
var DOCUMENT_NODE = 9;
var DOCUMENT_FRAGMENT_NODE = 11;
var isHTMLElement = (el) => isObject(el) && el.nodeType === ELEMENT_NODE && typeof el.nodeName === "string";
var isDocument = (el) => isObject(el) && el.nodeType === DOCUMENT_NODE;
var isWindow = (el) => isObject(el) && el === el.window;
var getNodeName = (node) => {
	if (isHTMLElement(node)) return node.localName || "";
	return "#document";
};
function isRootElement(node) {
	return [
		"html",
		"body",
		"#document"
	].includes(getNodeName(node));
}
var isNode = (el) => isObject(el) && el.nodeType !== void 0;
var isShadowRoot = (el) => isNode(el) && el.nodeType === DOCUMENT_FRAGMENT_NODE && "host" in el;
var isInputElement = (el) => isHTMLElement(el) && el.localName === "input";
var isAnchorElement = (el) => !!el?.matches("a[href]");
var isElementVisible = (el) => {
	if (!isHTMLElement(el)) return false;
	return el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0;
};
function isActiveElement(element) {
	if (!element) return false;
	return getActiveElement(element.getRootNode()) === element;
}
var TEXTAREA_SELECT_REGEX = /(textarea|select)/;
function isEditableElement(el) {
	if (el == null || !isHTMLElement(el)) return false;
	try {
		return isInputElement(el) && el.selectionStart != null || TEXTAREA_SELECT_REGEX.test(el.localName) || el.isContentEditable || el.getAttribute("contenteditable") === "true" || el.getAttribute("contenteditable") === "";
	} catch {
		return false;
	}
}
function contains(parent, child) {
	if (!parent || !child) return false;
	if (!isHTMLElement(parent) || !isNode(child)) return false;
	if (isHTMLElement(child) && parent === child) return true;
	if (parent.contains(child)) return true;
	const rootNode = child.getRootNode?.();
	if (rootNode && isShadowRoot(rootNode)) {
		let next = child;
		while (next) {
			if (parent === next) return true;
			next = next.parentNode || next.host;
		}
	}
	return false;
}
function getDocument(el) {
	if (isDocument(el)) return el;
	if (isWindow(el)) return el.document;
	return el?.ownerDocument ?? document;
}
function getDocumentElement(el) {
	return getDocument(el).documentElement;
}
function getWindow(el) {
	if (isShadowRoot(el)) return getWindow(el.host);
	if (isDocument(el)) return el.defaultView ?? window;
	if (isHTMLElement(el)) return el.ownerDocument?.defaultView ?? window;
	return window;
}
function getActiveElement(rootNode) {
	let activeElement = rootNode.activeElement;
	while (activeElement?.shadowRoot) {
		const el = activeElement.shadowRoot.activeElement;
		if (!el || el === activeElement) break;
		else activeElement = el;
	}
	return activeElement;
}
function getParentNode(node) {
	if (getNodeName(node) === "html") return node;
	const result = node.assignedSlot || node.parentNode || isShadowRoot(node) && node.host || getDocumentElement(node);
	return isShadowRoot(result) ? result.host : result;
}
function getRootNode(node) {
	let result;
	try {
		result = node.getRootNode({ composed: true });
		if (isDocument(result) || isShadowRoot(result)) return result;
	} catch {}
	return node.ownerDocument ?? document;
}
// node_modules/.pnpm/@zag-js+dom-query@1.39.1/node_modules/@zag-js/dom-query/dist/platform.mjs
var isDom = () => typeof document !== "undefined";
function getPlatform() {
	return navigator.userAgentData?.platform ?? navigator.platform;
}
function getUserAgent() {
	const ua2 = navigator.userAgentData;
	if (ua2 && Array.isArray(ua2.brands)) return ua2.brands.map(({ brand, version }) => `${brand}/${version}`).join(" ");
	return navigator.userAgent;
}
var pt = (v) => isDom() && v.test(getPlatform());
var ua = (v) => isDom() && v.test(getUserAgent());
var vn = (v) => isDom() && v.test(navigator.vendor);
var isTouchDevice = () => isDom() && !!navigator.maxTouchPoints;
var isIPhone = () => pt(/^iPhone/i);
var isIPad = () => pt(/^iPad/i) || isMac() && navigator.maxTouchPoints > 1;
var isIos = () => isIPhone() || isIPad();
var isApple = () => isMac() || isIos();
var isMac = () => pt(/^Mac/i);
var isSafari = () => isApple() && vn(/apple/i);
var isFirefox = () => ua(/Firefox/i);
var isAndroid = () => ua(/Android/i);
// node_modules/.pnpm/@zag-js+dom-query@1.39.1/node_modules/@zag-js/dom-query/dist/event.mjs
function getComposedPath(event) {
	return event.composedPath?.() ?? event.nativeEvent?.composedPath?.();
}
function getEventTarget(event) {
	return getComposedPath(event)?.[0] ?? event.target;
}
function isOpeningInNewTab(event) {
	const element = event.currentTarget;
	if (!element) return false;
	if (!element.matches("a[href], button[type='submit'], input[type='submit']")) return false;
	const isMiddleClick = event.button === 1;
	const isModKeyClick = isCtrlOrMetaKey(event);
	return isMiddleClick || isModKeyClick;
}
function isDownloadingEvent(event) {
	const element = event.currentTarget;
	if (!element) return false;
	const localName = element.localName;
	if (!event.altKey) return false;
	if (localName === "a") return true;
	if (localName === "button" && element.type === "submit") return true;
	if (localName === "input" && element.type === "submit") return true;
	return false;
}
function isComposingEvent(event) {
	return getNativeEvent(event).isComposing || event.keyCode === 229;
}
function isCtrlOrMetaKey(e) {
	if (isMac()) return e.metaKey;
	return e.ctrlKey;
}
function isVirtualClick(e) {
	if (e.pointerType === "" && e.isTrusted) return true;
	if (isAndroid() && e.pointerType) return e.type === "click" && e.buttons === 1;
	return e.detail === 0 && !e.pointerType;
}
var isLeftClick = (e) => e.button === 0;
var isContextMenuEvent = (e) => {
	return e.button === 2 || isMac() && e.ctrlKey && e.button === 0;
};
var keyMap = {
	Up: "ArrowUp",
	Down: "ArrowDown",
	Esc: "Escape",
	" ": "Space",
	",": "Comma",
	Left: "ArrowLeft",
	Right: "ArrowRight"
};
var rtlKeyMap = {
	ArrowLeft: "ArrowRight",
	ArrowRight: "ArrowLeft"
};
function getEventKey(event, options = {}) {
	const { dir = "ltr", orientation = "horizontal" } = options;
	let key = event.key;
	key = keyMap[key] ?? key;
	if (dir === "rtl" && orientation === "horizontal" && key in rtlKeyMap) key = rtlKeyMap[key];
	return key;
}
function getNativeEvent(event) {
	return event.nativeEvent ?? event;
}
var addDomEvent = (target, eventName, handler, options) => {
	const node = typeof target === "function" ? target() : target;
	node?.addEventListener(eventName, handler, options);
	return () => {
		node?.removeEventListener(eventName, handler, options);
	};
};
// node_modules/.pnpm/@zag-js+dom-query@1.39.1/node_modules/@zag-js/dom-query/dist/tabbable.mjs
var isFrame = (el) => isHTMLElement(el) && el.tagName === "IFRAME";
var NATURALLY_TABBABLE_REGEX = /^(audio|video|details)$/;
function parseTabIndex(el) {
	const attr = el.getAttribute("tabindex");
	if (!attr) return NaN;
	return parseInt(attr, 10);
}
var hasTabIndex = (el) => !Number.isNaN(parseTabIndex(el));
var hasNegativeTabIndex = (el) => parseTabIndex(el) < 0;
function isRadioInput(element) {
	return isInputElement(element) && element.type === "radio";
}
function isTabbableRadio(element) {
	if (!isRadioInput(element) || !element.name) return true;
	if (element.checked) return true;
	const selector = `input[type="radio"][name="${CSS.escape(element.name)}"]`;
	const scope = element.form ?? element.ownerDocument;
	const group = Array.from(scope.querySelectorAll(selector)).filter((radio) => radio.form === element.form && isFocusable(radio));
	const checked = group.find((radio) => radio.checked);
	if (checked) return checked === element;
	return group[0] === element;
}
function getShadowRootForNode(element, getShadowRoot) {
	if (!getShadowRoot) return null;
	if (getShadowRoot === true) return element.shadowRoot || null;
	const result = getShadowRoot(element);
	return (result === true ? element.shadowRoot : result) || null;
}
function collectElementsWithShadowDOM(elements, getShadowRoot, filterFn) {
	const allElements = [...elements];
	const toProcess = [...elements];
	const processed = /* @__PURE__ */ new Set();
	const positionMap = /* @__PURE__ */ new Map();
	elements.forEach((el, i) => positionMap.set(el, i));
	let processIndex = 0;
	while (processIndex < toProcess.length) {
		const element = toProcess[processIndex++];
		if (!element || processed.has(element)) continue;
		processed.add(element);
		const shadowRoot = getShadowRootForNode(element, getShadowRoot);
		if (shadowRoot) {
			const shadowElements = Array.from(shadowRoot.querySelectorAll(focusableSelector)).filter(filterFn);
			const hostIndex = positionMap.get(element);
			if (hostIndex !== void 0) {
				const insertPosition = hostIndex + 1;
				allElements.splice(insertPosition, 0, ...shadowElements);
				shadowElements.forEach((el, i) => {
					positionMap.set(el, insertPosition + i);
				});
				for (let i = insertPosition + shadowElements.length; i < allElements.length; i++) positionMap.set(allElements[i], i);
			} else {
				const insertPosition = allElements.length;
				allElements.push(...shadowElements);
				shadowElements.forEach((el, i) => {
					positionMap.set(el, insertPosition + i);
				});
			}
			toProcess.push(...shadowElements);
		}
	}
	return allElements;
}
var focusableSelector = "input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false']), details > summary:first-of-type";
var getFocusables = (container, options = {}) => {
	if (!container) return [];
	const { includeContainer = false, getShadowRoot } = options;
	const elements = Array.from(container.querySelectorAll(focusableSelector));
	if ((includeContainer == true || includeContainer == "if-empty" && elements.length === 0) && isHTMLElement(container) && isFocusable(container)) elements.unshift(container);
	const focusableElements = [];
	for (const element of elements) {
		if (!isFocusable(element)) continue;
		if (isFrame(element) && element.contentDocument) {
			const frameBody = element.contentDocument.body;
			focusableElements.push(...getFocusables(frameBody, { getShadowRoot }));
			continue;
		}
		focusableElements.push(element);
	}
	if (getShadowRoot) return collectElementsWithShadowDOM(focusableElements, getShadowRoot, isFocusable);
	return focusableElements;
};
function isFocusable(element) {
	if (!isHTMLElement(element) || element.closest("[inert]")) return false;
	return element.matches(focusableSelector) && isElementVisible(element);
}
function getTabbables(container, options = {}) {
	if (!container) return [];
	const { includeContainer, getShadowRoot } = options;
	const elements = Array.from(container.querySelectorAll(focusableSelector));
	if (includeContainer && isTabbable(container)) elements.unshift(container);
	const tabbableElements = [];
	for (const element of elements) {
		if (!isTabbable(element)) continue;
		if (isFrame(element) && element.contentDocument) {
			const frameBody = element.contentDocument.body;
			tabbableElements.push(...getTabbables(frameBody, { getShadowRoot }));
			continue;
		}
		tabbableElements.push(element);
	}
	if (getShadowRoot) {
		const allElements = collectElementsWithShadowDOM(tabbableElements, getShadowRoot, isTabbable);
		if (!allElements.length && includeContainer) return elements;
		return allElements;
	}
	if (!tabbableElements.length && includeContainer) return elements;
	return tabbableElements;
}
function isTabbable(el) {
	if (isHTMLElement(el) && el.tabIndex > 0) return true;
	if (!isFocusable(el) || hasNegativeTabIndex(el)) return false;
	return isTabbableRadio(el);
}
function getTabbableEdges(container, options = {}) {
	const elements = getTabbables(container, options);
	return [elements[0] || null, elements[elements.length - 1] || null];
}
function getNextTabbable(container, options = {}) {
	const { current, getShadowRoot } = options;
	const tabbables = getTabbables(container, { getShadowRoot });
	const doc = container?.ownerDocument || document;
	const currentElement = current ?? getActiveElement(doc);
	if (!currentElement) return null;
	return tabbables[tabbables.indexOf(currentElement) + 1] || null;
}
function getTabIndex(node) {
	if (node.tabIndex < 0) {
		if ((NATURALLY_TABBABLE_REGEX.test(node.localName) || isEditableElement(node)) && !hasTabIndex(node)) return 0;
	}
	return node.tabIndex;
}
// node_modules/.pnpm/@zag-js+dom-query@1.39.1/node_modules/@zag-js/dom-query/dist/raf.mjs
var AnimationFrame = class _AnimationFrame {
	constructor() {
		__publicField(this, "id", null);
		__publicField(this, "fn_cleanup");
		__publicField(this, "cleanup", () => {
			this.cancel();
		});
	}
	static create() {
		return new _AnimationFrame();
	}
	request(fn) {
		this.cancel();
		this.id = globalThis.requestAnimationFrame(() => {
			this.id = null;
			this.fn_cleanup = fn?.();
		});
	}
	cancel() {
		if (this.id !== null) {
			globalThis.cancelAnimationFrame(this.id);
			this.id = null;
		}
		this.fn_cleanup?.();
		this.fn_cleanup = void 0;
	}
	isActive() {
		return this.id !== null;
	}
};
function raf(fn) {
	const frame = AnimationFrame.create();
	frame.request(fn);
	return frame.cleanup;
}
function nextTick(fn) {
	const set = /* @__PURE__ */ new Set();
	function raf2(fn2) {
		const id = globalThis.requestAnimationFrame(fn2);
		set.add(() => globalThis.cancelAnimationFrame(id));
	}
	raf2(() => raf2(fn));
	return function cleanup() {
		set.forEach((fn2) => fn2());
	};
}
function queueBeforeEvent(el, type, cb) {
	const cancelTimer = raf(() => {
		el.removeEventListener(type, exec, true);
		cb();
	});
	const exec = () => {
		cancelTimer();
		cb();
	};
	el.addEventListener(type, exec, {
		once: true,
		capture: true
	});
	return cancelTimer;
}
// node_modules/.pnpm/@zag-js+dom-query@1.39.1/node_modules/@zag-js/dom-query/dist/query.mjs
function queryAll(root, selector) {
	return Array.from(root?.querySelectorAll(selector) ?? []);
}
function query(root, selector) {
	return root?.querySelector(selector) ?? null;
}
var defaultItemToId = (v) => v.id;
function itemById(v, id, itemToId = defaultItemToId) {
	return v.find((item) => itemToId(item) === id);
}
function indexOfId(v, id, itemToId = defaultItemToId) {
	const item = itemById(v, id, itemToId);
	return item ? v.indexOf(item) : -1;
}
function nextById(v, id, loop = true) {
	let idx = indexOfId(v, id);
	idx = loop ? (idx + 1) % v.length : Math.min(idx + 1, v.length - 1);
	return v[idx];
}
function prevById(v, id, loop = true) {
	let idx = indexOfId(v, id);
	if (idx === -1) return loop ? v[v.length - 1] : null;
	idx = loop ? (idx - 1 + v.length) % v.length : Math.max(0, idx - 1);
	return v[idx];
}
// node_modules/.pnpm/@zag-js+core@1.39.1/node_modules/@zag-js/core/dist/scope.mjs
function createScope(props) {
	const getRootNode = () => props.getRootNode?.() ?? document;
	const getDoc = () => getDocument(getRootNode());
	const getWin = () => getDoc().defaultView ?? window;
	const getActiveElementFn = () => getActiveElement(getRootNode());
	const getById = (id) => getRootNode().getElementById(id);
	return {
		...props,
		getRootNode,
		getDoc,
		getWin,
		getActiveElement: getActiveElementFn,
		isActiveElement,
		getById
	};
}
// node_modules/.pnpm/@zag-js+types@1.39.1/node_modules/@zag-js/types/dist/prop-types.mjs
function createNormalizer(fn) {
	return new Proxy({}, { get(_target, key) {
		if (key === "style") return (props) => {
			return fn({ style: props }).style;
		};
		return fn;
	} });
}
// node_modules/.pnpm/@zag-js+types@1.39.1/node_modules/@zag-js/types/dist/create-props.mjs
var createProps = () => (props) => Array.from(new Set(props));
// node_modules/.pnpm/@zag-js+svelte@1.39.1_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@zag-js/svelte/dist/normalize-props.js
var propMap = {
	className: "class",
	defaultChecked: "checked",
	defaultValue: "value",
	htmlFor: "for",
	onBlur: "onfocusout",
	onChange: "oninput",
	onFocus: "onfocusin",
	onDoubleClick: "ondblclick"
};
function toStyleString(style) {
	let string = "";
	for (let key in style) {
		/**
		* Ignore null and undefined values.
		*/
		const value = style[key];
		if (value === null || value === void 0) continue;
		/**
		* Convert camelCase to kebab-case except for CSS custom properties.
		*/
		if (!key.startsWith("--")) key = key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
		string += `${key}:${value};`;
	}
	return string;
}
var preserveKeys = new Set("viewBox,className,preserveAspectRatio,fillRule,clipPath,clipRule,strokeWidth,strokeLinecap,strokeLinejoin,strokeDasharray,strokeDashoffset,strokeMiterlimit".split(","));
function toSvelteProp(key) {
	if (key in propMap) return propMap[key];
	if (preserveKeys.has(key)) return key;
	return key.toLowerCase();
}
function toSveltePropValue(key, value) {
	if (key === "style" && typeof value === "object") return toStyleString(value);
	return value;
}
var normalizeProps = createNormalizer((props) => {
	const normalized = {};
	for (const key in props) normalized[toSvelteProp(key)] = toSveltePropValue(key, props[key]);
	return normalized;
});
// node_modules/.pnpm/@zag-js+svelte@1.39.1_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@zag-js/svelte/dist/merge-props.js
var CSS_REGEX = /((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g;
var serialize = (style) => {
	const res = {};
	let match;
	while (match = CSS_REGEX.exec(style)) res[match[1]] = match[2];
	return res;
};
function mergeProps(...args) {
	const classNames = [];
	for (const props of args) {
		if (!props) continue;
		if ("class" in props && props.class != null) classNames.push(props.class);
	}
	const merged = mergeProps$1(...args);
	if (classNames.length > 0) merged.class = classNames.length === 1 ? classNames[0] : classNames;
	if ("style" in merged) {
		if (typeof merged.style === "string") merged.style = serialize(merged.style);
		merged.style = toStyleString(merged.style);
	}
	return merged;
}
// node_modules/.pnpm/@zag-js+svelte@1.39.1_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@zag-js/svelte/dist/bindable.svelte.js
function bindable(props) {
	const initial = props().defaultValue ?? props().value;
	const eq = props().isEqual ?? Object.is;
	let value = initial;
	const controlled = derived(() => props().value !== void 0);
	let valueRef = { current: run(() => value) };
	let prevValue = { current: void 0 };
	const setValueFn = (v) => {
		const next = isFunction(v) ? v(valueRef.current) : v;
		const prev = prevValue.current;
		if (props().debug) console.log(`[bindable > ${props().debug}] setValue`, {
			next,
			prev
		});
		if (!controlled()) value = next;
		if (!eq(next, prev)) props().onChange?.(next, prev);
	};
	function get() {
		return controlled() ? props().value : value;
	}
	return {
		initial,
		ref: valueRef,
		get,
		set(val) {
			const exec = props().sync ? noop$1 : identity;
			run(() => exec(() => setValueFn(val)));
		},
		invoke(nextValue, prevValue) {
			props().onChange?.(nextValue, prevValue);
		},
		hash(value) {
			return props().hash?.(value) ?? String(value);
		}
	};
}
bindable.cleanup = (fn) => {
	onDestroy(() => fn());
};
bindable.ref = (defaultValue) => {
	let value = defaultValue;
	return {
		get: () => value,
		set: (next) => {
			value = next;
		}
	};
};
// node_modules/.pnpm/@zag-js+svelte@1.39.1_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@zag-js/svelte/dist/refs.svelte.js
function useRefs(refs) {
	const ref = { current: refs };
	return {
		get(key) {
			return ref.current[key];
		},
		set(key, value) {
			ref.current[key] = value;
		}
	};
}
// node_modules/.pnpm/@zag-js+svelte@1.39.1_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@zag-js/svelte/dist/track.svelte.js
var track = (deps, effect) => {};
// node_modules/.pnpm/@zag-js+svelte@1.39.1_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@zag-js/svelte/dist/machine.svelte.js
function access(userProps) {
	if (isFunction(userProps)) return userProps();
	return userProps;
}
function useMachine(machine, userProps) {
	const scope = derived(() => {
		const { id, ids, getRootNode } = access(userProps);
		return createScope({
			id,
			ids,
			getRootNode
		});
	});
	const debug = (...args) => {
		if (machine.debug) console.log(...args);
	};
	const props = derived(() => machine.props?.({
		props: compact(access(userProps)),
		scope: scope()
	}) ?? access(userProps));
	const prop = useProp(() => props());
	const context = machine.context?.({
		prop,
		bindable,
		get scope() {
			return scope();
		},
		flush,
		getContext() {
			return ctx;
		},
		getComputed() {
			return computed;
		},
		getRefs() {
			return refs;
		},
		getEvent() {
			return getEvent();
		}
	});
	const ctx = {
		get(key) {
			return context?.[key].get();
		},
		set(key, value) {
			context?.[key].set(value);
		},
		initial(key) {
			return context?.[key].initial;
		},
		hash(key) {
			const current = context?.[key].get();
			return context?.[key].hash(current);
		}
	};
	let effects = /* @__PURE__ */ new Map();
	let transitionRef = { current: null };
	let previousEventRef = { current: null };
	let eventRef = { current: { type: "" } };
	const getEvent = () => ({
		...eventRef.current,
		current() {
			return eventRef.current;
		},
		previous() {
			return previousEventRef.current;
		}
	});
	const getState = () => ({
		...state,
		hasTag(tag) {
			return hasTag(machine, state.get(), tag);
		},
		matches(...values) {
			const currentState = state.get();
			return values.some((value) => matchesState(currentState, value));
		}
	});
	const refs = useRefs(machine.refs?.({
		prop,
		context: ctx
	}) ?? {});
	const getParams = () => ({
		state: getState(),
		context: ctx,
		event: getEvent(),
		prop,
		send,
		action,
		guard,
		track,
		refs,
		computed,
		flush,
		scope: scope(),
		choose
	});
	const action = (keys) => {
		const strs = isFunction(keys) ? keys(getParams()) : keys;
		if (!strs) return;
		const fns = strs.map((s) => {
			const fn = machine.implementations?.actions?.[s];
			if (!fn) warn(`[zag-js] No implementation found for action "${JSON.stringify(s)}"`);
			return fn;
		});
		for (const fn of fns) fn?.(getParams());
	};
	const guard = (str) => {
		if (isFunction(str)) return str(getParams());
		return machine.implementations?.guards?.[str](getParams());
	};
	const effect = (keys) => {
		const strs = isFunction(keys) ? keys(getParams()) : keys;
		if (!strs) return;
		const fns = strs.map((s) => {
			const fn = machine.implementations?.effects?.[s];
			if (!fn) warn(`[zag-js] No implementation found for effect "${JSON.stringify(s)}"`);
			return fn;
		});
		const cleanups = [];
		for (const fn of fns) {
			const cleanup = fn?.(getParams());
			if (cleanup) cleanups.push(cleanup);
		}
		return () => cleanups.forEach((fn) => fn?.());
	};
	const choose = (transitions) => {
		return toArray(transitions).find((t) => {
			let result = !t.guard;
			if (isString(t.guard)) result = !!guard(t.guard);
			else if (isFunction(t.guard)) result = t.guard(getParams());
			return result;
		});
	};
	const computed = (key) => {
		ensure(machine.computed, () => `[zag-js] No computed object found on machine`);
		const fn = machine.computed[key];
		return fn({
			context: ctx,
			event: getEvent(),
			prop,
			refs,
			scope: scope(),
			computed
		});
	};
	const state = bindable(() => ({
		defaultValue: resolveStateValue(machine, machine.initialState({ prop })),
		onChange(nextState, prevState) {
			const { exiting, entering } = getExitEnterStates(machine, prevState, nextState, transitionRef.current?.reenter);
			exiting.forEach((item) => {
				effects.get(item.path)?.();
				effects.delete(item.path);
			});
			exiting.forEach((item) => {
				action(item.state?.exit);
			});
			action(transitionRef.current?.actions);
			entering.forEach((item) => {
				const cleanup = effect(item.state?.effects);
				if (cleanup) effects.set(item.path, cleanup);
			});
			if (prevState === "__init__") {
				action(machine.entry);
				const cleanup = effect(machine.effects);
				if (cleanup) effects.set(INIT_STATE, cleanup);
			}
			entering.forEach((item) => {
				action(item.state?.entry);
			});
		}
	}));
	let status = MachineStatus.NotStarted;
	onDestroy(() => {
		debug("unmounting...");
		status = MachineStatus.Stopped;
		effects.forEach((fn) => fn?.());
		effects = /* @__PURE__ */ new Map();
		transitionRef.current = null;
		action(machine.exit);
	});
	const send = (event) => {
		if (status !== MachineStatus.Started) return;
		previousEventRef.current = eventRef.current;
		eventRef.current = event;
		let currentState = state.get();
		const { transitions, source } = findTransition(machine, currentState, event.type);
		const transition = choose(transitions);
		if (!transition) return;
		transitionRef.current = transition;
		const target = resolveStateValue(machine, transition.target ?? currentState, source);
		debug("transition", event.type, transition.target || currentState, `(${transition.actions})`);
		if (target !== currentState) state.set(target);
		else if (transition.reenter) state.invoke(currentState, currentState);
		else action(transition.actions);
	};
	machine.watch?.(getParams());
	return {
		get state() {
			return getState();
		},
		send,
		context: ctx,
		prop,
		get scope() {
			return scope();
		},
		refs,
		computed,
		get event() {
			return getEvent();
		},
		getStatus: () => status
	};
}
function useProp(value) {
	return function get(key) {
		return value()[key];
	};
}
function flush(fn) {}
// node_modules/.pnpm/@zag-js+anatomy@1.39.1/node_modules/@zag-js/anatomy/dist/create-anatomy.mjs
var createAnatomy = (name, parts = []) => ({
	parts: (...values) => {
		if (isEmpty(parts)) return createAnatomy(name, values);
		throw new Error("createAnatomy().parts(...) should only be called once. Did you mean to use .extendWith(...) ?");
	},
	extendWith: (...values) => createAnatomy(name, [...parts, ...values]),
	omit: (...values) => createAnatomy(name, parts.filter((part) => !values.includes(part))),
	rename: (newName) => createAnatomy(newName, parts),
	keys: () => parts,
	build: () => [...new Set(parts)].reduce((prev, part) => Object.assign(prev, { [part]: {
		selector: [`&[data-scope="${toKebabCase(name)}"][data-part="${toKebabCase(part)}"]`, `& [data-scope="${toKebabCase(name)}"][data-part="${toKebabCase(part)}"]`].join(", "),
		attrs: {
			"data-scope": toKebabCase(name),
			"data-part": toKebabCase(part)
		}
	} }), {})
});
var toKebabCase = (value) => value.replace(/([A-Z])([A-Z])/g, "$1-$2").replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase();
var isEmpty = (v) => v.length === 0;

export { createGuards as $, createMachine as A, dataAttr as B, createAnatomy as C, createProps as D, normalizeProps as E, queryAll as F, isVirtualClick as G, isMac as H, setup as I, getEventKey as J, isEditableElement as K, isDownloadingEvent as L, isOpeningInNewTab as M, isCtrlOrMetaKey as N, ariaAttr as O, isComposingEvent as P, getNativeEvent as Q, defaultItemToId as R, indexOfId as S, wrap as T, isLeftClick as U, isSafari as V, getTabbableEdges as W, getNextTabbable as X, isActiveElement as Y, AnimationFrame as Z, MAX_Z_INDEX as _, addDomEvent as a, isFirefox as a0, queueBeforeEvent as a1, isAnchorElement as a2, itemById as a3, prevById as a4, nextById as a5, last as a6, first as a7, isApple as a8, remove as a9, addOrRemove as aa, query as ab, flatArray as ac, fromLength as ad, getRootNode as b, contains as c, getWindow as d, noop as e, isShadowRoot as f, getDocument as g, isTouchDevice as h, isHTMLElement as i, getEventTarget as j, isFocusable as k, isContextMenuEvent as l, getParentNode as m, nextTick as n, isRootElement as o, isIos as p, getTabbables as q, raf as r, getFocusables as s, getTabIndex as t, getActiveElement as u, isTabbable as v, isDocument as w, useMachine as x, createContext as y, mergeProps as z };
//# sourceMappingURL=create-anatomy.js-CLhpGM8y.js.map
