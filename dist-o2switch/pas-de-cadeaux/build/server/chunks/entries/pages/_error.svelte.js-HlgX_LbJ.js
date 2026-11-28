import { ao as escape_html, av as store_get, ax as unsubscribe_stores, V as derived } from '../../chunks/index-server.js-CIVHNbBm.js';
import { p as page } from '../../chunks/state.js-DFeh0alp.js';
import { f as getFormatter } from '../../chunks/i18n2.js-1SlG2bAu.js';
import '../../chunks/client.js-CtfT808N.js';
import '../../chunks/routing.js-DMTqwvGY.js';
import '../../chunks/shared.js-Cb68JbUk.js';
import '../../chunks/exports.js-BBf-2Qi_.js';
import '../../chunks/internal2.js-CM4IiAcJ.js';
import '../../chunks/utils.js-CAPFIGDr.js';
import '../../chunks/index-server2.js-DZFYXfYm.js';

// src/routes/+error.svelte
function _error($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const t = getFormatter();
		const isSignup = derived(() => page.url.pathname.startsWith("/signup") && !!page.error?.message);
		const title = derived(() => isSignup() ? store_get($$store_subs ??= {}, "$t", t)("errors.invite-title") : page.status === 404 ? store_get($$store_subs ??= {}, "$t", t)("errors.page-not-found-title") : page.status === 401 || page.status === 403 ? store_get($$store_subs ??= {}, "$t", t)("errors.forbidden-title") : store_get($$store_subs ??= {}, "$t", t)("errors.error-title"));
		const text = derived(() => isSignup() ? page.error.message : page.status === 404 ? store_get($$store_subs ??= {}, "$t", t)("errors.page-not-found-text") : page.status === 401 || page.status === 403 ? store_get($$store_subs ??= {}, "$t", t)("errors.forbidden-text") : store_get($$store_subs ??= {}, "$t", t)("errors.error-text"));
		$$renderer.push(`<div class="paper-empty"><h2>${escape_html(title())}</h2> <p>${escape_html(text())}</p> <a class="paper-link" href="/">${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.return-home"))}</a></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { _error as default };
//# sourceMappingURL=_error.svelte.js-HlgX_LbJ.js.map
