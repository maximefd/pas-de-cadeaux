import { aj as props_id, V as derived, au as attr, ao as escape_html, av as store_get, ay as attr_class, am as clsx, aw as ensure_array_like, ak as attributes, aB as stringify, aq as bind_props, ax as unsubscribe_stores } from './index-server.js-CIVHNbBm.js';
import { C as Combobox } from './anatomy.js-Dd71kskB.js';
import { P as Portal } from './anatomy2.js-Deb7OEEc.js';
import { u as useListCollection } from './use-list-collection.js-brFPftRE.js';
import { f as getFormatter } from './i18n2.js-1SlG2bAu.js';
import './client.js-CtfT808N.js';
import { T as Tabs } from './anatomy4.js-BBZ3aFXa.js';
import { M as Markdown } from './Markdown.js-Dm7PA_S2.js';
import { p as page } from './state.js-DFeh0alp.js';
import { T as Tooltip } from './Tooltip.js-D0qklLov.js';
import { C as ConfirmModal } from './ConfirmModal.js-BchEguXy.js';
import { B as BaseModal, D as Dialog } from './BaseModal.js-_UDlR-j4.js';
import { L as Listbox } from './anatomy5.js-STbBfBjf.js';
import { f as fuzzysort } from './Search.js-DiRQYlEs.js';

