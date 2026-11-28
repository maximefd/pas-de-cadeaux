import { aw as ensure_array_like, ay as attr_class, am as clsx, au as attr, ao as escape_html, av as store_get, ax as unsubscribe_stores, V as derived } from '../../../../chunks/index-server.js-CIVHNbBm.js';
import { g as goto } from '../../../../chunks/client.js-CtfT808N.js';
import { p as page } from '../../../../chunks/state.js-DFeh0alp.js';
import { G as General_default, o as options, E as Email_default, S as Security_default } from '../../../../chunks/Settings.js-DvkMcewm.js';
import { f as getFormatter } from '../../../../chunks/i18n2.js-1SlG2bAu.js';
import '../../../../chunks/toaster.js-DRl3MQi1.js';
import '../../../../chunks/routing.js-DMTqwvGY.js';
import '../../../../chunks/shared.js-Cb68JbUk.js';
import '../../../../chunks/exports.js-BBf-2Qi_.js';
import '../../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../../chunks/utils.js-CAPFIGDr.js';
import '../../../../chunks/PasswordInput.js-Dm21DatN.js';
import '@zxcvbn-ts/core';
import '../../../../chunks/create-anatomy.js-CLhpGM8y.js';
import '../../../../chunks/warning.js-12YgogjO.js';
import '../../../../chunks/equal.js-nd5Stm03.js';
import '../../../../chunks/number.js-B87QIgOI.js';
import '../../../../chunks/anatomy3.js-HwVFkfZZ.js';
import '../../../../chunks/get-styles.js-Boa-8w4M.js';
import '../../../../chunks/anatomy2.js-Deb7OEEc.js';
import '../../../../chunks/dist.js-BvNxsp9_.js';
import '../../../../chunks/Tooltip.js-D0qklLov.js';
import '../../../../chunks/zxcvbn.js-ByAwPR8u.js';
import '../../../../chunks/index-server2.js-DZFYXfYm.js';

// src/routes/admin/settings/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { data } = $$props;
		const t = getFormatter();
		const currentHash = derived(() => page.url.hash);
		let config = derived(() => data.config), groups = derived(() => data.groups), envManagedKeys = derived(() => data.envManagedKeys);
		let sending = false;
		let saving = false;
		$$renderer.push(`<form action="?/settings" method="POST"><div class="flex w-full flex-col gap-4 md:flex-row"><aside class="hidden md:block md:w-1/3 lg:w-1/4"><nav class="list-nav"><ul><!--[-->`);
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
			config: config(),
			groups: groups(),
			hidden: currentHash() !== options[0].hash
		});
		$$renderer.push(`<!----> `);
		Email_default($$renderer, {
			config: config(),
			hidden: currentHash() !== options[1].hash,
			sending
		});
		$$renderer.push(`<!----> `);
		Security_default($$renderer, {
			config: config(),
			envManagedKeys: envManagedKeys(),
			hidden: currentHash() !== options[2].hash
		});
		$$renderer.push(`<!----> `);
		if (page.form?.error) $$renderer.push(`<!--[0--><span>${escape_html(page.form.error)}</span>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="flex w-full flex-row justify-end pt-5"><button class="preset-filled-primary-500 btn"${attr("disabled", saving, true)} type="submit">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.save"))}</span></button></div></div></div></form>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-Kh9yVVJJ.js.map
