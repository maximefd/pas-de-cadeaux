import { ao as escape_html, au as attr, av as store_get, ax as unsubscribe_stores, V as derived } from '../../../../../../chunks/index-server.js-CIVHNbBm.js';
import '../../../../../../chunks/client.js-CtfT808N.js';
import { G as General_default } from '../../../../../../chunks/Settings.js-DvkMcewm.js';
import { f as getFormatter } from '../../../../../../chunks/i18n2.js-1SlG2bAu.js';
import { p as page } from '../../../../../../chunks/state.js-DFeh0alp.js';
import '../../../../../../chunks/toaster.js-DRl3MQi1.js';
import '../../../../../../chunks/routing.js-DMTqwvGY.js';
import '../../../../../../chunks/shared.js-Cb68JbUk.js';
import '../../../../../../chunks/exports.js-BBf-2Qi_.js';
import '../../../../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../../../../chunks/utils.js-CAPFIGDr.js';
import '../../../../../../chunks/PasswordInput.js-Dm21DatN.js';
import '@zxcvbn-ts/core';
import '../../../../../../chunks/create-anatomy.js-CLhpGM8y.js';
import '../../../../../../chunks/warning.js-12YgogjO.js';
import '../../../../../../chunks/equal.js-nd5Stm03.js';
import '../../../../../../chunks/number.js-B87QIgOI.js';
import '../../../../../../chunks/anatomy3.js-HwVFkfZZ.js';
import '../../../../../../chunks/get-styles.js-Boa-8w4M.js';
import '../../../../../../chunks/anatomy2.js-Deb7OEEc.js';
import '../../../../../../chunks/dist.js-BvNxsp9_.js';
import '../../../../../../chunks/Tooltip.js-D0qklLov.js';
import '../../../../../../chunks/zxcvbn.js-ByAwPR8u.js';
import '../../../../../../chunks/index-server2.js-DZFYXfYm.js';

// src/routes/admin/groups/[groupId]/settings/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { data } = $$props;
		const t = getFormatter();
		const config = derived(() => data.config);
		let saving = false;
		$$renderer.push(`<form method="POST">`);
		General_default($$renderer, {
			config: config(),
			forGroup: true,
			groupUserCount: data.membershipCount,
			groups: [],
			hidden: false,
			listCount: data.listCount
		});
		$$renderer.push(`<!----> `);
		if (page.form?.error) $$renderer.push(`<!--[0--><span>${escape_html(page.form.error)}</span>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="flex w-full flex-row justify-end pt-6"><button class="preset-filled-primary-500 btn"${attr("disabled", saving, true)} type="submit">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.save"))}</span></button></div></form>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-cBpkxxYj.js.map
