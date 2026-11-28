import { aj as props_id, ak as attributes, V as derived, ah as fallback, al as exclude_from_object, an as to_array } from './index-server.js-CIVHNbBm.js';
import { x as useMachine, y as createContext, z as mergeProps, a8 as isApple, r as raf, a9 as remove, aa as addOrRemove, n as nextTick, I as setup, ab as query, B as dataAttr, L as isDownloadingEvent, M as isOpeningInNewTab, l as isContextMenuEvent, O as ariaAttr, U as isLeftClick, J as getEventKey, P as isComposingEvent, a2 as isAnchorElement, C as createAnatomy, D as createProps, E as normalizeProps } from './create-anatomy.js-CLhpGM8y.js';
import { o as match, p as isBoolean, e as ensure, g as createSplitProps } from './warning.js-12YgogjO.js';
import { d as deriveSelectionState, o as observeAttributes, r as resolveSelectedItems, c as createSelectedItemMap, C as Check, L as ListCollection } from './use-list-collection.js-brFPftRE.js';
import { g as getPlacement, a as getPlacementStyles } from './get-styles.js-Boa-8w4M.js';
import { t as trackDismissableElement, d as scrollIntoView } from './anatomy2.js-Deb7OEEc.js';
import { c as clickIfLink } from './navigate.js-CQMmEWI4.js';
import { t as trackFocusVisible, s as setInteractionModality, g as getInteractionModality } from './dist2.js-Cjb_BOMc.js';
import { i as isEqual } from './equal.js-nd5Stm03.js';

