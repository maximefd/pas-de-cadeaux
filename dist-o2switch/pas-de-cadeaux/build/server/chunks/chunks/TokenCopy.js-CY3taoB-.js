import { au as attr, ao as escape_html, av as store_get, aB as stringify, ax as unsubscribe_stores, aj as props_id, ak as attributes, V as derived, al as exclude_from_object, an as to_array } from './index-server.js-CIVHNbBm.js';
import { P as Portal, j as getOverflowAncestors } from './anatomy2.js-Deb7OEEc.js';
import { x as useMachine, y as createContext, z as mergeProps, A as createMachine, B as dataAttr, U as isLeftClick, C as createAnatomy, a as addDomEvent, P as isComposingEvent, D as createProps, E as normalizeProps, $ as createGuards, F as queryAll } from './create-anatomy.js-CLhpGM8y.js';
import { c as createAttachmentKey, f as fromAction } from './attachments.js-DNhXZ-Re.js';
import { i as isFocusVisible, t as trackFocusVisible } from './dist2.js-Cjb_BOMc.js';
import { a as getPlacementStyles, g as getPlacement } from './get-styles.js-Boa-8w4M.js';
import { a as isFunction, g as createSplitProps, l as ensureProps } from './warning.js-12YgogjO.js';
import { f as getFormatter } from './i18n2.js-1SlG2bAu.js';

