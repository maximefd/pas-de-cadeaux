import { ai as spread_props, aj as props_id, ak as attributes, V as derived, al as exclude_from_object, am as clsx, an as to_array, ao as escape_html, ap as html } from './index-server.js-CIVHNbBm.js';
import { x as useMachine, y as createContext, z as mergeProps, A as createMachine, B as dataAttr, C as createAnatomy, D as createProps, r as raf, E as normalizeProps, F as queryAll } from './create-anatomy.js-CLhpGM8y.js';
import { f as compact, a as isFunction, g as createSplitProps } from './warning.js-12YgogjO.js';
import { g as getInitialFocus, a as ariaHidden, t as trapFocus, p as preventBodyScroll } from './dist.js-BvNxsp9_.js';
import { P as Portal, a as getComputedStyle, t as trackDismissableElement } from './anatomy2.js-Deb7OEEc.js';

// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/dialog/modules/root-context.js
var RootContext = createContext();
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/dialog/anatomy/backdrop.svelte
function Backdrop($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const dialog = RootContext.consume();
		const element = derived(() => props.element), rest = derived(() => exclude_from_object(props, ["element"]));
		const attributes$7 = derived(() => mergeProps(dialog().getBackdropProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$7());
			$$renderer.push(`<!---->`);
		} else $$renderer.push(`<!--[-1--><div${attributes({ ...attributes$7() })}></div>`);
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/dialog/anatomy/close-trigger.svelte
function Close_trigger($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const dialog = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$6 = derived(() => mergeProps(dialog().getCloseTriggerProps(), rest()));
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
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/dialog/anatomy/content.svelte
function Content($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const dialog = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$5 = derived(() => mergeProps(dialog().getContentProps(), rest()));
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
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/dialog/anatomy/description.svelte
function Description($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const dialog = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$4 = derived(() => mergeProps(dialog().getDescriptionProps(), rest()));
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
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/dialog/anatomy/positioner.svelte
function Positioner($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const dialog = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$3 = derived(() => mergeProps(dialog().getPositionerProps(), rest()));
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
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/dialog/anatomy/root-context.svelte
function Root_context($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const dialog = RootContext.consume();
		derived(() => props.children)()($$renderer, dialog);
		$$renderer.push(`<!---->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/dialog/anatomy/root-provider.svelte
function Root_provider($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const children = derived(() => props.children), dialog = derived(() => props.value);
		RootContext.provide(() => dialog()());
		children()?.($$renderer);
		$$renderer.push(`<!---->`);
	});
}
var parts = createAnatomy("dialog").parts("trigger", "backdrop", "positioner", "content", "title", "description", "closeTrigger").build();
// node_modules/.pnpm/@zag-js+dialog@1.39.1/node_modules/@zag-js/dialog/dist/dialog.dom.mjs
var getPositionerId = (ctx) => ctx.ids?.positioner ?? `dialog:${ctx.id}:positioner`;
var getBackdropId = (ctx) => ctx.ids?.backdrop ?? `dialog:${ctx.id}:backdrop`;
var getContentId = (ctx) => ctx.ids?.content ?? `dialog:${ctx.id}:content`;
var getTriggerId = (ctx, value) => {
	const customId = ctx.ids?.trigger;
	if (customId != null) return isFunction(customId) ? customId(value) : customId;
	return value ? `dialog:${ctx.id}:trigger:${value}` : `dialog:${ctx.id}:trigger`;
};
var getTitleId = (ctx) => ctx.ids?.title ?? `dialog:${ctx.id}:title`;
var getDescriptionId = (ctx) => ctx.ids?.description ?? `dialog:${ctx.id}:description`;
var getCloseTriggerId = (ctx) => ctx.ids?.closeTrigger ?? `dialog:${ctx.id}:close`;
var getContentEl = (ctx) => ctx.getById(getContentId(ctx));
var getPositionerEl = (ctx) => ctx.getById(getPositionerId(ctx));
var getBackdropEl = (ctx) => ctx.getById(getBackdropId(ctx));
var getTitleEl = (ctx) => ctx.getById(getTitleId(ctx));
var getDescriptionEl = (ctx) => ctx.getById(getDescriptionId(ctx));
var getCloseTriggerEl = (ctx) => ctx.getById(getCloseTriggerId(ctx));
var getTriggerEls = (ctx) => queryAll(ctx.getDoc(), `[data-scope="dialog"][data-part="trigger"][data-ownedby="${ctx.id}"]`);
var getActiveTriggerEl = (ctx, value) => {
	return value == null ? getTriggerEls(ctx)[0] : ctx.getById(getTriggerId(ctx, value));
};
// node_modules/.pnpm/@zag-js+dialog@1.39.1/node_modules/@zag-js/dialog/dist/dialog.connect.mjs
function connect(service, normalize) {
	const { state, send, context, prop, scope } = service;
	const ariaLabel = prop("aria-label");
	const open = state.matches("open");
	const triggerValue = context.get("triggerValue");
	return {
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
		getTriggerProps(props = {}) {
			const { value } = props;
			const current = value == null ? false : triggerValue === value;
			return normalize.button({
				...parts.trigger.attrs,
				dir: prop("dir"),
				id: getTriggerId(scope, value),
				"data-ownedby": scope.id,
				"data-value": value,
				"aria-haspopup": "dialog",
				type: "button",
				"aria-expanded": value == null ? open : open && current,
				"data-state": open ? "open" : "closed",
				"aria-controls": getContentId(scope),
				"data-current": dataAttr(current),
				onClick(event) {
					if (event.defaultPrevented) return;
					send({
						type: open && value != null && !current ? "TRIGGER_VALUE.SET" : "TOGGLE",
						value
					});
				}
			});
		},
		getBackdropProps() {
			return normalize.element({
				...parts.backdrop.attrs,
				dir: prop("dir"),
				hidden: !open,
				id: getBackdropId(scope),
				"data-state": open ? "open" : "closed"
			});
		},
		getPositionerProps() {
			return normalize.element({
				...parts.positioner.attrs,
				dir: prop("dir"),
				id: getPositionerId(scope),
				style: compact({ pointerEvents: !open || !prop("modal") ? "none" : void 0 })
			});
		},
		getContentProps() {
			const rendered = context.get("rendered");
			return normalize.element({
				...parts.content.attrs,
				dir: prop("dir"),
				role: prop("role"),
				hidden: !open,
				id: getContentId(scope),
				tabIndex: -1,
				"data-state": open ? "open" : "closed",
				"aria-modal": prop("modal"),
				"aria-label": ariaLabel || void 0,
				"aria-labelledby": ariaLabel || !rendered.title ? void 0 : getTitleId(scope),
				"aria-describedby": rendered.description ? getDescriptionId(scope) : void 0,
				style: compact({ pointerEvents: prop("modal") ? void 0 : "auto" })
			});
		},
		getTitleProps() {
			return normalize.element({
				...parts.title.attrs,
				dir: prop("dir"),
				id: getTitleId(scope)
			});
		},
		getDescriptionProps() {
			return normalize.element({
				...parts.description.attrs,
				dir: prop("dir"),
				id: getDescriptionId(scope)
			});
		},
		getCloseTriggerProps() {
			return normalize.button({
				...parts.closeTrigger.attrs,
				dir: prop("dir"),
				id: getCloseTriggerId(scope),
				type: "button",
				onClick(event) {
					if (event.defaultPrevented) return;
					event.stopPropagation();
					send({ type: "CLOSE" });
				}
			});
		}
	};
}
// node_modules/.pnpm/@zag-js+dialog@1.39.1/node_modules/@zag-js/dialog/dist/dialog.machine.mjs
var machine = createMachine({
	props({ props, scope }) {
		const alertDialog = props.role === "alertdialog";
		const initialFocusEl = alertDialog ? () => getCloseTriggerEl(scope) : void 0;
		const modal = typeof props.modal === "boolean" ? props.modal : true;
		return {
			role: "dialog",
			modal,
			trapFocus: modal,
			preventScroll: modal,
			closeOnInteractOutside: modal && !alertDialog,
			closeOnEscape: true,
			restoreFocus: true,
			initialFocusEl,
			...props
		};
	},
	initialState({ prop }) {
		return prop("open") || prop("defaultOpen") ? "open" : "closed";
	},
	context({ bindable, prop, scope }) {
		return {
			rendered: bindable(() => ({ defaultValue: {
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
	watch({ track, action, prop }) {
		track([() => prop("open")], () => {
			action(["toggleVisibility"]);
		});
	},
	states: {
		open: {
			entry: [
				"checkRenderedElements",
				"syncZIndex",
				"setInitialFocus"
			],
			effects: [
				"trackDismissableElement",
				"trapFocus",
				"preventScroll",
				"hideContentBelow"
			],
			on: {
				"CONTROLLED.CLOSE": { target: "closed" },
				CLOSE: [{
					guard: "isOpenControlled",
					actions: ["invokeOnClose"]
				}, {
					target: "closed",
					actions: ["invokeOnClose"]
				}],
				TOGGLE: [{
					guard: "isOpenControlled",
					actions: ["invokeOnClose"]
				}, {
					target: "closed",
					actions: ["invokeOnClose"]
				}],
				"TRIGGER_VALUE.SET": { actions: ["setTriggerValue"] }
			}
		},
		closed: { on: {
			"CONTROLLED.OPEN": { target: "open" },
			OPEN: [{
				guard: "isOpenControlled",
				actions: ["invokeOnOpen", "setTriggerValue"]
			}, {
				target: "open",
				actions: ["invokeOnOpen", "setTriggerValue"]
			}],
			TOGGLE: [{
				guard: "isOpenControlled",
				actions: ["invokeOnOpen", "setTriggerValue"]
			}, {
				target: "open",
				actions: ["invokeOnOpen", "setTriggerValue"]
			}],
			"TRIGGER_VALUE.SET": { actions: ["setTriggerValue"] }
		} }
	},
	implementations: {
		guards: { isOpenControlled: ({ prop }) => prop("open") != void 0 },
		effects: {
			trackDismissableElement({ scope, send, prop }) {
				const getContentEl2 = () => getContentEl(scope);
				return trackDismissableElement(getContentEl2, {
					type: "dialog",
					defer: true,
					pointerBlocking: prop("modal"),
					exclude: getTriggerEls(scope),
					onInteractOutside(event) {
						prop("onInteractOutside")?.(event);
						if (!prop("closeOnInteractOutside")) event.preventDefault();
					},
					persistentElements: prop("persistentElements"),
					onFocusOutside: prop("onFocusOutside"),
					onPointerDownOutside: prop("onPointerDownOutside"),
					onRequestDismiss: prop("onRequestDismiss"),
					onEscapeKeyDown(event) {
						prop("onEscapeKeyDown")?.(event);
						if (!prop("closeOnEscape")) event.preventDefault();
					},
					onDismiss() {
						send({
							type: "CLOSE",
							src: "interact-outside"
						});
					}
				});
			},
			preventScroll({ scope, prop }) {
				if (!prop("preventScroll")) return;
				return preventBodyScroll(scope.getDoc());
			},
			trapFocus({ scope, prop, context }) {
				if (!prop("trapFocus")) return;
				const contentEl = () => getContentEl(scope);
				return trapFocus(contentEl, {
					preventScroll: true,
					returnFocusOnDeactivate: !!prop("restoreFocus"),
					initialFocus: prop("initialFocusEl"),
					setReturnFocus: (el) => {
						const finalFocusEl = prop("finalFocusEl")?.();
						if (finalFocusEl) return finalFocusEl;
						const triggerValue = context.get("triggerValue");
						if (triggerValue) {
							const activeTriggerEl = getActiveTriggerEl(scope, triggerValue);
							if (activeTriggerEl) return activeTriggerEl;
						}
						const fallbackTrigger = getTriggerEls(scope)[0];
						if (fallbackTrigger) return fallbackTrigger;
						return el;
					},
					getShadowRoot: true
				});
			},
			hideContentBelow({ scope, prop }) {
				if (!prop("modal")) return;
				const getElements = () => [getContentEl(scope)];
				return ariaHidden(getElements, { defer: true });
			}
		},
		actions: {
			setInitialFocus({ prop, scope }) {
				if (prop("trapFocus")) return;
				raf(() => {
					getInitialFocus({
						root: getContentEl(scope),
						getInitialEl: prop("initialFocusEl")
					})?.focus({ preventScroll: true });
				});
			},
			checkRenderedElements({ context, scope }) {
				raf(() => {
					context.set("rendered", {
						title: !!getTitleEl(scope),
						description: !!getDescriptionEl(scope)
					});
				});
			},
			syncZIndex({ scope }) {
				raf(() => {
					const contentEl = getContentEl(scope);
					if (!contentEl) return;
					const styles = getComputedStyle(contentEl);
					[getPositionerEl(scope), getBackdropEl(scope)].forEach((node) => {
						node?.style.setProperty("--z-index", styles.zIndex);
						node?.style.setProperty("--layer-index", styles.getPropertyValue("--layer-index"));
					});
				});
			},
			invokeOnClose({ prop }) {
				prop("onOpenChange")?.({ open: false });
			},
			invokeOnOpen({ prop }) {
				prop("onOpenChange")?.({ open: true });
			},
			setTriggerValue({ context, event }) {
				if (event.value === void 0) return;
				context.set("triggerValue", event.value);
			},
			toggleVisibility({ prop, send, event }) {
				send({
					type: prop("open") ? "CONTROLLED.OPEN" : "CONTROLLED.CLOSE",
					previousEvent: event
				});
			}
		}
	}
});
// node_modules/.pnpm/@zag-js+dialog@1.39.1/node_modules/@zag-js/dialog/dist/dialog.props.mjs
var props = createProps()([
	"triggerValue",
	"aria-label",
	"closeOnEscape",
	"closeOnInteractOutside",
	"defaultTriggerValue",
	"defaultOpen",
	"dir",
	"finalFocusEl",
	"getRootNode",
	"id",
	"ids",
	"initialFocusEl",
	"modal",
	"onTriggerValueChange",
	"onEscapeKeyDown",
	"onFocusOutside",
	"onInteractOutside",
	"onOpenChange",
	"onPointerDownOutside",
	"onRequestDismiss",
	"open",
	"persistentElements",
	"preventScroll",
	"restoreFocus",
	"role",
	"trapFocus"
]);
var splitProps = createSplitProps(props);
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/dialog/modules/provider.svelte.js
function useDialog(props) {
	const service = useMachine(machine, props);
	const dialog = derived(() => connect(service, normalizeProps));
	return () => dialog();
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/dialog/anatomy/root.svelte
function Root($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const id = props_id($$renderer);
		const { $$slots, $$events, ...props } = $$props;
		const $$d = derived(() => splitProps(props)), $$derived_array = derived(() => to_array($$d(), 2)), dialogProps = derived(() => $$derived_array()[0]), componentProps = derived(() => $$derived_array()[1]);
		const children = derived(() => componentProps().children);
		const dialog = useDialog(() => ({
			...dialogProps(),
			id
		}));
		RootContext.provide(() => dialog());
		children()?.($$renderer);
		$$renderer.push(`<!---->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/dialog/anatomy/title.svelte
function Title($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const dialog = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$2 = derived(() => mergeProps(dialog().getTitleProps(), rest()));
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
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/dialog/anatomy/trigger.svelte
function Trigger($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const dialog = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$1 = derived(() => mergeProps(dialog().getTriggerProps(), rest()));
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
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/dialog/modules/anatomy.js
var Dialog = Object.assign(Root, {
	Provider: Root_provider,
	Context: Root_context,
	Trigger,
	Backdrop,
	Positioner,
	Content,
	Title,
	Description,
	CloseTrigger: Close_trigger
});
// src/lib/components/modals/parts/ModalBackdrop.svelte
function ModalBackdrop($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { $$slots, $$events, ...props } = $$props;
		if (Dialog.Backdrop) {
			$$renderer.push("<!--[-->");
			Dialog.Backdrop($$renderer, { class: ["bg-surface-800/70 fixed inset-0 z-40 items-center p-4 transition-all transition-discrete data-[state=closed]:opacity-0 data-[state=open]:opacity-100 starting:data-[state=closed]:opacity-100 starting:data-[state=open]:opacity-0", props?.class] });
			$$renderer.push("<!--]-->");
		} else {
			$$renderer.push("<!--[!-->");
			$$renderer.push("<!--]-->");
		}
	});
}
// src/lib/components/modals/parts/ModalContent.svelte
function ModalContent($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { children, $$slots, $$events, ...props } = $$props;
		{
			function element($$renderer, elProps) {
				$$renderer.push(`<div${attributes({
					...elProps,
					class: clsx(["card bg-surface-100-900 border-surface-200-800 w-full max-w-xl space-y-4 overflow-y-auto border p-4 shadow-xl transition-all transition-discrete data-[state=closed]:opacity-0 data-[state=open]:opacity-100 starting:data-[state=closed]:opacity-100 starting:data-[state=open]:opacity-0", props.class])
				})}>`);
				children($$renderer);
				$$renderer.push(`<!----></div>`);
			}
			if (Dialog.Content) {
				$$renderer.push("<!--[-->");
				Dialog.Content($$renderer, {
					element,
					$$slots: { element: true }
				});
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
	});
}
// src/lib/components/modals/BaseModal.svelte
var actionProps = {
	neutralStyle: "preset-tonal-surface inset-ring inset-ring-surface-500 btn btn-sm md:btn-base",
	negativeStyle: "preset-tonal-error inset-ring inset-ring-error-500 btn btn-sm md:btn-base",
	positiveStyle: "preset-filled btn btn-sm md:btn-base"
};
function BaseModal($$renderer, $$props) {
	let { trigger, title, description, actions, children: content, $$slots, $$events, ...rest } = $$props;
	Dialog($$renderer, spread_props([rest, {
		children: ($$renderer) => {
			if (Dialog.Trigger) {
				$$renderer.push("<!--[-->");
				Dialog.Trigger($$renderer, { element: trigger });
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
			$$renderer.push(` `);
			Portal($$renderer, {
				children: ($$renderer) => {
					ModalBackdrop($$renderer, {});
					$$renderer.push(`<!----> `);
					if (Dialog.Positioner) {
						$$renderer.push("<!--[-->");
						Dialog.Positioner($$renderer, {
							class: "fixed inset-0 z-50 mx-4 flex items-center justify-center",
							children: ($$renderer) => {
								ModalContent($$renderer, {
									class: "max-h-3/4 data-[state=closed]:scale-90 data-[state=open]:scale-100 starting:data-[state=closed]:scale-100 starting:data-[state=open]:scale-90",
									children: ($$renderer) => {
										if (Dialog.Title) {
											$$renderer.push("<!--[-->");
											Dialog.Title($$renderer, {
												class: "text-xl font-bold md:text-2xl",
												children: ($$renderer) => {
													$$renderer.push(`<!---->${escape_html(title)}`);
												},
												$$slots: { default: true }
											});
											$$renderer.push("<!--]-->");
										} else {
											$$renderer.push("<!--[!-->");
											$$renderer.push("<!--]-->");
										}
										$$renderer.push(` `);
										if (Dialog.Description) {
											$$renderer.push("<!--[-->");
											Dialog.Description($$renderer, {
												children: ($$renderer) => {
													if (typeof description === "string") $$renderer.push(`<!--[0-->${html(description)}`);
													else {
														$$renderer.push("<!--[-1-->");
														description($$renderer);
														$$renderer.push(`<!---->`);
													}
													$$renderer.push(`<!--]-->`);
												},
												$$slots: { default: true }
											});
											$$renderer.push("<!--]-->");
										} else {
											$$renderer.push("<!--[!-->");
											$$renderer.push("<!--]-->");
										}
										$$renderer.push(` `);
										content?.($$renderer);
										$$renderer.push(`<!----> <div class="flex flex-wrap justify-between gap-y-2">`);
										actions($$renderer, actionProps);
										$$renderer.push(`<!----></div>`);
									},
									$$slots: { default: true }
								});
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
	}]));
}

export { BaseModal as B, Dialog as D, ModalBackdrop as M, ModalContent as a };
//# sourceMappingURL=BaseModal.js-_UDlR-j4.js.map