// src/lib/components/IconSelector.svelte
function IconSelector($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { id, title, icon, onIconSelected } = $$props;
		const t = getFormatter();
		let availableIcons = [];
		let targets = derived(() => fuzzysort.snapshot(availableIcons));
		let iconValue = icon || void 0;
		let search = "";
		const getAvailableIcons = async () => {
			return Promise.resolve();
		};
		const collection = derived(() => useListCollection({ items: availableIcons }));
		let filteredIcons = [];
		const onOpenChange = async () => {
			await getAvailableIcons();
			filteredIcons = availableIcons;
		};
		const onInputValueChange = (event) => {
			if (event.reason === "item-select") {
				iconValue = event.inputValue;
				onIconSelected?.(iconValue);
			}
			search = event.inputValue;
			filteredIcons = fuzzysort.go(event.inputValue, targets(), { limit: 0 }).map((result) => result.target);
			if (filteredIcons.find((i) => i === search)) iconValue = search;
		};
		Combobox($$renderer, {
			name: id || "name",
			class: "w-full gap-0",
			collection: collection(),
			defaultInputValue: iconValue,
			inputBehavior: "autohighlight",
			onInputValueChange,
			onOpenChange,
			openOnClick: true,
			placeholder: "gift",
			children: ($$renderer) => {
				if (Combobox.Label) {
					$$renderer.push("<!--[-->");
					Combobox.Label($$renderer, {
						class: "text-base",
						children: ($$renderer) => {
							$$renderer.push(`<!---->${escape_html(title ?? store_get($$store_subs ??= {}, "$t", t)("general.icon"))}`);
						},
						$$slots: { default: true }
					});
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
				$$renderer.push(` `);
				if (Combobox.Control) {
					$$renderer.push("<!--[-->");
					Combobox.Control($$renderer, {
						children: ($$renderer) => {
							{
								function element($$renderer, props) {
									$$renderer.push(`<div class="input-group grid grid-cols-[auto_1fr]"><div class="ig-cell preset-tonal items-center"><iconify-icon${attr("icon", "ion:" + (iconValue || "gift"))}></iconify-icon></div> <input${attributes({
										...props,
										class: "ig-input"
									}, void 0, void 0, void 0, 4)}/></div>`);
								}
								if (Combobox.Input) {
									$$renderer.push("<!--[-->");
									Combobox.Input($$renderer, {
										element,
										$$slots: { element: true }
									});
									$$renderer.push("<!--]-->");
								} else {
									$$renderer.push("<!--[!-->");
									$$renderer.push("<!--]-->");
								}
							}
							$$renderer.push(` `);
							if (Combobox.Trigger) {
								$$renderer.push("<!--[-->");
								Combobox.Trigger($$renderer, {});
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
				$$renderer.push(` `);
				Portal($$renderer, {
					children: ($$renderer) => {
						if (Combobox.Positioner) {
							$$renderer.push("<!--[-->");
							Combobox.Positioner($$renderer, {
								class: "z-1!",
								children: ($$renderer) => {
									if (Combobox.Content) {
										$$renderer.push("<!--[-->");
										Combobox.Content($$renderer, {
											class: "grid h-64 max-w-full auto-rows-max grid-cols-6 items-start overflow-auto pl-2 md:grid-cols-12",
											children: ($$renderer) => {
												$$renderer.push(`<!--[-->`);
												const each_array = ensure_array_like(filteredIcons);
												for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
													let item = each_array[$$index];
													if (Combobox.Item) {
														$$renderer.push("<!--[-->");
														Combobox.Item($$renderer, {
															class: "flex justify-center",
															item,
															children: ($$renderer) => {
																if (Combobox.ItemText) {
																	$$renderer.push("<!--[-->");
																	Combobox.ItemText($$renderer, {
																		class: "flex items-center ",
																		children: ($$renderer) => {
																			$$renderer.push(`<iconify-icon class="inline-block text-xl"${attr("icon", "ion:" + item)} noobserver=""></iconify-icon>`);
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
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/lib/components/ClearableInput.svelte
function ClearableInput($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { value = void 0, onValueClear, showClearButton, clearButtonLabel, lead, $$slots, $$events, ...props } = $$props;
		$$renderer.push(`<div${attr_class("input-group grid", void 0, {
			"grid-cols-[1fr_auto]": !lead,
			"grid-cols-[auto_1fr_auto]": lead
		})}>`);
		lead?.($$renderer);
		$$renderer.push(`<!----> <input${attributes({
			value,
			...props,
			class: clsx(["ig-input", props.class])
		}, void 0, void 0, void 0, 4)}/> `);
		if (showClearButton()) $$renderer.push(`<!--[0--><button${attr("id", `reset-${stringify(props.id)}`)} class="ig-cell items-center border-l-0! px-2"${attr("aria-label", clearButtonLabel)} tabindex="-1" type="button"><iconify-icon class="text-xl" icon="ion:close-circle"></iconify-icon></button>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
		bind_props($$props, { value });
	});
}
// src/lib/components/MarkdownEditor.svelte
function MarkdownEditor($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { value, $$slots, $$events, ...rest } = $$props;
		const t = getFormatter();
		let currentTab = "write";
		let previewNote = derived(() => currentTab === "preview");
		$$renderer.push(`<div class="card preset-filled-surface-100-900 p-2">`);
		Tabs($$renderer, {
			class: "border-none",
			onValueChange: ({ value }) => currentTab = value,
			value: currentTab,
			children: ($$renderer) => {
				if (Tabs.List) {
					$$renderer.push("<!--[-->");
					Tabs.List($$renderer, {
						class: "flex overflow-auto",
						children: ($$renderer) => {
							if (Tabs.Trigger) {
								$$renderer.push("<!--[-->");
								Tabs.Trigger($$renderer, {
									value: "write",
									children: ($$renderer) => {
										$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.write"))}`);
									},
									$$slots: { default: true }
								});
								$$renderer.push("<!--]-->");
							} else {
								$$renderer.push("<!--[!-->");
								$$renderer.push("<!--]-->");
							}
							$$renderer.push(` `);
							if (Tabs.Trigger) {
								$$renderer.push("<!--[-->");
								Tabs.Trigger($$renderer, {
									value: "preview",
									children: ($$renderer) => {
										$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.preview"))}`);
									},
									$$slots: { default: true }
								});
								$$renderer.push("<!--]-->");
							} else {
								$$renderer.push("<!--[!-->");
								$$renderer.push("<!--]-->");
							}
							$$renderer.push(` `);
							if (Tabs.Indicator) {
								$$renderer.push("<!--[-->");
								Tabs.Indicator($$renderer, {});
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
		$$renderer.push(`<!----> <textarea${attributes({
			...rest,
			class: "textarea",
			rows: "4"
		}, void 0, { hidden: previewNote() })}>`);
		const $$body = escape_html(value);
		if ($$body) $$renderer.push(`${$$body}`);
		$$renderer.push(`</textarea> `);
		if (previewNote()) {
			$$renderer.push("<!--[0-->");
			if (value) {
				$$renderer.push(`<!--[0--><div class="preset-outlined-surface-500 rounded-container h-28 max-w-none overflow-auto px-3 py-2 whitespace-pre-wrap" data-testid="markdown-preview">`);
				Markdown($$renderer, { source: value });
				$$renderer.push(`<!----></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <a class="preset-tonal btn btn-sm mt-1" href="https://www.markdownguide.org/basic-syntax/" target="_blank"><iconify-icon icon="ion:logo-markdown"></iconify-icon> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.supports-markdown"))}</span></a></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/lib/components/modals/SelectListManagerModal.svelte
function SelectListManagerModal($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { trigger, onSubmit } = $$props;
		const t = getFormatter();
		let searchValue = void 0;
		let selectedUser = void 0;
		let users = [];
		function resetForm() {
			searchValue = void 0;
			users = [];
			selectedUser = void 0;
		}
		function onFormSubmit() {
			if (selectedUser && selectedUser !== "") onSubmit?.(users.find(({ id }) => id === selectedUser));
			resetForm();
		}
		const collection = derived(() => useListCollection({
			items: users,
			itemToValue(item) {
				return item.id;
			}
		}));
		{
			function description($$renderer) {
				$$renderer.push(`<p>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.add-a-list-manager-explainer"))}</p>`);
			}
			function actions($$renderer, { neutralStyle, positiveStyle }) {
				if (Dialog.CloseTrigger) {
					$$renderer.push("<!--[-->");
					Dialog.CloseTrigger($$renderer, {
						class: neutralStyle,
						onclick: resetForm,
						children: ($$renderer) => {
							$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.cancel"))}`);
						},
						$$slots: { default: true }
					});
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
				$$renderer.push(` `);
				if (Dialog.CloseTrigger) {
					$$renderer.push("<!--[-->");
					Dialog.CloseTrigger($$renderer, {
						class: positiveStyle,
						onclick: onFormSubmit,
						children: ($$renderer) => {
							$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.add-a-manager"))}`);
						},
						$$slots: { default: true }
					});
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
			}
			BaseModal($$renderer, {
				title: store_get($$store_subs ??= {}, "$t", t)("wishes.add-a-list-manager"),
				trigger,
				description,
				actions,
				children: ($$renderer) => {
					Listbox($$renderer, {
						collection: collection(),
						onSelect: (e) => selectedUser = e.value,
						children: ($$renderer) => {
							if (Listbox.Label) {
								$$renderer.push("<!--[-->");
								Listbox.Label($$renderer, {
									class: "text-base",
									children: ($$renderer) => {
										$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.search"))}`);
									},
									$$slots: { default: true }
								});
								$$renderer.push("<!--]-->");
							} else {
								$$renderer.push("<!--[!-->");
								$$renderer.push("<!--]-->");
							}
							$$renderer.push(` `);
							{
								function element($$renderer, props) {
									$$renderer.push(`<div class="input-group grid-cols-[auto_1fr]"><div class="ig-cell preset-tonal"><iconify-icon icon="ion:search"></iconify-icon></div> <input${attributes({
										...props,
										class: "ig-input rounded-l-none ring-0 focus:focus-within:ring-1",
										type: "search",
										value: searchValue
									}, void 0, void 0, void 0, 4)}/></div>`);
								}
								if (Listbox.Input) {
									$$renderer.push("<!--[-->");
									Listbox.Input($$renderer, {
										element,
										$$slots: { element: true }
									});
									$$renderer.push("<!--]-->");
								} else {
									$$renderer.push("<!--[!-->");
									$$renderer.push("<!--]-->");
								}
							}
							$$renderer.push(` `);
							if (Listbox.Content) {
								$$renderer.push("<!--[-->");
								Listbox.Content($$renderer, {
									class: "preset-filled-surface-200-800 preset-outlined-surface-300-700 pt-1",
									children: ($$renderer) => {
										if (collection().items.length === 0) $$renderer.push(`<!--[0--><span class="px-2 pt-1">${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.no-results"))}</span>`);
										else $$renderer.push("<!--[-1-->");
										$$renderer.push(`<!--]--> <!--[-->`);
										const each_array = ensure_array_like(collection().items);
										for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
											let item = each_array[$$index];
											if (Listbox.Item) {
												$$renderer.push("<!--[-->");
												Listbox.Item($$renderer, {
													item,
													children: ($$renderer) => {
														if (Listbox.ItemText) {
															$$renderer.push("<!--[-->");
															Listbox.ItemText($$renderer, {
																children: ($$renderer) => {
																	$$renderer.push(`<span>${escape_html(item.name)}</span> <span class="text-xs opacity-50">${escape_html(item.username)}</span>`);
																},
																$$slots: { default: true }
															});
															$$renderer.push("<!--]-->");
														} else {
															$$renderer.push("<!--[!-->");
															$$renderer.push("<!--]-->");
														}
														$$renderer.push(` `);
														if (Listbox.ItemIndicator) {
															$$renderer.push("<!--[-->");
															Listbox.ItemIndicator($$renderer, {});
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
						},
						$$slots: { default: true }
					});
				},
				$$slots: {
					description: true,
					actions: true,
					default: true
				}
			});
		}
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/lib/components/Checkbox.svelte
function Checkbox($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const _id = props_id($$renderer);
		let { checked = void 0, children, description, $$slots, $$events, ...props } = $$props;
		let id = derived(() => props.name || _id);
		let descriptionId = derived(() => _id + "_desc");
		function checkbox($$renderer) {
			$$renderer.push(`<div class="flex flex-row items-center gap-x-2"><input${attributes({
				id: id(),
				class: clsx(["checkbox", props.class]),
				type: "checkbox",
				checked,
				...props,
				"aria-describedby": description && descriptionId()
			}, void 0, void 0, void 0, 4)}/> <label${attr_class(clsx([props.disabled && "disabled cursor-not-allowed"]))}${attr("for", id())}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></label></div>`);
		}
		if (description) {
			$$renderer.push(`<!--[0--><div class="flex w-full flex-col">`);
			checkbox($$renderer);
			$$renderer.push(`<!----> <span${attr("id", descriptionId())} class="subtext">`);
			description($$renderer);
			$$renderer.push(`<!----></span></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			checkbox($$renderer);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { checked });
	});
}
// src/lib/components/wishlists/ManageListForm.svelte
function ManageListForm($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const formId = props_id($$renderer);
		var $$store_subs;
		const { list: list_, persistButtonName, listMode, allowsPublicLists, claimsVisibleToOwner, groupId, editing = false } = $$props;
		const t = getFormatter();
		let list = list_;
		let defaultColor = derived(() => list.iconColor || "");
		let colorValue = (() => defaultColor())();
		let managers = derived(() => list.managers);
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			$$renderer.push(`<form${attr("id", formId)} action="?/persist" method="POST"><div class="grid grid-cols-12 gap-4 pb-4"><div class="col-span-full flex w-full flex-row flex-wrap gap-4"><label class="label w-fit grow" for="name"><span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.name"))}</span> `);
			ClearableInput($$renderer, {
				id: "name",
				name: "name",
				class: "input",
				autocomplete: "off",
				clearButtonLabel: store_get($$store_subs ??= {}, "$t", t)("a11y.clear-name-field"),
				onValueClear: () => list.name = null,
				placeholder: store_get($$store_subs ??= {}, "$t", t)("wishes.wishes-for", { values: { listOwner: list.owner.name } }),
				showClearButton: () => list.name !== null,
				type: "text",
				get value() {
					return list.name;
				},
				set value($$value) {
					list.name = $$value;
					$$settled = false;
				}
			});
			$$renderer.push(`<!----></label></div> <div class="hidden" aria-hidden="true"><label class="label col-span-full flex flex-col md:col-span-4" for="iconColor"><span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.icon-bg-color"))}</span> <div class="grid grid-cols-[auto_1fr] gap-2"><input id="iconColor" name="iconColor" class="input" type="color"${attr("value", colorValue)}/> `);
			ClearableInput($$renderer, {
				clearButtonLabel: store_get($$store_subs ??= {}, "$t", t)("a11y.clear-color-field"),
				disabled: true,
				onValueClear: () => {
					colorValue = defaultColor();
					list.iconColor = defaultColor();
				},
				readonly: true,
				showClearButton: () => colorValue !== defaultColor(),
				tabindex: -1,
				type: "text",
				value: colorValue
			});
			$$renderer.push(`<!----></div></label> <div class="col-span-full md:col-span-8">`);
			IconSelector($$renderer, {
				id: "icon",
				icon: list.icon,
				onIconSelected: (icon) => list.icon = icon
			});
			$$renderer.push(`<!----></div></div> `);
			if (allowsPublicLists || listMode === "registry") {
				$$renderer.push(`<!--[0--><div class="col-span-full">`);
				{
					function description($$renderer) {
						$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.public-list-option-description"))}`);
					}
					Checkbox($$renderer, {
						name: "public",
						checked: list.public || listMode === "registry",
						disabled: listMode === "registry",
						description,
						children: ($$renderer) => {
							$$renderer.push(`<span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.public"))}</span>`);
						},
						$$slots: {
							description: true,
							default: true
						}
					});
				}
				$$renderer.push(`<!----></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="hidden" aria-hidden="true"><div class="col-span-full">`);
			{
				function description($$renderer) {
					$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.list-hide-owner-description"))}`);
				}
				Checkbox($$renderer, {
					name: "hideOwner",
					get checked() {
						return list.hideOwner;
					},
					set checked($$value) {
						list.hideOwner = $$value;
						$$settled = false;
					},
					description,
					children: ($$renderer) => {
						$$renderer.push(`<span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.hide-owner"))}</span>`);
					},
					$$slots: {
						description: true,
						default: true
					}
				});
			}
			$$renderer.push(`<!----></div></div> <div class="col-span-full">`);
			{
				function description($$renderer) {
					$$renderer.push(`<span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.list-not-for-me-description"))}</span>`);
				}
				Checkbox($$renderer, {
					name: "notForMe",
					get checked() {
						return list.notForMe;
					},
					set checked($$value) {
						list.notForMe = $$value;
						$$settled = false;
					},
					description,
					children: ($$renderer) => {
						$$renderer.push(`<span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.list-not-for-me"))}</span>`);
					},
					$$slots: {
						description: true,
						default: true
					}
				});
			}
			$$renderer.push(`<!----></div> <div class="col-span-full">`);
			{
				function description($$renderer) {
					$$renderer.push(`<span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.list-allow-self-claims-description"))}</span> `);
					if (!claimsVisibleToOwner) $$renderer.push(`<!--[0--><span class="text-invalid italic">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.list-allow-self-claims-description-helper-text"))}</span>`);
					else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]-->`);
				}
				Checkbox($$renderer, {
					name: "allowSelfClaims",
					disabled: !claimsVisibleToOwner || list.notForMe,
					get checked() {
						return list.allowSelfClaims;
					},
					set checked($$value) {
						list.allowSelfClaims = $$value;
						$$settled = false;
					},
					description,
					children: ($$renderer) => {
						$$renderer.push(`<span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.list-allow-self-claims"))}</span>`);
					},
					$$slots: {
						description: true,
						default: true
					}
				});
			}
			$$renderer.push(`<!----></div> <div class="col-span-full"><label class="label mb-1" for="description"><span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.description"))}</span></label> `);
			MarkdownEditor($$renderer, {
				id: "description",
				name: "description",
				placeholder: store_get($$store_subs ??= {}, "$t", t)("general.add-a-description"),
				value: list.description
			});
			$$renderer.push(`<!----></div> <fieldset class="col-span-full flex min-w-0 flex-col space-y-2 md:col-span-5" aria-labelledby="list-managers-label"><div class="flex items-end justify-between">`);
			{
				function label($$renderer) {
					$$renderer.push(`<legend id="list-managers-label">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.list-managers"))}</legend>`);
				}
				function description($$renderer) {
					$$renderer.push(`<p>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.list-managers-tooltip"))}</p>`);
				}
				Tooltip($$renderer, {
					iconClass: "mt-0.5",
					label,
					description,
					$$slots: {
						label: true,
						description: true
					}
				});
			}
			$$renderer.push(`<!----> `);
			{
				function trigger($$renderer, props) {
					$$renderer.push(`<button${attributes({
						...props,
						class: "preset-tonal-primary border-primary-500 btn btn-sm border",
						type: "button"
					})}>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.add-a-manager"))}</button>`);
				}
				SelectListManagerModal($$renderer, {
					managers: [list.owner, ...managers()],
					onSubmit: (newManager) => managers([...managers(), newManager]),
					trigger});
			}
			$$renderer.push(`<!----></div> <div${attr_class(clsx(["border-surface-500 rounded-container flex h-36 flex-col space-y-2 overflow-y-scroll border p-2", page.form?.errors?.managers && "input-invalid!"]))} data-testid="list-managers-list">`);
			if (managers().length === 0) $$renderer.push(`<!--[0--><span class="subtext">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.no-managers"))}</span>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <!--[-->`);
			const each_array = ensure_array_like(managers());
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let manager = each_array[$$index];
				$$renderer.push(`<label class="flex items-center justify-between"${attr("for", manager.id)}><div class="flex items-baseline gap-x-2 truncate"><p class="truncate" data-part="name">${escape_html(manager.name)}</p> <span class="subtext truncate" data-part="email">${escape_html(manager.username)}</span></div> <button class="flex items-center" type="button"><iconify-icon icon="ion:close"></iconify-icon> <span class="sr-only">${escape_html(store_get($$store_subs ??= {}, "$t", t)("a11y.remove-manager-name", { values: { name: manager.name } }))}</span></button></label> <input${attr("id", manager.id)} name="managers" class="hidden" readonly="" type="text"${attr("value", manager.id)}/>`);
			}
			$$renderer.push(`<!--]--></div> `);
			if (page.form?.errors?.managers) $$renderer.push(`<!--[0--><p class="text-invalid">${escape_html(page.form.errors.managers[0])}</p>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></fieldset></div> <div class="flex flex-row flex-wrap justify-between gap-4"><button class="preset-tonal-secondary border-secondary-500 btn w-min border" type="button">${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.cancel"))}</button> <div class="flex flex-row gap-x-4">`);
			if (editing) {
				$$renderer.push("<!--[0-->");
				{
					function trigger($$renderer, props) {
						$$renderer.push(`<button${attributes({
							...props,
							class: "preset-filled-error-500 btn w-min"
						})}>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.delete"))}</button>`);
					}
					ConfirmModal($$renderer, {
						confirmButtonProps: {
							type: "submit",
							form: formId,
							formaction: "?/delete"
						},
						description: store_get($$store_subs ??= {}, "$t", t)("wishes.delete-list-confirmation"),
						trigger,
						$$slots: { trigger: true }
					});
				}
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <button class="preset-filled-primary-500 btn w-min" type="submit">${escape_html(persistButtonName)}</button></div></div></form> <div class="bg-primary-500 hidden"></div>`);
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { ManageListForm as M };
//# sourceMappingURL=ManageListForm.js-CMDd5hSX.js.map
