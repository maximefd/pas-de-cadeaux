import { ao as escape_html, av as store_get, ap as html, ax as unsubscribe_stores, V as derived } from '../../../../chunks/index-server.js-CIVHNbBm.js';
import { A as APP_NAME } from '../../../../chunks/brand.js-Bvcb6EDF.js';
import { f as getFormatter, j as getDateFormatter, h as getLocale, d as defaultLang } from '../../../../chunks/i18n2.js-1SlG2bAu.js';
import '../../../../chunks/index-server2.js-DZFYXfYm.js';

// src/routes/admin/about/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const t = getFormatter();
		const date = getDateFormatter({
			locale: getLocale() || defaultLang.code,
			format: "medium"
		});
		const version = "832cbc8";
		const sha = "832cbc8";
		const builtAt = /* @__PURE__ */ new Date(1795863927182);
		const versionHref = derived(() => `https://github.com/cmintey/wishlist/releases/tag/${version}`);
		const shaHref = derived(() => `https://github.com/cmintey/wishlist/commit/${sha}`);
		$$renderer.push(`<div class="flex flex-col space-y-2"><h2 class="h2">${escape_html(APP_NAME)}</h2> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.based-on"))} <a class="anchor" href="https://github.com/cmintey/wishlist" rel="noopener noreferrer" target="_blank">Wishlist</a></span> <span>${html(store_get($$store_subs ??= {}, "$t", t)("admin.version", { values: {
			version,
			href: versionHref(),
			class: "anchor"
		} }))}</span> <span>${html(store_get($$store_subs ??= {}, "$t", t)("admin.build", { values: {
			sha,
			href: shaHref(),
			class: "anchor"
		} }))}</span> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.build-date", { values: { buildDate: builtAt ? date.format(builtAt) : store_get($$store_subs ??= {}, "$t", t)("admin.unknown") } }))}</span></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-DRJ_WZmT.js.map
