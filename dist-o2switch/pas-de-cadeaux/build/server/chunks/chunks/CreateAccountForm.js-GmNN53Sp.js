import { au as attr, ao as escape_html, av as store_get, ay as attr_class, am as clsx, V as derived, ax as unsubscribe_stores } from './index-server.js-CIVHNbBm.js';
import { p as page } from './state.js-DFeh0alp.js';
import { P as PasswordInput } from './PasswordInput.js-Dm21DatN.js';
import { f as getFormatter } from './i18n2.js-1SlG2bAu.js';

// src/lib/components/CreateAccountForm.svelte
function CreateAccountForm($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { hideActions = false, signingIn = false, emailOptional = false } = $$props;
		const t = getFormatter();
		let data = derived(() => page.data);
		let formData = derived(() => page.form);
		let password = "";
		let passwordConfirm = "";
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			$$renderer.push(`<div class="paper-fields">`);
			if (data().id) $$renderer.push(`<!--[0--><input id="tokenId" name="tokenId" class="hidden"${attr("value", data().id)}/>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <label class="label" for="name"><span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.name"))}</span> <input id="name" name="name"${attr_class(clsx(["input", formData()?.errors?.name && "input-invalid"]))} aria-describedby="name-hint" autocomplete="given-name" enterkeyhint="next" required="" type="text"/> `);
			if (formData()?.errors?.name) $$renderer.push(`<!--[0--><span class="text-invalid">${escape_html(formData().errors.name[0])}</span>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></label> <small id="name-hint" class="paper-field-hint">${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.name-hint"))}</small> <div class="paper-fields"><label class="label" for="username"><span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.username"))}</span> <input id="username" name="username"${attr_class(clsx(["input", formData()?.errors?.username && "input-invalid"]))} aria-describedby="username-hint" autocapitalize="off" autocomplete="username" autocorrect="off" enterkeyhint="next" required="" type="text"/> `);
			if (formData()?.errors?.username) $$renderer.push(`<!--[0--><span class="text-invalid">${escape_html(formData().errors.username[0])}</span>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></label> <small id="username-hint" class="paper-field-hint">${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.username-hint"))}</small> <label class="label" for="email"><span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.email"))} `);
			if (emailOptional) $$renderer.push(`<!--[0--><small class="paper-optional">(${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.optional"))})</small>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></span> <input id="email" name="email"${attr_class(clsx(["input", formData()?.errors?.email && "input-invalid"]))} autocomplete="email" inputmode="email"${attr("required", !emailOptional, true)} type="email"/> `);
			if (formData()?.errors?.email) $$renderer.push(`<!--[0--><span class="text-invalid">${escape_html(formData().errors.email[0])}</span>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></label></div> `);
			PasswordInput($$renderer, {
				id: "password",
				name: "password",
				autocomplete: "new-password",
				label: store_get($$store_subs ??= {}, "$t", t)("auth.password"),
				required: true,
				strengthMeter: true,
				get value() {
					return password;
				},
				set value($$value) {
					password = $$value;
					$$settled = false;
				}
			});
			$$renderer.push(`<!----> `);
			PasswordInput($$renderer, {
				id: "confirmpassword",
				autocomplete: "new-password",
				label: store_get($$store_subs ??= {}, "$t", t)("auth.confirm-password"),
				required: true,
				get value() {
					return passwordConfirm;
				},
				set value($$value) {
					passwordConfirm = $$value;
					$$settled = false;
				}
			});
			$$renderer.push(`<!----> `);
			if (password !== passwordConfirm) $$renderer.push(`<!--[0--><span class="text-invalid">${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.passwords-must-match"))}</span>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (formData()?.errors?.password) $$renderer.push(`<!--[0--><span class="text-invalid">${escape_html(formData().errors.password[0])}</span>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (formData()?.error && formData()?.message) $$renderer.push(`<!--[0--><span class="text-invalid">${escape_html(formData().message)}</span>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (!hideActions) {
				$$renderer.push(`<!--[0--><button class="paper-primary"${attr("disabled", password !== passwordConfirm || signingIn, true)} type="submit">`);
				if (signingIn) $$renderer.push(`<!--[0--><span class="loading loading-spinner loading-xs"></span>`);
				else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.create-account"))}</span></button> <div class="paper-auth-links"><a class="paper-link" href="/login">${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.sign-in"))}</a></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { CreateAccountForm as C };
//# sourceMappingURL=CreateAccountForm.js-GmNN53Sp.js.map
