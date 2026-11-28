import { aj as props_id, ak as attributes, V as derived, al as exclude_from_object, an as to_array } from './index-server.js-CIVHNbBm.js';
import { x as useMachine, y as createContext, z as mergeProps, A as createMachine, r as raf, F as queryAll, B as dataAttr, O as ariaAttr, U as isLeftClick, V as isSafari, a as addDomEvent, C as createAnatomy, W as getTabbableEdges, X as getNextTabbable, Y as isActiveElement, D as createProps, E as normalizeProps } from './create-anatomy.js-CLhpGM8y.js';
import { g as getPlacement, a as getPlacementStyles } from './get-styles.js-Boa-8w4M.js';
import { a as isFunction, g as createSplitProps } from './warning.js-12YgogjO.js';
import { t as trapFocus, p as preventBodyScroll, a as ariaHidden, g as getInitialFocus } from './dist.js-BvNxsp9_.js';
import { t as trackDismissableElement } from './anatomy2.js-Deb7OEEc.js';

// node_modules/.pnpm/@zag-js+dom-query@1.39.1/node_modules/@zag-js/dom-query/dist/proxy-tab-focus.mjs
function proxyTabFocusImpl(container, options = {}) {
	const { triggerElement, onFocus, onFocusEnter, getShadowRoot } = options;
	const doc = container?.ownerDocument || document;
	const body = doc.body;
	function onKeyDown(event) {
		if (event.key !== "Tab") return;
		let elementToFocus = null;
		const [firstTabbable, lastTabbable] = getTabbableEdges(container, {
			includeContainer: true,
			getShadowRoot
		});
		const nextTabbableAfterTrigger = getNextTabbable(body, {
			current: triggerElement,
			getShadowRoot
		});
		const noTabbableElements = !firstTabbable && !lastTabbable;
		if (event.shiftKey && isActiveElement(nextTabbableAfterTrigger)) {
			onFocusEnter?.();
			elementToFocus = lastTabbable;
		} else if (event.shiftKey && (isActiveElement(firstTabbable) || noTabbableElements)) elementToFocus = triggerElement;
		else if (!event.shiftKey && isActiveElement(triggerElement)) {
			onFocusEnter?.();
			elementToFocus = firstTabbable;
		} else if (!event.shiftKey && (isActiveElement(lastTabbable) || noTabbableElements)) elementToFocus = nextTabbableAfterTrigger;
		if (!elementToFocus) return;
		event.preventDefault();
		if (typeof onFocus === "function") onFocus(elementToFocus);
		else elementToFocus.focus();
	}
	return addDomEvent(doc, "keydown", onKeyDown, true);
}
function proxyTabFocus(container, options) {
	const { defer, triggerElement, ...restOptions } = options;
	const func = defer ? raf : (v) => v();
	const cleanups = [];
	cleanups.push(func(() => {
		const node = typeof container === "function" ? container() : container;
		const trigger = typeof triggerElement === "function" ? triggerElement() : triggerElement;
		cleanups.push(proxyTabFocusImpl(node, {
			triggerElement: trigger,
			...restOptions
		}));
	}));
	return () => {
		cleanups.forEach((fn) => fn?.());
	};
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/popover/modules/root-context.js
var RootContext = createContext();
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/popover/anatomy/anchor.svelte
function Anchor($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const popover = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$9 = derived(() => mergeProps(popover().getAnchorProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$9());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><div${attributes({ ...attributes$9() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/popover/anatomy/arrow-tip.svelte
function Arrow_tip($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const popover = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$8 = derived(() => mergeProps(popover().getArrowTipProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$8());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><div${attributes({ ...attributes$8() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/popover/anatomy/arrow.svelte
function Arrow($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const popover = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$7 = derived(() => mergeProps(popover().getArrowProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$7());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><div${attributes({ ...attributes$7() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/popover/anatomy/close-trigger.svelte
function Close_trigger($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const popover = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$6 = derived(() => mergeProps(popover().getCloseTriggerProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$6());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><button${attributes({ ...attributes$6() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></button>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/popover/anatomy/content.svelte
function Content($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const popover = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$5 = derived(() => mergeProps(popover().getContentProps(), rest()));
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
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/popover/anatomy/description.svelte
function Description($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const popover = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$4 = derived(() => mergeProps(popover().getDescriptionProps(), rest()));
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
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/popover/anatomy/positioner.svelte
function Positioner($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const popover = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$3 = derived(() => mergeProps(popover().getPositionerProps(), rest()));
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
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/popover/anatomy/root-context.svelte
function Root_context($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const popover = RootContext.consume();
		derived(() => props.children)()($$renderer, popover);
		$$renderer.push(`<!---->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/popover/anatomy/root-provider.svelte
function Root_provider($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const children = derived(() => props.children), popover = derived(() => props.value);
		RootContext.provide(() => popover()());
		children()?.($$renderer);
		$$renderer.push(`<!---->`);
	});
}
var parts = createAnatomy("popover").parts("arrow", "arrowTip", "anchor", "trigger", "indicator", "positioner", "content", "title", "description", "closeTrigger").build();
// node_modules/.pnpm/@zag-js+popover@1.39.1/node_modules/@zag-js/popover/dist/popover.dom.mjs
var getAnchorId = (scope) => scope.ids?.anchor ?? `popover:${scope.id}:anchor`;
var getTriggerId = (scope, value) => {
	const customId = scope.ids?.trigger;
	if (customId != null) return isFunction(customId) ? customId(value) : customId;
	return value ? `popover:${scope.id}:trigger:${value}` : `popover:${scope.id}:trigger`;
};
var getContentId = (scope) => scope.ids?.content ?? `popover:${scope.id}:content`;
var getPositionerId = (scope) => scope.ids?.positioner ?? `popover:${scope.id}:popper`;
var getArrowId = (scope) => scope.ids?.arrow ?? `popover:${scope.id}:arrow`;
var getTitleId = (scope) => scope.ids?.title ?? `popover:${scope.id}:title`;
var getDescriptionId = (scope) => scope.ids?.description ?? `popover:${scope.id}:desc`;
var getCloseTriggerId = (scope) => scope.ids?.closeTrigger ?? `popover:${scope.id}:close`;
var getAnchorEl = (scope) => scope.getById(getAnchorId(scope));
var getTriggerEls = (scope) => queryAll(scope.getDoc(), `[data-scope="popover"][data-part="trigger"][data-ownedby="${scope.id}"]`);
var getActiveTriggerEl = (scope, value) => {
	return value == null ? getTriggerEls(scope)[0] : scope.getById(getTriggerId(scope, value));
};
var getContentEl = (scope) => scope.getById(getContentId(scope));
var getPositionerEl = (scope) => scope.getById(getPositionerId(scope));
var getTitleEl = (scope) => scope.getById(getTitleId(scope));
var getDescriptionEl = (scope) => scope.getById(getDescriptionId(scope));
// node_modules/.pnpm/@zag-js+popover@1.39.1/node_modules/@zag-js/popover/dist/popover.connect.mjs
function connect(service, normalize) {
	const { state, context, send, computed, prop, scope } = service;
	const translations = prop("translations");
	const open = state.matches("open");
	const currentPlacement = context.get("currentPlacement");
	const portalled = computed("currentPortalled");
	const rendered = context.get("renderedElements");
	const triggerValue = context.get("triggerValue");
	const popperStyles = getPlacementStyles({
		...prop("positioning"),
		placement: currentPlacement
	});
	return {
		portalled,
		open,
		setOpen(nextOpen) {
			if (state.matches("open") === nextOpen) return;
			send({ type: nextOpen ? "OPEN" : "CLOSE" });
		},
		triggerValue,
		setTriggerValue(value) {
			send({
				type: "TRIGGER_VALUE.SET",
				value
			});
		},
		reposition(options = {}) {
			send({
				type: "POSITIONING.SET",
				options
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
		getAnchorProps() {
			return normalize.element({
				...parts.anchor.attrs,
				dir: prop("dir"),
				id: getAnchorId(scope)
			});
		},
		getTriggerProps(props = {}) {
			const { value } = props;
			const current = value == null ? false : triggerValue === value;
			return normalize.button({
				...parts.trigger.attrs,
				dir: prop("dir"),
				type: "button",
				"data-placement": currentPlacement,
				id: getTriggerId(scope, value),
				"data-ownedby": scope.id,
				"data-value": value,
				"data-current": dataAttr(current),
				"aria-haspopup": "dialog",
				"aria-expanded": value == null ? open : open && current,
				"data-state": open ? "open" : "closed",
				"aria-controls": getContentId(scope),
				onPointerDown(event) {
					if (!isLeftClick(event)) return;
					if (isSafari()) event.currentTarget.focus();
				},
				onClick(event) {
					if (event.defaultPrevented) return;
					send({
						type: open && value != null && !current ? "TRIGGER_VALUE.SET" : "TOGGLE",
						value
					});
				},
				onBlur(event) {
					send({
						type: "TRIGGER_BLUR",
						target: event.relatedTarget
					});
				}
			});
		},
		getIndicatorProps() {
			return normalize.element({
				...parts.indicator.attrs,
				dir: prop("dir"),
				"data-state": open ? "open" : "closed"
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
			return normalize.element({
				...parts.content.attrs,
				dir: prop("dir"),
				id: getContentId(scope),
				tabIndex: -1,
				role: "dialog",
				"aria-modal": ariaAttr(prop("modal")),
				hidden: !open,
				"data-state": open ? "open" : "closed",
				"data-expanded": dataAttr(open),
				"aria-labelledby": rendered.title ? getTitleId(scope) : void 0,
				"aria-describedby": rendered.description ? getDescriptionId(scope) : void 0,
				"data-placement": currentPlacement
			});
		},
		getTitleProps() {
			return normalize.element({
				...parts.title.attrs,
				id: getTitleId(scope),
				dir: prop("dir")
			});
		},
		getDescriptionProps() {
			return normalize.element({
				...parts.description.attrs,
				id: getDescriptionId(scope),
				dir: prop("dir")
			});
		},
		getCloseTriggerProps() {
			return normalize.button({
				...parts.closeTrigger.attrs,
				dir: prop("dir"),
				id: getCloseTriggerId(scope),
				type: "button",
				"aria-label": translations.closeTriggerLabel,
				onClick(event) {
					if (event.defaultPrevented) return;
					event.stopPropagation();
					send({ type: "CLOSE" });
				}
			});
		}
	};
}
// node_modules/.pnpm/@zag-js+popover@1.39.1/node_modules/@zag-js/popover/dist/popover.machine.mjs
var machine = createMachine({
	props({ props }) {
		return {
			closeOnInteractOutside: true,
			closeOnEscape: true,
			autoFocus: true,
			modal: false,
			portalled: true,
			...props,
			translations: {
				closeTriggerLabel: "close",
				...props.translations
			},
			positioning: {
				placement: "bottom",
				...props.positioning
			}
		};
	},
	initialState({ prop }) {
		return prop("open") || prop("defaultOpen") ? "open" : "closed";
	},
	context({ bindable, prop, scope }) {
		return {
			currentPlacement: bindable(() => ({ defaultValue: void 0 })),
			renderedElements: bindable(() => ({ defaultValue: {
				title: true,
				description: true
			} })),
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
		};
	},
	computed: { currentPortalled: ({ prop }) => !!prop("modal") || !!prop("portalled") },
	watch({ track, prop, action }) {
		track([() => prop("open")], () => {
			action(["toggleVisibility"]);
		});
	},
	entry: ["checkRenderedElements"],
	on: { "TRIGGER_VALUE.SET": { actions: ["setTriggerValue", "reposition"] } },
	states: {
		closed: { on: {
			"CONTROLLED.OPEN": {
				target: "open",
				actions: ["setInitialFocus"]
			},
			TOGGLE: [{
				guard: "isOpenControlled",
				actions: ["invokeOnOpen", "setTriggerValue"]
			}, {
				target: "open",
				actions: [
					"invokeOnOpen",
					"setTriggerValue",
					"setInitialFocus"
				]
			}],
			OPEN: [{
				guard: "isOpenControlled",
				actions: ["invokeOnOpen", "setTriggerValue"]
			}, {
				target: "open",
				actions: [
					"invokeOnOpen",
					"setTriggerValue",
					"setInitialFocus"
				]
			}]
		} },
		open: {
			effects: [
				"trapFocus",
				"preventScroll",
				"hideContentBelow",
				"trackDismissableElement",
				"trackPositioning",
				"proxyTabFocus"
			],
			on: {
				"CONTROLLED.CLOSE": {
					target: "closed",
					actions: ["setFinalFocus"]
				},
				CLOSE: [{
					guard: "isOpenControlled",
					actions: ["invokeOnClose"]
				}, {
					target: "closed",
					actions: ["invokeOnClose", "setFinalFocus"]
				}],
				TOGGLE: [{
					guard: "isOpenControlled",
					actions: ["invokeOnClose"]
				}, {
					target: "closed",
					actions: ["invokeOnClose"]
				}],
				"POSITIONING.SET": { actions: ["reposition"] }
			}
		}
	},
	implementations: {
		guards: { isOpenControlled: ({ prop }) => prop("open") != void 0 },
		effects: {
			trackPositioning({ context, prop, scope }) {
				context.set("currentPlacement", prop("positioning").placement);
				const anchorEl = getAnchorEl(scope);
				const getPositionerEl2 = () => getPositionerEl(scope);
				const getTriggerEl = () => anchorEl ?? getActiveTriggerEl(scope, context.get("triggerValue"));
				return getPlacement(getTriggerEl, getPositionerEl2, {
					...prop("positioning"),
					defer: true,
					onComplete(data) {
						context.set("currentPlacement", data.placement);
					}
				});
			},
			trackDismissableElement({ send, prop, scope }) {
				const getContentEl2 = () => getContentEl(scope);
				let restoreFocus = true;
				return trackDismissableElement(getContentEl2, {
					type: "popover",
					pointerBlocking: prop("modal"),
					exclude: getTriggerEls(scope),
					defer: true,
					onEscapeKeyDown(event) {
						prop("onEscapeKeyDown")?.(event);
						if (prop("closeOnEscape")) return;
						event.preventDefault();
					},
					onInteractOutside(event) {
						prop("onInteractOutside")?.(event);
						if (event.defaultPrevented) return;
						restoreFocus = !(event.detail.focusable || event.detail.contextmenu);
						if (!prop("closeOnInteractOutside")) event.preventDefault();
					},
					onPointerDownOutside: prop("onPointerDownOutside"),
					onFocusOutside: prop("onFocusOutside"),
					persistentElements: prop("persistentElements"),
					onRequestDismiss: prop("onRequestDismiss"),
					onDismiss() {
						send({
							type: "CLOSE",
							src: "interact-outside",
							restoreFocus
						});
					}
				});
			},
			proxyTabFocus({ prop, scope, context }) {
				if (prop("modal") || !prop("portalled")) return;
				const getContentEl2 = () => getContentEl(scope);
				return proxyTabFocus(getContentEl2, {
					triggerElement: getActiveTriggerEl(scope, context.get("triggerValue")),
					defer: true,
					getShadowRoot: true,
					onFocus(el) {
						el.focus({ preventScroll: true });
					}
				});
			},
			hideContentBelow({ prop, scope, context }) {
				if (!prop("modal")) return;
				const getElements = () => [getContentEl(scope), getActiveTriggerEl(scope, context.get("triggerValue"))];
				return ariaHidden(getElements, { defer: true });
			},
			preventScroll({ prop, scope }) {
				if (!prop("modal")) return;
				return preventBodyScroll(scope.getDoc());
			},
			trapFocus({ prop, scope }) {
				if (!prop("modal")) return;
				const contentEl = () => getContentEl(scope);
				return trapFocus(contentEl, {
					initialFocus: () => getInitialFocus({
						root: getContentEl(scope),
						getInitialEl: prop("initialFocusEl"),
						enabled: prop("autoFocus")
					}),
					getShadowRoot: true
				});
			}
		},
		actions: {
			reposition({ event, prop, scope, context }) {
				const anchorEl = getAnchorEl(scope);
				const getPositionerEl2 = () => getPositionerEl(scope);
				const getTriggerEl = () => anchorEl ?? getActiveTriggerEl(scope, context.get("triggerValue"));
				getPlacement(getTriggerEl, getPositionerEl2, {
					...prop("positioning"),
					...event.options,
					defer: true,
					listeners: false,
					onComplete(data) {
						context.set("currentPlacement", data.placement);
					}
				});
			},
			setTriggerValue({ context, event }) {
				if (event.value === void 0) return;
				context.set("triggerValue", event.value);
			},
			checkRenderedElements({ context, scope }) {
				raf(() => {
					Object.assign(context.get("renderedElements"), {
						title: !!getTitleEl(scope),
						description: !!getDescriptionEl(scope)
					});
				});
			},
			setInitialFocus({ prop, scope }) {
				if (prop("modal")) return;
				raf(() => {
					getInitialFocus({
						root: getContentEl(scope),
						getInitialEl: prop("initialFocusEl"),
						enabled: prop("autoFocus")
					})?.focus({ preventScroll: true });
				});
			},
			setFinalFocus({ event, scope, context }) {
				const restoreFocus = event.restoreFocus ?? event.previousEvent?.restoreFocus;
				if (restoreFocus != null && !restoreFocus) return;
				raf(() => {
					getActiveTriggerEl(scope, context.get("triggerValue"))?.focus({ preventScroll: true });
				});
			},
			invokeOnOpen({ prop, flush }) {
				flush(() => {
					prop("onOpenChange")?.({ open: true });
				});
			},
			invokeOnClose({ prop, flush }) {
				flush(() => {
					prop("onOpenChange")?.({ open: false });
				});
			},
			toggleVisibility({ event, send, prop }) {
				send({
					type: prop("open") ? "CONTROLLED.OPEN" : "CONTROLLED.CLOSE",
					previousEvent: event
				});
			}
		}
	}
});
// node_modules/.pnpm/@zag-js+popover@1.39.1/node_modules/@zag-js/popover/dist/popover.props.mjs
var props = createProps()([
	"autoFocus",
	"closeOnEscape",
	"closeOnInteractOutside",
	"defaultOpen",
	"defaultTriggerValue",
	"dir",
	"getRootNode",
	"id",
	"ids",
	"initialFocusEl",
	"modal",
	"onEscapeKeyDown",
	"onFocusOutside",
	"onInteractOutside",
	"onOpenChange",
	"onPointerDownOutside",
	"onTriggerValueChange",
	"onRequestDismiss",
	"open",
	"persistentElements",
	"portalled",
	"positioning",
	"translations",
	"triggerValue"
]);
var splitProps = createSplitProps(props);
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/popover/modules/provider.svelte.js
function usePopover(props) {
	const service = useMachine(machine, props);
	const popover = derived(() => connect(service, normalizeProps));
	return () => popover();
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/popover/anatomy/root.svelte
function Root($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const id = props_id($$renderer);
		const { $$slots, $$events, ...props } = $$props;
		const $$d = derived(() => splitProps(props)), $$derived_array = derived(() => to_array($$d(), 2)), popoverProps = derived(() => $$derived_array()[0]), componentProps = derived(() => $$derived_array()[1]);
		const children = derived(() => componentProps().children);
		const popover = usePopover(() => ({
			...popoverProps(),
			id
		}));
		RootContext.provide(() => popover());
		children()?.($$renderer);
		$$renderer.push(`<!---->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/popover/anatomy/title.svelte
function Title($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const popover = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$2 = derived(() => mergeProps(popover().getTitleProps(), rest()));
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
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/popover/anatomy/trigger.svelte
function Trigger($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const popover = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$1 = derived(() => mergeProps(popover().getTriggerProps(), rest()));
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
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/popover/modules/anatomy.js
var Popover = Object.assign(Root, {
	Provider: Root_provider,
	Context: Root_context,
	Anchor,
	Trigger,
	Positioner,
	Content,
	Arrow,
	ArrowTip: Arrow_tip,
	Title,
	Description,
	CloseTrigger: Close_trigger
});

export { Popover as P };
//# sourceMappingURL=anatomy3.js-HwVFkfZZ.js.map
