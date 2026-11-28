import { at as head, ao as escape_html, av as store_get, ax as unsubscribe_stores } from '../../../chunks/index-server.js-CIVHNbBm.js';
import '../../../chunks/client.js-CtfT808N.js';
import { C as CreateAccountForm } from '../../../chunks/CreateAccountForm.js-GmNN53Sp.js';
import { f as getFormatter } from '../../../chunks/i18n2.js-1SlG2bAu.js';
import '../../../chunks/routing.js-DMTqwvGY.js';
import '../../../chunks/shared.js-Cb68JbUk.js';
import '../../../chunks/exports.js-BBf-2Qi_.js';
import '../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../chunks/utils.js-CAPFIGDr.js';
import '../../../chunks/state.js-DFeh0alp.js';
import '../../../chunks/PasswordInput.js-Dm21DatN.js';
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

// src/routes/signup/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { data } = $$props;
		const t = getFormatter();
		let signingIn = false;
		head("kmqcod", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.create-an-account"))}</title>`);
			});
		});
		$$renderer.push(`<div class="paper-auth"><h1 class="h1">${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.create-account"))}</h1> <form class="paper-form" method="POST">`);
		CreateAccountForm($$renderer, {
			emailOptional: true,
			signingIn
		});
		$$renderer.push(`<!----></form></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-C6BHbJYP.js.map
