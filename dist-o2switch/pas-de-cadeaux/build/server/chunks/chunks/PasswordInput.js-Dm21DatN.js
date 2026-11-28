import { au as attr, ao as escape_html, ak as attributes, am as clsx, av as store_get, ax as unsubscribe_stores, aq as bind_props, aj as props_id, V as derived, al as exclude_from_object, an as to_array } from './index-server.js-CIVHNbBm.js';
import { f as getFormatter } from './i18n2.js-1SlG2bAu.js';
import '@zxcvbn-ts/core';
import { C as createAnatomy, A as createMachine, D as createProps, x as useMachine, y as createContext, z as mergeProps, E as normalizeProps } from './create-anatomy.js-CLhpGM8y.js';
import { i as isEqual } from './equal.js-nd5Stm03.js';
import { g as getValuePercent } from './number.js-B87QIgOI.js';
import { m as isNumber, g as createSplitProps } from './warning.js-12YgogjO.js';
import './anatomy3.js-HwVFkfZZ.js';

// node_modules/.pnpm/@zag-js+core@1.39.1/node_modules/@zag-js/core/dist/memo.mjs
function memo(getDeps, fn, opts) {
	let deps = [];
	let result;
	return (depArgs) => {
		const newDeps = getDeps(depArgs);
		if (!(newDeps.length !== deps.length || newDeps.some((dep, index) => !isEqual(deps[index], dep)))) return result;
		deps = newDeps;
		result = fn(newDeps, depArgs);
		return result;
	};
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/progress/modules/root-context.js
var RootContext = createContext();
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/progress/anatomy/circle-range.svelte
function Circle_range($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const progress = RootContext.consume();
		const element = derived(() => props.element), rest = derived(() => exclude_from_object(props, ["element"]));
		const attributes$9 = derived(() => mergeProps(progress().getCircleRangeProps(), { "stroke-linecap": "round" }, rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$9());
			$$renderer.push(`<!---->`);
		} else $$renderer.push(`<!--[-1--><circle${attributes({ ...attributes$9() }, void 0, void 0, void 0, 3)}></circle>`);
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/progress/anatomy/circle-track.svelte
function Circle_track($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const progress = RootContext.consume();
		const element = derived(() => props.element), rest = derived(() => exclude_from_object(props, ["element"]));
		const attributes$8 = derived(() => mergeProps(progress().getCircleTrackProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$8());
			$$renderer.push(`<!---->`);
		} else $$renderer.push(`<!--[-1--><circle${attributes({ ...attributes$8() }, void 0, void 0, void 0, 3)}></circle>`);
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/progress/anatomy/circle.svelte
function Circle($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const progress = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$7 = derived(() => mergeProps(progress().getCircleProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$7());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><svg${attributes({ ...attributes$7() }, void 0, void 0, void 0, 3)}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></svg>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/progress/anatomy/label.svelte
function Label($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const progress = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$6 = derived(() => mergeProps(progress().getLabelProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$6());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><div${attributes({ ...attributes$6() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/progress/anatomy/range.svelte
function Range($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const progress = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$5 = derived(() => mergeProps(progress().getRangeProps(), rest()));
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
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/progress/anatomy/root-context.svelte
function Root_context($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const progress = RootContext.consume();
		derived(() => props.children)()($$renderer, progress);
		$$renderer.push(`<!---->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/progress/anatomy/root-provider.svelte
function Root_provider($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const element = derived(() => props.element), children = derived(() => props.children), avatar = derived(() => props.value), rest = derived(() => exclude_from_object(props, [
			"element",
			"children",
			"value"
		]));
		const attributes$4 = derived(() => mergeProps(avatar()().getRootProps(), rest()));
		RootContext.provide(() => avatar()());
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
var parts = createAnatomy("progress").parts("root", "label", "track", "range", "valueText", "view", "circle", "circleTrack", "circleRange").build();
// node_modules/.pnpm/@zag-js+progress@1.39.1/node_modules/@zag-js/progress/dist/progress.dom.mjs
var getRootId = (ctx) => ctx.ids?.root ?? `progress-${ctx.id}`;
var getTrackId = (ctx) => ctx.ids?.track ?? `progress-${ctx.id}-track`;
var getLabelId = (ctx) => ctx.ids?.label ?? `progress-${ctx.id}-label`;
var getCircleId = (ctx) => ctx.ids?.circle ?? `progress-${ctx.id}-circle`;
// node_modules/.pnpm/@zag-js+progress@1.39.1/node_modules/@zag-js/progress/dist/progress.connect.mjs
function connect(service, normalize) {
	const { context, computed, prop, send, scope } = service;
	const percent = computed("percent");
	const percentAsString = computed("isIndeterminate") ? "" : computed("formatter").format(percent / 100);
	const max = prop("max");
	const min = prop("min");
	const orientation = prop("orientation");
	const translations = prop("translations");
	const indeterminate = computed("isIndeterminate");
	const value = context.get("value");
	const valueAsString = translations?.value({
		value,
		max,
		percent,
		min,
		formatter: computed("formatter")
	}) ?? "";
	const progressState = getProgressState(value, max);
	const progressbarProps = {
		role: "progressbar",
		"aria-label": valueAsString,
		"data-max": max,
		"aria-valuemin": min,
		"aria-valuemax": max,
		"aria-valuenow": value ?? void 0,
		"data-orientation": orientation,
		"data-state": progressState
	};
	const circleProps2 = getCircleProps(service);
	return {
		value,
		valueAsString,
		min,
		max,
		percent,
		percentAsString,
		indeterminate,
		setValue(value2) {
			send({
				type: "VALUE.SET",
				value: value2
			});
		},
		setToMax() {
			send({
				type: "VALUE.SET",
				value: max
			});
		},
		setToMin() {
			send({
				type: "VALUE.SET",
				value: min
			});
		},
		getRootProps() {
			return normalize.element({
				dir: prop("dir"),
				...parts.root.attrs,
				id: getRootId(scope),
				"data-max": max,
				"data-value": value ?? void 0,
				"data-state": progressState,
				"data-orientation": orientation,
				style: { "--percent": indeterminate ? void 0 : percent }
			});
		},
		getLabelProps() {
			return normalize.element({
				dir: prop("dir"),
				id: getLabelId(scope),
				...parts.label.attrs,
				"data-orientation": orientation
			});
		},
		getValueTextProps() {
			return normalize.element({
				dir: prop("dir"),
				"aria-live": "polite",
				...parts.valueText.attrs
			});
		},
		getTrackProps() {
			return normalize.element({
				dir: prop("dir"),
				id: getTrackId(scope),
				...parts.track.attrs,
				...progressbarProps
			});
		},
		getRangeProps() {
			return normalize.element({
				dir: prop("dir"),
				...parts.range.attrs,
				"data-orientation": orientation,
				"data-state": progressState,
				style: { [computed("isHorizontal") ? "width" : "height"]: indeterminate ? void 0 : `${percent}%` }
			});
		},
		getCircleProps() {
			return normalize.element({
				dir: prop("dir"),
				id: getCircleId(scope),
				...parts.circle.attrs,
				...progressbarProps,
				...circleProps2.root
			});
		},
		getCircleTrackProps() {
			return normalize.element({
				dir: prop("dir"),
				"data-orientation": orientation,
				...parts.circleTrack.attrs,
				...circleProps2.track
			});
		},
		getCircleRangeProps() {
			return normalize.element({
				dir: prop("dir"),
				...parts.circleRange.attrs,
				...circleProps2.range,
				"data-state": progressState
			});
		},
		getViewProps(props) {
			return normalize.element({
				dir: prop("dir"),
				...parts.view.attrs,
				"data-state": props.state,
				hidden: props.state !== progressState
			});
		}
	};
}
function getProgressState(value, maxValue) {
	return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
var circleProps = { style: {
	"--radius": "calc(var(--size) / 2 - var(--thickness) / 2)",
	cx: "calc(var(--size) / 2)",
	cy: "calc(var(--size) / 2)",
	r: "var(--radius)",
	fill: "transparent",
	strokeWidth: "var(--thickness)"
} };
var rootProps = { style: {
	width: "var(--size)",
	height: "var(--size)"
} };
function getCircleProps(service) {
	const { context, computed } = service;
	return {
		root: rootProps,
		track: circleProps,
		range: {
			opacity: context.get("value") === 0 ? 0 : void 0,
			style: {
				...circleProps.style,
				"--percent": computed("percent"),
				"--circumference": `calc(2 * 3.14159 * var(--radius))`,
				"--offset": `calc(var(--circumference) * (100 - var(--percent)) / 100)`,
				strokeDashoffset: `calc(var(--circumference) * ((100 - var(--percent)) / 100))`,
				strokeDasharray: computed("isIndeterminate") ? void 0 : `var(--circumference)`,
				transformOrigin: "center",
				transform: "rotate(-90deg)"
			}
		}
	};
}
// node_modules/.pnpm/@zag-js+progress@1.39.1/node_modules/@zag-js/progress/dist/progress.machine.mjs
var machine = createMachine({
	props({ props }) {
		const min = props.min ?? 0;
		const max = props.max ?? 100;
		return {
			orientation: "horizontal",
			...props,
			max,
			min,
			defaultValue: props.defaultValue !== void 0 ? props.defaultValue : midValue(min, max),
			formatOptions: {
				style: "percent",
				...props.formatOptions
			},
			translations: {
				value: ({ value, percent, formatter }) => {
					if (value === null) return "loading...";
					if (formatter) {
						const num = formatter.resolvedOptions().style === "percent" ? percent / 100 : value;
						return formatter.format(num);
					}
					return value.toString();
				},
				...props.translations
			}
		};
	},
	initialState() {
		return "idle";
	},
	entry: ["validateContext"],
	context({ bindable, prop }) {
		return { value: bindable(() => ({
			defaultValue: prop("defaultValue"),
			value: prop("value"),
			onChange(value) {
				prop("onValueChange")?.({ value });
			}
		})) };
	},
	computed: {
		isIndeterminate: ({ context }) => context.get("value") === null,
		percent({ context, prop }) {
			const value = context.get("value");
			if (!isNumber(value)) return -1;
			return getValuePercent(value, prop("min"), prop("max")) * 100;
		},
		formatter: memo(({ prop }) => [prop("locale"), prop("formatOptions")], ([locale, formatOptions]) => new Intl.NumberFormat(locale, formatOptions)),
		isHorizontal: ({ prop }) => prop("orientation") === "horizontal"
	},
	states: { idle: { on: { "VALUE.SET": { actions: ["setValue"] } } } },
	implementations: { actions: {
		setValue: ({ context, event, prop }) => {
			const value = event.value === null ? null : Math.max(0, Math.min(event.value, prop("max")));
			context.set("value", value);
		},
		validateContext: ({ context, prop }) => {
			const max = prop("max");
			const min = prop("min");
			const value = context.get("value");
			if (value == null) return;
			if (!isValidNumber(max)) throw new Error(`[progress] The max value passed \`${max}\` is not a valid number`);
			if (!isValidMax(value, max)) throw new Error(`[progress] The value passed \`${value}\` exceeds the max value \`${max}\``);
			if (!isValidMin(value, min)) throw new Error(`[progress] The value passed \`${value}\` exceeds the min value \`${min}\``);
		}
	} }
});
var isValidNumber = (max) => isNumber(max) && !isNaN(max);
var isValidMax = (value, max) => isValidNumber(value) && value <= max;
var isValidMin = (value, min) => isValidNumber(value) && value >= min;
var midValue = (min, max) => min + (max - min) / 2;
// node_modules/.pnpm/@zag-js+progress@1.39.1/node_modules/@zag-js/progress/dist/progress.props.mjs
var props = createProps()([
	"dir",
	"getRootNode",
	"id",
	"ids",
	"max",
	"min",
	"orientation",
	"translations",
	"value",
	"onValueChange",
	"defaultValue",
	"formatOptions",
	"locale"
]);
var splitProps = createSplitProps(props);
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/progress/modules/provider.svelte.js
function useProgress(props) {
	const service = useMachine(machine, props);
	const progress = derived(() => connect(service, normalizeProps));
	return () => progress();
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/progress/anatomy/root.svelte
function Root($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const id = props_id($$renderer);
		const { $$slots, $$events, ...props } = $$props;
		const $$d = derived(() => splitProps(props)), $$derived_array = derived(() => to_array($$d(), 2)), progressProps = derived(() => $$derived_array()[0]), componentProps = derived(() => $$derived_array()[1]);
		const element = derived(() => componentProps().element), children = derived(() => componentProps().children), rest = derived(() => exclude_from_object(componentProps(), ["element", "children"]));
		const avatar = useProgress(() => ({
			...progressProps(),
			id
		}));
		const attributes$3 = derived(() => mergeProps(avatar().getRootProps(), rest()));
		RootContext.provide(() => avatar());
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
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/progress/anatomy/track.svelte
function Track($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const progress = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$2 = derived(() => mergeProps(progress().getTrackProps(), rest()));
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
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/progress/anatomy/value-text.svelte
function Value_text($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const progress = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$1 = derived(() => mergeProps(progress().getValueTextProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$1());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><span${attributes({ ...attributes$1() })}>`);
			if (children()) {
				$$renderer.push("<!--[0-->");
				children()?.($$renderer);
				$$renderer.push(`<!---->`);
			} else $$renderer.push(`<!--[-1-->${escape_html(progress().percentAsString)}`);
			$$renderer.push(`<!--]--></span>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
Object.assign(Root, {
	Provider: Root_provider,
	Context: Root_context,
	Label,
	ValueText: Value_text,
	Track,
	Range,
	Circle,
	CircleTrack: Circle_track,
	CircleRange: Circle_range
});
// src/lib/components/PasswordInput.svelte
function PasswordInput($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { id, name = void 0, label, required = false, autocomplete = void 0, error = false, value = void 0, strengthMeter = false, $$slots, $$events, ...restProps } = $$props;
		const t = getFormatter();
		$$renderer.push(`<div class="flex w-full flex-col gap-y-1"><label class="label"${attr("for", id)}><span>${escape_html(label)}</span> <div class="input-group grid-cols-[1fr_auto]"><input${attributes({
			id,
			name,
			class: clsx(["ig-input", error && "input-invalid"]),
			autocomplete,
			required,
			type: "password",
			value,
			...restProps
		}, void 0, void 0, void 0, 4)}/> <button id="showpassword" class="ig-cell"${attr("aria-label", store_get($$store_subs ??= {}, "$t", t)("a11y.toggle-password-visibility"))} tabindex="-1" type="button"><iconify-icon class="-mb-0.5"${attr("icon", `ion:eye`)}></iconify-icon></button></div></label> `);
		if (strengthMeter && value !== "") {
			$$renderer.push("<!--[0-->");
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
		bind_props($$props, { value });
	});
}

export { PasswordInput as P, memo as m };
//# sourceMappingURL=PasswordInput.js-Dm21DatN.js.map
