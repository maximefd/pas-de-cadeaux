import { ay as attr_class, ao as escape_html, av as store_get, am as clsx, au as attr, aw as ensure_array_like, ax as unsubscribe_stores, V as derived, ak as attributes } from './index-server.js-CIVHNbBm.js';
import { T as TokenCopy } from './TokenCopy.js-CY3taoB-.js';
import { I as InviteUsersAPI } from './users.js-DwrjtQr5.js';
import { f as getFormatter } from './i18n2.js-1SlG2bAu.js';
import { t as toaster } from './toaster.js-DRl3MQi1.js';
import { B as BaseModal, D as Dialog } from './BaseModal.js-_UDlR-j4.js';
import { L as Listbox } from './anatomy5.js-STbBfBjf.js';
import { u as useListCollection } from './use-list-collection.js-brFPftRE.js';
import { P as Popup } from './Popup.js-CGmgV3d5.js';

// src/lib/components/modals/InviteUserModal.svelte
function InviteUserModal($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { trigger, groups, defaultGroup, smtpEnabled, onSubmit } = $$props;
		const t = getFormatter();
		let open = false;
		let userEmail = void 0;
		let selectedGroup = defaultGroup?.id;
		let emailError = false;
		let groupError = false;
		const onFormSubmit = async (method) => {
			if (selectedGroup && (method === "link")) {
				onSubmit?.({
					group: selectedGroup,
					email: userEmail,
					method
				});
				resetForm();
				open = false;
			} else {
				open = true;
				emailError = smtpEnabled && !userEmail;
				groupError = !selectedGroup;
			}
		};
		const collection = derived(() => useListCollection({
			items: groups,
			itemToString(item) {
				return item.name;
			},
			itemToValue(item) {
				return item.id;
			}
		}));
		function resetForm() {
			groupError = false;
			emailError = false;
			userEmail = void 0;
		}
		{
			function description($$renderer) {
				if (smtpEnabled) $$renderer.push(`<!--[0--><span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.enter-user-email"))}</span>`);
				else $$renderer.push(`<!--[-1--><span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.select-user-group"))}</span>`);
				$$renderer.push(`<!--]-->`);
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
				if (smtpEnabled) {
					$$renderer.push("<!--[0-->");
					{
						function trigger($$renderer, props) {
							$$renderer.push(`<button${attributes({
								...props,
								class: clsx(positiveStyle)
							})}>${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.invite-via"))}</button>`);
						}
						function content($$renderer, props) {
							$$renderer.push(`<div${attributes({
								...props,
								class: "card preset-filled-surface-100-900 p-4 shadow-xl"
							})}><div class="flex flex-row gap-x-4"><button class="preset-tonal-primary border-primary-500 btn border">${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.invite-link"))}</button> <button class="preset-filled-primary-500 btn">${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.email"))}</button></div></div>`);
						}
						Popup($$renderer, {
							zIndex: "z-60!",
							trigger,
							content,
							$$slots: {
								trigger: true,
								content: true
							}
						});
					}
				} else {
					$$renderer.push("<!--[-1-->");
					if (Dialog.CloseTrigger) {
						$$renderer.push("<!--[-->");
						Dialog.CloseTrigger($$renderer, {
							class: positiveStyle,
							onclick: () => onFormSubmit("link"),
							children: ($$renderer) => {
								$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.invite"))}`);
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
			}
			BaseModal($$renderer, {
				onOpenChange: (e) => open = e.open,
				open,
				title: store_get($$store_subs ??= {}, "$t", t)("general.invite-user"),
				trigger,
				description,
				actions,
				children: ($$renderer) => {
					$$renderer.push(`<div class="flex flex-col gap-2">`);
					if (smtpEnabled) {
						$$renderer.push(`<!--[0--><label class="label w-fit" for="invite-email"><span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.email"))}</span> <input id="invite-email" name="invite-email"${attr_class(clsx(["input", emailError && "input-invalid"]))}${attr("aria-invalid", emailError)} autocomplete="off" required=""${attr("value", userEmail)}/></label> `);
						if (emailError) $$renderer.push(`<!--[0--><span class="text-invalid">Email is required</span>`);
						else $$renderer.push("<!--[-1-->");
						$$renderer.push(`<!--]-->`);
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--> `);
					if (groups && groups.length > 0) {
						$$renderer.push("<!--[0-->");
						Listbox($$renderer, {
							"aria-invalid": groupError,
							collection: collection(),
							onSelect: (e) => selectedGroup = e.value,
							children: ($$renderer) => {
								if (Listbox.Label) {
									$$renderer.push("<!--[-->");
									Listbox.Label($$renderer, {
										class: "text-base",
										children: ($$renderer) => {
											$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.group"))}`);
										},
										$$slots: { default: true }
									});
									$$renderer.push("<!--]-->");
								} else {
									$$renderer.push("<!--[!-->");
									$$renderer.push("<!--]-->");
								}
								$$renderer.push(` `);
								if (Listbox.Content) {
									$$renderer.push("<!--[-->");
									Listbox.Content($$renderer, {
										class: ["preset-filled-surface-200-800 preset-outlined-surface-300-700 pt-3", groupError && "input-invalid!"],
										children: ($$renderer) => {
											$$renderer.push(`<!--[-->`);
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
																		$$renderer.push(`<!---->${escape_html(item.name)}`);
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
						$$renderer.push(`<!----> `);
						if (groupError) $$renderer.push(`<!--[0--><span class="text-invalid">${escape_html(store_get($$store_subs ??= {}, "$t", t)("errors.must-select-a-group"))}</span>`);
						else $$renderer.push("<!--[-1-->");
						$$renderer.push(`<!--]-->`);
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--></div>`);
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
// src/lib/components/admin/InviteUser.svelte
function InviteUser($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { config, groups = [], defaultGroup = void 0, vertical = false } = $$props;
		const t = getFormatter();
		const inviteUsersAPI = new InviteUsersAPI();
		let url = null;
		const generateInvite = async (data) => {
			if (data.method === "link") {
				const response = await inviteUsersAPI.invite(data);
				if (response.ok) {
					const respData = await response.json();
					if (respData.url) url = respData.url;
				} else toaster.error({ description: store_get($$store_subs ??= {}, "$t", t)("general.oops") });
				return;
			}
			if (data.method === "email") toaster.promise(inviteUsersAPI.invite(data).then(async (resp) => {
				if (!resp.ok) {
					const data = await resp.json();
					throw new Error(data?.message);
				}
			}), {
				loading: { description: "Sending invite..." },
				success: { description: store_get($$store_subs ??= {}, "$t", t)("general.invite-sent") },
				error: (err) => {
					const message = err.message;
					return { description: store_get($$store_subs ??= {}, "$t", t)("errors.invite-failed-to-send", { values: { errorMessage: message || store_get($$store_subs ??= {}, "$t", t)("general.oops") } }) };
				}
			});
		};
		$$renderer.push(`<div${attr_class(`flex flex-col space-y-4 ${vertical ? "items-center" : "md:flex-row md:items-end md:space-y-0 md:gap-x-4"}`)}>`);
		{
			function trigger($$renderer, props) {
				$$renderer.push(`<button${attributes({
					...props,
					class: "preset-filled-primary-500 btn w-fit",
					type: "button"
				})}><iconify-icon icon="ion:person-add"></iconify-icon> <p>${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.invite-user"))}</p></button>`);
			}
			InviteUserModal($$renderer, {
				defaultGroup,
				groups,
				onSubmit: generateInvite,
				smtpEnabled: config.smtp.enable,
				trigger});
		}
		$$renderer.push(`<!----> `);
		if (url) {
			$$renderer.push(`<!--[0--><div${attr_class(clsx(["flex flex-row flex-wrap items-center"]))}>`);
			TokenCopy($$renderer, {
				onCopied: () => setTimeout(() => url = null, 1e3),
				url,
				children: ($$renderer) => {
					$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.invite-link"))}`);
				}});
			$$renderer.push(`<!----> <span class="subtext text-wrap italic">${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.this-invite-link-is-only-valid-for-one-signup"))}</span></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { InviteUser as I };
//# sourceMappingURL=InviteUser.js-Br9OSCSm.js.map
