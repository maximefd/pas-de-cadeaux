import { av as store_get, ao as escape_html, az as attr_style, ax as unsubscribe_stores } from '../../../chunks/index-server.js-CIVHNbBm.js';
import { A as APP_NAME } from '../../../chunks/brand.js-Bvcb6EDF.js';
import '../../../chunks/client.js-CtfT808N.js';
import { f as getFormatter } from '../../../chunks/i18n2.js-1SlG2bAu.js';
import '../../../chunks/routing.js-DMTqwvGY.js';
import '../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../chunks/utils.js-CAPFIGDr.js';
import '../../../chunks/shared.js-Cb68JbUk.js';
import '../../../chunks/exports.js-BBf-2Qi_.js';
import '../../../chunks/index-server2.js-DZFYXfYm.js';

// src/routes/setup-wizard/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const t = getFormatter();
		let introStep = 0;
		let statements = [
			store_get($$store_subs ??= {}, "$t", t)("setup.hi"),
			store_get($$store_subs ??= {}, "$t", t)("setup.welcome-to-app", { values: { name: APP_NAME } }),
			store_get($$store_subs ??= {}, "$t", t)("setup.lets-get-started")
		];
		$$renderer.push(`<!--[0--><div class="fixed top-0 right-0 bottom-0 left-0 flex h-screen w-full flex-col items-center justify-center space-y-4 overflow-hidden"><!---->`);
		$$renderer.push(`<h1 class="h1">${escape_html(statements[introStep])}</h1> <button class="preset-filled-primary-500 btn" type="button"${attr_style("", { visibility: "hidden" })}>${escape_html(store_get($$store_subs ??= {}, "$t", t)("setup.get-started"))}</button>`);
		$$renderer.push(`<!----></div>`);
		$$renderer.push(`<!--]-->`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-CZMjGGv_.js.map
