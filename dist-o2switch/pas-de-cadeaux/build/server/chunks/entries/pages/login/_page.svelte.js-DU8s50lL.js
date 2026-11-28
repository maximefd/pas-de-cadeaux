import { at as head, ao as escape_html, av as store_get, ay as attr_class, am as clsx, au as attr, ax as unsubscribe_stores } from '../../../chunks/index-server.js-CIVHNbBm.js';
import '../../../chunks/client.js-CtfT808N.js';
import { P as PasswordInput } from '../../../chunks/PasswordInput.js-Dm21DatN.js';
import { A as Alert } from '../../../chunks/Alert.js-BDR4Ju8X.js';
import { f as getFormatter } from '../../../chunks/i18n2.js-1SlG2bAu.js';
import '../../../chunks/routing.js-DMTqwvGY.js';
import '../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../chunks/utils.js-CAPFIGDr.js';
import '../../../chunks/toaster.js-DRl3MQi1.js';
import '../../../chunks/shared.js-Cb68JbUk.js';
import '../../../chunks/exports.js-BBf-2Qi_.js';
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

// src/routes/login/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { data, form } = $$props;
		const t = getFormatter();
		let signingIn = false;
		head("1x05zx6", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.sign-in"))}</title>`);
			});
		});
		$$renderer.push(`<div class="paper-auth"><h1 class="h1">${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.sign-in"))}</h1> <form class="paper-form" method="POST"><div class="paper-fields">`);
		if (data.isCallback) $$renderer.push(`<!--[0--><div class="flex flex-col items-center justify-center space-y-4"><span class="loading loading-spinner w-8 md:w-12"></span> <span class="text-lg md:text-xl">${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.authenticating"))}</span></div>`);
		else {
			$$renderer.push("<!--[-1-->");
			if (data.enableLogin) {
				$$renderer.push(`<!--[0--><label class="label" for="username"><span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.username"))}</span> <input id="username" name="username"${attr_class(clsx(["input", (form?.incorrect || form?.error) && "input-invalid"]))} autocapitalize="off" autocomplete="username" autocorrect="off" enterkeyhint="next" required="" type="text"/> `);
				if (form?.errors?.username) $$renderer.push(`<!--[0--><span class="text-invalid">${escape_html(form.errors.username[0])}</span>`);
				else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></label> <div class="relative flex flex-col space-y-4">`);
				PasswordInput($$renderer, {
					id: "password",
					name: "password",
					autocomplete: "current-password",
					error: form?.incorrect || form?.error,
					label: store_get($$store_subs ??= {}, "$t", t)("auth.password"),
					required: true
				});
				$$renderer.push(`<!----> `);
				if (form?.incorrect) $$renderer.push(`<!--[0--><span class="text-invalid">${escape_html(store_get($$store_subs ??= {}, "$t", t)("errors.invalid-credentials"))}</span>`);
				else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (form?.errors?.password) $$renderer.push(`<!--[0--><span class="text-invalid">${escape_html(form.errors.password[0])}</span>`);
				else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> <button class="paper-primary"${attr("disabled", signingIn, true)}>`);
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.sign-in"))}</span></button> <div class="paper-auth-links"><a class="paper-link" href="/forgot-password">${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.forgot-password"))}</a> `);
				if (data.enableSignup) $$renderer.push(`<!--[0--><a class="paper-link" href="/signup">${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.create-an-account"))}</a>`);
				else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (data.oidcConfig?.ready) {
				$$renderer.push("<!--[0-->");
				if (data.enableLogin) $$renderer.push(`<!--[0--><p class="paper-or">${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.or"))}</p>`);
				else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> <div class="flex justify-center"><button class="paper-primary"${attr("disabled", signingIn, true)} type="button">${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.sign-in-with", { values: { provider: data.oidcConfig.providerName || "OAuth" } }))}</button></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		}
		$$renderer.push(`<!--]--></div></form> `);
		if (data.error) {
			$$renderer.push("<!--[0-->");
			Alert($$renderer, {
				class: "w-80 md:w-1/2",
				noicon: true,
				title: store_get($$store_subs ??= {}, "$t", t)("errors.oidc-error"),
				type: "error",
				children: ($$renderer) => {
					$$renderer.push(`<pre class="text-wrap">${escape_html(data.error)}</pre>`);
				},
				$$slots: { default: true }
			});
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-DU8s50lL.js.map
