import { at as head, ao as escape_html, av as store_get, ax as unsubscribe_stores } from '../../../chunks/index-server.js-CIVHNbBm.js';
import { f as getFormatter } from '../../../chunks/i18n2.js-1SlG2bAu.js';
import { I as InstallHint } from '../../../chunks/InstallHint.js-CckVPPAL.js';
import '../../../chunks/index-server2.js-DZFYXfYm.js';

// src/routes/bienvenue/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const t = getFormatter();
		head("te2auq", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.welcome-title"))}</title>`);
			});
		});
		$$renderer.push(`<section class="paper-welcome" data-testid="welcome"><h1>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.welcome-title"))}</h1> <p>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.welcome-text"))}</p> `);
		InstallHint($$renderer, {});
		$$renderer.push(`<!----> <form action="?/start" method="POST"><button class="paper-primary" type="submit">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.welcome-start"))}</button></form></section>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-BcLtiW95.js.map
