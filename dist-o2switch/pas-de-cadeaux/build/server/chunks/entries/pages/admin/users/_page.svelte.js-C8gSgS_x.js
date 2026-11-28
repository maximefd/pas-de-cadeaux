import { av as store_get, ax as unsubscribe_stores, aw as ensure_array_like, ao as escape_html, V as derived } from '../../../../chunks/index-server.js-CIVHNbBm.js';
import { d as displayEmail } from '../../../../chunks/email2.js-JCECkH4u.js';
import '../../../../chunks/client.js-CtfT808N.js';
import { S as Search } from '../../../../chunks/Search.js-DiRQYlEs.js';
import { I as InviteUser } from '../../../../chunks/InviteUser.js-Br9OSCSm.js';
import { f as getFormatter } from '../../../../chunks/i18n2.js-1SlG2bAu.js';
import '../../../../chunks/routing.js-DMTqwvGY.js';
import '../../../../chunks/shared.js-Cb68JbUk.js';
import '../../../../chunks/exports.js-BBf-2Qi_.js';
import '../../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../../chunks/utils.js-CAPFIGDr.js';
import '../../../../chunks/TokenCopy.js-CY3taoB-.js';
import '../../../../chunks/anatomy2.js-Deb7OEEc.js';
import '../../../../chunks/create-anatomy.js-CLhpGM8y.js';
import '../../../../chunks/warning.js-12YgogjO.js';
import '../../../../chunks/attachments.js-DNhXZ-Re.js';
import '../../../../chunks/dist2.js-Cjb_BOMc.js';
import '../../../../chunks/get-styles.js-Boa-8w4M.js';
import '../../../../chunks/users.js-DwrjtQr5.js';
import '../../../../chunks/toaster.js-DRl3MQi1.js';
import '../../../../chunks/BaseModal.js-_UDlR-j4.js';
import '../../../../chunks/dist.js-BvNxsp9_.js';
import '../../../../chunks/anatomy5.js-STbBfBjf.js';
import '../../../../chunks/use-list-collection.js-brFPftRE.js';
import '../../../../chunks/equal.js-nd5Stm03.js';
import '../../../../chunks/Popup.js-CGmgV3d5.js';
import '../../../../chunks/anatomy3.js-HwVFkfZZ.js';
import '../../../../chunks/index-server2.js-DZFYXfYm.js';

// src/lib/components/admin/Users.svelte
function Users($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { users, config, groups } = $$props;
		const t = getFormatter();
		const headers = [
			store_get($$store_subs ??= {}, "$t", t)("auth.name"),
			store_get($$store_subs ??= {}, "$t", t)("auth.username"),
			store_get($$store_subs ??= {}, "$t", t)("auth.email"),
			store_get($$store_subs ??= {}, "$t", t)("admin.admin"),
			store_get($$store_subs ??= {}, "$t", t)("admin.groups")
		];
		let usersFiltered = derived(() => users);
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			$$renderer.push(`<div class="mb-4 flex flex-col space-y-4 md:flex-row md:items-end md:space-y-0 md:gap-x-4">`);
			Search($$renderer, {
				data: users,
				keys: ["name", "username"],
				get result() {
					return usersFiltered();
				},
				set result($$value) {
					usersFiltered($$value);
					$$settled = false;
				}
			});
			$$renderer.push(`<!----> <form method="POST">`);
			InviteUser($$renderer, {
				config,
				groups
			});
			$$renderer.push(`<!----></form></div> <div class="table-wrap preset-outlined-surface-200-800 rounded-container"><table class="table-hover table"><thead><tr><!--[-->`);
			const each_array = ensure_array_like(headers);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let header = each_array[$$index];
				$$renderer.push(`<th>${escape_html(header)}</th>`);
			}
			$$renderer.push(`<!--]--></tr></thead><tbody><!--[-->`);
			const each_array_1 = ensure_array_like(usersFiltered());
			for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
				let user = each_array_1[$$index_2];
				$$renderer.push(`<tr><td class="text-nowrap">${escape_html(user.name)}</td><td>${escape_html(user.username)}</td><td>${escape_html(displayEmail(user.email))}</td><td class="text-center">`);
				if (user.isAdmin) $$renderer.push(`<!--[0--><iconify-icon class="text-lg" icon="ion:checkmark"></iconify-icon>`);
				else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></td><td class="flex flex-wrap gap-1"><!--[-->`);
				const each_array_2 = ensure_array_like(user.groups?.toSorted());
				for (let $$index_1 = 0, $$length = each_array_2.length; $$index_1 < $$length; $$index_1++) {
					let group = each_array_2[$$index_1];
					$$renderer.push(`<span class="badge preset-tonal-secondary inset-ring-secondary-500 inset-ring">${escape_html(group)}</span>`);
				}
				$$renderer.push(`<!--]--></td></tr>`);
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
// src/routes/admin/users/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { data } = $$props;
		Users($$renderer, {
			config: data.config,
			currentUser: data.user,
			groups: data.groups,
			users: data.users
		});
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-C8gSgS_x.js.map
