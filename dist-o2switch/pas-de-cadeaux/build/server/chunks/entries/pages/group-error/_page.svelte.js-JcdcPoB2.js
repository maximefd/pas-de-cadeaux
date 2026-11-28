import { ao as escape_html, av as store_get, ax as unsubscribe_stores } from '../../../chunks/index-server.js-CIVHNbBm.js';
import { f as getFormatter } from '../../../chunks/i18n2.js-1SlG2bAu.js';
import '../../../chunks/index-server2.js-DZFYXfYm.js';

// src/routes/group-error/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const t = getFormatter();
		$$renderer.push(`<div class="paper-empty"><h2>${escape_html(store_get($$store_subs ??= {}, "$t", t)("errors.cant-find-your-group"))}</h2> <p>${escape_html(store_get($$store_subs ??= {}, "$t", t)("errors.no-group-friendly-msg"))}</p> <a class="paper-link" href="/">${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.return-home"))}</a></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-JcdcPoB2.js.map
