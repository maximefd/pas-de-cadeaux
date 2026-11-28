import { at as head, ao as escape_html, av as store_get, au as attr, ax as unsubscribe_stores } from '../../../chunks/index-server.js-CIVHNbBm.js';
import '../../../chunks/client.js-CtfT808N.js';
import { P as PasswordInput } from '../../../chunks/PasswordInput.js-Dm21DatN.js';
import { f as getFormatter } from '../../../chunks/i18n2.js-1SlG2bAu.js';
import '../../../chunks/toaster.js-DRl3MQi1.js';
import '../../../chunks/routing.js-DMTqwvGY.js';
import '../../../chunks/shared.js-Cb68JbUk.js';
import '../../../chunks/exports.js-BBf-2Qi_.js';
import '../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../chunks/utils.js-CAPFIGDr.js';
import '@zxcvbn-ts/core';
import '../../../chunks/create-anatomy.js-CLhpGM8y.js';
import '../../../chunks/warning.js-12YgogjO.js';
import '../../../chunks/equal.js-nd5Stm03.js';
import '../../../chunks/number.js-B87QIgOI.js';
import '../../../chunks/anatomy3.js-HwVFkfZZ.js';
import '../../../chunks/get-styles.js-Boa-8w4M.js';
import '../../../chunks/anatomy2.js-Deb7OEEc.js';
import '../../../chunks/dist.js-BvNxsp9_.js';
import '../../../chunks/index-server2.js-DZFYXfYm.js';

// src/routes/reset-password/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { data, form } = $$props;
		const t = getFormatter();
		let newPassword = "";
		let confirmPassword = "";
		let loading = false;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			head("gimkg8", $$renderer, ($$renderer) => {
				$$renderer.title(($$renderer) => {
					$$renderer.push(`<title>${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.reset-password"))}</title>`);
				});
			});
			$$renderer.push(`<div class="flex flex-col items-center space-y-4"><h1 class="h1">${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.reset-password"))}</h1> <form class="w-80" method="POST"><div class="bg-surface-100-900 rounded-container border-surface-200-800 flex flex-col space-y-4 border p-4">`);
			PasswordInput($$renderer, {
				id: "password",
				name: "password",
				autocomplete: "new-password",
				label: store_get($$store_subs ??= {}, "$t", t)("auth.new-password"),
				required: true,
				strengthMeter: true,
				get value() {
					return newPassword;
				},
				set value($$value) {
					newPassword = $$value;
					$$settled = false;
				}
			});
			$$renderer.push(`<!----> `);
			PasswordInput($$renderer, {
				id: "confirmpassword",
				autocomplete: "new-password",
				label: store_get($$store_subs ??= {}, "$t", t)("auth.confirm-password"),
				required: true,
				get value() {
					return confirmPassword;
				},
				set value($$value) {
					confirmPassword = $$value;
					$$settled = false;
				}
			});
			$$renderer.push(`<!----> `);
			if (newPassword !== confirmPassword) $$renderer.push(`<!--[0--><span class="text-invalid">${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.passwords-must-match"))}</span>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (form?.errors?.newPassword) $$renderer.push(`<!--[0--><span class="text-invalid">${escape_html(form?.errors?.newPassword[0])}</span>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <button class="preset-filled-primary-500 btn w-full"${attr("disabled", newPassword === "" || newPassword !== confirmPassword || loading, true)} type="submit">`);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> ${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.update-password"))}</button> `);
			if (form?.errors?.id) $$renderer.push(`<!--[0--><span class="text-invalid text-wrap">${escape_html(form.errors.id)}</span>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (form?.errors?.userId) $$renderer.push(`<!--[0--><span class="text-invalid text-wrap">${escape_html(form.errors.userId)}</span>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div></form></div>`);
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

export { _page as default };
//# sourceMappingURL=_page.svelte.js-aLXRjXLr.js.map
