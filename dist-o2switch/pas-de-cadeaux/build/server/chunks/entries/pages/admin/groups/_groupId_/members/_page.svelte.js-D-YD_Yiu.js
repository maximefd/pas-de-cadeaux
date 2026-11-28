import { av as store_get, ao as escape_html, aw as ensure_array_like, au as attr, ax as unsubscribe_stores, V as derived, ai as spread_props, ap as html, ak as attributes } from '../../../../../../chunks/index-server.js-CIVHNbBm.js';
import { d as displayEmail } from '../../../../../../chunks/email2.js-JCECkH4u.js';
import { g as goto, i as invalidateAll } from '../../../../../../chunks/client.js-CtfT808N.js';
import { p as page } from '../../../../../../chunks/state.js-DFeh0alp.js';
import { G as GroupAPI } from '../../../../../../chunks/groups.js-9o7-Je8O.js';
import { T as TokenCopy } from '../../../../../../chunks/TokenCopy.js-CY3taoB-.js';
import { C as ClearListsButton } from '../../../../../../chunks/ClearListsButton.js-BfQAGfuC.js';
import { A as Alert } from '../../../../../../chunks/Alert.js-BDR4Ju8X.js';
import { f as getFormatter } from '../../../../../../chunks/i18n2.js-1SlG2bAu.js';
import { B as BaseModal, D as Dialog } from '../../../../../../chunks/BaseModal.js-_UDlR-j4.js';
import { C as ConfirmModal } from '../../../../../../chunks/ConfirmModal.js-BchEguXy.js';
import { L as Listbox } from '../../../../../../chunks/anatomy5.js-STbBfBjf.js';
import { u as useListCollection } from '../../../../../../chunks/use-list-collection.js-brFPftRE.js';
import '../../../../../../chunks/routing.js-DMTqwvGY.js';
import '../../../../../../chunks/shared.js-Cb68JbUk.js';
import '../../../../../../chunks/exports.js-BBf-2Qi_.js';
import '../../../../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../../../../chunks/utils.js-CAPFIGDr.js';
import '../../../../../../chunks/schema.js-_174nGak.js';
import '../../../../../../chunks/anatomy2.js-Deb7OEEc.js';
import '../../../../../../chunks/create-anatomy.js-CLhpGM8y.js';
import '../../../../../../chunks/warning.js-12YgogjO.js';
import '../../../../../../chunks/attachments.js-DNhXZ-Re.js';
import '../../../../../../chunks/dist2.js-Cjb_BOMc.js';
import '../../../../../../chunks/get-styles.js-Boa-8w4M.js';
import '../../../../../../chunks/items2.js-C4c-wPjk.js';
import '../../../../../../chunks/toaster.js-DRl3MQi1.js';
import '../../../../../../chunks/index-server2.js-DZFYXfYm.js';
import '../../../../../../chunks/dist.js-BvNxsp9_.js';
import '../../../../../../chunks/equal.js-nd5Stm03.js';

