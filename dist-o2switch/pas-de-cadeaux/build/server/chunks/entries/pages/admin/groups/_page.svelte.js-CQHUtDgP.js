import { av as store_get, ax as unsubscribe_stores, aw as ensure_array_like, ao as escape_html, ai as spread_props, ak as attributes, V as derived } from '../../../../chunks/index-server.js-CIVHNbBm.js';
import { i as invalidateAll } from '../../../../chunks/client.js-CtfT808N.js';
import { S as Search } from '../../../../chunks/Search.js-DiRQYlEs.js';
import { a as GroupsAPI } from '../../../../chunks/groups.js-9o7-Je8O.js';
import { f as getFormatter } from '../../../../chunks/i18n2.js-1SlG2bAu.js';
import { t as toaster } from '../../../../chunks/toaster.js-DRl3MQi1.js';
import { C as ConfirmModal } from '../../../../chunks/ConfirmModal.js-BchEguXy.js';
import '../../../../chunks/routing.js-DMTqwvGY.js';
import '../../../../chunks/shared.js-Cb68JbUk.js';
import '../../../../chunks/exports.js-BBf-2Qi_.js';
import '../../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../../chunks/utils.js-CAPFIGDr.js';
import '../../../../chunks/schema.js-_174nGak.js';
import '../../../../chunks/index-server2.js-DZFYXfYm.js';
import '../../../../chunks/warning.js-12YgogjO.js';
import '../../../../chunks/BaseModal.js-_UDlR-j4.js';
import '../../../../chunks/create-anatomy.js-CLhpGM8y.js';
import '../../../../chunks/dist.js-BvNxsp9_.js';
import '../../../../chunks/anatomy2.js-Deb7OEEc.js';

// src/lib/components/modals/PromptModal.svelte
function PromptModal($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const t = getFormatter();
		const { confirmText = store_get($$store_subs ??= {}, "$t", t)("general.submit"), onSubmit, inputProps, $$slots, $$events, ...rest } = $$props;
		let value = void 0;
		ConfirmModal($$renderer, spread_props([
			{ confirmText },
			rest,
			{
				onConfirm: () => {
					onSubmit(value);
					value = void 0;
				},
				children: ($$renderer) => {
					$$renderer.push(`<input${attributes({
						class: "input",
						type: "text",
						value,
						...inputProps
					}, void 0, void 0, void 0, 4)}/>`);
				},
				$$slots: { default: true }
			}
		]));
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/lib/components/admin/Groups.svelte
function Groups($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { groups } = $$props;
		const t = getFormatter();
		const headers = [store_get($$store_subs ??= {}, "$t", t)("auth.name"), store_get($$store_subs ??= {}, "$t", t)("general.user-count")];
		let groupsFiltered = derived(() => groups);
		const createGroup = async (name) => {
			if (!name) return;
			if (await new GroupsAPI().create(name)) toaster.info({ description: store_get($$store_subs ??= {}, "$t", t)("general.group-created-successfully") });
			else toaster.error({ description: store_get($$store_subs ??= {}, "$t", t)("errors.create-group-unknown-error") });
			await invalidateAll();
		};
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			$$renderer.push(`<div class="mb-4 flex flex-col space-y-4 md:flex-row md:items-end md:space-y-0 md:gap-x-4">`);
			Search($$renderer, {
				data: groups,
				keys: ["name"],
				get result() {
					return groupsFiltered();
				},
				set result($$value) {
					groupsFiltered($$value);
					$$settled = false;
				}
			});
			$$renderer.push(`<!----> `);
			{
				function trigger($$renderer, props) {
					$$renderer.push(`<button${attributes({
						class: "preset-filled-primary-500 btn",
						...props
					})}><iconify-icon icon="ion:add"></iconify-icon> <p>${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.create-group"))}</p></button>`);
				}
				PromptModal($$renderer, {
					description: store_get($$store_subs ??= {}, "$t", t)("general.provide-the-name-of-the-group-below"),
					inputProps: {
						type: "text",
						minlength: 3,
						maxlength: 32,
						required: true
					},
					onSubmit: createGroup,
					title: store_get($$store_subs ??= {}, "$t", t)("general.enter-group-name"),
					trigger,
					$$slots: { trigger: true }
				});
			}
			$$renderer.push(`<!----></div> <div class="table-wrap preset-outlined-surface-200-800 rounded-container"><table class="table-hover table table-auto"><thead><tr><!--[-->`);
			const each_array = ensure_array_like(headers);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let header = each_array[$$index];
				$$renderer.push(`<th>${escape_html(header)}</th>`);
			}
			$$renderer.push(`<!--]--></tr></thead><tbody><!--[-->`);
			const each_array_1 = ensure_array_like(groupsFiltered());
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let group = each_array_1[$$index_1];
				$$renderer.push(`<tr><td>${escape_html(group.name)}</td><td>${escape_html(group.userCount)}</td></tr>`);
			}
			$$renderer.push(`<!--]--></tbody></table></div>`);
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
// src/routes/admin/groups/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { data } = $$props;
		Groups($$renderer, { groups: data.groups });
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-CQHUtDgP.js.map