// node_modules/.pnpm/@zag-js+dom-query@1.39.1/node_modules/@zag-js/dom-query/dist/caret.mjs
function setCaretToEnd(input) {
	if (!input) return;
	try {
		if (input.ownerDocument.activeElement !== input) return;
		const len = input.value.length;
		input.setSelectionRange(len, len);
	} catch {}
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/combobox/modules/root-context.js
var RootContext = createContext();
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/combobox/anatomy/clear-trigger.svelte
function Clear_trigger($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const combobox = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$15 = derived(() => mergeProps(combobox().getClearTriggerProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$15());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><button${attributes({ ...attributes$15() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></button>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/combobox/anatomy/content.svelte
function Content($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const combobox = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$14 = derived(() => mergeProps(combobox().getContentProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$14());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><ul${attributes({ ...attributes$14() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></ul>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/combobox/anatomy/control.svelte
function Control($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const combobox = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$13 = derived(() => mergeProps(combobox().getControlProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$13());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><div${attributes({ ...attributes$13() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/combobox/anatomy/input.svelte
function Input($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const combobox = RootContext.consume();
		const element = derived(() => props.element), rest = derived(() => exclude_from_object(props, ["element"]));
		const attributes$12 = derived(() => mergeProps(combobox().getInputProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$12());
			$$renderer.push(`<!---->`);
		} else $$renderer.push(`<!--[-1--><input${attributes({ ...attributes$12() }, void 0, void 0, void 0, 4)}/>`);
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/combobox/modules/item-group-context.js
var ItemGroupContext = createContext();
var parts = createAnatomy("combobox").parts("root", "clearTrigger", "content", "control", "input", "item", "itemGroup", "itemGroupLabel", "itemIndicator", "itemText", "label", "list", "positioner", "trigger").build();
// node_modules/.pnpm/@zag-js+combobox@1.39.1/node_modules/@zag-js/combobox/dist/combobox.collection.mjs
var collection = (options) => {
	return new ListCollection(options);
};
collection.empty = () => {
	return new ListCollection({ items: [] });
};
// node_modules/.pnpm/@zag-js+combobox@1.39.1/node_modules/@zag-js/combobox/dist/combobox.dom.mjs
var getRootId = (ctx) => ctx.ids?.root ?? `combobox:${ctx.id}`;
var getLabelId = (ctx) => ctx.ids?.label ?? `combobox:${ctx.id}:label`;
var getControlId = (ctx) => ctx.ids?.control ?? `combobox:${ctx.id}:control`;
var getInputId = (ctx) => ctx.ids?.input ?? `combobox:${ctx.id}:input`;
var getContentId = (ctx) => ctx.ids?.content ?? `combobox:${ctx.id}:content`;
var getPositionerId = (ctx) => ctx.ids?.positioner ?? `combobox:${ctx.id}:popper`;
var getTriggerId = (ctx) => ctx.ids?.trigger ?? `combobox:${ctx.id}:toggle-btn`;
var getClearTriggerId = (ctx) => ctx.ids?.clearTrigger ?? `combobox:${ctx.id}:clear-btn`;
var getItemGroupId = (ctx, id) => ctx.ids?.itemGroup?.(id) ?? `combobox:${ctx.id}:optgroup:${id}`;
var getItemGroupLabelId = (ctx, id) => ctx.ids?.itemGroupLabel?.(id) ?? `combobox:${ctx.id}:optgroup-label:${id}`;
var getItemId = (ctx, id) => ctx.ids?.item?.(id) ?? `combobox:${ctx.id}:option:${id}`;
var getContentEl = (ctx) => ctx.getById(getContentId(ctx));
var getInputEl = (ctx) => ctx.getById(getInputId(ctx));
var getPositionerEl = (ctx) => ctx.getById(getPositionerId(ctx));
var getControlEl = (ctx) => ctx.getById(getControlId(ctx));
var getTriggerEl = (ctx) => ctx.getById(getTriggerId(ctx));
var getClearTriggerEl = (ctx) => ctx.getById(getClearTriggerId(ctx));
var getItemEl = (ctx, value) => {
	if (value == null) return null;
	const selector = `[role=option][data-value="${CSS.escape(value)}"]`;
	return query(getContentEl(ctx), selector);
};
var focusInputEl = (ctx) => {
	const inputEl = getInputEl(ctx);
	if (!ctx.isActiveElement(inputEl)) inputEl?.focus({ preventScroll: true });
	setCaretToEnd(inputEl);
};
var focusTriggerEl = (ctx) => {
	const triggerEl = getTriggerEl(ctx);
	if (ctx.isActiveElement(triggerEl)) return;
	triggerEl?.focus({ preventScroll: true });
};
// node_modules/.pnpm/@zag-js+combobox@1.39.1/node_modules/@zag-js/combobox/dist/combobox.connect.mjs
function connect(service, normalize) {
	const { context, prop, state, send, scope, computed, event } = service;
	const translations = prop("translations");
	const collection = prop("collection");
	const disabled = !!prop("disabled");
	const interactive = computed("isInteractive");
	const invalid = !!prop("invalid");
	const required = !!prop("required");
	const readOnly = !!prop("readOnly");
	const open = state.hasTag("open");
	const focused = state.hasTag("focused");
	const composite = prop("composite");
	const highlightedValue = context.get("highlightedValue");
	const popperStyles = getPlacementStyles({
		...prop("positioning"),
		placement: context.get("currentPlacement")
	});
	function getItemState(props) {
		const itemDisabled = collection.getItemDisabled(props.item);
		const value = collection.getItemValue(props.item);
		ensure(value, () => `[zag-js] No value found for item ${JSON.stringify(props.item)}`);
		return {
			value,
			disabled: Boolean(disabled || itemDisabled),
			highlighted: highlightedValue === value,
			selected: context.get("value").includes(value)
		};
	}
	return {
		focused,
		open,
		inputValue: context.get("inputValue"),
		highlightedValue,
		highlightedItem: context.get("highlightedItem"),
		value: context.get("value"),
		valueAsString: computed("valueAsString"),
		hasSelectedItems: computed("hasSelectedItems"),
		selectedItems: computed("selectedItems"),
		collection: prop("collection"),
		multiple: !!prop("multiple"),
		disabled: !!disabled,
		syncSelectedItems() {
			send({ type: "SELECTED_ITEMS.SYNC" });
		},
		reposition(options = {}) {
			send({
				type: "POSITIONING.SET",
				options
			});
		},
		setHighlightValue(value) {
			send({
				type: "HIGHLIGHTED_VALUE.SET",
				value
			});
		},
		clearHighlightValue() {
			send({ type: "HIGHLIGHTED_VALUE.CLEAR" });
		},
		selectValue(value) {
			send({
				type: "ITEM.SELECT",
				value
			});
		},
		setValue(value) {
			send({
				type: "VALUE.SET",
				value
			});
		},
		setInputValue(value, reason = "script") {
			send({
				type: "INPUT_VALUE.SET",
				value,
				src: reason
			});
		},
		clearValue(value) {
			if (value != null) send({
				type: "ITEM.CLEAR",
				value
			});
			else send({ type: "VALUE.CLEAR" });
		},
		focus() {
			getInputEl(scope)?.focus();
		},
		setOpen(nextOpen, reason = "script") {
			if (state.hasTag("open") === nextOpen) return;
			send({
				type: nextOpen ? "OPEN" : "CLOSE",
				src: reason
			});
		},
		getRootProps() {
			return normalize.element({
				...parts.root.attrs,
				dir: prop("dir"),
				id: getRootId(scope),
				"data-invalid": dataAttr(invalid),
				"data-readonly": dataAttr(readOnly)
			});
		},
		getLabelProps() {
			return normalize.label({
				...parts.label.attrs,
				dir: prop("dir"),
				htmlFor: getInputId(scope),
				id: getLabelId(scope),
				"data-readonly": dataAttr(readOnly),
				"data-disabled": dataAttr(disabled),
				"data-invalid": dataAttr(invalid),
				"data-required": dataAttr(required),
				"data-focus": dataAttr(focused),
				onClick(event2) {
					if (composite) return;
					event2.preventDefault();
					getTriggerEl(scope)?.focus({ preventScroll: true });
				}
			});
		},
		getControlProps() {
			return normalize.element({
				...parts.control.attrs,
				dir: prop("dir"),
				id: getControlId(scope),
				"data-state": open ? "open" : "closed",
				"data-focus": dataAttr(focused),
				"data-disabled": dataAttr(disabled),
				"data-invalid": dataAttr(invalid)
			});
		},
		getPositionerProps() {
			return normalize.element({
				...parts.positioner.attrs,
				dir: prop("dir"),
				id: getPositionerId(scope),
				style: popperStyles.floating
			});
		},
		getInputProps() {
			return normalize.input({
				...parts.input.attrs,
				dir: prop("dir"),
				"aria-invalid": ariaAttr(invalid),
				"data-invalid": dataAttr(invalid),
				"data-autofocus": dataAttr(prop("autoFocus")),
				name: prop("name"),
				form: prop("form"),
				disabled,
				required: prop("required"),
				autoComplete: "off",
				autoCorrect: "off",
				autoCapitalize: "none",
				spellCheck: "false",
				readOnly,
				placeholder: prop("placeholder"),
				id: getInputId(scope),
				type: "text",
				role: "combobox",
				defaultValue: context.get("inputValue"),
				"aria-autocomplete": computed("autoComplete") ? "both" : "list",
				"aria-controls": getContentId(scope),
				"aria-expanded": open,
				"data-state": open ? "open" : "closed",
				"aria-activedescendant": highlightedValue ? getItemId(scope, highlightedValue) : void 0,
				onClick(event2) {
					if (event2.defaultPrevented) return;
					if (!prop("openOnClick")) return;
					if (!interactive) return;
					send({
						type: "INPUT.CLICK",
						src: "input-click"
					});
				},
				onFocus() {
					if (disabled) return;
					send({ type: "INPUT.FOCUS" });
				},
				onBlur() {
					if (disabled) return;
					send({ type: "INPUT.BLUR" });
				},
				onChange(event2) {
					send({
						type: "INPUT.CHANGE",
						value: event2.currentTarget.value,
						src: "input-change"
					});
				},
				onKeyDown(event2) {
					if (event2.defaultPrevented) return;
					if (!interactive) return;
					if (event2.ctrlKey || event2.shiftKey || isComposingEvent(event2)) return;
					const openOnKeyPress = prop("openOnKeyPress");
					const isModifierKey = event2.ctrlKey || event2.metaKey || event2.shiftKey;
					const keypress = true;
					const exec = {
						ArrowDown(event3) {
							if (!openOnKeyPress && !open) return;
							send({
								type: event3.altKey ? "OPEN" : "INPUT.ARROW_DOWN",
								keypress,
								src: "arrow-key"
							});
							event3.preventDefault();
						},
						ArrowUp() {
							if (!openOnKeyPress && !open) return;
							send({
								type: event2.altKey ? "CLOSE" : "INPUT.ARROW_UP",
								keypress,
								src: "arrow-key"
							});
							event2.preventDefault();
						},
						Home(event3) {
							if (isModifierKey) return;
							send({
								type: "INPUT.HOME",
								keypress
							});
							if (open) event3.preventDefault();
						},
						End(event3) {
							if (isModifierKey) return;
							send({
								type: "INPUT.END",
								keypress
							});
							if (open) event3.preventDefault();
						},
						Enter(event3) {
							send({
								type: "INPUT.ENTER",
								keypress,
								src: "item-select"
							});
							const submittable = computed("isCustomValue") && prop("allowCustomValue");
							const hasHighlight = highlightedValue != null;
							const alwaysSubmit = prop("alwaysSubmitOnEnter");
							if (open && !submittable && !alwaysSubmit && hasHighlight) event3.preventDefault();
							if (highlightedValue == null) return;
							const itemEl = getItemEl(scope, highlightedValue);
							if (isAnchorElement(itemEl)) prop("navigate")?.({
								value: highlightedValue,
								node: itemEl,
								href: itemEl.href
							});
						},
						Escape() {
							send({
								type: "INPUT.ESCAPE",
								keypress,
								src: "escape-key"
							});
							event2.preventDefault();
						}
					}[getEventKey(event2, { dir: prop("dir") })];
					exec?.(event2);
				}
			});
		},
		getTriggerProps(props = {}) {
			return normalize.button({
				...parts.trigger.attrs,
				dir: prop("dir"),
				id: getTriggerId(scope),
				"aria-haspopup": composite ? "listbox" : "dialog",
				type: "button",
				tabIndex: props.focusable ? void 0 : -1,
				"aria-label": translations.triggerLabel,
				"aria-expanded": open,
				"data-state": open ? "open" : "closed",
				"aria-controls": open ? getContentId(scope) : void 0,
				disabled,
				"data-invalid": dataAttr(invalid),
				"data-focusable": dataAttr(props.focusable),
				"data-readonly": dataAttr(readOnly),
				"data-disabled": dataAttr(disabled),
				onFocus() {
					if (!props.focusable) return;
					send({
						type: "INPUT.FOCUS",
						src: "trigger"
					});
				},
				onClick(event2) {
					if (event2.defaultPrevented) return;
					if (!interactive) return;
					if (!isLeftClick(event2)) return;
					send({
						type: "TRIGGER.CLICK",
						src: "trigger-click"
					});
				},
				onPointerDown(event2) {
					if (!interactive) return;
					if (event2.pointerType === "touch") return;
					if (!isLeftClick(event2)) return;
					event2.preventDefault();
					queueMicrotask(() => {
						focusInputEl(scope);
					});
				},
				onKeyDown(event2) {
					if (event2.defaultPrevented) return;
					if (composite) return;
					const exec = {
						ArrowDown() {
							send({
								type: "INPUT.ARROW_DOWN",
								src: "arrow-key"
							});
						},
						ArrowUp() {
							send({
								type: "INPUT.ARROW_UP",
								src: "arrow-key"
							});
						}
					}[getEventKey(event2, { dir: prop("dir") })];
					if (exec) {
						exec(event2);
						event2.preventDefault();
					}
				}
			});
		},
		getContentProps() {
			return normalize.element({
				...parts.content.attrs,
				dir: prop("dir"),
				id: getContentId(scope),
				role: !composite ? "dialog" : "listbox",
				tabIndex: -1,
				hidden: !open,
				"data-state": open ? "open" : "closed",
				"data-placement": context.get("currentPlacement"),
				"aria-labelledby": getLabelId(scope),
				"aria-multiselectable": prop("multiple") && composite ? true : void 0,
				"data-empty": dataAttr(collection.size === 0),
				onPointerDown(event2) {
					if (!isLeftClick(event2)) return;
					event2.preventDefault();
				}
			});
		},
		getListProps() {
			return normalize.element({
				...parts.list.attrs,
				role: !composite ? "listbox" : void 0,
				"data-empty": dataAttr(collection.size === 0),
				"aria-labelledby": getLabelId(scope),
				"aria-multiselectable": prop("multiple") && !composite ? true : void 0
			});
		},
		getClearTriggerProps() {
			return normalize.button({
				...parts.clearTrigger.attrs,
				dir: prop("dir"),
				id: getClearTriggerId(scope),
				type: "button",
				tabIndex: -1,
				disabled,
				"data-invalid": dataAttr(invalid),
				"aria-label": translations.clearTriggerLabel,
				"aria-controls": getInputId(scope),
				hidden: !context.get("value").length,
				onPointerDown(event2) {
					if (!isLeftClick(event2)) return;
					event2.preventDefault();
				},
				onClick(event2) {
					if (event2.defaultPrevented) return;
					if (!interactive) return;
					send({
						type: "VALUE.CLEAR",
						src: "clear-trigger"
					});
				}
			});
		},
		getItemState,
		getItemProps(props) {
			const itemState = getItemState(props);
			const value = itemState.value;
			return normalize.element({
				...parts.item.attrs,
				dir: prop("dir"),
				id: getItemId(scope, value),
				role: "option",
				tabIndex: -1,
				"data-highlighted": dataAttr(itemState.highlighted),
				"data-state": itemState.selected ? "checked" : "unchecked",
				"aria-selected": ariaAttr(itemState.selected),
				"aria-disabled": ariaAttr(itemState.disabled),
				"data-disabled": dataAttr(itemState.disabled),
				"data-value": itemState.value,
				onPointerMove() {
					if (itemState.disabled) return;
					if (itemState.highlighted) return;
					send({
						type: "ITEM.POINTER_MOVE",
						value
					});
				},
				onPointerLeave() {
					if (props.persistFocus) return;
					if (itemState.disabled) return;
					if (!event.previous()?.type.includes("POINTER")) return;
					send({
						type: "ITEM.POINTER_LEAVE",
						value
					});
				},
				onClick(event2) {
					if (isDownloadingEvent(event2)) return;
					if (isOpeningInNewTab(event2)) return;
					if (isContextMenuEvent(event2)) return;
					if (itemState.disabled) return;
					send({
						type: "ITEM.CLICK",
						src: "item-select",
						value
					});
				}
			});
		},
		getItemTextProps(props) {
			const itemState = getItemState(props);
			return normalize.element({
				...parts.itemText.attrs,
				dir: prop("dir"),
				"data-state": itemState.selected ? "checked" : "unchecked",
				"data-disabled": dataAttr(itemState.disabled),
				"data-highlighted": dataAttr(itemState.highlighted)
			});
		},
		getItemIndicatorProps(props) {
			const itemState = getItemState(props);
			return normalize.element({
				"aria-hidden": true,
				...parts.itemIndicator.attrs,
				dir: prop("dir"),
				"data-state": itemState.selected ? "checked" : "unchecked",
				hidden: !itemState.selected
			});
		},
		getItemGroupProps(props) {
			const { id } = props;
			return normalize.element({
				...parts.itemGroup.attrs,
				dir: prop("dir"),
				id: getItemGroupId(scope, id),
				"aria-labelledby": getItemGroupLabelId(scope, id),
				"data-empty": dataAttr(collection.size === 0),
				role: "group"
			});
		},
		getItemGroupLabelProps(props) {
			const { htmlFor } = props;
			return normalize.element({
				...parts.itemGroupLabel.attrs,
				dir: prop("dir"),
				id: getItemGroupLabelId(scope, htmlFor),
				role: "presentation"
			});
		}
	};
}
// node_modules/.pnpm/@zag-js+live-region@1.39.1/node_modules/@zag-js/live-region/dist/index.mjs
var ID = "__live-region__";
function createLiveRegion(opts = {}) {
	const { level = "polite", document: doc = document, root, delay: _delay = 0 } = opts;
	const win = doc.defaultView ?? window;
	const parent = root ?? doc.body;
	function announce(message, delay) {
		doc.getElementById(ID)?.remove();
		delay = delay ?? _delay;
		const region = doc.createElement("span");
		region.id = ID;
		region.dataset.liveAnnouncer = "true";
		const role = level !== "assertive" ? "status" : "alert";
		region.setAttribute("aria-live", level);
		region.setAttribute("role", role);
		Object.assign(region.style, {
			border: "0",
			clip: "rect(0 0 0 0)",
			height: "1px",
			margin: "-1px",
			overflow: "hidden",
			padding: "0",
			position: "absolute",
			width: "1px",
			whiteSpace: "nowrap",
			wordWrap: "normal"
		});
		parent.appendChild(region);
		win.setTimeout(() => {
			region.textContent = message;
		}, delay);
	}
	function destroy() {
		doc.getElementById(ID)?.remove();
	}
	return {
		announce,
		destroy,
		toJSON() {
			return ID;
		}
	};
}
// node_modules/.pnpm/@zag-js+combobox@1.39.1/node_modules/@zag-js/combobox/dist/combobox.machine.mjs
var { guards, createMachine, choose } = setup();
var { and, not } = guards;
var machine = createMachine({
	props({ props }) {
		return {
			loopFocus: true,
			openOnClick: false,
			defaultValue: [],
			defaultInputValue: "",
			closeOnSelect: !props.multiple,
			allowCustomValue: false,
			alwaysSubmitOnEnter: false,
			inputBehavior: "none",
			selectionBehavior: props.multiple ? "clear" : "replace",
			openOnKeyPress: true,
			openOnChange: true,
			composite: true,
			navigate({ node }) {
				clickIfLink(node);
			},
			collection: collection.empty(),
			...props,
			positioning: {
				placement: "bottom",
				sameWidth: true,
				...props.positioning
			},
			translations: {
				triggerLabel: "Toggle suggestions",
				clearTriggerLabel: "Clear value",
				...props.translations
			}
		};
	},
	initialState({ prop }) {
		return prop("open") || prop("defaultOpen") ? "open.suggesting" : "closed.idle";
	},
	context({ prop, bindable, getContext, getEvent }) {
		const initialValue = prop("value") ?? prop("defaultValue") ?? [];
		const initialSelectedItems = prop("collection").findMany(initialValue);
		return {
			currentPlacement: bindable(() => ({ defaultValue: void 0 })),
			value: bindable(() => ({
				defaultValue: prop("defaultValue"),
				value: prop("value"),
				isEqual,
				hash(value) {
					return value.join(",");
				},
				onChange(value) {
					const context = getContext();
					const collection2 = prop("collection");
					const selectedItemMap = context.get("selectedItemMap");
					const proposed = deriveSelectionState({
						values: value,
						collection: collection2,
						selectedItemMap
					});
					const effectiveValue = prop("value") ?? value;
					const effective = effectiveValue === value ? proposed : deriveSelectionState({
						values: effectiveValue,
						collection: collection2,
						selectedItemMap: proposed.nextSelectedItemMap
					});
					context.set("selectedItemMap", effective.nextSelectedItemMap);
					prop("onValueChange")?.({
						value,
						items: proposed.selectedItems
					});
				}
			})),
			highlightedValue: bindable(() => ({
				defaultValue: prop("defaultHighlightedValue") || null,
				value: prop("highlightedValue"),
				onChange(value) {
					const item = prop("collection").find(value);
					prop("onHighlightChange")?.({
						highlightedValue: value,
						highlightedItem: item
					});
				}
			})),
			inputValue: bindable(() => {
				let inputValue = prop("inputValue") || prop("defaultInputValue");
				const value = prop("value") || prop("defaultValue");
				if (!inputValue.trim() && !prop("multiple")) {
					const valueAsString = prop("collection").stringifyMany(value);
					inputValue = match(prop("selectionBehavior"), {
						preserve: inputValue || valueAsString,
						replace: valueAsString,
						clear: ""
					});
				}
				return {
					defaultValue: inputValue,
					value: prop("inputValue"),
					onChange(value2) {
						const event = getEvent();
						const reason = (event.previousEvent || event).src;
						prop("onInputValueChange")?.({
							inputValue: value2,
							reason
						});
					}
				};
			}),
			highlightedItem: bindable(() => {
				const highlightedValue = prop("highlightedValue");
				return { defaultValue: prop("collection").find(highlightedValue) };
			}),
			selectedItemMap: bindable(() => {
				return { defaultValue: createSelectedItemMap({
					selectedItems: initialSelectedItems,
					collection: prop("collection")
				}) };
			})
		};
	},
	computed: {
		isInputValueEmpty: ({ context }) => context.get("inputValue").length === 0,
		isInteractive: ({ prop }) => !(prop("readOnly") || prop("disabled")),
		autoComplete: ({ prop }) => prop("inputBehavior") === "autocomplete",
		autoHighlight: ({ prop }) => prop("inputBehavior") === "autohighlight",
		hasSelectedItems: ({ context }) => context.get("value").length > 0,
		selectedItems: ({ context, prop }) => resolveSelectedItems({
			values: context.get("value"),
			collection: prop("collection"),
			selectedItemMap: context.get("selectedItemMap")
		}),
		valueAsString: ({ computed, prop }) => prop("collection").stringifyItems(computed("selectedItems")),
		isCustomValue: ({ context, computed }) => context.get("inputValue") !== computed("valueAsString")
	},
	watch({ context, prop, track, action, send }) {
		track([() => context.hash("value")], () => {
			action(["syncSelectedItems"]);
		});
		track([() => context.get("inputValue")], () => {
			action(["syncInputValue"]);
		});
		track([() => context.get("highlightedValue")], () => {
			action([
				"syncHighlightedItem",
				"autofillInputValue",
				"announceHighlightedItem"
			]);
		});
		track([() => prop("open")], () => {
			action(["toggleVisibility"]);
		});
		track([() => prop("collection").toString()], () => {
			send({ type: "CHILDREN_CHANGE" });
		});
	},
	on: {
		"SELECTED_ITEMS.SYNC": { actions: ["syncSelectedItems"] },
		"HIGHLIGHTED_VALUE.SET": { actions: ["setHighlightedValue"] },
		"HIGHLIGHTED_VALUE.CLEAR": { actions: ["clearHighlightedValue"] },
		"ITEM.SELECT": { actions: ["selectItem"] },
		"ITEM.CLEAR": { actions: ["clearItem"] },
		"VALUE.SET": { actions: ["setValue"] },
		"INPUT_VALUE.SET": { actions: ["setInputValue"] },
		"POSITIONING.SET": { actions: ["reposition"] }
	},
	entry: choose([{
		guard: "autoFocus",
		actions: ["setInitialFocus"]
	}]),
	states: {
		closed: {
			tags: ["closed"],
			initial: "idle",
			states: {
				idle: {
					tags: ["idle"],
					entry: ["scrollContentToTop", "clearHighlightedValue"],
					on: {
						"CONTROLLED.OPEN": { target: "open.interacting" },
						"TRIGGER.CLICK": [{
							guard: "isOpenControlled",
							actions: [
								"setInitialFocus",
								"highlightFirstSelectedItem",
								"invokeOnOpen"
							]
						}, {
							target: "open.interacting",
							actions: [
								"setInitialFocus",
								"highlightFirstSelectedItem",
								"invokeOnOpen"
							]
						}],
						"INPUT.CLICK": [{
							guard: "isOpenControlled",
							actions: ["highlightFirstSelectedItem", "invokeOnOpen"]
						}, {
							target: "open.interacting",
							actions: ["highlightFirstSelectedItem", "invokeOnOpen"]
						}],
						"INPUT.FOCUS": { target: "focused" },
						OPEN: [{
							guard: "isOpenControlled",
							actions: ["invokeOnOpen"]
						}, {
							target: "open.interacting",
							actions: ["invokeOnOpen"]
						}],
						"VALUE.CLEAR": {
							target: "focused",
							actions: [
								"clearInputValue",
								"clearSelectedItems",
								"setInitialFocus"
							]
						}
					}
				},
				focused: {
					tags: ["focused"],
					entry: ["scrollContentToTop", "clearHighlightedValue"],
					on: {
						"CONTROLLED.OPEN": [{
							guard: "isChangeEvent",
							target: "open.suggesting"
						}, { target: "open.interacting" }],
						"INPUT.CHANGE": [
							{
								guard: and("isOpenControlled", "openOnChange"),
								actions: [
									"setInputValue",
									"invokeOnOpen",
									"highlightFirstItemIfNeeded"
								]
							},
							{
								guard: "openOnChange",
								target: "open.suggesting",
								actions: [
									"setInputValue",
									"invokeOnOpen",
									"highlightFirstItemIfNeeded"
								]
							},
							{ actions: ["setInputValue"] }
						],
						"LAYER.INTERACT_OUTSIDE": { target: "idle" },
						"INPUT.ESCAPE": {
							guard: and("isCustomValue", not("allowCustomValue")),
							actions: ["revertInputValue"]
						},
						"INPUT.BLUR": { target: "idle" },
						"INPUT.CLICK": [{
							guard: "isOpenControlled",
							actions: ["highlightFirstSelectedItem", "invokeOnOpen"]
						}, {
							target: "open.interacting",
							actions: ["highlightFirstSelectedItem", "invokeOnOpen"]
						}],
						"TRIGGER.CLICK": [{
							guard: "isOpenControlled",
							actions: [
								"setInitialFocus",
								"highlightFirstSelectedItem",
								"invokeOnOpen"
							]
						}, {
							target: "open.interacting",
							actions: [
								"setInitialFocus",
								"highlightFirstSelectedItem",
								"invokeOnOpen"
							]
						}],
						"INPUT.ARROW_DOWN": [
							{
								guard: and("isOpenControlled", "autoComplete"),
								actions: ["invokeOnOpen"]
							},
							{
								guard: "autoComplete",
								target: "open.interacting",
								actions: ["invokeOnOpen"]
							},
							{
								guard: "isOpenControlled",
								actions: ["highlightFirstOrSelectedItem", "invokeOnOpen"]
							},
							{
								target: "open.interacting",
								actions: ["highlightFirstOrSelectedItem", "invokeOnOpen"]
							}
						],
						"INPUT.ARROW_UP": [
							{
								guard: and("isOpenControlled", "autoComplete"),
								actions: ["invokeOnOpen"]
							},
							{
								guard: "autoComplete",
								target: "open.interacting",
								actions: ["invokeOnOpen"]
							},
							{
								guard: "isOpenControlled",
								actions: ["highlightLastOrSelectedItem", "invokeOnOpen"]
							},
							{
								target: "open.interacting",
								actions: ["highlightLastOrSelectedItem", "invokeOnOpen"]
							}
						],
						OPEN: [{
							guard: "isOpenControlled",
							actions: ["invokeOnOpen"]
						}, {
							target: "open.interacting",
							actions: ["invokeOnOpen"]
						}],
						"VALUE.CLEAR": { actions: ["clearInputValue", "clearSelectedItems"] }
					}
				}
			}
		},
		open: {
			tags: ["open", "focused"],
			entry: ["setInitialFocus"],
			effects: [
				"trackFocusVisible",
				"scrollToHighlightedItem",
				"trackDismissableLayer",
				"trackPlacement",
				"trackLiveRegion"
			],
			on: {
				"CONTROLLED.CLOSE": [{
					guard: "restoreFocus",
					target: "closed.focused",
					actions: ["setFinalFocus"]
				}, { target: "closed.idle" }],
				"INPUT.ENTER": [
					{
						guard: and("isOpenControlled", "isCustomValue", not("hasHighlightedItem"), not("allowCustomValue")),
						actions: ["revertInputValue", "invokeOnClose"]
					},
					{
						guard: and("isCustomValue", not("hasHighlightedItem"), not("allowCustomValue")),
						target: "closed.focused",
						actions: ["revertInputValue", "invokeOnClose"]
					},
					{
						guard: and("isOpenControlled", "closeOnSelect"),
						actions: ["selectHighlightedItem", "invokeOnClose"]
					},
					{
						guard: "closeOnSelect",
						target: "closed.focused",
						actions: [
							"selectHighlightedItem",
							"invokeOnClose",
							"setFinalFocus"
						]
					},
					{ actions: ["selectHighlightedItem"] }
				],
				"ITEM.CLICK": [
					{
						guard: and("isOpenControlled", "closeOnSelect"),
						actions: ["selectItem", "invokeOnClose"]
					},
					{
						guard: "closeOnSelect",
						target: "closed.focused",
						actions: [
							"selectItem",
							"invokeOnClose",
							"setFinalFocus"
						]
					},
					{ actions: ["selectItem"] }
				],
				"TRIGGER.CLICK": [{
					guard: "isOpenControlled",
					actions: ["invokeOnClose"]
				}, {
					target: "closed.focused",
					actions: ["invokeOnClose"]
				}],
				"LAYER.INTERACT_OUTSIDE": [
					{
						guard: and("isOpenControlled", "isCustomValue", not("allowCustomValue")),
						actions: ["revertInputValue", "invokeOnClose"]
					},
					{
						guard: and("isCustomValue", not("allowCustomValue")),
						target: "closed.idle",
						actions: ["revertInputValue", "invokeOnClose"]
					},
					{
						guard: "isOpenControlled",
						actions: ["invokeOnClose"]
					},
					{
						target: "closed.idle",
						actions: ["invokeOnClose"]
					}
				],
				CLOSE: [{
					guard: "isOpenControlled",
					actions: ["invokeOnClose"]
				}, {
					target: "closed.focused",
					actions: ["invokeOnClose", "setFinalFocus"]
				}],
				"VALUE.CLEAR": [{
					guard: "isOpenControlled",
					actions: [
						"clearInputValue",
						"clearSelectedItems",
						"invokeOnClose"
					]
				}, {
					target: "closed.focused",
					actions: [
						"clearInputValue",
						"clearSelectedItems",
						"invokeOnClose",
						"setFinalFocus"
					]
				}]
			},
			initial: "interacting",
			states: {
				interacting: { on: {
					CHILDREN_CHANGE: [{
						guard: "isHighlightedItemRemoved",
						actions: ["clearHighlightedValue"]
					}, { actions: ["scrollToHighlightedItem"] }],
					"INPUT.HOME": { actions: ["highlightFirstItem"] },
					"INPUT.END": { actions: ["highlightLastItem"] },
					"INPUT.ARROW_DOWN": [{
						guard: and("autoComplete", "isLastItemHighlighted"),
						actions: ["clearHighlightedValue", "scrollContentToTop"]
					}, { actions: ["highlightNextItem"] }],
					"INPUT.ARROW_UP": [{
						guard: and("autoComplete", "isFirstItemHighlighted"),
						actions: ["clearHighlightedValue"]
					}, { actions: ["highlightPrevItem"] }],
					"INPUT.CHANGE": [{
						guard: "autoComplete",
						target: "suggesting",
						actions: ["setInputValue"]
					}, {
						target: "suggesting",
						actions: ["clearHighlightedValue", "setInputValue"]
					}],
					"ITEM.POINTER_MOVE": { actions: ["setHighlightedValue"] },
					"ITEM.POINTER_LEAVE": { actions: ["clearHighlightedValue"] },
					"LAYER.ESCAPE": [
						{
							guard: and("isOpenControlled", "autoComplete"),
							actions: ["syncInputValue", "invokeOnClose"]
						},
						{
							guard: "autoComplete",
							target: "closed.focused",
							actions: ["syncInputValue", "invokeOnClose"]
						},
						{
							guard: "isOpenControlled",
							actions: ["invokeOnClose"]
						},
						{
							target: "closed.focused",
							actions: ["invokeOnClose", "setFinalFocus"]
						}
					]
				} },
				suggesting: { on: {
					CHILDREN_CHANGE: [
						{
							guard: and("isHighlightedItemRemoved", "hasCollectionItems", "autoHighlight"),
							actions: ["clearHighlightedValue", "highlightFirstItem"]
						},
						{
							guard: "isHighlightedItemRemoved",
							actions: ["clearHighlightedValue"]
						},
						{
							guard: "autoHighlight",
							actions: ["highlightFirstItem"]
						}
					],
					"INPUT.ARROW_DOWN": {
						target: "interacting",
						actions: ["highlightNextItem"]
					},
					"INPUT.ARROW_UP": {
						target: "interacting",
						actions: ["highlightPrevItem"]
					},
					"INPUT.HOME": {
						target: "interacting",
						actions: ["highlightFirstItem"]
					},
					"INPUT.END": {
						target: "interacting",
						actions: ["highlightLastItem"]
					},
					"INPUT.CHANGE": { actions: ["setInputValue"] },
					"LAYER.ESCAPE": [{
						guard: "isOpenControlled",
						actions: ["invokeOnClose"]
					}, {
						target: "closed.focused",
						actions: ["invokeOnClose"]
					}],
					"ITEM.POINTER_MOVE": {
						target: "interacting",
						actions: ["setHighlightedValue"]
					},
					"ITEM.POINTER_LEAVE": { actions: ["clearHighlightedValue"] }
				} }
			}
		}
	},
	implementations: {
		guards: {
			isInputValueEmpty: ({ computed }) => computed("isInputValueEmpty"),
			autoComplete: ({ computed, prop }) => computed("autoComplete") && !prop("multiple"),
			autoHighlight: ({ computed }) => computed("autoHighlight"),
			isFirstItemHighlighted: ({ prop, context }) => prop("collection").firstValue === context.get("highlightedValue"),
			isLastItemHighlighted: ({ prop, context }) => prop("collection").lastValue === context.get("highlightedValue"),
			isCustomValue: ({ computed }) => computed("isCustomValue"),
			allowCustomValue: ({ prop }) => !!prop("allowCustomValue"),
			hasHighlightedItem: ({ context }) => context.get("highlightedValue") != null,
			closeOnSelect: ({ prop }) => !!prop("closeOnSelect"),
			isOpenControlled: ({ prop }) => prop("open") != null,
			openOnChange: ({ prop, context }) => {
				const openOnChange = prop("openOnChange");
				if (isBoolean(openOnChange)) return openOnChange;
				return !!openOnChange?.({ inputValue: context.get("inputValue") });
			},
			restoreFocus: ({ event }) => {
				const restoreFocus = event.restoreFocus ?? event.previousEvent?.restoreFocus;
				return restoreFocus == null ? true : !!restoreFocus;
			},
			isChangeEvent: ({ event }) => event.previousEvent?.type === "INPUT.CHANGE",
			autoFocus: ({ prop }) => !!prop("autoFocus"),
			isHighlightedItemRemoved: ({ prop, context }) => !prop("collection").has(context.get("highlightedValue")),
			hasCollectionItems: ({ prop }) => prop("collection").size > 0
		},
		effects: {
			trackFocusVisible({ scope }) {
				return trackFocusVisible({ root: scope.getRootNode?.() });
			},
			trackDismissableLayer({ send, prop, scope }) {
				if (prop("disableLayer")) return;
				const contentEl = () => getContentEl(scope);
				return trackDismissableElement(contentEl, {
					type: "listbox",
					defer: true,
					exclude: () => [
						getInputEl(scope),
						getTriggerEl(scope),
						getClearTriggerEl(scope)
					],
					onFocusOutside: prop("onFocusOutside"),
					onPointerDownOutside: prop("onPointerDownOutside"),
					onInteractOutside: prop("onInteractOutside"),
					onEscapeKeyDown(event) {
						event.preventDefault();
						event.stopPropagation();
						send({
							type: "LAYER.ESCAPE",
							src: "escape-key"
						});
					},
					onDismiss() {
						send({
							type: "LAYER.INTERACT_OUTSIDE",
							src: "interact-outside",
							restoreFocus: false
						});
					}
				});
			},
			trackLiveRegion({ refs, scope }) {
				const liveRegion = createLiveRegion({
					level: "assertive",
					document: scope.getDoc()
				});
				refs.set("liveRegion", liveRegion);
				return () => liveRegion.destroy();
			},
			trackPlacement({ context, prop, scope }) {
				const anchorEl = () => getControlEl(scope) || getTriggerEl(scope);
				const positionerEl = () => getPositionerEl(scope);
				context.set("currentPlacement", prop("positioning").placement);
				return getPlacement(anchorEl, positionerEl, {
					...prop("positioning"),
					defer: true,
					onComplete(data) {
						context.set("currentPlacement", data.placement);
					}
				});
			},
			scrollToHighlightedItem({ context, prop, scope }) {
				const inputEl = getInputEl(scope);
				let cleanups = [];
				const exec = (immediate) => {
					if (getInteractionModality() === "pointer") return;
					const highlightedValue = context.get("highlightedValue");
					if (!highlightedValue) return;
					const contentEl = getContentEl(scope);
					const scrollToIndexFn = prop("scrollToIndexFn");
					if (scrollToIndexFn) {
						scrollToIndexFn({
							index: prop("collection").indexOf(highlightedValue),
							immediate,
							getElement: () => getItemEl(scope, highlightedValue)
						});
						return;
					}
					const itemEl = getItemEl(scope, highlightedValue);
					const raf_cleanup = raf(() => {
						scrollIntoView(itemEl, {
							rootEl: contentEl,
							block: "nearest"
						});
					});
					cleanups.push(raf_cleanup);
				};
				const rafCleanup = raf(() => {
					setInteractionModality("virtual");
					exec(true);
				});
				cleanups.push(rafCleanup);
				const observerCleanup = observeAttributes(inputEl, {
					attributes: ["aria-activedescendant"],
					callback: () => exec(false)
				});
				cleanups.push(observerCleanup);
				return () => {
					cleanups.forEach((cleanup) => cleanup());
				};
			}
		},
		actions: {
			reposition({ context, prop, scope, event }) {
				const controlEl = () => getControlEl(scope);
				const positionerEl = () => getPositionerEl(scope);
				getPlacement(controlEl, positionerEl, {
					...prop("positioning"),
					...event.options,
					defer: true,
					listeners: false,
					onComplete(data) {
						context.set("currentPlacement", data.placement);
					}
				});
			},
			setHighlightedValue({ context, event }) {
				if (event.value == null) return;
				context.set("highlightedValue", event.value);
			},
			clearHighlightedValue({ context }) {
				context.set("highlightedValue", null);
			},
			selectHighlightedItem(params) {
				const { context, prop } = params;
				const collection2 = prop("collection");
				const highlightedValue = context.get("highlightedValue");
				if (!highlightedValue || !collection2.has(highlightedValue)) return;
				const nextValue = prop("multiple") ? addOrRemove(context.get("value"), highlightedValue) : [highlightedValue];
				prop("onSelect")?.({
					value: nextValue,
					itemValue: highlightedValue
				});
				context.set("value", nextValue);
				const inputValue = match(prop("selectionBehavior"), {
					preserve: context.get("inputValue"),
					replace: collection2.stringifyMany(nextValue),
					clear: ""
				});
				context.set("inputValue", inputValue);
			},
			scrollToHighlightedItem({ context, prop, scope }) {
				nextTick(() => {
					const highlightedValue = context.get("highlightedValue");
					if (highlightedValue == null) return;
					const itemEl = getItemEl(scope, highlightedValue);
					const contentEl = getContentEl(scope);
					const scrollToIndexFn = prop("scrollToIndexFn");
					if (scrollToIndexFn) {
						scrollToIndexFn({
							index: prop("collection").indexOf(highlightedValue),
							immediate: true,
							getElement: () => getItemEl(scope, highlightedValue)
						});
						return;
					}
					scrollIntoView(itemEl, {
						rootEl: contentEl,
						block: "nearest"
					});
				});
			},
			selectItem(params) {
				const { context, event, flush, prop } = params;
				if (event.value == null) return;
				flush(() => {
					const nextValue = prop("multiple") ? addOrRemove(context.get("value"), event.value) : [event.value];
					prop("onSelect")?.({
						value: nextValue,
						itemValue: event.value
					});
					context.set("value", nextValue);
					const inputValue = match(prop("selectionBehavior"), {
						preserve: context.get("inputValue"),
						replace: prop("collection").stringifyMany(nextValue),
						clear: ""
					});
					context.set("inputValue", inputValue);
				});
			},
			clearItem(params) {
				const { context, event, flush, prop } = params;
				if (event.value == null) return;
				flush(() => {
					const nextValue = remove(context.get("value"), event.value);
					context.set("value", nextValue);
					const inputValue = match(prop("selectionBehavior"), {
						preserve: context.get("inputValue"),
						replace: prop("collection").stringifyMany(nextValue),
						clear: ""
					});
					context.set("inputValue", inputValue);
				});
			},
			setInitialFocus({ scope }) {
				raf(() => {
					focusInputEl(scope);
				});
			},
			setFinalFocus({ scope }) {
				raf(() => {
					if (getTriggerEl(scope)?.dataset.focusable == null) focusInputEl(scope);
					else focusTriggerEl(scope);
				});
			},
			syncInputValue({ context, scope, event }) {
				const inputEl = getInputEl(scope);
				if (!inputEl) return;
				inputEl.value = context.get("inputValue");
				queueMicrotask(() => {
					if (event.current().type === "INPUT.CHANGE") return;
					setCaretToEnd(inputEl);
				});
			},
			setInputValue({ context, event }) {
				context.set("inputValue", event.value);
			},
			clearInputValue({ context }) {
				context.set("inputValue", "");
			},
			revertInputValue({ context, prop, computed }) {
				const selectionBehavior = prop("selectionBehavior");
				const inputValue = match(selectionBehavior, {
					replace: computed("hasSelectedItems") ? computed("valueAsString") : "",
					preserve: context.get("inputValue"),
					clear: ""
				});
				context.set("inputValue", inputValue);
			},
			setValue(params) {
				const { context, flush, event, prop } = params;
				flush(() => {
					context.set("value", event.value);
					const inputValue = match(prop("selectionBehavior"), {
						preserve: context.get("inputValue"),
						replace: prop("collection").stringifyMany(event.value),
						clear: ""
					});
					context.set("inputValue", inputValue);
				});
			},
			clearSelectedItems(params) {
				const { context, flush, prop } = params;
				flush(() => {
					context.set("value", []);
					const inputValue = match(prop("selectionBehavior"), {
						preserve: context.get("inputValue"),
						replace: prop("collection").stringifyMany([]),
						clear: ""
					});
					context.set("inputValue", inputValue);
				});
			},
			scrollContentToTop({ prop, scope }) {
				const scrollToIndexFn = prop("scrollToIndexFn");
				if (scrollToIndexFn) {
					const firstValue = prop("collection").firstValue;
					scrollToIndexFn({
						index: 0,
						immediate: true,
						getElement: () => getItemEl(scope, firstValue)
					});
				} else {
					const contentEl = getContentEl(scope);
					if (!contentEl) return;
					contentEl.scrollTop = 0;
				}
			},
			invokeOnOpen({ prop, event, context }) {
				const reason = getOpenChangeReason(event);
				prop("onOpenChange")?.({
					open: true,
					reason,
					value: context.get("value")
				});
			},
			invokeOnClose({ prop, event, context }) {
				const reason = getOpenChangeReason(event);
				prop("onOpenChange")?.({
					open: false,
					reason,
					value: context.get("value")
				});
			},
			highlightFirstItem({ context, prop, scope }) {
				(getContentEl(scope) ? queueMicrotask : raf)(() => {
					const value = prop("collection").firstValue;
					if (value) context.set("highlightedValue", value);
				});
			},
			highlightFirstItemIfNeeded({ computed, action }) {
				if (!computed("autoHighlight")) return;
				action(["highlightFirstItem"]);
			},
			highlightLastItem({ context, prop, scope }) {
				(getContentEl(scope) ? queueMicrotask : raf)(() => {
					const value = prop("collection").lastValue;
					if (value) context.set("highlightedValue", value);
				});
			},
			highlightNextItem({ context, prop }) {
				let value = null;
				const highlightedValue = context.get("highlightedValue");
				const collection2 = prop("collection");
				if (highlightedValue) {
					value = collection2.getNextValue(highlightedValue);
					if (!value && prop("loopFocus")) value = collection2.firstValue;
				} else value = collection2.firstValue;
				if (value) context.set("highlightedValue", value);
			},
			highlightPrevItem({ context, prop }) {
				let value = null;
				const highlightedValue = context.get("highlightedValue");
				const collection2 = prop("collection");
				if (highlightedValue) {
					value = collection2.getPreviousValue(highlightedValue);
					if (!value && prop("loopFocus")) value = collection2.lastValue;
				} else value = collection2.lastValue;
				if (value) context.set("highlightedValue", value);
			},
			highlightFirstSelectedItem({ context, prop }) {
				raf(() => {
					const [value] = prop("collection").sort(context.get("value"));
					if (value) context.set("highlightedValue", value);
				});
			},
			highlightFirstOrSelectedItem({ context, prop, computed }) {
				raf(() => {
					let value = null;
					if (computed("hasSelectedItems")) value = prop("collection").sort(context.get("value"))[0];
					else value = prop("collection").firstValue;
					if (value) context.set("highlightedValue", value);
				});
			},
			highlightLastOrSelectedItem({ context, prop, computed }) {
				raf(() => {
					const collection2 = prop("collection");
					let value = null;
					if (computed("hasSelectedItems")) value = collection2.sort(context.get("value"))[0];
					else value = collection2.lastValue;
					if (value) context.set("highlightedValue", value);
				});
			},
			autofillInputValue({ context, computed, prop, event, scope }) {
				const inputEl = getInputEl(scope);
				const collection2 = prop("collection");
				if (!computed("autoComplete") || !inputEl || !event.keypress) return;
				const valueText = collection2.stringify(context.get("highlightedValue"));
				raf(() => {
					inputEl.value = valueText || context.get("inputValue");
				});
			},
			syncSelectedItems(params) {
				queueMicrotask(() => {
					const { context, prop } = params;
					const collection2 = prop("collection");
					const value = context.get("value");
					const selectedItemMap = context.get("selectedItemMap");
					const next = deriveSelectionState({
						values: value,
						collection: collection2,
						selectedItemMap
					});
					context.set("selectedItemMap", next.nextSelectedItemMap);
					const inputValue = match(prop("selectionBehavior"), {
						preserve: context.get("inputValue"),
						replace: collection2.stringifyMany(value),
						clear: ""
					});
					context.set("inputValue", inputValue);
				});
			},
			syncHighlightedItem({ context, prop }) {
				const item = prop("collection").find(context.get("highlightedValue"));
				context.set("highlightedItem", item);
			},
			announceHighlightedItem({ context, prop, refs }) {
				if (!isApple()) return;
				const value = context.get("highlightedValue");
				const optionText = value ? prop("collection").stringifyItem(prop("collection").find(value)) : null;
				if (!optionText) return;
				const isSelected = value ? context.get("value").includes(value) : false;
				refs.get("liveRegion")?.announce(isSelected ? `${optionText}, selected` : optionText);
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
function getOpenChangeReason(event) {
	return (event.previousEvent || event).src;
}
// node_modules/.pnpm/@zag-js+combobox@1.39.1/node_modules/@zag-js/combobox/dist/combobox.props.mjs
var props = createProps()([
	"allowCustomValue",
	"autoFocus",
	"closeOnSelect",
	"collection",
	"composite",
	"defaultHighlightedValue",
	"defaultInputValue",
	"defaultOpen",
	"defaultValue",
	"dir",
	"disabled",
	"disableLayer",
	"form",
	"getRootNode",
	"highlightedValue",
	"id",
	"ids",
	"inputBehavior",
	"inputValue",
	"invalid",
	"loopFocus",
	"multiple",
	"name",
	"navigate",
	"onFocusOutside",
	"onHighlightChange",
	"onInputValueChange",
	"onInteractOutside",
	"onOpenChange",
	"onOpenChange",
	"onPointerDownOutside",
	"onSelect",
	"onValueChange",
	"open",
	"openOnChange",
	"openOnClick",
	"openOnKeyPress",
	"placeholder",
	"positioning",
	"readOnly",
	"required",
	"scrollToIndexFn",
	"selectionBehavior",
	"translations",
	"value",
	"alwaysSubmitOnEnter"
]);
var splitProps = createSplitProps(props);
var itemGroupLabelProps = createProps()(["htmlFor"]);
var splitItemGroupLabelProps = createSplitProps(itemGroupLabelProps);
var itemGroupProps = createProps()(["id"]);
var splitItemGroupProps = createSplitProps(itemGroupProps);
var itemProps = createProps()(["item", "persistFocus"]);
var splitItemProps = createSplitProps(itemProps);
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/combobox/anatomy/item-group-label.svelte
function Item_group_label($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const combobox = RootContext.consume();
		const itemGroupProps = ItemGroupContext.consume();
		const $$d = derived(() => splitItemGroupLabelProps({
			htmlFor: itemGroupProps().id,
			...props
		})), $$derived_array = derived(() => to_array($$d(), 1)), itemGroupLabelProps = derived(() => $$derived_array()[0]);
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$11 = derived(() => mergeProps(combobox().getItemGroupLabelProps(itemGroupLabelProps()), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$11());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><div${attributes({ ...attributes$11() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/combobox/anatomy/item-group.svelte
function Item_group($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const id = props_id($$renderer);
		const { $$slots, $$events, ...props } = $$props;
		const combobox = RootContext.consume();
		const $$d = derived(() => splitItemGroupProps({
			id,
			...props
		})), $$derived_array = derived(() => to_array($$d(), 2)), itemGroupProps = derived(() => $$derived_array()[0]), componentProps = derived(() => $$derived_array()[1]);
		const element = derived(() => componentProps().element), children = derived(() => componentProps().children), rest = derived(() => exclude_from_object(componentProps(), ["element", "children"]));
		const attributes$10 = derived(() => mergeProps(combobox().getItemGroupProps(itemGroupProps()), rest()));
		ItemGroupContext.provide(() => itemGroupProps());
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
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/combobox/modules/item-context.js
var ItemContext = createContext();
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/combobox/anatomy/item-indicator.svelte
function check($$renderer) {
	Check($$renderer, { class: "size-4" });
}
function Item_indicator($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const combobox = RootContext.consume();
		const itemProps = ItemContext.consume();
		const element = derived(() => props.element), children = derived(() => fallback(props.children, check)), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$9 = derived(() => mergeProps(combobox().getItemIndicatorProps(itemProps()), rest()));
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
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/combobox/anatomy/item-text.svelte
function Item_text($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const combobox = RootContext.consume();
		const itemProps = ItemContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$8 = derived(() => mergeProps(combobox().getItemTextProps(itemProps()), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$8());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><span${attributes({ ...attributes$8() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></span>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/combobox/anatomy/item.svelte
function Item($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const combobox = RootContext.consume();
		const $$d = derived(() => splitItemProps(props)), $$derived_array = derived(() => to_array($$d(), 2)), itemProps = derived(() => $$derived_array()[0]), componentProps = derived(() => $$derived_array()[1]);
		const element = derived(() => componentProps().element), children = derived(() => componentProps().children), rest = derived(() => exclude_from_object(componentProps(), ["element", "children"]));
		const attributes$7 = derived(() => mergeProps(combobox().getItemProps(itemProps()), rest()));
		ItemContext.provide(() => itemProps());
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$7());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><li${attributes({ ...attributes$7() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></li>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/combobox/anatomy/label.svelte
function Label($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const combobox = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$6 = derived(() => mergeProps(combobox().getLabelProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$6());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><label${attributes({ ...attributes$6() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></label>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/combobox/anatomy/positioner.svelte
function Positioner($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const combobox = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$5 = derived(() => mergeProps(combobox().getPositionerProps(), rest()));
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
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/combobox/anatomy/root-context.svelte
function Root_context($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const combobox = RootContext.consume();
		derived(() => props.children)()($$renderer, combobox);
		$$renderer.push(`<!---->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/combobox/anatomy/root-provider.svelte
function Root_provider($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const element = derived(() => props.element), children = derived(() => props.children), combobox = derived(() => props.value), rest = derived(() => exclude_from_object(props, [
			"element",
			"children",
			"value"
		]));
		const attributes$4 = derived(() => mergeProps(combobox()().getRootProps(), rest()));
		RootContext.provide(() => combobox()());
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
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/combobox/modules/provider.svelte.js
function useCombobox(props) {
	const service = useMachine(machine, props);
	const combobox = derived(() => connect(service, normalizeProps));
	return () => combobox();
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/combobox/anatomy/root.svelte
function Root($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const id = props_id($$renderer);
		const { $$slots, $$events, ...props } = $$props;
		const $$d = derived(() => splitProps(props)), $$derived_array = derived(() => to_array($$d(), 2)), comboboxProps = derived(() => $$derived_array()[0]), componentProps = derived(() => $$derived_array()[1]);
		const element = derived(() => componentProps().element), children = derived(() => componentProps().children), rest = derived(() => exclude_from_object(componentProps(), ["element", "children"]));
		const combobox = useCombobox(() => ({
			...comboboxProps(),
			id
		}));
		const attributes$3 = derived(() => mergeProps(combobox().getRootProps(), rest()));
		RootContext.provide(() => combobox());
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
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/internal/components/chevron-down.svelte
function Chevron_down($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const rest = derived(() => exclude_from_object(props, []));
		const attributes$2 = derived(() => mergeProps({
			xmlns: "http://www.w3.org/2000/svg",
			width: "24",
			height: "24",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2",
			"stroke-linecap": "round",
			"stroke-linejoin": "round"
		}, rest()));
		$$renderer.push(`<svg${attributes({ ...attributes$2() }, void 0, void 0, void 0, 3)}><path d="m6 9 6 6 6-6"></path></svg>`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/combobox/anatomy/trigger.svelte
function chevronDown($$renderer) {
	Chevron_down($$renderer, {});
}
function Trigger($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const combobox = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => fallback(props.children, chevronDown)), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$1 = derived(() => mergeProps(combobox().getTriggerProps(), rest()));
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
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/combobox/modules/anatomy.js
var Combobox = Object.assign(Root, {
	Provider: Root_provider,
	Context: Root_context,
	Label,
	Control,
	Input,
	Trigger,
	ClearTrigger: Clear_trigger,
	Positioner,
	Content,
	ItemGroup: Item_group,
	ItemGroupLabel: Item_group_label,
	Item,
	ItemText: Item_text,
	ItemIndicator: Item_indicator
});

export { Combobox as C };
//# sourceMappingURL=anatomy.js-Dd71kskB.js.map
