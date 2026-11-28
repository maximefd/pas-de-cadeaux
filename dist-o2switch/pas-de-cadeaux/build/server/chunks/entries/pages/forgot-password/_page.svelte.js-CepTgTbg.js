import { at as head, ao as escape_html, av as store_get, ay as attr_class, ax as unsubscribe_stores } from '../../../chunks/index-server.js-CIVHNbBm.js';
import '../../../chunks/client.js-CtfT808N.js';
import { f as getFormatter } from '../../../chunks/i18n2.js-1SlG2bAu.js';
import '../../../chunks/routing.js-DMTqwvGY.js';
import '../../../chunks/shared.js-Cb68JbUk.js';
import '../../../chunks/exports.js-BBf-2Qi_.js';
import '../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../chunks/utils.js-CAPFIGDr.js';
import '../../../chunks/index-server2.js-DZFYXfYm.js';

// src/routes/forgot-password/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { data, form } = $$props;
		const t = getFormatter();
		head("1wx4tso", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.forgot-password"))}</title>`);
			});
		});
		if (data.smtpEnabled) {
			$$renderer.push(`<!--[0--><div class="flex flex-col items-center space-y-4"><h1 class="h1">${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.reset-password"))}</h1> `);
			if (form?.success) $$renderer.push(`<!--[0--><div class="flex w-80 flex-col items-center space-y-1 text-center md:w-full"><iconify-icon icon="ion:checkmark-circle-outline" width="100"></iconify-icon> <span class="text-xl font-bold">${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.success"))}</span> <p>${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.check-your-email"))}</p></div>`);
			else {
				$$renderer.push(`<!--[-1--><p class="w-80 text-center">${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.enter-email"))}</p> <form class="w-80" method="POST"><div class="bg-surface-100-900 rounded-container flex flex-col space-y-4 p-4 inset-ring"><label class="w-full" for="email"><span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.email"))}</span> <input id="email" name="email"${attr_class("input", void 0, { "input-invalid": form?.errors?.email })} required="" type="email"/></label> `);
				if (form?.errors?.email) $$renderer.push(`<!--[0--><span class="text-invalid">${escape_html(store_get($$store_subs ??= {}, "$t", t)("errors.invalid-email"))}</span>`);
				else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> <div><button class="preset-filled-primary-500 btn" type="submit">${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.submit"))}</button></div></div></form>`);
			}
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push(`<!--[-1--><div class="flex flex-col items-center space-y-4"><h1 class="h1">${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.self-service-password-reset-unavailable"))}</h1> <span class="text-xl">${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.contact-admin"))}</span> <a class="anchor" href="/login">${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.return-to-login"))}</a></div>`);
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-CepTgTbg.js.map