// src/lib/components/modals/AlertModal.svelte
function AlertModal($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const t = getFormatter();
		const { onConfirm, confirmText = store_get($$store_subs ??= {}, "$t", t)("general.ok"), $$slots, $$events, ...rest } = $$props;
		{
			function actions($$renderer, { positiveStyle }) {
				if (Dialog.CloseTrigger) {
					$$renderer.push("<!--[-->");
					Dialog.CloseTrigger($$renderer, {
						class: [positiveStyle, "only-of-type:ml-auto"],
						onclick: onConfirm,
						children: ($$renderer) => {
							$$renderer.push(`<!---->${escape_html(confirmText)}`);
						},
						$$slots: { default: true }
					});
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
			}
			BaseModal($$renderer, spread_props([rest, {
				actions,
				$$slots: { actions: true }
			}]));
		}
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/lib/components/modals/DeleteGroupModal.svelte
function DeleteGroupModal($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { groupId, defaultGroup } = $$props;
		const t = getFormatter();
		const groupAPI = derived(() => new GroupAPI(groupId));
		const isDefaultGroup = derived(() => defaultGroup === groupId);
		const onConfirm = async () => {
			if (await groupAPI().delete()) goto("/admin/groups", { });
		};
		if (isDefaultGroup()) {
			$$renderer.push("<!--[0-->");
			{
				function trigger($$renderer, props) {
					$$renderer.push(`<button${attributes({
						...props,
						class: "preset-filled-error-500 btn w-fit"
					})}>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.delete-group-title"))}</button>`);
				}
				function description($$renderer) {
					$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.cannot-delete-default-group-msg"))}`);
				}
				AlertModal($$renderer, {
					title: store_get($$store_subs ??= {}, "$t", t)("errors.cannot-delete-default-group"),
					trigger,
					description,
					$$slots: {
						trigger: true,
						description: true
					}
				});
			}
		} else {
			$$renderer.push("<!--[-1-->");
			{
				function trigger($$renderer, props) {
					$$renderer.push(`<button${attributes({
						...props,
						class: "preset-filled-error-500 btn w-fit"
					})}>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.delete-group-title"))}</button>`);
				}
				function description($$renderer) {
					$$renderer.push(`${html(store_get($$store_subs ??= {}, "$t", t)("admin.delete-group-message"))}`);
				}
				ConfirmModal($$renderer, {
					onConfirm,
					title: store_get($$store_subs ??= {}, "$t", t)("admin.delete-group-title"),
					trigger,
					description,
					$$slots: {
						trigger: true,
						description: true
					}
				});
			}
		}
		$$renderer.push(`<!--]-->`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/lib/components/modals/AddUserModal.svelte
function AddUserModal($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { groupId, trigger} = $$props;
		const t = getFormatter();
		const groupAPI = derived(() => new GroupAPI(groupId));
		function resetForm() {
			searchValue = void 0;
			searchedUsers = [];
			selectedUser = void 0;
		}
		async function onFormSubmit() {
			if (selectedUser) {
				await groupAPI().addMember(selectedUser);
				await invalidateAll();
			}
			resetForm();
		}
		let searchedUsers = [];
		let selectedUser = void 0;
		let searchValue = void 0;
		const collection = derived(() => useListCollection({
			items: searchedUsers,
			itemToValue(item) {
				return item.id;
			}
		}));
		{
			function description($$renderer) {
				$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.search-for-user"))}`);
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
							$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.add-user"))}`);
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
				title: store_get($$store_subs ??= {}, "$t", t)("general.add-user"),
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
// src/routes/admin/groups/[groupId]/members/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { data } = $$props;
		const t = getFormatter();
		const groupAPI = derived(() => new GroupAPI(data.group.id));
		const head = [
			store_get($$store_subs ??= {}, "$t", t)("auth.name"),
			store_get($$store_subs ??= {}, "$t", t)("auth.username"),
			store_get($$store_subs ??= {}, "$t", t)("auth.email")
		];
		const dataKeys = [
			"name",
			"username",
			"email"
		];
		const toggleManager = async (userId, isManager) => {
			if (isManager) await groupAPI().makeManager(userId);
			else await groupAPI().removeManager(userId);
			await invalidateAll();
		};
		const removeMember = async (userId) => {
			await groupAPI().removeMember(userId);
			await invalidateAll();
		};
		if (data.config.listMode !== "registry") {
			$$renderer.push(`<!--[0--><div class="flex flex-wrap gap-2 py-4">`);
			{
				function trigger($$renderer, props) {
					$$renderer.push(`<button${attributes({
						class: "preset-filled-primary-500 btn",
						type: "button",
						...props
					})}><iconify-icon icon="ion:person-add"></iconify-icon> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.add-member"))}</span></button>`);
				}
				AddUserModal($$renderer, {
					excludedUserIds: data.group.users.map(({ id }) => id),
					groupId: data.group.id,
					trigger});
			}
			$$renderer.push(`<!----></div> <div class="flex flex-col gap-2 pb-4"><h2 class="h5">${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.group-invite-title"))}</h2> `);
			if (data.invite && !data.invite.expired) {
				$$renderer.push("<!--[0-->");
				const inviteUrl = new URL(`/signup?token=${data.invite.token}`, page.url).href;
				$$renderer.push(`<p class="subtext">${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.group-invite-help", { values: { date: new Date(data.invite.expiresAt).toLocaleString("fr-FR", {
					dateStyle: "long",
					timeStyle: "short"
				}) } }))}</p> <div class="flex flex-row flex-wrap items-center gap-2">`);
				TokenCopy($$renderer, {
					url: inviteUrl,
					children: ($$renderer) => {
						$$renderer.push(`<!---->${escape_html(inviteUrl)}`);
					}});
				$$renderer.push(`<!----></div>`);
			} else if (data.invite) $$renderer.push(`<!--[1--><p class="subtext">${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.group-invite-expired"))}</p>`);
			else $$renderer.push(`<!--[-1--><p class="subtext">${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.group-invite-none"))}</p>`);
			$$renderer.push(`<!--]--> <div class="flex flex-wrap gap-2"><form method="POST" action="?/createLink"><button class="preset-filled-primary-500 btn" type="submit">${escape_html(data.invite ? store_get($$store_subs ??= {}, "$t", t)("admin.group-invite-renew") : store_get($$store_subs ??= {}, "$t", t)("admin.group-invite-create"))}</button></form> `);
			if (data.invite) $$renderer.push(`<!--[0--><form method="POST" action="?/revokeLink"><button class="preset-tonal btn" type="submit">${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.group-invite-revoke"))}</button></form>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			Alert($$renderer, {
				type: "info",
				children: ($$renderer) => {
					$$renderer.push(`${html(store_get($$store_subs ??= {}, "$t", t)("admin.registry-mode-alert-text"))}`);
				},
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!--]--> <div class="flex flex-col space-y-2"><div class="table-wrap preset-outlined-surface-200-800 rounded-container"><table class="table"><thead><tr><!--[-->`);
		const each_array = ensure_array_like(head);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let label = each_array[$$index];
			$$renderer.push(`<th>${escape_html(label)}</th>`);
		}
		$$renderer.push(`<!--]--><th>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.manager"))}</th><th>${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.remove"))}</th></tr></thead><tbody><!--[-->`);
		const each_array_1 = ensure_array_like(data.group.users);
		for (let row = 0, $$length = each_array_1.length; row < $$length; row++) {
			let user = each_array_1[row];
			const isManager = !user.isGroupManager;
			$$renderer.push(`<tr${attr("aria-rowindex", row)}><!--[-->`);
			const each_array_2 = ensure_array_like(dataKeys);
			for (let col = 0, $$length = each_array_2.length; col < $$length; col++) {
				let key = each_array_2[col];
				$$renderer.push(`<td${attr("aria-colindex", col)}${attr("tabindex", col === 0 ? 0 : -1)}>${escape_html(key === "email" ? displayEmail(user.email) : user[key])}</td>`);
			}
			$$renderer.push(`<!--]--><td>`);
			{
				function description($$renderer) {
					$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.add-remove-manager-message", { values: { isManager } }))}`);
				}
				function trigger($$renderer, props) {
					$$renderer.push(`<button${attributes({
						class: "btn-icon",
						...props
					})}><iconify-icon class="text-primary-500"${attr("icon", `ion:sparkles${!isManager ? "" : "-outline"}`)}></iconify-icon></button>`);
				}
				ConfirmModal($$renderer, {
					onConfirm: () => toggleManager(user.id, isManager),
					title: store_get($$store_subs ??= {}, "$t", t)("admin.add-remove-manager-title", { values: { isManager } }),
					description,
					trigger,
					$$slots: {
						description: true,
						trigger: true
					}
				});
			}
			$$renderer.push(`<!----></td><td${attr("aria-colindex", dataKeys.length)}${attr("tabindex", -1)}>`);
			{
				function description($$renderer) {
					$$renderer.push(`${html(store_get($$store_subs ??= {}, "$t", t)("admin.remove-member-message"))}`);
				}
				function trigger($$renderer, props) {
					$$renderer.push(`<button${attributes({
						class: "btn-icon",
						"aria-label": store_get($$store_subs ??= {}, "$t", t)("a11y.remove-user-from-group", { values: { user: user.name } }),
						...props
					})}><iconify-icon class="text-error-500" icon="ion:person-remove"></iconify-icon></button>`);
				}
				ConfirmModal($$renderer, {
					onConfirm: () => removeMember(user.id),
					title: store_get($$store_subs ??= {}, "$t", t)("admin.remove-member-title"),
					description,
					trigger,
					$$slots: {
						description: true,
						trigger: true
					}
				});
			}
			$$renderer.push(`<!----></td></tr>`);
		}
		$$renderer.push(`<!--]--></tbody></table></div> <div class="flex flex-wrap gap-2">`);
		DeleteGroupModal($$renderer, {
			defaultGroup: data.config.defaultGroup,
			groupId: data.group.id
		});
		$$renderer.push(`<!----> `);
		ClearListsButton($$renderer, { groupId: page.params.groupId });
		$$renderer.push(`<!----> `);
		ClearListsButton($$renderer, {
			claimed: true,
			groupId: page.params.groupId
		});
		$$renderer.push(`<!----></div></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-D-YD_Yiu.js.map
