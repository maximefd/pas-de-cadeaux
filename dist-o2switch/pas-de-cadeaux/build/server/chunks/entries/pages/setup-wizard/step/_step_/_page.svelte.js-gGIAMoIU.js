import { aw as ensure_array_like, ao as escape_html, av as store_get, au as attr, ax as unsubscribe_stores, ay as attr_class, am as clsx, V as derived, aj as props_id, ak as attributes, ai as spread_props, al as exclude_from_object, an as to_array } from '../../../../../chunks/index-server.js-CIVHNbBm.js';
import { p as page } from '../../../../../chunks/state.js-DFeh0alp.js';
import { x as useMachine, y as createContext, z as mergeProps, B as dataAttr, ad as fromLength, C as createAnatomy, A as createMachine, D as createProps, E as normalizeProps } from '../../../../../chunks/create-anatomy.js-CLhpGM8y.js';
import { g as goto } from '../../../../../chunks/client.js-CtfT808N.js';
import { m as memo } from '../../../../../chunks/PasswordInput.js-Dm21DatN.js';
import { i as isValueWithinRange } from '../../../../../chunks/number.js-B87QIgOI.js';
import { g as createSplitProps } from '../../../../../chunks/warning.js-12YgogjO.js';
import { C as CreateAccountForm } from '../../../../../chunks/CreateAccountForm.js-GmNN53Sp.js';
import { f as getFormatter } from '../../../../../chunks/i18n2.js-1SlG2bAu.js';
import { o as options, G as General_default, E as Email_default, S as Security_default } from '../../../../../chunks/Settings.js-DvkMcewm.js';
import '../../../../../chunks/toaster.js-DRl3MQi1.js';
import { I as InviteUser } from '../../../../../chunks/InviteUser.js-Br9OSCSm.js';
import { r as resolve } from '../../../../../chunks/paths.js-BuehRTbY.js';
import '../../../../../chunks/routing.js-DMTqwvGY.js';
import '../../../../../chunks/shared.js-Cb68JbUk.js';
import '../../../../../chunks/exports.js-BBf-2Qi_.js';
import '../../../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../../../chunks/utils.js-CAPFIGDr.js';
import '@zxcvbn-ts/core';
import '../../../../../chunks/equal.js-nd5Stm03.js';
import '../../../../../chunks/anatomy3.js-HwVFkfZZ.js';
import '../../../../../chunks/get-styles.js-Boa-8w4M.js';
import '../../../../../chunks/anatomy2.js-Deb7OEEc.js';
import '../../../../../chunks/dist.js-BvNxsp9_.js';
import '../../../../../chunks/index-server2.js-DZFYXfYm.js';
import '../../../../../chunks/Tooltip.js-D0qklLov.js';
import '../../../../../chunks/zxcvbn.js-ByAwPR8u.js';
import '../../../../../chunks/TokenCopy.js-CY3taoB-.js';
import '../../../../../chunks/attachments.js-DNhXZ-Re.js';
import '../../../../../chunks/dist2.js-Cjb_BOMc.js';
import '../../../../../chunks/users.js-DwrjtQr5.js';
import '../../../../../chunks/BaseModal.js-_UDlR-j4.js';
import '../../../../../chunks/anatomy5.js-STbBfBjf.js';
import '../../../../../chunks/use-list-collection.js-brFPftRE.js';
import '../../../../../chunks/Popup.js-CGmgV3d5.js';
import '../../../../../chunks/internal.js-B0ORXlkz.js';

// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/steps/modules/root-context.js
var RootContext = createContext();
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/steps/anatomy/content.svelte
function Content($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const steps = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), index = derived(() => props.index), rest = derived(() => exclude_from_object(props, [
			"element",
			"children",
			"index"
		]));
		const attributes$10 = derived(() => mergeProps(steps().getContentProps({ index: index() }), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$10());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><div${attributes({ ...attributes$10() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/steps/modules/item-context.js
var ItemContext = createContext();
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/steps/anatomy/indicator.svelte
function Indicator($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const steps = RootContext.consume();
		const itemProps = ItemContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$9 = derived(() => mergeProps(steps().getIndicatorProps(itemProps()), rest()));
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
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/steps/anatomy/item.svelte
function Item($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const steps = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), index = derived(() => props.index), rest = derived(() => exclude_from_object(props, [
			"element",
			"children",
			"index"
		]));
		const itemProps = derived(() => ({ index: index() }));
		const attributes$8 = derived(() => mergeProps(steps().getItemProps(itemProps()), rest()));
		ItemContext.provide(() => itemProps());
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
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/steps/anatomy/list.svelte
function List($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const steps = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$7 = derived(() => mergeProps(steps().getListProps(), rest()));
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
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/steps/anatomy/next-trigger.svelte
function Next_trigger($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const steps = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$6 = derived(() => mergeProps(steps().getNextTriggerProps(), rest()));
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
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/steps/anatomy/prev-trigger.svelte
function Prev_trigger($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const steps = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$5 = derived(() => mergeProps(steps().getPrevTriggerProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$5());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><button${attributes({ ...attributes$5() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></button>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/steps/anatomy/root-context.svelte
function Root_context($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const steps = RootContext.consume();
		derived(() => props.children)()($$renderer, steps);
		$$renderer.push(`<!---->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/steps/anatomy/root-provider.svelte
function Root_provider($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const element = derived(() => props.element), children = derived(() => props.children), steps = derived(() => props.value), rest = derived(() => exclude_from_object(props, [
			"element",
			"children",
			"value"
		]));
		const attributes$4 = derived(() => mergeProps(steps()().getRootProps(), rest()));
		RootContext.provide(() => steps()());
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
var parts = createAnatomy("steps").parts("root", "list", "item", "trigger", "indicator", "separator", "content", "nextTrigger", "prevTrigger", "progress").build();
// node_modules/.pnpm/@zag-js+steps@1.39.1/node_modules/@zag-js/steps/dist/steps.dom.mjs
var getRootId = (ctx) => ctx.ids?.root ?? `steps:${ctx.id}`;
var getListId = (ctx) => ctx.ids?.list ?? `steps:${ctx.id}:list`;
var getTriggerId = (ctx, index) => ctx.ids?.triggerId?.(index) ?? `steps:${ctx.id}:trigger:${index}`;
var getContentId = (ctx, index) => ctx.ids?.contentId?.(index) ?? `steps:${ctx.id}:content:${index}`;
// node_modules/.pnpm/@zag-js+steps@1.39.1/node_modules/@zag-js/steps/dist/steps.connect.mjs
function connect(service, normalize) {
	const { context, send, computed, prop, scope } = service;
	const step = context.get("step");
	const count = prop("count");
	const percent = computed("percent");
	const hasNextStep = computed("hasNextStep");
	const hasPrevStep = computed("hasPrevStep");
	const isStepValid = (index) => {
		return prop("isStepValid")?.(index) ?? true;
	};
	const isStepSkippable = (index) => {
		return prop("isStepSkippable")?.(index) ?? false;
	};
	const getItemState = (props) => ({
		triggerId: getTriggerId(scope, props.index),
		contentId: getContentId(scope, props.index),
		current: props.index === step,
		completed: props.index < step,
		incomplete: props.index > step,
		index: props.index,
		first: props.index === 0,
		last: props.index === count - 1,
		skippable: isStepSkippable(props.index),
		isValid: () => isStepValid(props.index)
	});
	const goToNextStep = () => {
		send({
			type: "STEP.NEXT",
			src: "next.trigger.click"
		});
	};
	const goToPrevStep = () => {
		send({
			type: "STEP.PREV",
			src: "prev.trigger.click"
		});
	};
	const resetStep = () => {
		send({
			type: "STEP.RESET",
			src: "reset.trigger.click"
		});
	};
	const setStep = (value) => {
		send({
			type: "STEP.SET",
			value,
			src: "api.setValue"
		});
	};
	return {
		value: step,
		count,
		percent,
		hasNextStep,
		hasPrevStep,
		isCompleted: computed("completed"),
		isStepValid,
		isStepSkippable,
		goToNextStep,
		goToPrevStep,
		resetStep,
		getItemState,
		setStep,
		getRootProps() {
			return normalize.element({
				...parts.root.attrs,
				id: getRootId(scope),
				dir: prop("dir"),
				"data-orientation": prop("orientation"),
				style: { "--percent": `${percent}%` }
			});
		},
		getListProps() {
			const triggerIds = fromLength(count).map((_, index) => getTriggerId(scope, index));
			return normalize.element({
				...parts.list.attrs,
				dir: prop("dir"),
				id: getListId(scope),
				role: "tablist",
				"aria-owns": triggerIds.join(" "),
				"aria-orientation": prop("orientation"),
				"data-orientation": prop("orientation")
			});
		},
		getItemProps(props) {
			const itemState = getItemState(props);
			return normalize.element({
				...parts.item.attrs,
				dir: prop("dir"),
				"aria-current": itemState.current ? "step" : void 0,
				"data-orientation": prop("orientation"),
				"data-skippable": dataAttr(itemState.skippable)
			});
		},
		getTriggerProps(props) {
			const itemState = getItemState(props);
			return normalize.button({
				...parts.trigger.attrs,
				id: itemState.triggerId,
				role: "tab",
				dir: prop("dir"),
				tabIndex: !prop("linear") || itemState.current ? 0 : -1,
				"aria-selected": itemState.current,
				"aria-controls": itemState.contentId,
				"data-state": itemState.current ? "open" : "closed",
				"data-orientation": prop("orientation"),
				"data-complete": dataAttr(itemState.completed),
				"data-current": dataAttr(itemState.current),
				"data-incomplete": dataAttr(itemState.incomplete),
				onClick(event) {
					if (event.defaultPrevented) return;
					if (prop("linear")) return;
					send({
						type: "STEP.SET",
						value: props.index,
						src: "trigger.click"
					});
				}
			});
		},
		getContentProps(props) {
			const itemState = getItemState(props);
			return normalize.element({
				...parts.content.attrs,
				dir: prop("dir"),
				id: itemState.contentId,
				role: "tabpanel",
				tabIndex: 0,
				hidden: !itemState.current,
				"data-state": itemState.current ? "open" : "closed",
				"data-orientation": prop("orientation"),
				"aria-labelledby": itemState.triggerId
			});
		},
		getIndicatorProps(props) {
			const itemState = getItemState(props);
			return normalize.element({
				...parts.indicator.attrs,
				dir: prop("dir"),
				"aria-hidden": true,
				"data-complete": dataAttr(itemState.completed),
				"data-current": dataAttr(itemState.current),
				"data-incomplete": dataAttr(itemState.incomplete)
			});
		},
		getSeparatorProps(props) {
			const itemState = getItemState(props);
			return normalize.element({
				...parts.separator.attrs,
				dir: prop("dir"),
				"data-orientation": prop("orientation"),
				"data-complete": dataAttr(itemState.completed),
				"data-current": dataAttr(itemState.current),
				"data-incomplete": dataAttr(itemState.incomplete)
			});
		},
		getNextTriggerProps() {
			return normalize.button({
				...parts.nextTrigger.attrs,
				dir: prop("dir"),
				type: "button",
				disabled: !hasNextStep,
				onClick(event) {
					if (event.defaultPrevented) return;
					goToNextStep();
				}
			});
		},
		getPrevTriggerProps() {
			return normalize.button({
				dir: prop("dir"),
				...parts.prevTrigger.attrs,
				type: "button",
				disabled: !hasPrevStep,
				onClick(event) {
					if (event.defaultPrevented) return;
					goToPrevStep();
				}
			});
		},
		getProgressProps() {
			return normalize.element({
				dir: prop("dir"),
				...parts.progress.attrs,
				role: "progressbar",
				"aria-valuenow": percent,
				"aria-valuemin": 0,
				"aria-valuemax": 100,
				"aria-valuetext": `${percent}% complete`,
				"data-complete": dataAttr(percent === 100)
			});
		}
	};
}
// node_modules/.pnpm/@zag-js+steps@1.39.1/node_modules/@zag-js/steps/dist/steps.machine.mjs
var machine = createMachine({
	props({ props }) {
		return {
			defaultStep: 0,
			count: 1,
			linear: false,
			orientation: "horizontal",
			...props
		};
	},
	context({ prop, bindable }) {
		return { step: bindable(() => ({
			defaultValue: prop("defaultStep"),
			value: prop("step"),
			onChange(value) {
				prop("onStepChange")?.({ step: value });
				if (value == prop("count")) prop("onStepComplete")?.();
			}
		})) };
	},
	computed: {
		percent: memo(({ context, prop }) => [context.get("step"), prop("count")], ([step, count]) => step / count * 100),
		hasNextStep: ({ context, prop }) => context.get("step") < prop("count"),
		hasPrevStep: ({ context }) => context.get("step") > 0,
		completed: ({ context, prop }) => context.get("step") === prop("count")
	},
	initialState() {
		return "idle";
	},
	entry: ["validateStepIndex"],
	states: { idle: { on: {
		"STEP.SET": [{
			guard: "isValidStepNavigation",
			actions: ["setStep"]
		}, { actions: ["invokeOnStepInvalid"] }],
		"STEP.NEXT": [{
			guard: "isCurrentStepValid",
			actions: ["goToNextStep"]
		}, { actions: ["invokeOnStepInvalid"] }],
		"STEP.PREV": { actions: ["goToPrevStep"] },
		"STEP.RESET": { actions: ["resetStep"] }
	} } },
	implementations: {
		guards: {
			isCurrentStepValid({ context, prop }) {
				const current = context.get("step");
				if (prop("isStepSkippable")?.(current)) return true;
				const isStepValid = prop("isStepValid");
				if (!isStepValid) return true;
				return isStepValid(current);
			},
			isValidStepNavigation({ context, event, prop }) {
				const current = context.get("step");
				if (event.value <= current) return true;
				if (prop("isStepSkippable")?.(current)) return true;
				const isStepValid = prop("isStepValid");
				if (!isStepValid) return true;
				return isStepValid(current);
			}
		},
		actions: {
			goToNextStep({ context, prop }) {
				const count = prop("count");
				context.set("step", Math.min(context.get("step") + 1, count));
			},
			goToPrevStep({ context }) {
				context.set("step", Math.max(context.get("step") - 1, 0));
			},
			resetStep({ context }) {
				context.set("step", 0);
			},
			setStep({ context, event }) {
				context.set("step", event.value);
			},
			validateStepIndex({ context, prop }) {
				validateStepIndex(prop("count"), context.get("step"));
			},
			invokeOnStepInvalid({ context, event, prop }) {
				prop("onStepInvalid")?.({
					step: context.get("step"),
					action: event.type === "STEP.NEXT" ? "next" : "set",
					targetStep: event.value
				});
			}
		}
	}
});
var validateStepIndex = (count, step) => {
	if (!isValueWithinRange(step, 0, count)) throw new RangeError(`[zag-js/steps] step index ${step} is out of bounds`);
};
// node_modules/.pnpm/@zag-js+steps@1.39.1/node_modules/@zag-js/steps/dist/steps.props.mjs
var props = createProps()([
	"count",
	"defaultStep",
	"dir",
	"getRootNode",
	"id",
	"ids",
	"isStepSkippable",
	"isStepValid",
	"linear",
	"onStepChange",
	"onStepComplete",
	"onStepInvalid",
	"orientation",
	"step"
]);
var splitProps = createSplitProps(props);
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/steps/modules/provider.svelte.js
function useSteps(props) {
	const service = useMachine(machine, props);
	const steps = derived(() => connect(service, normalizeProps));
	return () => steps();
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/steps/anatomy/root.svelte
function Root($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const id = props_id($$renderer);
		const { $$slots, $$events, ...props } = $$props;
		const $$d = derived(() => splitProps(props)), $$derived_array = derived(() => to_array($$d(), 2)), stepsProps = derived(() => $$derived_array()[0]), componentProps = derived(() => $$derived_array()[1]);
		const element = derived(() => componentProps().element), children = derived(() => componentProps().children), rest = derived(() => exclude_from_object(componentProps(), ["element", "children"]));
		const steps = useSteps(() => ({
			...stepsProps(),
			id
		}));
		const attributes$3 = derived(() => mergeProps(steps().getRootProps(), rest()));
		RootContext.provide(() => steps());
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
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/steps/anatomy/separator.svelte
function Separator($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const steps = RootContext.consume();
		const itemProps = ItemContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$2 = derived(() => mergeProps(steps().getSeparatorProps(itemProps()), rest()));
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
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/steps/anatomy/trigger.svelte
function Trigger($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const steps = RootContext.consume();
		const itemProps = ItemContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$1 = derived(() => mergeProps(steps().getTriggerProps(itemProps()), rest()));
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
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/steps/modules/anatomy.js
var Steps = Object.assign(Root, {
	Provider: Root_provider,
	Context: Root_context,
	List,
	Item,
	Trigger,
	Indicator,
	Separator,
	Content,
	PrevTrigger: Prev_trigger,
	NextTrigger: Next_trigger
});
// src/routes/setup-wizard/step/[step]/StepButtons.svelte
function StepButtons($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { submitting, prevButton, nextButton } = $$props;
		const t = getFormatter();
		{
			function children($$renderer, api) {
				const isLastStep = api().value === api().count - 1;
				$$renderer.push(`<div class="flex items-center justify-between gap-2 pt-4">`);
				if (Steps.PrevTrigger) {
					$$renderer.push("<!--[-->");
					Steps.PrevTrigger($$renderer, spread_props([
						{ class: "btn preset-tonal inset-ring-surface-500 inset-ring" },
						prevButton,
						{
							children: ($$renderer) => {
								$$renderer.push(`<iconify-icon icon="ion:arrow-back"></iconify-icon> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("setup.back"))}</span>`);
							},
							$$slots: { default: true }
						}
					]));
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
				$$renderer.push(` <button${attributes({
					class: clsx(["btn", isLastStep ? "preset-filled-primary-500" : "preset-filled"]),
					...nextButton
				})}>`);
				if (submitting) $$renderer.push(`<!--[0--><span class="loading loading-spinner loading-xs"></span>`);
				else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> <span>${escape_html(isLastStep ? store_get($$store_subs ??= {}, "$t", t)("setup.complete") : store_get($$store_subs ??= {}, "$t", t)("setup.next"))}</span> <iconify-icon${attr("icon", isLastStep ? "ion:checkmark" : "ion:arrow-forward")}></iconify-icon></button></div>`);
			}
			if (Steps.Context) {
				$$renderer.push("<!--[-->");
				Steps.Context($$renderer, {
					children,
					$$slots: { default: true }
				});
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/routes/setup-wizard/step/[step]/CreateAccountStep.svelte
function CreateAccountStep($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { onSuccess } = $$props;
		const t = getFormatter();
		const formId = "create-account-form";
		let submitting = false;
		$$renderer.push(`<div class="flex flex-col items-center space-y-4"><h1 class="h1">${escape_html(store_get($$store_subs ??= {}, "$t", t)("setup.create-your-account"))}</h1> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("setup.first-account-admin"))}</span> <form${attr("id", formId)} class="w-80 max-w-lg md:w-2/3 lg:w-1/2 xl:w-2/5" action="/signup" method="POST">`);
		CreateAccountForm($$renderer, { hideActions: true });
		$$renderer.push(`<!----></form></div> `);
		StepButtons($$renderer, {
			nextButton: {
				form: formId,
				type: "submit"
			},
			submitting
		});
		$$renderer.push(`<!---->`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/routes/setup-wizard/step/[step]/GlobalSettingsStep.svelte
function GlobalSettingsStep($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { onSuccess } = $$props;
		const t = getFormatter();
		const formId = "global-settings-form";
		let config = page.data.config;
		let groups = page.data.groups;
		let submitting = false;
		let sending = false;
		const currentHash = derived(() => page.url.hash);
		$$renderer.push(`<div class="flex w-full flex-col space-y-4"><div class="flex flex-col items-center"><h1 class="h1">${escape_html(store_get($$store_subs ??= {}, "$t", t)("setup.global-settings"))}</h1> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("setup.global-settings-subtext"))}</span></div> <form${attr("id", formId)} action="/admin/settings?/settings" method="POST"><div class="flex w-full flex-col gap-4 md:flex-row"><aside class="hidden md:block md:w-1/3 lg:w-1/4"><nav class="list-nav"><ul><!--[-->`);
		const each_array = ensure_array_like(options);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let option = each_array[$$index];
			$$renderer.push(`<li><a${attr_class(clsx([currentHash() === option.hash && "preset-filled-primary-500!"]))}${attr("href", option.hash)}>${escape_html(option.label(store_get($$store_subs ??= {}, "$t", t)))}</a></li>`);
		}
		$$renderer.push(`<!--]--></ul></nav></aside> <aside class="w-full md:hidden">`);
		$$renderer.select({
			class: "select w-full",
			onchange: (e) => goto(e.currentTarget.value),
			value: currentHash()
		}, ($$renderer) => {
			$$renderer.push(`<!--[-->`);
			const each_array_1 = ensure_array_like(options);
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let option = each_array_1[$$index_1];
				$$renderer.option({ value: option.hash }, ($$renderer) => {
					$$renderer.push(`${escape_html(option.label(store_get($$store_subs ??= {}, "$t", t)))}`);
				});
			}
			$$renderer.push(`<!--]-->`);
		});
		$$renderer.push(`</aside> <div class="w-full">`);
		General_default($$renderer, {
			config,
			groups,
			hidden: currentHash() !== options[0].hash
		});
		$$renderer.push(`<!----> `);
		Email_default($$renderer, {
			config,
			hidden: currentHash() !== options[1].hash,
			sending
		});
		$$renderer.push(`<!----> `);
		Security_default($$renderer, {
			config,
			hidden: currentHash() !== options[2].hash
		});
		$$renderer.push(`<!----></div></div></form></div> `);
		StepButtons($$renderer, {
			nextButton: {
				form: formId,
				type: "submit"
			},
			prevButton: { disabled: true },
			submitting
		});
		$$renderer.push(`<!---->`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/routes/setup-wizard/step/[step]/InviteUsersStep.svelte
function InviteUsersStep($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { $$slots, $$events, ..._props } = $$props;
		const t = getFormatter();
		const config = derived(() => page.data.config);
		const groups = derived(() => page.data.groups);
		let submitting = false;
		const submit = () => {
			submitting = true;
			goto(resolve("/login"), { });
		};
		$$renderer.push(`<div class="flex flex-col items-center space-y-4"><h1 class="h1">${escape_html(store_get($$store_subs ??= {}, "$t", t)("setup.invite-users"))}</h1> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("setup.invite-users-subtext"))}</span> `);
		InviteUser($$renderer, {
			config: config(),
			defaultGroup: groups()[0],
			groups: groups(),
			vertical: true
		});
		$$renderer.push(`<!----></div> `);
		StepButtons($$renderer, {
			nextButton: { onclick: submit },
			submitting
		});
		$$renderer.push(`<!---->`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/routes/setup-wizard/step/[step]/steps.ts
var steps = [
	CreateAccountStep,
	GlobalSettingsStep,
	InviteUsersStep
];
// src/routes/setup-wizard/step/[step]/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let step = derived(() => Number.parseInt(page.params.step || "1") - 1);
		let Component = derived(() => steps[step()]);
		const onStepChange = (event) => {
			if (event.step !== steps.length) goto(resolve("/setup-wizard/step/[step]", { step: (event.step + 1).toString() }));
		};
		Steps($$renderer, {
			count: steps.length,
			linear: true,
			onStepChange,
			step: step(),
			children: ($$renderer) => {
				if (Steps.List) {
					$$renderer.push("<!--[-->");
					Steps.List($$renderer, {
						children: ($$renderer) => {
							$$renderer.push(`<!--[-->`);
							const each_array = ensure_array_like({ length: steps.length });
							for (let index = 0, $$length = each_array.length; index < $$length; index++) if (Steps.Item) {
								$$renderer.push("<!--[-->");
								Steps.Item($$renderer, {
									index,
									children: ($$renderer) => {
										if (Steps.Indicator) {
											$$renderer.push("<!--[-->");
											Steps.Indicator($$renderer, {
												children: ($$renderer) => {
													$$renderer.push(`<!---->${escape_html(index + 1)}`);
												},
												$$slots: { default: true }
											});
											$$renderer.push("<!--]-->");
										} else {
											$$renderer.push("<!--[!-->");
											$$renderer.push("<!--]-->");
										}
										$$renderer.push(` `);
										if (index < steps.length - 1) {
											$$renderer.push("<!--[0-->");
											if (Steps.Separator) {
												$$renderer.push("<!--[-->");
												Steps.Separator($$renderer, {});
												$$renderer.push("<!--]-->");
											} else {
												$$renderer.push("<!--[!-->");
												$$renderer.push("<!--]-->");
											}
										} else $$renderer.push("<!--[-1-->");
										$$renderer.push(`<!--]-->`);
									},
									$$slots: { default: true }
								});
								$$renderer.push("<!--]-->");
							} else {
								$$renderer.push("<!--[!-->");
								$$renderer.push("<!--]-->");
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
				if (Steps.Content) {
					$$renderer.push("<!--[-->");
					Steps.Content($$renderer, {
						index: step(),
						children: ($$renderer) => {
							{
								function children($$renderer, api) {
									if (Component()) {
										$$renderer.push("<!--[-->");
										Component()($$renderer, { onSuccess: () => api().goToNextStep() });
										$$renderer.push("<!--]-->");
									} else {
										$$renderer.push("<!--[!-->");
										$$renderer.push("<!--]-->");
									}
								}
								if (Steps.Context) {
									$$renderer.push("<!--[-->");
									Steps.Context($$renderer, {
										children,
										$$slots: { default: true }
									});
									$$renderer.push("<!--]-->");
								} else {
									$$renderer.push("<!--[!-->");
									$$renderer.push("<!--]-->");
								}
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
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-gGIAMoIU.js.map
