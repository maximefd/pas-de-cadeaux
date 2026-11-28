import { at as head, ao as escape_html, av as store_get, ax as unsubscribe_stores, V as derived, au as attr } from '../../../chunks/index-server.js-CIVHNbBm.js';
import '../../../chunks/client.js-CtfT808N.js';
import { p as page } from '../../../chunks/state.js-DFeh0alp.js';
import { P as PasswordInput } from '../../../chunks/PasswordInput.js-Dm21DatN.js';
import { f as getFormatter } from '../../../chunks/i18n2.js-1SlG2bAu.js';
import '../../../chunks/toaster.js-DRl3MQi1.js';
import { E as EditProfile } from '../../../chunks/EditProfile.js-hT54Ue5m.js';
import { T as Tabs } from '../../../chunks/anatomy4.js-BBZ3aFXa.js';
import '../../../chunks/routing.js-DMTqwvGY.js';
import '../../../chunks/shared.js-Cb68JbUk.js';
import '../../../chunks/exports.js-BBf-2Qi_.js';
import '../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../chunks/utils.js-CAPFIGDr.js';
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
import '../../../chunks/navigate.js-CQMmEWI4.js';

// src/lib/components/account/ChangePassword.svelte
function ChangePassword($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const t = getFormatter();
		let passwordReset = {
			current: "",
			new: "",
			confirm: ""
		};
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			$$renderer.push(`<form method="POST"><div class="flex w-full flex-col items-start space-y-4 md:max-w-96"><h3 class="h3">${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.credentials"))}</h3> <div class="flex w-full space-y-1">`);
			PasswordInput($$renderer, {
				id: "oldpassword",
				name: "oldPassword",
				autocomplete: "current-password",
				error: page.form?.errors?.oldPassword,
				label: store_get($$store_subs ??= {}, "$t", t)("auth.current-password"),
				get value() {
					return passwordReset.current;
				},
				set value($$value) {
					passwordReset.current = $$value;
					$$settled = false;
				}
			});
			$$renderer.push(`<!----> `);
			if (page.form?.errors?.oldPassword) $$renderer.push(`<!--[0--><span class="text-invalid">${escape_html(page.form?.errors?.oldPassword[0])}</span>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> `);
			PasswordInput($$renderer, {
				id: "newpassword",
				autocomplete: "new-password",
				label: store_get($$store_subs ??= {}, "$t", t)("auth.new-password"),
				strengthMeter: true,
				get value() {
					return passwordReset.new;
				},
				set value($$value) {
					passwordReset.new = $$value;
					$$settled = false;
				}
			});
			$$renderer.push(`<!----> `);
			PasswordInput($$renderer, {
				id: "confirmpassword",
				name: "newPassword",
				autocomplete: "new-password",
				label: store_get($$store_subs ??= {}, "$t", t)("auth.confirm-password"),
				get value() {
					return passwordReset.confirm;
				},
				set value($$value) {
					passwordReset.confirm = $$value;
					$$settled = false;
				}
			});
			$$renderer.push(`<!----> `);
			if (passwordReset.new !== passwordReset.confirm) $$renderer.push(`<!--[0--><span class="unstyled text-invalid">${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.passwords-must-match"))}</span>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (page.form?.errors?.newPassword) $$renderer.push(`<!--[0--><span class="text-invalid">${escape_html(page.form?.errors?.newPassword[0])}</span>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <label class="checkbox-label"><input id="invalidateSessions" name="invalidateSessions" class="checkbox" type="checkbox"/> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.sign-out-of-all-devices"))}</span></label> <button class="paper-primary"${attr("disabled", passwordReset.current === "" || passwordReset.new === "" || passwordReset.new !== passwordReset.confirm, true)} formaction="?/passwordchange" type="submit">${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.update-password"))}</button></div></form>`);
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
// src/lib/components/account/LinkOAuth.svelte
function LinkOAuth($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { providerName: providerName_, oauthId } = $$props;
		const t = getFormatter();
		const providerName = derived(() => providerName_ || store_get($$store_subs ??= {}, "$t", t)("general.oauth"));
		$$renderer.push(`<div class="flex flex-col gap-4"><h3 class="h3">${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.oauth"))}</h3> `);
		if (oauthId) $$renderer.push(`<!--[0--><form class="flex flex-col gap-4" action="?/unlinkoauth" method="POST"><span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.your-account-is-currently-linked-with-oauth", { values: { providerName: providerName() } }))}</span> <button class="paper-primary">${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.unlink-oauth", { values: { providerName: providerName() } }))}</button></form>`);
		else $$renderer.push(`<!--[-1--><span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.account-is-not-linked-with-oauth", { values: { providerName: providerName() } }))}</span>`);
		$$renderer.push(`<!--]--></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/routes/account/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { data } = $$props;
		const t = getFormatter();
		const profileEditDisabled = derived(() => data.oidcConfig.ready && data.oidcConfig.enableSync === true && data.user.oauthId !== null);
		head("8i5vi8", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.account"))}</title>`);
			});
		});
		Tabs($$renderer, {
			defaultValue: "profile",
			children: ($$renderer) => {
				if (Tabs.List) {
					$$renderer.push("<!--[-->");
					Tabs.List($$renderer, {
						class: "flex overflow-auto",
						children: ($$renderer) => {
							if (Tabs.Trigger) {
								$$renderer.push("<!--[-->");
								Tabs.Trigger($$renderer, {
									value: "profile",
									children: ($$renderer) => {
										$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.profile"))}`);
									},
									$$slots: { default: true }
								});
								$$renderer.push("<!--]-->");
							} else {
								$$renderer.push("<!--[!-->");
								$$renderer.push("<!--]-->");
							}
							$$renderer.push(` `);
							if (Tabs.Trigger) {
								$$renderer.push("<!--[-->");
								Tabs.Trigger($$renderer, {
									value: "security",
									children: ($$renderer) => {
										$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.security"))}`);
									},
									$$slots: { default: true }
								});
								$$renderer.push("<!--]-->");
							} else {
								$$renderer.push("<!--[!-->");
								$$renderer.push("<!--]-->");
							}
							$$renderer.push(` `);
							if (Tabs.Indicator) {
								$$renderer.push("<!--[-->");
								Tabs.Indicator($$renderer, {});
								$$renderer.push("<!--]-->");
							} else {
								$$renderer.push("<!--[!-->");
								$$renderer.push("<!--]-->");
							}
						},
						$$slots: { default: true }
					});
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
				$$renderer.push(` `);
				if (Tabs.Content) {
					$$renderer.push("<!--[-->");
					Tabs.Content($$renderer, {
						value: "profile",
						children: ($$renderer) => {
							EditProfile($$renderer, {
								disabled: profileEditDisabled(),
								user: data.user
							});
						},
						$$slots: { default: true }
					});
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
				$$renderer.push(` `);
				if (Tabs.Content) {
					$$renderer.push("<!--[-->");
					Tabs.Content($$renderer, {
						class: "grid grid-cols-1 gap-4 md:grid-cols-2",
						value: "security",
						children: ($$renderer) => {
							if (!(data.isProxyUser || data.oidcConfig.ready && data.user.oauthId)) {
								$$renderer.push("<!--[0-->");
								ChangePassword($$renderer);
							} else $$renderer.push("<!--[-1-->");
							$$renderer.push(`<!--]--> `);
							if (data.oidcConfig.ready) {
								$$renderer.push("<!--[0-->");
								LinkOAuth($$renderer, {
									oauthId: data.user.oauthId,
									providerName: data.oidcConfig.providerName
								});
							} else $$renderer.push("<!--[-1-->");
							$$renderer.push(`<!--]-->`);
						},
						$$slots: { default: true }
					});
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
			},
			$$slots: { default: true }
		});
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-DhaVwd1e.js.map
