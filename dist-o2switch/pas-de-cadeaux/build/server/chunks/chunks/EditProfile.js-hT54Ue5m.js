import { av as store_get, au as attr, ao as escape_html, ax as unsubscribe_stores, ak as attributes, am as clsx, V as derived, aq as bind_props } from './index-server.js-CIVHNbBm.js';
import './client.js-CtfT808N.js';
import { p as page } from './state.js-DFeh0alp.js';
import { f as getFormatter } from './i18n2.js-1SlG2bAu.js';
import './toaster.js-DRl3MQi1.js';

// src/lib/components/Label.svelte
function Label($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { value, children, $$slots, $$events, ...props } = $$props;
		$$renderer.push(`<label${attributes({
			...props,
			class: clsx(["label", props.class])
		})}><span>${escape_html(value)}</span> `);
		children($$renderer);
		$$renderer.push(`<!----></label>`);
	});
}
// src/lib/components/Input.svelte
function Input($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { icon, error, value = void 0, $$slots, $$events, ...props } = $$props;
		let isGroup = derived(() => icon !== void 0);
		let inputClass = derived(() => isGroup() ? "ig-input" : "input");
		let isError = derived(() => error !== void 0);
		function input($$renderer) {
			$$renderer.push(`<input${attributes({
				...props,
				class: clsx([
					inputClass(),
					props.class,
					isError() && "input-invalid"
				]),
				"aria-invalid": isError(),
				value
			}, void 0, void 0, void 0, 4)}/>`);
		}
		if (isGroup()) {
			$$renderer.push(`<!--[0--><div class="input-group grid-cols-[auto_1fr]"><div class="ig-cell preset-tonal"><iconify-icon${attr("icon", icon)}></iconify-icon></div> `);
			input($$renderer);
			$$renderer.push(`<!----></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			input($$renderer);
		}
		$$renderer.push(`<!--]--> `);
		if (error) $$renderer.push(`<!--[0--><p class="text-invalid pt-2">${escape_html(error)}</p>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { value });
	});
}
// src/lib/components/account/EditProfile.svelte
function EditProfile($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { user, disabled, autocomplete = true } = $$props;
		const t = getFormatter();
		const isPlaceholderEmail = derived(() => !!user.email?.endsWith("@sans-email.invalid"));
		$$renderer.push(`<div class="paper-account"><form method="POST"><div class="flex flex-col gap-4">`);
		Label($$renderer, {
			value: store_get($$store_subs ??= {}, "$t", t)("auth.name"),
			children: ($$renderer) => {
				Input($$renderer, {
					id: "name",
					name: "name",
					autocomplete: autocomplete ? "name" : "off",
					disabled,
					error: page.form?.errors?.name?.[0],
					icon: "ion:id-card",
					placeholder: user.name,
					type: "text",
					value: user.name
				});
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----> `);
		Label($$renderer, {
			value: store_get($$store_subs ??= {}, "$t", t)("auth.username"),
			children: ($$renderer) => {
				Input($$renderer, {
					name: "username",
					autocomplete: autocomplete ? "username" : "off",
					disabled,
					error: page.form?.errors?.username?.[0],
					icon: "ion:person",
					placeholder: user.username,
					type: "text",
					value: user.username
				});
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----> `);
		if (isPlaceholderEmail()) $$renderer.push(`<!--[0--><input name="email" type="hidden"${attr("value", user.email)}/>`);
		else {
			$$renderer.push("<!--[-1-->");
			Label($$renderer, {
				value: store_get($$store_subs ??= {}, "$t", t)("auth.email"),
				children: ($$renderer) => {
					Input($$renderer, {
						name: "email",
						autocomplete: autocomplete ? "email" : "off",
						disabled,
						error: page.form?.errors?.email?.[0],
						icon: "ion:person",
						placeholder: user.email,
						type: "text",
						value: user.email
					});
				},
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!--]--> `);
		if (disabled) $$renderer.push(`<!--[0--><span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.profile-disabled"))}</span>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <button class="paper-primary"${attr("disabled", disabled, true)} formaction="?/profile" type="submit">${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.update"))}</button></div></form></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { EditProfile as E };
//# sourceMappingURL=EditProfile.js-hT54Ue5m.js.map
