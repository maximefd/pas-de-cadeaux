import { aj as props_id, ak as attributes, V as derived, ah as fallback, al as exclude_from_object, an as to_array } from './index-server.js-CIVHNbBm.js';
import { x as useMachine, y as createContext, z as mergeProps, r as raf, I as setup, j as getEventTarget, c as contains, J as getEventKey, K as isEditableElement, B as dataAttr, L as isDownloadingEvent, M as isOpeningInNewTab, l as isContextMenuEvent, N as isCtrlOrMetaKey, O as ariaAttr, P as isComposingEvent, Q as getNativeEvent, R as defaultItemToId, C as createAnatomy, S as indexOfId, T as wrap, D as createProps, E as normalizeProps } from './create-anatomy.js-CLhpGM8y.js';
import { j as hasProp, e as ensure, g as createSplitProps } from './warning.js-12YgogjO.js';
import { d as deriveSelectionState, o as observeAttributes, r as resolveSelectedItems, c as createSelectedItemMap, C as Check, _ as __publicField, L as ListCollection } from './use-list-collection.js-brFPftRE.js';
import { i as isEqual } from './equal.js-nd5Stm03.js';
import { d as scrollIntoView } from './anatomy2.js-Deb7OEEc.js';
import { t as trackFocusVisible, s as setInteractionModality, g as getInteractionModality } from './dist2.js-Cjb_BOMc.js';