// node_modules/.pnpm/@zag-js+utils@1.39.1/node_modules/@zag-js/utils/dist/store.mjs
function createStore(initialState, compare = Object.is) {
	let state = { ...initialState };
	const listeners = /* @__PURE__ */ new Set();
	const subscribe = (listener) => {
		listeners.add(listener);
		return () => listeners.delete(listener);
	};
	const publish = () => {
		listeners.forEach((listener) => listener());
	};
	const get = (key) => {
		return state[key];
	};
	const set = (key, value) => {
		if (!compare(state[key], value)) {
			state[key] = value;
			publish();
		}
	};
	const update = (updates) => {
		let hasChanges = false;
		for (const key in updates) {
			const value = updates[key];
			if (value !== void 0 && !compare(state[key], value)) {
				state[key] = value;
				hasChanges = true;
			}
		}
		if (hasChanges) publish();
	};
	const snapshot = () => ({ ...state });
	return {
		subscribe,
		get,
		set,
		update,
		snapshot
	};
}
// node_modules/.pnpm/@zag-js+svelte@1.39.1_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@zag-js/svelte/dist/portal.js
function portal(node, props = {}) {
	function update(props = {}) {
		const { container, disabled, getRootNode } = props;
		if (disabled) return;
		const doc = getRootNode?.().ownerDocument ?? document;
		(container ?? doc.body).appendChild(node);
	}
	update(props);
	return {
		destroy: () => node.remove(),
		update
	};
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/tooltip/modules/root-context.js
var RootContext = createContext();
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/tooltip/anatomy/arrow-tip.svelte
function Arrow_tip($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const tooltip = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$5 = derived(() => mergeProps(tooltip().getArrowTipProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$5());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><div${attributes({ ...attributes$5() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/tooltip/anatomy/arrow.svelte
function Arrow($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const tooltip = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$4 = derived(() => mergeProps(tooltip().getArrowProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$4());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><div${attributes({ ...attributes$4() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/tooltip/anatomy/content.svelte
function Content($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const tooltip = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$3 = derived(() => mergeProps(tooltip().getContentProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$3());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><div${attributes({ ...attributes$3() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/tooltip/anatomy/positioner.svelte
function Positioner($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const tooltip = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$2 = derived(() => mergeProps(tooltip().getPositionerProps(), { [createAttachmentKey()]: fromAction(portal, () => void 0) }, rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$2());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><div${attributes({ ...attributes$2() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/tooltip/anatomy/root-context.svelte
function Root_context($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const tooltip = RootContext.consume();
		derived(() => props.children)()($$renderer, tooltip);
		$$renderer.push(`<!---->`);
	});
}
var parts = createAnatomy("tooltip").parts("trigger", "arrow", "arrowTip", "positioner", "content").build();
// node_modules/.pnpm/@zag-js+tooltip@1.39.1/node_modules/@zag-js/tooltip/dist/tooltip.dom.mjs
var getTriggerId = (scope, value) => {
	const customId = scope.ids?.trigger;
	if (customId != null) return isFunction(customId) ? customId(value) : customId;
	return value ? `tooltip:${scope.id}:trigger:${value}` : `tooltip:${scope.id}:trigger`;
};
var getContentId = (scope) => scope.ids?.content ?? `tooltip:${scope.id}:content`;
var getArrowId = (scope) => scope.ids?.arrow ?? `tooltip:${scope.id}:arrow`;
var getPositionerId = (scope) => scope.ids?.positioner ?? `tooltip:${scope.id}:popper`;
var getPositionerEl = (scope) => scope.getById(getPositionerId(scope));
var getTriggerEls = (scope) => queryAll(scope.getDoc(), `[data-scope="tooltip"][data-part="trigger"][data-ownedby="${scope.id}"]`);
var getActiveTriggerEl = (scope, value) => {
	return value == null ? getTriggerEls(scope)[0] : scope.getById(getTriggerId(scope, value));
};
// node_modules/.pnpm/@zag-js+tooltip@1.39.1/node_modules/@zag-js/tooltip/dist/tooltip.store.mjs
var store = createStore({
	id: null,
	prevId: null,
	instant: false
});
// node_modules/.pnpm/@zag-js+tooltip@1.39.1/node_modules/@zag-js/tooltip/dist/tooltip.connect.mjs
function connect(service, normalize) {
	const { state, context, send, scope, prop, event: _event } = service;
	const id = prop("id");
	const hasAriaLabel = !!prop("aria-label");
	const open = state.matches("open", "closing");
	const triggerValue = context.get("triggerValue");
	const contentId = getContentId(scope);
	const disabled = prop("disabled");
	const popperStyles = getPlacementStyles({
		...prop("positioning"),
		placement: context.get("currentPlacement")
	});
	return {
		open,
		setOpen(nextOpen) {
			if (state.matches("open", "closing") === nextOpen) return;
			send({ type: nextOpen ? "open" : "close" });
		},
		triggerValue,
		setTriggerValue(value) {
			send({
				type: "triggerValue.set",
				value: value ?? void 0
			});
		},
		reposition(options = {}) {
			send({
				type: "positioning.set",
				options
			});
		},
		getTriggerProps(props = {}) {
			const { value } = props;
			const current = value == null ? false : triggerValue === value;
			const triggerId = getTriggerId(scope, value);
			return normalize.button({
				...parts.trigger.attrs,
				id: triggerId,
				"data-ownedby": scope.id,
				"data-value": value,
				"data-current": dataAttr(current),
				dir: prop("dir"),
				"data-expanded": dataAttr(open),
				"data-state": open ? "open" : "closed",
				"aria-describedby": open ? contentId : void 0,
				onClick(event) {
					if (event.defaultPrevented) return;
					if (disabled) return;
					if (!prop("closeOnClick")) return;
					send({
						type: open && value != null && !current ? "triggerValue.set" : "close",
						src: "trigger.click",
						value,
						triggerId
					});
				},
				onFocus(event) {
					if (event.defaultPrevented) return;
					if (disabled) return;
					if (!isFocusVisible()) return;
					send({
						type: open && value != null && !current ? "triggerValue.set" : "open",
						src: "trigger.focus",
						value,
						triggerId
					});
				},
				onBlur(event) {
					if (event.defaultPrevented) return;
					if (disabled) return;
					if (id !== store.get("id")) return;
					if (!((event.relatedTarget ?? scope.getDoc().activeElement)?.closest(`[data-ownedby="${scope.id}"]`) != null)) send({
						type: "close",
						src: "trigger.blur",
						value,
						triggerId
					});
				},
				onPointerDown(event) {
					if (event.defaultPrevented) return;
					if (disabled) return;
					if (!isLeftClick(event)) return;
					if (!prop("closeOnPointerDown")) return;
					if (id === store.get("id")) send({
						type: "close",
						src: "trigger.pointerdown",
						value,
						triggerId
					});
				},
				onPointerMove(event) {
					if (event.defaultPrevented) return;
					if (disabled) return;
					if (event.pointerType === "touch") return;
					send({
						type: open && value != null && !current ? "triggerValue.set" : "pointer.move",
						value,
						triggerId
					});
				},
				onPointerOver(event) {
					if (event.defaultPrevented) return;
					if (disabled) return;
					if (event.pointerType === "touch") return;
					send({
						type: "pointer.move",
						value,
						triggerId
					});
				},
				onPointerLeave() {
					if (disabled) return;
					send({ type: "pointer.leave" });
				},
				onPointerCancel() {
					if (disabled) return;
					send({ type: "pointer.leave" });
				}
			});
		},
		getArrowProps() {
			return normalize.element({
				id: getArrowId(scope),
				...parts.arrow.attrs,
				dir: prop("dir"),
				style: popperStyles.arrow
			});
		},
		getArrowTipProps() {
			return normalize.element({
				...parts.arrowTip.attrs,
				dir: prop("dir"),
				style: popperStyles.arrowTip
			});
		},
		getPositionerProps() {
			return normalize.element({
				id: getPositionerId(scope),
				...parts.positioner.attrs,
				dir: prop("dir"),
				style: popperStyles.floating
			});
		},
		getContentProps() {
			const isCurrentTooltip = store.get("id") === id;
			const isPrevTooltip = store.get("prevId") === id;
			const instant = store.get("instant") && (open && isCurrentTooltip || isPrevTooltip);
			return normalize.element({
				...parts.content.attrs,
				dir: prop("dir"),
				hidden: !open,
				"data-state": open ? "open" : "closed",
				"data-instant": dataAttr(instant),
				role: hasAriaLabel ? void 0 : "tooltip",
				id: hasAriaLabel ? void 0 : contentId,
				"data-placement": context.get("currentPlacement"),
				onPointerEnter() {
					send({ type: "content.pointer.move" });
				},
				onPointerLeave() {
					send({ type: "content.pointer.leave" });
				},
				style: { pointerEvents: prop("interactive") ? "auto" : "none" }
			});
		}
	};
}
// node_modules/.pnpm/@zag-js+tooltip@1.39.1/node_modules/@zag-js/tooltip/dist/tooltip.machine.mjs
var { and, not } = createGuards();
var machine = createMachine({
	initialState: ({ prop }) => {
		return prop("open") || prop("defaultOpen") ? "open" : "closed";
	},
	props({ props }) {
		ensureProps(props, ["id"]);
		const closeOnClick = props.closeOnClick ?? true;
		const closeOnPointerDown = props.closeOnPointerDown ?? closeOnClick;
		return {
			openDelay: 400,
			closeDelay: 150,
			closeOnEscape: true,
			interactive: false,
			closeOnScroll: true,
			disabled: false,
			...props,
			closeOnPointerDown,
			closeOnClick,
			positioning: {
				placement: "bottom",
				...props.positioning
			}
		};
	},
	effects: ["trackFocusVisible", "trackStore"],
	context: ({ bindable, prop, scope }) => ({
		currentPlacement: bindable(() => ({ defaultValue: void 0 })),
		hasPointerMoveOpened: bindable(() => ({ defaultValue: null })),
		triggerValue: bindable(() => ({
			defaultValue: prop("defaultTriggerValue") ?? null,
			value: prop("triggerValue"),
			onChange(value) {
				const onTriggerValueChange = prop("onTriggerValueChange");
				if (!onTriggerValueChange) return;
				onTriggerValueChange({
					value,
					triggerElement: getActiveTriggerEl(scope, value)
				});
			}
		}))
	}),
	watch({ track, action, prop }) {
		track([() => prop("disabled")], () => {
			action(["closeIfDisabled"]);
		});
		track([() => prop("open")], () => {
			action(["toggleVisibility"]);
		});
		track([() => prop("triggerValue")], () => {
			action(["repositionImmediate"]);
		});
	},
	on: { "triggerValue.set": { actions: ["setTriggerValue", "repositionImmediate"] } },
	states: {
		closed: {
			entry: ["clearGlobalId"],
			on: {
				"controlled.open": { target: "open" },
				open: [{
					guard: "isOpenControlled",
					actions: ["setTriggerValue", "invokeOnOpen"]
				}, {
					target: "open",
					actions: ["setTriggerValue", "invokeOnOpen"]
				}],
				"pointer.leave": { actions: ["clearPointerMoveOpened"] },
				"pointer.move": [{
					guard: and("noVisibleTooltip", not("hasPointerMoveOpened")),
					target: "opening",
					actions: ["setTriggerValue"]
				}, {
					guard: not("hasPointerMoveOpened"),
					target: "open",
					actions: [
						"setPointerMoveOpened",
						"invokeOnOpen",
						"setTriggerValue"
					]
				}]
			}
		},
		opening: {
			effects: [
				"trackScroll",
				"trackPointerlockChange",
				"waitForOpenDelay"
			],
			on: {
				"after.openDelay": [{
					guard: "isOpenControlled",
					actions: ["setPointerMoveOpened", "invokeOnOpen"]
				}, {
					target: "open",
					actions: ["setPointerMoveOpened", "invokeOnOpen"]
				}],
				"controlled.open": { target: "open" },
				"controlled.close": { target: "closed" },
				open: [{
					guard: "isOpenControlled",
					actions: ["setTriggerValue", "invokeOnOpen"]
				}, {
					target: "open",
					actions: ["setTriggerValue", "invokeOnOpen"]
				}],
				"pointer.leave": [{
					guard: "isOpenControlled",
					actions: [
						"clearPointerMoveOpened",
						"invokeOnClose",
						"toggleVisibility"
					]
				}, {
					target: "closed",
					actions: ["clearPointerMoveOpened", "invokeOnClose"]
				}],
				close: [{
					guard: "isOpenControlled",
					actions: ["invokeOnClose", "toggleVisibility"]
				}, {
					target: "closed",
					actions: ["invokeOnClose"]
				}]
			}
		},
		open: {
			effects: [
				"trackEscapeKey",
				"trackScroll",
				"trackPointerlockChange",
				"trackPositioning"
			],
			entry: ["setGlobalId"],
			on: {
				"controlled.close": { target: "closed" },
				close: [{
					guard: "isOpenControlled",
					actions: ["invokeOnClose"]
				}, {
					target: "closed",
					actions: ["invokeOnClose"]
				}],
				"pointer.leave": [
					{
						guard: "isVisible",
						target: "closing",
						actions: ["clearPointerMoveOpened"]
					},
					{
						guard: "isOpenControlled",
						actions: ["clearPointerMoveOpened", "invokeOnClose"]
					},
					{
						target: "closed",
						actions: ["clearPointerMoveOpened", "invokeOnClose"]
					}
				],
				"content.pointer.leave": {
					guard: "isInteractive",
					target: "closing"
				},
				"positioning.set": { actions: ["reposition"] },
				"triggerValue.set": {
					target: "closing",
					actions: ["setTriggerValue", "immediateReopen"]
				}
			}
		},
		closing: {
			effects: ["trackPositioning", "waitForCloseDelay"],
			on: {
				"after.closeDelay": [{
					guard: "isOpenControlled",
					actions: ["invokeOnClose"]
				}, {
					target: "closed",
					actions: ["invokeOnClose"]
				}],
				"controlled.close": { target: "closed" },
				"controlled.open": { target: "open" },
				close: [{
					guard: "isOpenControlled",
					actions: ["invokeOnClose"]
				}, {
					target: "closed",
					actions: ["invokeOnClose"]
				}],
				"pointer.move": [{
					guard: "isOpenControlled",
					actions: [
						"setPointerMoveOpened",
						"setTriggerValue",
						"invokeOnOpen",
						"toggleVisibility"
					]
				}, {
					target: "open",
					actions: [
						"setPointerMoveOpened",
						"setTriggerValue",
						"invokeOnOpen"
					]
				}],
				"triggerValue.set": {
					target: "open",
					actions: ["setTriggerValue", "repositionImmediate"]
				},
				reopen: { target: "open" },
				"content.pointer.move": {
					guard: "isInteractive",
					target: "open"
				},
				"positioning.set": { actions: ["reposition"] }
			}
		}
	},
	implementations: {
		guards: {
			noVisibleTooltip: () => store.get("id") === null,
			isVisible: ({ prop }) => prop("id") === store.get("id"),
			isInteractive: ({ prop }) => !!prop("interactive"),
			hasPointerMoveOpened: ({ context }) => !!context.get("hasPointerMoveOpened"),
			isOpenControlled: ({ prop }) => prop("open") !== void 0
		},
		actions: {
			setGlobalId: ({ prop }) => {
				const prevId = store.get("id");
				const isInstant = prevId !== null && prevId !== prop("id");
				store.update({
					id: prop("id"),
					prevId: isInstant ? prevId : null,
					instant: isInstant
				});
			},
			clearGlobalId: ({ prop }) => {
				if (prop("id") === store.get("id")) store.update({
					id: null,
					prevId: null,
					instant: false
				});
			},
			invokeOnOpen: ({ prop }) => {
				prop("onOpenChange")?.({ open: true });
			},
			invokeOnClose: ({ prop }) => {
				prop("onOpenChange")?.({ open: false });
			},
			closeIfDisabled: ({ prop, send }) => {
				if (!prop("disabled")) return;
				send({
					type: "close",
					src: "disabled.change"
				});
			},
			reposition: ({ context, event, prop, scope }) => {
				if (event.type !== "positioning.set") return;
				const getPositionerEl2 = () => getPositionerEl(scope);
				const getTriggerEl = () => getActiveTriggerEl(scope, context.get("triggerValue"));
				getPlacement(getTriggerEl, getPositionerEl2, {
					...prop("positioning"),
					...event.options,
					listeners: false,
					onComplete(data) {
						context.set("currentPlacement", data.placement);
					}
				});
			},
			repositionImmediate: ({ context, event, prop, scope }) => {
				const triggerValue = event.value ?? context.get("triggerValue");
				const getPositionerEl2 = () => getPositionerEl(scope);
				const getTriggerEl = () => getActiveTriggerEl(scope, triggerValue);
				return getPlacement(getTriggerEl, getPositionerEl2, {
					...prop("positioning"),
					onComplete(data) {
						context.set("currentPlacement", data.placement);
					}
				});
			},
			toggleVisibility: ({ prop, event, send }) => {
				queueMicrotask(() => {
					send({
						type: prop("open") ? "controlled.open" : "controlled.close",
						previousEvent: event
					});
				});
			},
			setPointerMoveOpened: ({ context, event }) => {
				const triggerId = event.triggerId ?? event.previousEvent?.triggerId;
				context.set("hasPointerMoveOpened", triggerId ?? null);
			},
			clearPointerMoveOpened: ({ context }) => {
				context.set("hasPointerMoveOpened", null);
			},
			setTriggerValue: ({ context, event }) => {
				if (event.value === void 0) return;
				context.set("triggerValue", event.value);
			},
			immediateReopen: ({ send }) => {
				queueMicrotask(() => {
					send({ type: "reopen" });
				});
			}
		},
		effects: {
			trackFocusVisible: ({ scope }) => {
				return trackFocusVisible({ root: scope.getRootNode?.() });
			},
			trackPositioning: ({ context, prop, scope }) => {
				if (!context.get("currentPlacement")) context.set("currentPlacement", prop("positioning").placement);
				const getPositionerEl2 = () => getPositionerEl(scope);
				const getTriggerEl = () => getActiveTriggerEl(scope, context.get("triggerValue"));
				return getPlacement(getTriggerEl, getPositionerEl2, {
					...prop("positioning"),
					defer: true,
					onComplete(data) {
						context.set("currentPlacement", data.placement);
					}
				});
			},
			trackPointerlockChange: ({ send, scope }) => {
				const doc = scope.getDoc();
				const onChange = () => send({
					type: "close",
					src: "pointerlock:change"
				});
				return addDomEvent(doc, "pointerlockchange", onChange, false);
			},
			trackScroll: ({ send, prop, scope, context }) => {
				if (!prop("closeOnScroll")) return;
				const triggerEl = getActiveTriggerEl(scope, context.get("triggerValue"));
				if (!triggerEl) return;
				const cleanups = getOverflowAncestors(triggerEl).map((overflowParent) => {
					const onScroll = () => {
						send({
							type: "close",
							src: "scroll"
						});
					};
					return addDomEvent(overflowParent, "scroll", onScroll, {
						passive: true,
						capture: true
					});
				});
				return () => {
					cleanups.forEach((fn) => fn?.());
				};
			},
			trackStore: ({ prop, send }) => {
				let cleanup;
				queueMicrotask(() => {
					cleanup = store.subscribe(() => {
						if (store.get("id") !== prop("id")) send({
							type: "close",
							src: "id.change"
						});
					});
				});
				return () => cleanup?.();
			},
			trackEscapeKey: ({ send, prop }) => {
				if (!prop("closeOnEscape")) return;
				const onKeyDown = (event) => {
					if (isComposingEvent(event)) return;
					if (event.key !== "Escape") return;
					event.stopPropagation();
					send({
						type: "close",
						src: "keydown.escape"
					});
				};
				return addDomEvent(document, "keydown", onKeyDown, true);
			},
			waitForOpenDelay: ({ send, prop, event }) => {
				const id = setTimeout(() => {
					send({
						type: "after.openDelay",
						previousEvent: event
					});
				}, prop("openDelay"));
				return () => clearTimeout(id);
			},
			waitForCloseDelay: ({ send, prop, event }) => {
				const id = setTimeout(() => {
					send({
						type: "after.closeDelay",
						previousEvent: event
					});
				}, prop("closeDelay"));
				return () => clearTimeout(id);
			}
		}
	}
});
// node_modules/.pnpm/@zag-js+tooltip@1.39.1/node_modules/@zag-js/tooltip/dist/tooltip.props.mjs
var props = createProps()([
	"aria-label",
	"closeDelay",
	"closeOnClick",
	"closeOnEscape",
	"closeOnPointerDown",
	"closeOnScroll",
	"defaultOpen",
	"defaultTriggerValue",
	"dir",
	"disabled",
	"getRootNode",
	"id",
	"ids",
	"interactive",
	"onOpenChange",
	"onTriggerValueChange",
	"open",
	"openDelay",
	"positioning",
	"triggerValue"
]);
var splitProps = createSplitProps(props);
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/tooltip/modules/provider.svelte.js
function useTooltip(props) {
	const service = useMachine(machine, props);
	const tooltip = derived(() => connect(service, normalizeProps));
	return () => tooltip();
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/tooltip/anatomy/root-provider.svelte
function Root_provider($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const children = derived(() => props.children), tooltip = derived(() => props.value);
		RootContext.provide(() => tooltip()());
		children()?.($$renderer);
		$$renderer.push(`<!---->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/tooltip/anatomy/root.svelte
function Root($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const id = props_id($$renderer);
		const { $$slots, $$events, ...props } = $$props;
		const $$d = derived(() => splitProps(props)), $$derived_array = derived(() => to_array($$d(), 2)), tooltipProps = derived(() => $$derived_array()[0]), componentProps = derived(() => $$derived_array()[1]);
		const children = derived(() => componentProps().children);
		const tooltip = useTooltip(() => ({
			...tooltipProps(),
			id
		}));
		RootContext.provide(() => tooltip());
		children()?.($$renderer);
		$$renderer.push(`<!---->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/tooltip/anatomy/trigger.svelte
function Trigger($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const tooltip = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$1 = derived(() => mergeProps(tooltip().getTriggerProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$1());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><button${attributes({ ...attributes$1() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></button>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/tooltip/modules/anatomy.js
var Tooltip = Object.assign(Root, {
	Provider: Root_provider,
	Context: Root_context,
	Trigger,
	Positioner,
	Content,
	Arrow,
	ArrowTip: Arrow_tip
});
// src/lib/components/TokenCopy.svelte
function TokenCopy($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { url, btnStyle = "btn-icon", children, onCopied } = $$props;
		const t = getFormatter();
		let copiedVisible = false;
		$$renderer.push(`<div class="flex flex-row items-center"><span class="text-ellipsis"><a class="anchor"${attr("href", url)}>`);
		children?.($$renderer);
		$$renderer.push(`<!----></a> <span id="tokenUrl" hidden="">${escape_html(url)}</span></span> <div class="flex flex-row items-center">`);
		Tooltip($$renderer, {
			children: ($$renderer) => {
				if (Tooltip.Trigger) {
					$$renderer.push("<!--[-->");
					Tooltip.Trigger($$renderer, {
						class: `btn ${stringify(btnStyle)}`,
						"aria-label": store_get($$store_subs ??= {}, "$t", t)("general.copy-to-clipboard"),
						onclick: () => {
							onCopied?.();
							copiedVisible = true;
							setTimeout(() => copiedVisible = false, 1e3);
						},
						type: "button",
						children: ($$renderer) => {
							$$renderer.push(`<iconify-icon icon="ion:copy"></iconify-icon>`);
						},
						$$slots: { default: true }
					});
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
				$$renderer.push(` `);
				Portal($$renderer, {
					children: ($$renderer) => {
						if (Tooltip.Positioner) {
							$$renderer.push("<!--[-->");
							Tooltip.Positioner($$renderer, {
								children: ($$renderer) => {
									if (Tooltip.Content) {
										$$renderer.push("<!--[-->");
										Tooltip.Content($$renderer, {
											class: "card preset-filled-secondary-500 p-2",
											children: ($$renderer) => {
												$$renderer.push(`<span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.copy-to-clipboard"))}</span> `);
												if (Tooltip.Arrow) {
													$$renderer.push("<!--[-->");
													Tooltip.Arrow($$renderer, {
														class: "[--arrow-background:var(--color-secondary-500)] [--arrow-size:--spacing(2)]",
														children: ($$renderer) => {
															if (Tooltip.ArrowTip) {
																$$renderer.push("<!--[-->");
																Tooltip.ArrowTip($$renderer, {});
																$$renderer.push("<!--]-->");
															} else {
																$$renderer.push("<!--[!-->");
																$$renderer.push("<!--]-->");
															}
														},
														$$slots: { default: true }
													});
													$$renderer.push("<!--]-->");
												} else {
													$$renderer.push("<!--[!-->");
													$$renderer.push("<!--]-->");
												}
											},
											$$slots: { default: true }
										});
										$$renderer.push("<!--]-->");
									} else {
										$$renderer.push("<!--[!-->");
										$$renderer.push("<!--]-->");
									}
								},
								$$slots: { default: true }
							});
							$$renderer.push("<!--]-->");
						} else {
							$$renderer.push("<!--[!-->");
							$$renderer.push("<!--]-->");
						}
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!---->`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----> `);
		if (copiedVisible) $$renderer.push(`<!--[0--><span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.copied"))}</span>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { TokenCopy as T };
//# sourceMappingURL=TokenCopy.js-CY3taoB-.js.map