// node_modules/.pnpm/@zag-js+dom-query@1.39.1/node_modules/@zag-js/dom-query/dist/searchable.mjs
var sanitize = (str) => str.split("").map((char) => {
	const code = char.charCodeAt(0);
	if (code > 0 && code < 128) return char;
	if (code >= 128 && code <= 255) return `/x${code.toString(16)}`.replace("/", "\\");
	return "";
}).join("").trim();
var getValueText = (el) => {
	return sanitize(el.dataset?.valuetext ?? el.textContent ?? "");
};
var match = (valueText, query) => {
	return valueText.trim().toLowerCase().startsWith(query.toLowerCase());
};
function getByText(v, text, currentId, itemToId = defaultItemToId) {
	const index = currentId ? indexOfId(v, currentId, itemToId) : -1;
	let items = currentId ? wrap(v, index) : v;
	if (text.length === 1) items = items.filter((item) => itemToId(item) !== currentId);
	return items.find((item) => match(getValueText(item), text));
}
// node_modules/.pnpm/@zag-js+dom-query@1.39.1/node_modules/@zag-js/dom-query/dist/typeahead.mjs
function getByTypeaheadImpl(baseItems, options) {
	const { state, activeId, key, timeout = 350, itemToId } = options;
	const search = state.keysSoFar + key;
	const query = search.length > 1 && Array.from(search).every((char) => char === search[0]) ? search[0] : search;
	const next = getByText(baseItems.slice(), query, activeId, itemToId);
	function cleanup() {
		clearTimeout(state.timer);
		state.timer = -1;
	}
	function update(value) {
		state.keysSoFar = value;
		cleanup();
		if (value !== "") state.timer = +setTimeout(() => {
			update("");
			cleanup();
		}, timeout);
	}
	update(search);
	return next;
}
var getByTypeahead = /* @__PURE__ */ Object.assign(getByTypeaheadImpl, {
	defaultOptions: {
		keysSoFar: "",
		timer: -1
	},
	isValidEvent: isValidTypeaheadEvent
});
function isValidTypeaheadEvent(event) {
	return event.key.length === 1 && !event.ctrlKey && !event.metaKey;
}
function isGridCollection(v) {
	return hasProp(v, "columnCount") && hasProp(v, "getRows");
}
// node_modules/.pnpm/@zag-js+collection@1.39.1/node_modules/@zag-js/collection/dist/selection.mjs
var Selection = class _Selection extends Set {
	constructor(values = []) {
		super(values);
		__publicField(this, "selectionMode", "single");
		__publicField(this, "deselectable", true);
		__publicField(this, "copy", () => {
			const clone = new _Selection([...this]);
			return this.sync(clone);
		});
		__publicField(this, "sync", (other) => {
			other.selectionMode = this.selectionMode;
			other.deselectable = this.deselectable;
			return other;
		});
		__publicField(this, "isEmpty", () => {
			return this.size === 0;
		});
		__publicField(this, "isSelected", (value) => {
			if (this.selectionMode === "none" || value == null) return false;
			return this.has(value);
		});
		__publicField(this, "canSelect", (collection, value) => {
			return this.selectionMode !== "none" || !collection.getItemDisabled(collection.find(value));
		});
		__publicField(this, "firstSelectedValue", (collection) => {
			let firstValue = null;
			for (let value of this) if (!firstValue || collection.compareValue(value, firstValue) < 0) firstValue = value;
			return firstValue;
		});
		__publicField(this, "lastSelectedValue", (collection) => {
			let lastValue = null;
			for (let value of this) if (!lastValue || collection.compareValue(value, lastValue) > 0) lastValue = value;
			return lastValue;
		});
		__publicField(this, "extendSelection", (collection, anchorValue, targetValue) => {
			if (this.selectionMode === "none") return this;
			if (this.selectionMode === "single") return this.replaceSelection(collection, targetValue);
			const selection = this.copy();
			const lastSelected = Array.from(this).pop();
			for (let key of collection.getValueRange(anchorValue, lastSelected ?? targetValue)) selection.delete(key);
			for (let key of collection.getValueRange(targetValue, anchorValue)) if (this.canSelect(collection, key)) selection.add(key);
			return selection;
		});
		__publicField(this, "toggleSelection", (collection, value) => {
			if (this.selectionMode === "none") return this;
			if (this.selectionMode === "single" && !this.isSelected(value)) return this.replaceSelection(collection, value);
			const selection = this.copy();
			if (selection.has(value)) selection.delete(value);
			else if (selection.canSelect(collection, value)) selection.add(value);
			return selection;
		});
		__publicField(this, "replaceSelection", (collection, value) => {
			if (this.selectionMode === "none") return this;
			if (value == null) return this;
			if (!this.canSelect(collection, value)) return this;
			const selection = new _Selection([value]);
			return this.sync(selection);
		});
		__publicField(this, "setSelection", (values) => {
			if (this.selectionMode === "none") return this;
			let selection = new _Selection();
			for (let value of values) if (value != null) {
				selection.add(value);
				if (this.selectionMode === "single") break;
			}
			return this.sync(selection);
		});
		__publicField(this, "clearSelection", () => {
			const selection = this.copy();
			if (selection.deselectable && selection.size > 0) selection.clear();
			return selection;
		});
		__publicField(this, "select", (collection, value, forceToggle) => {
			if (this.selectionMode === "none") return this;
			if (this.selectionMode === "single") {
				if (this.isSelected(value) && this.deselectable) return this.toggleSelection(collection, value);
				else return this.replaceSelection(collection, value);
			} else if (this.selectionMode === "multiple" || forceToggle) return this.toggleSelection(collection, value);
			else return this.replaceSelection(collection, value);
		});
		__publicField(this, "deselect", (value) => {
			const selection = this.copy();
			selection.delete(value);
			return selection;
		});
		__publicField(this, "isEqual", (other) => {
			return isEqual(Array.from(this), Array.from(other));
		});
	}
};
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/listbox/modules/root-context.js
var RootContext = createContext();
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/listbox/anatomy/content.svelte
function Content($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const listbox = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$10 = derived(() => mergeProps(listbox().getContentProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$10());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><ul${attributes({ ...attributes$10() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></ul>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/listbox/anatomy/input.svelte
function Input($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const listbox = RootContext.consume();
		const element = derived(() => props.element), rest = derived(() => exclude_from_object(props, ["element"]));
		const attributes$9 = derived(() => mergeProps(listbox().getInputProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$9());
			$$renderer.push(`<!---->`);
		} else $$renderer.push(`<!--[-1--><input${attributes({ ...attributes$9() }, void 0, void 0, void 0, 4)}/>`);
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/listbox/modules/item-group-context.js
var ItemGroupContext = createContext();
var parts = createAnatomy("listbox").parts("label", "input", "item", "itemText", "itemIndicator", "itemGroup", "itemGroupLabel", "content", "root", "valueText").build();
// node_modules/.pnpm/@zag-js+listbox@1.39.1/node_modules/@zag-js/listbox/dist/listbox.collection.mjs
var collection = (options) => {
	return new ListCollection(options);
};
collection.empty = () => {
	return new ListCollection({ items: [] });
};
// node_modules/.pnpm/@zag-js+listbox@1.39.1/node_modules/@zag-js/listbox/dist/listbox.dom.mjs
var getRootId = (ctx) => ctx.ids?.root ?? `listbox:${ctx.id}`;
var getContentId = (ctx) => ctx.ids?.content ?? `listbox:${ctx.id}:content`;
var getLabelId = (ctx) => ctx.ids?.label ?? `listbox:${ctx.id}:label`;
var getItemId = (ctx, id) => ctx.ids?.item?.(id) ?? `listbox:${ctx.id}:item:${id}`;
var getItemGroupId = (ctx, id) => ctx.ids?.itemGroup?.(id) ?? `listbox:${ctx.id}:item-group:${id}`;
var getItemGroupLabelId = (ctx, id) => ctx.ids?.itemGroupLabel?.(id) ?? `listbox:${ctx.id}:item-group-label:${id}`;
var getContentEl = (ctx) => ctx.getById(getContentId(ctx));
var getItemEl = (ctx, id) => ctx.getById(getItemId(ctx, id));
// node_modules/.pnpm/@zag-js+listbox@1.39.1/node_modules/@zag-js/listbox/dist/listbox.connect.mjs
function connect(service, normalize) {
	const { context, prop, scope, computed, send, refs } = service;
	const disabled = prop("disabled");
	const collection = prop("collection");
	const layout = isGridCollection(collection) ? "grid" : "list";
	const focused = context.get("focused");
	const focusVisible = refs.get("focusVisible") && focused;
	const inputState = refs.get("inputState");
	const value = context.get("value");
	const selectedItems = computed("selectedItems");
	const highlightedValue = context.get("highlightedValue");
	const highlightedItem = context.get("highlightedItem");
	const isTypingAhead = computed("isTypingAhead");
	const interactive = computed("isInteractive");
	const ariaActiveDescendant = highlightedValue ? getItemId(scope, highlightedValue) : void 0;
	function getItemState(props) {
		const itemDisabled = collection.getItemDisabled(props.item);
		const value2 = collection.getItemValue(props.item);
		ensure(value2, () => `[zag-js] No value found for item ${JSON.stringify(props.item)}`);
		const highlighted = highlightedValue === value2;
		return {
			value: value2,
			disabled: Boolean(disabled || itemDisabled),
			focused: highlighted && focused,
			focusVisible: highlighted && focusVisible,
			highlighted: highlighted && (inputState.focused ? focused : focusVisible),
			selected: context.get("value").includes(value2)
		};
	}
	return {
		empty: value.length === 0,
		highlightedItem,
		highlightedValue,
		clearHighlightedValue() {
			send({
				type: "HIGHLIGHTED_VALUE.SET",
				value: null
			});
		},
		selectedItems,
		hasSelectedItems: computed("hasSelectedItems"),
		value,
		valueAsString: computed("valueAsString"),
		collection,
		disabled: !!disabled,
		selectValue(value2) {
			send({
				type: "ITEM.SELECT",
				value: value2
			});
		},
		setValue(value2) {
			send({
				type: "VALUE.SET",
				value: value2
			});
		},
		selectAll() {
			if (!computed("multiple")) throw new Error("[zag-js] Cannot select all items in a single-select listbox");
			send({
				type: "VALUE.SET",
				value: collection.getValues()
			});
		},
		highlightValue(value2) {
			send({
				type: "HIGHLIGHTED_VALUE.SET",
				value: value2
			});
		},
		highlightFirst() {
			send({ type: "HIGHLIGHT.FIRST" });
		},
		highlightLast() {
			send({ type: "HIGHLIGHT.LAST" });
		},
		highlightNext() {
			send({ type: "HIGHLIGHT.NEXT" });
		},
		highlightPrevious() {
			send({ type: "HIGHLIGHT.PREV" });
		},
		clearValue(value2) {
			if (value2) send({
				type: "ITEM.CLEAR",
				value: value2
			});
			else send({ type: "VALUE.CLEAR" });
		},
		getItemState,
		getRootProps() {
			return normalize.element({
				...parts.root.attrs,
				dir: prop("dir"),
				id: getRootId(scope),
				"data-orientation": prop("orientation"),
				"data-disabled": dataAttr(disabled)
			});
		},
		getInputProps(props = {}) {
			const keyboardPriority = props.keyboardPriority ?? "caret";
			return normalize.input({
				...parts.input.attrs,
				dir: prop("dir"),
				disabled,
				"data-disabled": dataAttr(disabled),
				autoComplete: "off",
				autoCorrect: "off",
				"aria-haspopup": "listbox",
				"aria-controls": getContentId(scope),
				"aria-autocomplete": "list",
				"aria-activedescendant": ariaActiveDescendant,
				spellCheck: false,
				enterKeyHint: "go",
				onFocus() {
					queueMicrotask(() => {
						send({
							type: "INPUT.FOCUS",
							autoHighlight: !!props?.autoHighlight
						});
					});
				},
				onBlur() {
					send({
						type: "CONTENT.BLUR",
						src: "input"
					});
				},
				onInput(event) {
					if (!props?.autoHighlight) return;
					if (event.currentTarget.value.trim()) return;
					queueMicrotask(() => {
						send({
							type: "HIGHLIGHTED_VALUE.SET",
							value: null
						});
					});
				},
				onKeyDown(event) {
					if (event.defaultPrevented) return;
					if (isComposingEvent(event)) return;
					const nativeEvent = getNativeEvent(event);
					const forwardEvent = () => {
						event.preventDefault();
						const keyboardEvent = new (scope.getWin()).KeyboardEvent(nativeEvent.type, nativeEvent);
						getContentEl(scope)?.dispatchEvent(keyboardEvent);
					};
					switch (nativeEvent.key) {
						case "ArrowLeft":
						case "ArrowRight":
							if (!isGridCollection(collection)) return;
							if (event.ctrlKey) return;
							if (keyboardPriority !== "navigate") return;
							forwardEvent();
							break;
						case "Home":
						case "End":
							if (keyboardPriority !== "navigate") return;
							if (highlightedValue == null && event.shiftKey) return;
							forwardEvent();
							break;
						case "ArrowDown":
						case "ArrowUp":
							forwardEvent();
							break;
						case "Enter": if (highlightedValue != null) {
							event.preventDefault();
							send({
								type: "ITEM.CLICK",
								value: highlightedValue
							});
						}
					}
				}
			});
		},
		getLabelProps() {
			return normalize.element({
				dir: prop("dir"),
				id: getLabelId(scope),
				...parts.label.attrs,
				"data-disabled": dataAttr(disabled)
			});
		},
		getValueTextProps() {
			return normalize.element({
				...parts.valueText.attrs,
				dir: prop("dir"),
				"data-disabled": dataAttr(disabled)
			});
		},
		getItemProps(props) {
			const itemState = getItemState(props);
			return normalize.element({
				id: getItemId(scope, itemState.value),
				role: "option",
				...parts.item.attrs,
				dir: prop("dir"),
				"data-value": itemState.value,
				"aria-selected": itemState.selected,
				"data-selected": dataAttr(itemState.selected),
				"data-layout": layout,
				"data-state": itemState.selected ? "checked" : "unchecked",
				"data-orientation": prop("orientation"),
				"data-highlighted": dataAttr(itemState.highlighted),
				"data-disabled": dataAttr(itemState.disabled),
				"aria-disabled": ariaAttr(itemState.disabled),
				onPointerMove(event) {
					if (!props.highlightOnHover) return;
					if (itemState.disabled || event.pointerType !== "mouse") return;
					if (itemState.highlighted) return;
					send({
						type: "ITEM.POINTER_MOVE",
						value: itemState.value
					});
				},
				onMouseDown(event) {
					event.preventDefault();
					getContentEl(scope)?.focus();
				},
				onClick(event) {
					if (event.defaultPrevented) return;
					if (isDownloadingEvent(event)) return;
					if (isOpeningInNewTab(event)) return;
					if (isContextMenuEvent(event)) return;
					if (itemState.disabled) return;
					send({
						type: "ITEM.CLICK",
						value: itemState.value,
						shiftKey: event.shiftKey,
						anchorValue: highlightedValue,
						metaKey: isCtrlOrMetaKey(event)
					});
				}
			});
		},
		getItemTextProps(props) {
			const itemState = getItemState(props);
			return normalize.element({
				...parts.itemText.attrs,
				"data-state": itemState.selected ? "checked" : "unchecked",
				"data-disabled": dataAttr(itemState.disabled),
				"data-highlighted": dataAttr(itemState.highlighted)
			});
		},
		getItemIndicatorProps(props) {
			const itemState = getItemState(props);
			return normalize.element({
				...parts.itemIndicator.attrs,
				"aria-hidden": true,
				"data-state": itemState.selected ? "checked" : "unchecked",
				hidden: !itemState.selected
			});
		},
		getItemGroupLabelProps(props) {
			const { htmlFor } = props;
			return normalize.element({
				...parts.itemGroupLabel.attrs,
				id: getItemGroupLabelId(scope, htmlFor),
				dir: prop("dir"),
				role: "presentation"
			});
		},
		getItemGroupProps(props) {
			const { id } = props;
			return normalize.element({
				...parts.itemGroup.attrs,
				"data-disabled": dataAttr(disabled),
				"data-orientation": prop("orientation"),
				"data-empty": dataAttr(collection.size === 0),
				id: getItemGroupId(scope, id),
				"aria-labelledby": getItemGroupLabelId(scope, id),
				role: "group",
				dir: prop("dir")
			});
		},
		getContentProps() {
			return normalize.element({
				dir: prop("dir"),
				id: getContentId(scope),
				role: "listbox",
				...parts.content.attrs,
				"data-activedescendant": ariaActiveDescendant,
				"aria-activedescendant": ariaActiveDescendant,
				"data-orientation": prop("orientation"),
				"aria-multiselectable": computed("multiple") ? true : void 0,
				"aria-labelledby": getLabelId(scope),
				tabIndex: 0,
				"data-layout": layout,
				"data-empty": dataAttr(collection.size === 0),
				style: { "--column-count": isGridCollection(collection) ? collection.columnCount : 1 },
				onFocus() {
					send({ type: "CONTENT.FOCUS" });
				},
				onBlur() {
					send({ type: "CONTENT.BLUR" });
				},
				onKeyDown(event) {
					if (!interactive) return;
					const target = getEventTarget(event);
					if (!contains(event.currentTarget, getEventTarget(event))) return;
					const shiftKey = event.shiftKey;
					const keyMap = {
						ArrowUp(event2) {
							let nextValue = null;
							if (isGridCollection(collection) && highlightedValue) nextValue = collection.getPreviousRowValue(highlightedValue);
							else if (highlightedValue) nextValue = collection.getPreviousValue(highlightedValue);
							if (!nextValue && (prop("loopFocus") || !highlightedValue)) nextValue = collection.lastValue;
							if (!nextValue) return;
							event2.preventDefault();
							send({
								type: "NAVIGATE",
								value: nextValue,
								shiftKey,
								anchorValue: highlightedValue
							});
						},
						ArrowDown(event2) {
							let nextValue = null;
							if (isGridCollection(collection) && highlightedValue) nextValue = collection.getNextRowValue(highlightedValue);
							else if (highlightedValue) nextValue = collection.getNextValue(highlightedValue);
							if (!nextValue && (prop("loopFocus") || !highlightedValue)) nextValue = collection.firstValue;
							if (!nextValue) return;
							event2.preventDefault();
							send({
								type: "NAVIGATE",
								value: nextValue,
								shiftKey,
								anchorValue: highlightedValue
							});
						},
						ArrowLeft() {
							if (!isGridCollection(collection) && prop("orientation") === "vertical") return;
							let nextValue = highlightedValue ? collection.getPreviousValue(highlightedValue) : null;
							if (!nextValue && prop("loopFocus")) nextValue = collection.lastValue;
							if (!nextValue) return;
							event.preventDefault();
							send({
								type: "NAVIGATE",
								value: nextValue,
								shiftKey,
								anchorValue: highlightedValue
							});
						},
						ArrowRight() {
							if (!isGridCollection(collection) && prop("orientation") === "vertical") return;
							let nextValue = highlightedValue ? collection.getNextValue(highlightedValue) : null;
							if (!nextValue && prop("loopFocus")) nextValue = collection.firstValue;
							if (!nextValue) return;
							event.preventDefault();
							send({
								type: "NAVIGATE",
								value: nextValue,
								shiftKey,
								anchorValue: highlightedValue
							});
						},
						Home(event2) {
							if (isEditableElement(target)) return;
							event2.preventDefault();
							let nextValue = collection.firstValue;
							send({
								type: "NAVIGATE",
								value: nextValue,
								shiftKey,
								anchorValue: highlightedValue
							});
						},
						End(event2) {
							if (isEditableElement(target)) return;
							event2.preventDefault();
							let nextValue = collection.lastValue;
							send({
								type: "NAVIGATE",
								value: nextValue,
								shiftKey,
								anchorValue: highlightedValue
							});
						},
						Enter() {
							send({
								type: "ITEM.CLICK",
								value: highlightedValue
							});
						},
						a(event2) {
							if (isCtrlOrMetaKey(event2) && computed("multiple") && !prop("disallowSelectAll")) {
								event2.preventDefault();
								send({
									type: "VALUE.SET",
									value: collection.getValues()
								});
							}
						},
						Space(event2) {
							if (isTypingAhead && prop("typeahead")) send({
								type: "CONTENT.TYPEAHEAD",
								key: event2.key
							});
							else keyMap.Enter?.(event2);
						},
						Escape(event2) {
							if (prop("deselectable") && value.length > 0) {
								event2.preventDefault();
								event2.stopPropagation();
								send({ type: "VALUE.CLEAR" });
							}
						}
					};
					const exec = keyMap[getEventKey(event)];
					if (exec) {
						exec(event);
						return;
					}
					if (isEditableElement(target)) return;
					if (getByTypeahead.isValidEvent(event) && prop("typeahead")) {
						send({
							type: "CONTENT.TYPEAHEAD",
							key: event.key
						});
						event.preventDefault();
					}
				}
			});
		}
	};
}
// node_modules/.pnpm/@zag-js+listbox@1.39.1/node_modules/@zag-js/listbox/dist/listbox.machine.mjs
var { guards, createMachine } = setup();
var { or } = guards;
var machine = createMachine({
	props({ props }) {
		return {
			loopFocus: false,
			composite: true,
			defaultValue: [],
			multiple: false,
			typeahead: true,
			collection: collection.empty(),
			orientation: "vertical",
			selectionMode: "single",
			...props
		};
	},
	context({ prop, bindable, getContext }) {
		const initialValue = prop("value") ?? prop("defaultValue") ?? [];
		const initialSelectedItems = prop("collection").findMany(initialValue);
		return {
			value: bindable(() => ({
				defaultValue: prop("defaultValue"),
				value: prop("value"),
				isEqual,
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
					return prop("onValueChange")?.({
						value,
						items: proposed.selectedItems
					});
				}
			})),
			highlightedValue: bindable(() => ({
				defaultValue: prop("defaultHighlightedValue") || null,
				value: prop("highlightedValue"),
				sync: true,
				onChange(value) {
					prop("onHighlightChange")?.({
						highlightedValue: value,
						highlightedItem: prop("collection").find(value),
						highlightedIndex: prop("collection").indexOf(value)
					});
				}
			})),
			highlightedItem: bindable(() => ({ defaultValue: null })),
			selectedItemMap: bindable(() => {
				return { defaultValue: createSelectedItemMap({
					selectedItems: initialSelectedItems,
					collection: prop("collection")
				}) };
			}),
			focused: bindable(() => ({
				sync: true,
				defaultValue: false
			}))
		};
	},
	refs() {
		return {
			typeahead: { ...getByTypeahead.defaultOptions },
			focusVisible: false,
			inputState: {
				autoHighlight: false,
				focused: false
			}
		};
	},
	computed: {
		hasSelectedItems: ({ context }) => context.get("value").length > 0,
		isTypingAhead: ({ refs }) => refs.get("typeahead").keysSoFar !== "",
		isInteractive: ({ prop }) => !prop("disabled"),
		selection: ({ context, prop }) => {
			const selection = new Selection(context.get("value"));
			selection.selectionMode = prop("selectionMode");
			selection.deselectable = !!prop("deselectable");
			return selection;
		},
		multiple: ({ prop }) => prop("selectionMode") === "multiple" || prop("selectionMode") === "extended",
		selectedItems: ({ context, prop }) => resolveSelectedItems({
			values: context.get("value"),
			collection: prop("collection"),
			selectedItemMap: context.get("selectedItemMap")
		}),
		valueAsString: ({ computed, prop }) => prop("collection").stringifyItems(computed("selectedItems"))
	},
	initialState() {
		return "idle";
	},
	watch({ context, prop, track, action }) {
		track([() => context.get("value").toString()], () => {
			action(["syncSelectedItems"]);
		});
		track([() => context.get("highlightedValue")], () => {
			action(["syncHighlightedItem"]);
		});
		track([() => prop("collection").toString()], () => {
			action(["syncHighlightedValue"]);
		});
	},
	effects: ["trackFocusVisible"],
	on: {
		"HIGHLIGHTED_VALUE.SET": { actions: ["setHighlightedItem"] },
		"ITEM.SELECT": { actions: ["selectItem"] },
		"ITEM.CLEAR": { actions: ["clearItem"] },
		"VALUE.SET": { actions: ["setSelectedItems"] },
		"VALUE.CLEAR": { actions: ["clearSelectedItems"] },
		"HIGHLIGHT.FIRST": { actions: ["highlightFirstValue"] },
		"HIGHLIGHT.LAST": { actions: ["highlightLastValue"] },
		"HIGHLIGHT.NEXT": { actions: ["highlightNextValue"] },
		"HIGHLIGHT.PREV": { actions: ["highlightPreviousValue"] }
	},
	states: { idle: {
		effects: ["scrollToHighlightedItem"],
		on: {
			"INPUT.FOCUS": { actions: ["setFocused", "setInputState"] },
			"CONTENT.FOCUS": [{
				guard: or("hasSelectedValue", "hasHighlightedValue"),
				actions: ["setFocused"]
			}, { actions: ["setFocused", "setDefaultHighlightedValue"] }],
			"CONTENT.BLUR": { actions: ["clearFocused", "clearInputState"] },
			"ITEM.CLICK": { actions: ["setHighlightedItem", "selectHighlightedItem"] },
			"CONTENT.TYPEAHEAD": { actions: ["setFocused", "highlightMatchingItem"] },
			"ITEM.POINTER_MOVE": { actions: ["highlightItem"] },
			"ITEM.POINTER_LEAVE": { actions: ["clearHighlightedItem"] },
			NAVIGATE: { actions: [
				"setFocused",
				"setHighlightedItem",
				"selectWithKeyboard"
			] }
		}
	} },
	implementations: {
		guards: {
			hasSelectedValue: ({ context }) => context.get("value").length > 0,
			hasHighlightedValue: ({ context }) => context.get("highlightedValue") != null
		},
		effects: {
			trackFocusVisible: ({ scope, refs }) => {
				return trackFocusVisible({
					root: scope.getRootNode?.(),
					onChange(details) {
						refs.set("focusVisible", details.isFocusVisible);
					}
				});
			},
			scrollToHighlightedItem({ context, prop, scope }) {
				const exec = (immediate) => {
					const highlightedValue = context.get("highlightedValue");
					if (highlightedValue == null) return;
					if (getInteractionModality() === "pointer") return;
					const contentEl2 = getContentEl(scope);
					const scrollToIndexFn = prop("scrollToIndexFn");
					if (scrollToIndexFn) {
						const highlightedIndex = prop("collection").indexOf(highlightedValue);
						scrollToIndexFn?.({
							index: highlightedIndex,
							immediate,
							getElement() {
								return getItemEl(scope, highlightedValue);
							}
						});
						return;
					}
					const itemEl = getItemEl(scope, highlightedValue);
					scrollIntoView(itemEl, {
						rootEl: contentEl2,
						block: "nearest"
					});
				};
				raf(() => {
					setInteractionModality("virtual");
					exec(true);
				});
				const contentEl = () => getContentEl(scope);
				return observeAttributes(contentEl, {
					defer: true,
					attributes: ["data-activedescendant"],
					callback() {
						exec(false);
					}
				});
			}
		},
		actions: {
			selectHighlightedItem({ context, prop, event, computed }) {
				const value = event.value ?? context.get("highlightedValue");
				const collection2 = prop("collection");
				if (value == null || !collection2.has(value)) return;
				const selection = computed("selection");
				if (event.shiftKey && computed("multiple") && event.anchorValue) {
					const next = selection.extendSelection(collection2, event.anchorValue, value);
					invokeOnSelect(selection, next, prop("onSelect"));
					context.set("value", Array.from(next));
				} else {
					const next = selection.select(collection2, value, event.metaKey);
					invokeOnSelect(selection, next, prop("onSelect"));
					context.set("value", Array.from(next));
				}
			},
			selectWithKeyboard({ context, prop, event, computed }) {
				const selection = computed("selection");
				const collection2 = prop("collection");
				if (event.shiftKey && computed("multiple") && event.anchorValue) {
					const next = selection.extendSelection(collection2, event.anchorValue, event.value);
					invokeOnSelect(selection, next, prop("onSelect"));
					context.set("value", Array.from(next));
					return;
				}
				if (prop("selectOnHighlight")) {
					const next = selection.replaceSelection(collection2, event.value);
					invokeOnSelect(selection, next, prop("onSelect"));
					context.set("value", Array.from(next));
				}
			},
			highlightItem({ context, event }) {
				context.set("highlightedValue", event.value);
			},
			highlightMatchingItem({ context, prop, event, refs }) {
				const value = prop("collection").search(event.key, {
					state: refs.get("typeahead"),
					currentValue: context.get("highlightedValue")
				});
				if (value == null) return;
				context.set("highlightedValue", value);
			},
			setHighlightedItem({ context, event }) {
				context.set("highlightedValue", event.value);
			},
			highlightFirstValue({ context, prop }) {
				context.set("highlightedValue", prop("collection").firstValue ?? null);
			},
			highlightLastValue({ context, prop }) {
				context.set("highlightedValue", prop("collection").lastValue ?? null);
			},
			highlightNextValue({ context, prop }) {
				const collection2 = prop("collection");
				const highlightedValue = context.get("highlightedValue");
				let nextValue = null;
				if (isGridCollection(collection2) && highlightedValue) nextValue = collection2.getNextRowValue(highlightedValue);
				else if (highlightedValue) nextValue = collection2.getNextValue(highlightedValue);
				if (!nextValue && (prop("loopFocus") || !highlightedValue)) nextValue = collection2.firstValue;
				if (!nextValue) return;
				context.set("highlightedValue", nextValue);
			},
			highlightPreviousValue({ context, prop }) {
				const collection2 = prop("collection");
				const highlightedValue = context.get("highlightedValue");
				let nextValue = null;
				if (isGridCollection(collection2) && highlightedValue) nextValue = collection2.getPreviousRowValue(highlightedValue);
				else if (highlightedValue) nextValue = collection2.getPreviousValue(highlightedValue);
				if (!nextValue && (prop("loopFocus") || !highlightedValue)) nextValue = collection2.lastValue;
				if (!nextValue) return;
				context.set("highlightedValue", nextValue);
			},
			clearHighlightedItem({ context }) {
				context.set("highlightedValue", null);
			},
			selectItem({ context, prop, event, computed }) {
				const collection2 = prop("collection");
				const selection = computed("selection");
				const next = selection.select(collection2, event.value);
				invokeOnSelect(selection, next, prop("onSelect"));
				context.set("value", Array.from(next));
			},
			clearItem({ context, event, computed }) {
				const value = computed("selection").deselect(event.value);
				context.set("value", Array.from(value));
			},
			setSelectedItems({ context, event }) {
				context.set("value", event.value);
			},
			clearSelectedItems({ context }) {
				context.set("value", []);
			},
			syncSelectedItems({ context, prop }) {
				const next = deriveSelectionState({
					values: context.get("value"),
					collection: prop("collection"),
					selectedItemMap: context.get("selectedItemMap")
				});
				context.set("selectedItemMap", next.nextSelectedItemMap);
			},
			syncHighlightedItem({ context, prop }) {
				const collection2 = prop("collection");
				const highlightedValue = context.get("highlightedValue");
				const highlightedItem = highlightedValue ? collection2.find(highlightedValue) : null;
				context.set("highlightedItem", highlightedItem);
			},
			syncHighlightedValue({ context, prop, refs }) {
				const collection2 = prop("collection");
				const highlightedValue = context.get("highlightedValue");
				const { autoHighlight } = refs.get("inputState");
				if (autoHighlight) {
					queueMicrotask(() => {
						context.set("highlightedValue", prop("collection").firstValue ?? null);
					});
					return;
				}
				if (highlightedValue != null && !collection2.has(highlightedValue)) queueMicrotask(() => {
					context.set("highlightedValue", null);
				});
			},
			setFocused({ context }) {
				context.set("focused", true);
			},
			setDefaultHighlightedValue({ context, prop }) {
				const firstValue = prop("collection").firstValue;
				if (firstValue != null) context.set("highlightedValue", firstValue);
			},
			clearFocused({ context }) {
				context.set("focused", false);
			},
			setInputState({ refs, event }) {
				refs.set("inputState", {
					autoHighlight: !!event.autoHighlight,
					focused: true
				});
			},
			clearInputState({ refs }) {
				refs.set("inputState", {
					autoHighlight: false,
					focused: false
				});
			}
		}
	}
});
var diff = (a, b) => {
	const result = new Set(a);
	for (const item of b) result.delete(item);
	return result;
};
function invokeOnSelect(current, next, onSelect) {
	const added = diff(next, current);
	for (const item of added) onSelect?.({ value: item });
}
// node_modules/.pnpm/@zag-js+listbox@1.39.1/node_modules/@zag-js/listbox/dist/listbox.props.mjs
var props = createProps()([
	"collection",
	"defaultHighlightedValue",
	"defaultValue",
	"dir",
	"disabled",
	"deselectable",
	"disallowSelectAll",
	"getRootNode",
	"highlightedValue",
	"id",
	"ids",
	"loopFocus",
	"onHighlightChange",
	"onSelect",
	"onValueChange",
	"orientation",
	"scrollToIndexFn",
	"selectionMode",
	"selectOnHighlight",
	"typeahead",
	"value"
]);
var splitProps = createSplitProps(props);
var itemProps = createProps()(["item", "highlightOnHover"]);
var splitItemProps = createSplitProps(itemProps);
var itemGroupProps = createProps()(["id"]);
var splitItemGroupProps = createSplitProps(itemGroupProps);
var itemGroupLabelProps = createProps()(["htmlFor"]);
var splitItemGroupLabelProps = createSplitProps(itemGroupLabelProps);
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/listbox/anatomy/item-group-label.svelte
function Item_group_label($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const listbox = RootContext.consume();
		const itemGroupProps = ItemGroupContext.consume();
		const $$d = derived(() => splitItemGroupLabelProps({
			htmlFor: itemGroupProps().id,
			...props
		})), $$derived_array = derived(() => to_array($$d(), 1)), itemGroupLabelProps = derived(() => $$derived_array()[0]);
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$8 = derived(() => mergeProps(listbox().getItemGroupLabelProps(itemGroupLabelProps()), rest()));
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
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/listbox/anatomy/item-group.svelte
function Item_group($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const id = props_id($$renderer);
		const { $$slots, $$events, ...props } = $$props;
		const listbox = RootContext.consume();
		const $$d = derived(() => splitItemGroupProps({
			id,
			...props
		})), $$derived_array = derived(() => to_array($$d(), 2)), itemGroupProps = derived(() => $$derived_array()[0]), componentProps = derived(() => $$derived_array()[1]);
		const element = derived(() => componentProps().element), children = derived(() => componentProps().children), rest = derived(() => exclude_from_object(componentProps(), ["element", "children"]));
		const attributes$7 = derived(() => mergeProps(listbox().getItemGroupProps(itemGroupProps()), rest()));
		ItemGroupContext.provide(() => itemGroupProps());
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
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/listbox/modules/item-context.js
var ItemContext = createContext();
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/listbox/anatomy/item-indicator.svelte
function check($$renderer) {
	Check($$renderer, { class: "size-4" });
}
function Item_indicator($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const listbox = RootContext.consume();
		const itemProps = ItemContext.consume();
		const element = derived(() => props.element), children = derived(() => fallback(props.children, check)), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$6 = derived(() => mergeProps(listbox().getItemIndicatorProps(itemProps()), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$6());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><span${attributes({ ...attributes$6() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></span>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/listbox/anatomy/item-text.svelte
function Item_text($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const listbox = RootContext.consume();
		const itemProps = ItemContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$5 = derived(() => mergeProps(listbox().getItemTextProps(itemProps()), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$5());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><span${attributes({ ...attributes$5() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></span>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/listbox/anatomy/item.svelte
function Item($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const listbox = RootContext.consume();
		const $$d = derived(() => splitItemProps(props)), $$derived_array = derived(() => to_array($$d(), 2)), itemProps = derived(() => $$derived_array()[0]), componentProps = derived(() => $$derived_array()[1]);
		const element = derived(() => componentProps().element), children = derived(() => componentProps().children), rest = derived(() => exclude_from_object(componentProps(), ["element", "children"]));
		const attributes$4 = derived(() => mergeProps(listbox().getItemProps(itemProps()), rest()));
		ItemContext.provide(() => itemProps());
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$4());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><li${attributes({ ...attributes$4() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></li>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/listbox/anatomy/label.svelte
function Label($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const listbox = RootContext.consume();
		const element = derived(() => props.element), children = derived(() => props.children), rest = derived(() => exclude_from_object(props, ["element", "children"]));
		const attributes$3 = derived(() => mergeProps(listbox().getLabelProps(), rest()));
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$3());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><label${attributes({ ...attributes$3() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></label>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/listbox/anatomy/root-context.svelte
function Root_context($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const listbox = RootContext.consume();
		derived(() => props.children)()($$renderer, listbox);
		$$renderer.push(`<!---->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/listbox/anatomy/root-provider.svelte
function Root_provider($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		const element = derived(() => props.element), children = derived(() => props.children), listbox = derived(() => props.value), rest = derived(() => exclude_from_object(props, [
			"element",
			"children",
			"value"
		]));
		const attributes$2 = derived(() => mergeProps(listbox()().getRootProps(), rest()));
		RootContext.provide(() => listbox()());
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
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/listbox/modules/provider.svelte.js
function useListbox(props) {
	const service = useMachine(machine, props);
	const listbox = derived(() => connect(service, normalizeProps));
	return () => listbox();
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/listbox/anatomy/root.svelte
function Root($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const id = props_id($$renderer);
		const { $$slots, $$events, ...props } = $$props;
		const $$d = derived(() => splitProps(props)), $$derived_array = derived(() => to_array($$d(), 2)), listboxProps = derived(() => $$derived_array()[0]), componentProps = derived(() => $$derived_array()[1]);
		const element = derived(() => componentProps().element), children = derived(() => componentProps().children), rest = derived(() => exclude_from_object(componentProps(), ["element", "children"]));
		const listbox = useListbox(() => ({
			...listboxProps(),
			id
		}));
		const attributes$1 = derived(() => mergeProps(listbox().getRootProps(), rest()));
		RootContext.provide(() => listbox());
		if (element()) {
			$$renderer.push("<!--[0-->");
			element()($$renderer, attributes$1());
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push(`<!--[-1--><div${attributes({ ...attributes$1() })}>`);
			children()?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
// node_modules/.pnpm/@skeletonlabs+skeleton-svelte@4.15.2_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/@skeletonlabs/skeleton-svelte/dist/components/listbox/modules/anatomy.js
var Listbox = Object.assign(Root, {
	Provider: Root_provider,
	Context: Root_context,
	Label,
	Input,
	Content,
	ItemGroup: Item_group,
	ItemGroupLabel: Item_group_label,
	Item,
	ItemText: Item_text,
	ItemIndicator: Item_indicator
});

export { Listbox as L };
//# sourceMappingURL=anatomy5.js-STbBfBjf.js.map
