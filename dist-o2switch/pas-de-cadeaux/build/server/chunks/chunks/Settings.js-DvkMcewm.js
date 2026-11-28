import { ay as attr_class, am as clsx, ao as escape_html, av as store_get, ax as unsubscribe_stores, aj as props_id, au as attr, V as derived, ak as attributes, aw as ensure_array_like } from './index-server.js-CIVHNbBm.js';
import { P as PasswordInput } from './PasswordInput.js-Dm21DatN.js';
import { f as getFormatter } from './i18n2.js-1SlG2bAu.js';
import { T as Tooltip } from './Tooltip.js-D0qklLov.js';
import { s as strengthOptions } from './zxcvbn.js-ByAwPR8u.js';

// src/lib/components/admin/Settings/SettingsGroup.svelte
function SettingsGroup($$renderer, $$props) {
	const id = props_id($$renderer);
	const { title, children } = $$props;
	$$renderer.push(`<section class="card preset-filled-surface-100-900 border-surface-200-800 flex flex-col gap-2 border px-4 py-2"${attr("aria-labelledby", `header-${id}`)}><h3${attr("id", `header-${id}`)} class="h3">${escape_html(title)}</h3> `);
	children($$renderer);
	$$renderer.push(`<!----></section>`);
}
// src/lib/local-storage.svelte.ts
var LocalStorage = class {
	#key;
	#version = 0;
	#listeners = 0;
	#value;
	#handler = (e) => {
		if (e.storageArea !== localStorage) return;
		if (e.key !== this.#key) return;
		this.#version += 1;
	};
	constructor(key, initial) {
		this.#key = key;
		this.#value = initial;
		if (typeof localStorage !== "undefined") {
			if (localStorage.getItem(key) === null) localStorage.setItem(key, JSON.stringify(initial));
		}
	}
	get current() {
		this.#version;
		let root;
		try {
			root = typeof localStorage !== "undefined" ? JSON.parse(localStorage.getItem(this.#key)) : this.#value;
		} catch {
			root = this.#value;
		}
		const proxies = /* @__PURE__ */ new WeakMap();
		const proxy = (value) => {
			if (typeof value !== "object" || value === null) return value;
			let p = proxies.get(value);
			if (!p) {
				p = new Proxy(value, {
					get: (target, property) => {
						this.#version;
						return proxy(Reflect.get(target, property));
					},
					set: (target, property, value) => {
						this.#version += 1;
						Reflect.set(target, property, value);
						if (typeof localStorage !== "undefined") localStorage.setItem(this.#key, JSON.stringify(root));
						return true;
					}
				});
				proxies.set(value, p);
			}
			return p;
		};
		return proxy(root);
	}
	set current(value) {
		if (typeof localStorage !== "undefined") localStorage.setItem(this.#key, JSON.stringify(value));
		this.#version += 1;
	}
};
// src/lib/components/admin/SMTPAlert.svelte
function SMTPAlert($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { smtpEnable } = $$props;
		const t = getFormatter();
		if (!new LocalStorage("smtpAcknowledged", false).current && !smtpEnable) $$renderer.push(`<!--[0--><aside class="alert preset-tonal-warning border-warning-500 mb-2 border"><div class="alert-message flex flex-row items-center space-y-0 gap-x-4"><span><iconify-icon class="text-4xl" icon="ion:warning"></iconify-icon></span> <div><span class="text-xl font-bold">${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.smtp-is-not-enabled"))}</span> <p class="text-sm">${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.smtp-not-enabled-implication"))}</p></div></div> <div class="alert-actions w-full justify-end lg:w-fit"><button class="preset-filled-warning-500 btn btn-sm">${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.dismiss"))}</button></div></aside>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/lib/components/admin/Settings/Setting.svelte
function Setting($$renderer, $$props) {
	const { description, children, $$slots, $$events, ...props } = $$props;
	$$renderer.push(`<div${attributes({ ...props })}>`);
	children($$renderer);
	$$renderer.push(`<!----> `);
	if (description) {
		$$renderer.push(`<!--[0--><span class="subtext">`);
		description($$renderer);
		$$renderer.push(`<!----></span>`);
	} else $$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]--></div>`);
}
// src/lib/components/admin/Settings/Email/Email.svelte
function Email($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { config, sending, hidden = false } = $$props;
		const t = getFormatter();
		let enabled = derived(() => config.smtp.enable);
		let allFilled = derived(() => enabled() && config.smtp.from && config.smtp.fromName && config.smtp.host && config.smtp.port);
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			$$renderer.push(`<div${attr_class(clsx({
				hidden,
				"flex flex-col gap-4": !hidden
			}))}><h2 class="h2">${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.email"))}</h2> `);
			SMTPAlert($$renderer, { smtpEnable: enabled() });
			$$renderer.push(`<!----> `);
			SettingsGroup($$renderer, {
				title: store_get($$store_subs ??= {}, "$t", t)("admin.smtp"),
				children: ($$renderer) => {
					$$renderer.push(`<label class="checkbox-label"><input id="enableSMTP" name="enableSMTP" class="checkbox" type="checkbox"${attr("checked", enabled(), true)}/> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.enable"))}</span></label> `);
					if (enabled()) {
						$$renderer.push(`<!--[0--><div class="grid grid-cols-1 gap-x-4 gap-y-2 pb-1 md:grid-cols-2"><label class="label" for="smtpHost"><span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.smtp-host"))}</span> <input id="smtpHost" name="smtpHost" class="input" autocomplete="off" required="" type="text"${attr("value", config.smtp.host)}/></label> <label class="label" for="smtpPort"><span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.smtp-port"))}</span> <input id="smtpPort" name="smtpPort" class="input" autocomplete="off" required="" type="text"${attr("value", config.smtp.port)}/></label> <label class="label" for="smtpUser"><span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.user"))}</span> <input id="smtpUser" name="smtpUser" class="input" autocomplete="off" type="text"${attr("value", config.smtp.user)}/></label> `);
						PasswordInput($$renderer, {
							id: "smtpPass",
							name: "smtpPass",
							label: store_get($$store_subs ??= {}, "$t", t)("auth.password"),
							get value() {
								return config.smtp.pass;
							},
							set value($$value) {
								config.smtp.pass = $$value;
								$$settled = false;
							}
						});
						$$renderer.push(`<!----> <label class="label" for="smtpFrom"><span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.smtp-from-email"))}</span> <input id="smtpFrom" name="smtpFrom" class="input" autocomplete="off" required="" type="text"${attr("value", config.smtp.from)}/></label> <label class="label" for="smtpFromName"><span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.smtp-from-name"))}</span> <input id="smtpFromName" name="smtpFromName" class="input" autocomplete="off" required="" type="text"${attr("value", config.smtp.fromName)}/></label> `);
						{
							function description($$renderer) {
								$$renderer.push(`<span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.smtp-use-tls-description"))}</span>`);
							}
							Setting($$renderer, {
								class: "col-span-full",
								description,
								children: ($$renderer) => {
									$$renderer.push(`<label class="checkbox-label"><input id="smtpUseTls" name="smtpUseTls" class="checkbox"${attr("checked", config.smtp.useTls, true)} type="checkbox"/> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.smtp-use-tls"))}</span></label>`);
								},
								$$slots: {
									description: true,
									default: true
								}
							});
						}
						$$renderer.push(`<!----> `);
						{
							function description($$renderer) {
								$$renderer.push(`<span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.smtp-ignore-cert-check-description"))}</span>`);
							}
							Setting($$renderer, {
								class: "col-span-full",
								description,
								children: ($$renderer) => {
									$$renderer.push(`<label class="checkbox-label"><input id="smtpIgnoreCertCheck" name="smtpIgnoreCertCheck" class="checkbox"${attr("checked", config.smtp.ignoreCertCheck, true)} type="checkbox"/> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.ignore-cert-check"))}</span></label>`);
								},
								$$slots: {
									description: true,
									default: true
								}
							});
						}
						$$renderer.push(`<!----></div> <div class="flex w-full flex-row justify-end"><button class="preset-tonal-primary border-primary-500 btn mt-2 h-min w-fit border"${attr("disabled", !allFilled() || sending, true)} formaction="/admin/settings?/send-test" type="submit">`);
						if (sending) $$renderer.push(`<!--[0--><span class="loading loading-spinner loading-xs"></span> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.sending"))}</span>`);
						else $$renderer.push(`<!--[-1-->${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.test-email"))}`);
						$$renderer.push(`<!--]--></button></div>`);
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]-->`);
				}});
			$$renderer.push(`<!----></div>`);
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
// src/lib/components/admin/Settings/Email/index.ts
var Email_default = Email;
// src/lib/components/admin/Settings/General/WishlistMode.svelte
function WishlistMode($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { config, groupUserCount, listCount } = $$props;
		const t = getFormatter();
		SettingsGroup($$renderer, {
			title: store_get($$store_subs ??= {}, "$t", t)("admin.wishlist-mode"),
			children: ($$renderer) => {
				Setting($$renderer, {
					children: ($$renderer) => {
						const disabled = groupUserCount > 1 || listCount > 1;
						$$renderer.push(`<label class="label" for="listMode">`);
						{
							function label($$renderer) {
								$$renderer.push(`<span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.wishlist-mode"))}</span>`);
							}
							function description($$renderer) {
								$$renderer.push(`<div><ul class="list"><li><div><p class="font-bold">${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.wishlist-mode-wishlist"))}</p> <p>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.wishlist-mode-wishlist-tooltip"))}</p></div></li> <li><div><p class="font-bold">${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.wishlist-mode-registry"))}</p> <p>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.wishlist-mode-registry-tooltip"))}</p></div></li></ul></div>`);
							}
							Tooltip($$renderer, {
								label,
								description,
								$$slots: {
									label: true,
									description: true
								}
							});
						}
						$$renderer.push(`<!----> `);
						$$renderer.select({
							id: "listMode",
							name: "listMode",
							class: "select w-fit min-w-64",
							value: config.listMode
						}, ($$renderer) => {
							$$renderer.option({ value: "standard" }, ($$renderer) => {
								$$renderer.push(`${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.wishlist-mode-wishlist"))}`);
							});
							$$renderer.option({
								disabled,
								value: "registry"
							}, ($$renderer) => {
								$$renderer.push(`${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.wishlist-mode-registry"))}`);
							});
						});
						$$renderer.push(`</label> `);
						if (disabled) $$renderer.push(`<!--[0--><div class="flex flex-row items-center gap-x-1"><iconify-icon class="text-warning-800 dark:text-warning-500" icon="ion:warning"></iconify-icon> <span class="text-warning-800 dark:text-warning-500 text-sm">${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.wishlist-mode-alert", { values: {
							memberCount: groupUserCount,
							listCount
						} }))}</span></div>`);
						else $$renderer.push("<!--[-1-->");
						$$renderer.push(`<!--]-->`);
					},
					$$slots: { default: true }
				});
			}});
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/lib/components/admin/Settings/General/Suggestions.svelte
function Suggestions($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { config } = $$props;
		const t = getFormatter();
		let enabled = derived(() => config.suggestions.enable);
		SettingsGroup($$renderer, {
			title: store_get($$store_subs ??= {}, "$t", t)("admin.suggestions"),
			children: ($$renderer) => {
				{
					function description($$renderer) {
						$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.suggestions-tooltip"))}`);
					}
					Setting($$renderer, {
						description,
						children: ($$renderer) => {
							$$renderer.push(`<label class="checkbox-label"><input id="enableSuggestions" name="enableSuggestions" class="checkbox" type="checkbox"${attr("checked", enabled(), true)}/> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.enable"))}</span></label>`);
						},
						$$slots: {
							description: true,
							default: true
						}
					});
				}
				$$renderer.push(`<!----> `);
				if (enabled()) {
					$$renderer.push("<!--[0-->");
					Setting($$renderer, {
						children: ($$renderer) => {
							$$renderer.push(`<label class="label" for="suggestionMethod">`);
							{
								function label($$renderer) {
									$$renderer.push(`<span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.suggestions-method"))}</span>`);
								}
								function description($$renderer) {
									$$renderer.push(`<div><ul class="list"><li><div><p class="font-bold">${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.suggestions-surprise-me"))}</p> <p>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.suggestions-surprise-me-tooltip"))}</p></div></li> <li><div><p class="font-bold">${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.suggestions-auto-approve"))}</p> <p>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.suggestions-auto-approve-tooltip"))}</p></div></li> <li><div><p class="font-bold">${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.suggestions-approval-required"))}</p> <p>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.suggestions-approval-required-tooltip"))}</p></div></li></ul></div>`);
								}
								Tooltip($$renderer, {
									label,
									description,
									$$slots: {
										label: true,
										description: true
									}
								});
							}
							$$renderer.push(`<!----> `);
							$$renderer.select({
								id: "suggestionMethod",
								name: "suggestionMethod",
								class: "select w-full max-w-64",
								value: config.suggestions.method
							}, ($$renderer) => {
								$$renderer.option({ value: "surprise" }, ($$renderer) => {
									$$renderer.push(`${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.suggestions-surprise-me"))}`);
								});
								$$renderer.option({ value: "auto-approval" }, ($$renderer) => {
									$$renderer.push(`${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.suggestions-auto-approve"))}`);
								});
								$$renderer.option({ value: "approval" }, ($$renderer) => {
									$$renderer.push(`${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.suggestions-approval-required"))}`);
								});
							});
							$$renderer.push(`</label>`);
						},
						$$slots: { default: true }
					});
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]-->`);
			}});
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/lib/components/admin/Settings/General/Claims.svelte
function Claims($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { config } = $$props;
		const t = getFormatter();
		let showClaimName = derived(() => config.claims.showName);
		SettingsGroup($$renderer, {
			title: store_get($$store_subs ??= {}, "$t", t)("admin.claims"),
			children: ($$renderer) => {
				{
					function description($$renderer) {
						$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.claims-name-tooltip"))}`);
					}
					Setting($$renderer, {
						description,
						children: ($$renderer) => {
							$$renderer.push(`<label class="checkbox-label"><input id="claimsShowName" name="claimsShowName" class="checkbox" type="checkbox"${attr("checked", showClaimName(), true)}/> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.show-name"))}</span></label>`);
						},
						$$slots: {
							description: true,
							default: true
						}
					});
				}
				$$renderer.push(`<!----> `);
				{
					function description($$renderer) {
						$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.show-name-across-groups-tooltip"))}`);
					}
					Setting($$renderer, {
						class: [!showClaimName() && "hidden"],
						description,
						children: ($$renderer) => {
							$$renderer.push(`<label class="checkbox-label"><input id="claimsShowNameAcrossGroups" name="claimsShowNameAcrossGroups" class="checkbox"${attr("checked", config.claims.showNameAcrossGroups, true)} type="checkbox"/> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.show-name-across-groups"))}</span></label>`);
						},
						$$slots: {
							description: true,
							default: true
						}
					});
				}
				$$renderer.push(`<!----> `);
				{
					function description($$renderer) {
						$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.show-name-publicly-tooltip"))}`);
					}
					Setting($$renderer, {
						class: [!showClaimName() && "hidden"],
						description,
						children: ($$renderer) => {
							$$renderer.push(`<label class="checkbox-label"><input id="claimsShowNamePublic" name="claimsShowNamePublic" class="checkbox"${attr("checked", config.claims.showNamePublic, true)} type="checkbox"/> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.show-name-publicly"))}</span></label>`);
						},
						$$slots: {
							description: true,
							default: true
						}
					});
				}
				$$renderer.push(`<!----> `);
				{
					function description($$renderer) {
						$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.show-for-list-owner-description"))}`);
					}
					Setting($$renderer, {
						description,
						children: ($$renderer) => {
							$$renderer.push(`<label class="checkbox-label"><input id="claimsShowForOwner" name="claimsShowForOwner" class="checkbox"${attr("checked", config.claims.showForOwner, true)} type="checkbox"/> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.show-for-list-owner"))}</span></label>`);
						},
						$$slots: {
							description: true,
							default: true
						}
					});
				}
				$$renderer.push(`<!----> `);
				{
					function description($$renderer) {
						$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.claims-require-email-tooltip"))}`);
					}
					Setting($$renderer, {
						description,
						children: ($$renderer) => {
							$$renderer.push(`<label class="checkbox-label"><input id="claimsRequireEmail" name="claimsRequireEmail" class="checkbox"${attr("checked", config.claims.requireEmail, true)} type="checkbox"/> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.claims-require-email"))}</span></label>`);
						},
						$$slots: {
							description: true,
							default: true
						}
					});
				}
				$$renderer.push(`<!---->`);
			}});
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/lib/components/admin/Settings/General/Lists.svelte
function Lists($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { config } = $$props;
		const t = getFormatter();
		SettingsGroup($$renderer, {
			title: store_get($$store_subs ??= {}, "$t", t)("wishes.lists"),
			children: ($$renderer) => {
				{
					function description($$renderer) {
						$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.enable-default-list-creation-tooltip"))}`);
					}
					Setting($$renderer, {
						description,
						children: ($$renderer) => {
							$$renderer.push(`<label class="checkbox-label"><input id="enableDefaultListCreation" name="enableDefaultListCreation" class="checkbox"${attr("checked", config.enableDefaultListCreation, true)} type="checkbox"/> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.enable-default-list-creation"))}</span></label>`);
						},
						$$slots: {
							description: true,
							default: true
						}
					});
				}
				$$renderer.push(`<!----> `);
				{
					function description($$renderer) {
						$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.allow-public-lists-tooltip"))}`);
					}
					Setting($$renderer, {
						description,
						children: ($$renderer) => {
							$$renderer.push(`<label class="checkbox-label"><input id="allowPublicLists" name="allowPublicLists"${attr_class("checkbox", void 0, { "disabled": config.listMode === "registry" })}${attr("checked", config.allowPublicLists || config.listMode === "registry", true)}${attr("disabled", config.listMode === "registry", true)} type="checkbox"/> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.allow-public-lists"))}</span></label>`);
						},
						$$slots: {
							description: true,
							default: true
						}
					});
				}
				$$renderer.push(`<!----> `);
				{
					function description($$renderer) {
						$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.anyone-can-delete-items-tooltip"))}`);
					}
					Setting($$renderer, {
						description,
						children: ($$renderer) => {
							$$renderer.push(`<label class="checkbox-label"><input id="anyoneCanDeleteItems" name="anyoneCanDeleteItems" class="checkbox"${attr("checked", config.anyoneCanDeleteItems, true)} type="checkbox"/> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.anyone-can-delete-items"))}</span></label>`);
						},
						$$slots: {
							description: true,
							default: true
						}
					});
				}
				$$renderer.push(`<!---->`);
			}});
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/lib/components/admin/Settings/General/Groups.svelte
function Groups($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { config, groups } = $$props;
		const t = getFormatter();
		SettingsGroup($$renderer, {
			title: store_get($$store_subs ??= {}, "$t", t)("admin.groups"),
			children: ($$renderer) => {
				{
					function description($$renderer) {
						$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.default-group-tooltip"))}`);
					}
					Setting($$renderer, {
						description,
						children: ($$renderer) => {
							$$renderer.push(`<label class="label flex flex-col" for="defaultGroup"><span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.default-group"))}</span> `);
							$$renderer.select({
								id: "defaultGroup",
								name: "defaultGroup",
								class: "select w-full max-w-fit",
								value: config.defaultGroup || ""
							}, ($$renderer) => {
								$$renderer.option({
									class: "truncate",
									value: ""
								}, ($$renderer) => {
									$$renderer.push(`${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.select-a-group-option"))}`);
								});
								$$renderer.push(`<!--[-->`);
								const each_array = ensure_array_like(groups);
								for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
									let group = each_array[$$index];
									$$renderer.option({ value: group.id }, ($$renderer) => {
										$$renderer.push(`${escape_html(group.name)}`);
									});
								}
								$$renderer.push(`<!--]-->`);
							});
							$$renderer.push(`</label>`);
						},
						$$slots: {
							description: true,
							default: true
						}
					});
				}
			}});
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/lib/components/admin/Settings/General/General.svelte
function General($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { config, groups, hidden = false, forGroup = false, groupUserCount = 0, listCount = 0 } = $$props;
		const t = getFormatter();
		$$renderer.push(`<div${attr_class(clsx({
			hidden,
			"flex flex-col gap-4": !hidden
		}))}><h2 class="h2">${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.general"))}</h2> `);
		if (forGroup) {
			$$renderer.push("<!--[0-->");
			WishlistMode($$renderer, {
				config,
				groupUserCount,
				listCount
			});
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		Suggestions($$renderer, { config });
		$$renderer.push(`<!----> `);
		Claims($$renderer, { config });
		$$renderer.push(`<!----> `);
		Lists($$renderer, { config });
		$$renderer.push(`<!----> `);
		if (!forGroup) {
			$$renderer.push("<!--[0-->");
			Groups($$renderer, {
				config,
				groups
			});
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/lib/components/admin/Settings/General/index.ts
var General_default = General;
// src/lib/components/admin/Settings/Security/OIDC.svelte
function OIDC($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { config, envManagedKeys = [] } = $$props;
		const t = getFormatter();
		const locked = (key) => envManagedKeys.includes(`oidc.${key}`);
		const anyLocked = derived(() => envManagedKeys.some((key) => key.startsWith("oidc.")));
		let enabled = derived(() => config.oidc.enable);
		SettingsGroup($$renderer, {
			title: store_get($$store_subs ??= {}, "$t", t)("admin.oidc"),
			children: ($$renderer) => {
				if (anyLocked()) $$renderer.push(`<!--[0--><span class="text-sm">${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.oidc-env-managed"))}</span>`);
				else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> <label class="checkbox-label"><input id="enableOIDC" name="enableOIDC" class="checkbox"${attr("disabled", locked("enable"), true)} type="checkbox"${attr("checked", enabled(), true)}/> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.enable"))}</span></label> `);
				if (enabled()) {
					$$renderer.push(`<!--[0--><div class="grid grid-cols-1 gap-x-4 gap-y-2 pb-1 md:grid-cols-2"><label class="label" for="oidcDiscoveryUrl">`);
					{
						function label($$renderer) {
							$$renderer.push(`<span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.oidc-url"))}</span>`);
						}
						function description($$renderer) {
							$$renderer.push(`<span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.oidc-url-description"))}</span>`);
						}
						Tooltip($$renderer, {
							label,
							description,
							$$slots: {
								label: true,
								description: true
							}
						});
					}
					$$renderer.push(`<!----> <input id="oidcDiscoveryUrl" name="oidcDiscoveryUrl" class="input" autocomplete="off"${attr("disabled", locked("discoveryUrl"), true)} required="" type="url"${attr("value", config.oidc.discoveryUrl)}/></label> <label class="label" for="oidcProviderName"><span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.oidc-provider-name"))}</span> <input id="oidcProviderName" name="oidcProviderName" class="input" autocomplete="off"${attr("disabled", locked("providerName"), true)}${attr("placeholder", store_get($$store_subs ??= {}, "$t", t)("general.oauth"))} type="text"${attr("value", config.oidc.providerName)}/></label> <label class="label" for="oidcClientId"><span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.oidc-client-id"))}</span> <input id="oidcClientId" name="oidcClientId" class="input" autocomplete="off"${attr("disabled", locked("clientId"), true)} required="" type="text"${attr("value", config.oidc.clientId)}/></label> `);
					PasswordInput($$renderer, {
						id: "oidcClientSecret",
						name: "oidcClientSecret",
						autocomplete: "off",
						disabled: locked("clientSecret"),
						label: store_get($$store_subs ??= {}, "$t", t)("admin.oidc-client-secret"),
						required: true,
						value: config.oidc.clientSecret
					});
					$$renderer.push(`<!----> `);
					{
						function description($$renderer) {
							$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.oidc-claim-name-description"))}`);
						}
						Setting($$renderer, {
							description,
							children: ($$renderer) => {
								$$renderer.push(`<label class="label" for="oidcNameClaim"><span>Name claim</span> <input id="oidcNameClaim" name="oidcNameClaim" class="input" autocomplete="off"${attr("disabled", locked("nameClaim"), true)} placeholder="name" type="text"${attr("value", config.oidc.nameClaim)}/></label>`);
							},
							$$slots: {
								description: true,
								default: true
							}
						});
					}
					$$renderer.push(`<!----> `);
					{
						function description($$renderer) {
							$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.oidc-claim-username-description"))}`);
						}
						Setting($$renderer, {
							description,
							children: ($$renderer) => {
								$$renderer.push(`<label class="label" for="oidcUsernameClaim"><span>Username claim</span> <input id="oidcUsernameClaim" name="oidcUsernameClaim" class="input" autocomplete="off"${attr("disabled", locked("usernameClaim"), true)} placeholder="preferred_username" type="text"${attr("value", config.oidc.usernameClaim)}/></label>`);
							},
							$$slots: {
								description: true,
								default: true
							}
						});
					}
					$$renderer.push(`<!----> `);
					{
						function description($$renderer) {
							$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.oidc-groups-claim-description"))}`);
						}
						Setting($$renderer, {
							description,
							children: ($$renderer) => {
								$$renderer.push(`<label class="label" for="oidcGroupsClaim"><span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.oidc-groups-claim"))}</span> <input id="oidcGroupsClaim" name="oidcGroupsClaim" class="input" autocomplete="off"${attr("disabled", locked("groupsClaim"), true)} placeholder="groups" type="text"${attr("value", config.oidc.groupsClaim)}/></label>`);
							},
							$$slots: {
								description: true,
								default: true
							}
						});
					}
					$$renderer.push(`<!----> `);
					{
						function description($$renderer) {
							$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.oidc-admin-group-description"))}`);
						}
						Setting($$renderer, {
							description,
							children: ($$renderer) => {
								$$renderer.push(`<label class="label" for="oidcAdminGroup"><span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.oidc-admin-group"))}</span> <input id="oidcAdminGroup" name="oidcAdminGroup" class="input" autocomplete="off"${attr("disabled", locked("adminGroup"), true)} type="text"${attr("value", config.oidc.adminGroup)}/></label>`);
							},
							$$slots: {
								description: true,
								default: true
							}
						});
					}
					$$renderer.push(`<!----> `);
					{
						function description($$renderer) {
							$$renderer.push(`<span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.oidc-auto-redirect-description"))}</span>`);
						}
						Setting($$renderer, {
							class: "col-span-full",
							description,
							children: ($$renderer) => {
								$$renderer.push(`<label class="checkbox-label"><input id="oidcAutoRedirect" name="oidcAutoRedirect" class="checkbox"${attr("checked", config.oidc.autoRedirect, true)}${attr("disabled", locked("autoRedirect"), true)} type="checkbox"/> `);
								{
									function label($$renderer) {
										$$renderer.push(`<span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.oidc-auto-redirect"))}</span>`);
									}
									function description($$renderer) {
										$$renderer.push(`<span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.oidc-auto-redirect-tooltip"))}</span>`);
									}
									Tooltip($$renderer, {
										label,
										description,
										$$slots: {
											label: true,
											description: true
										}
									});
								}
								$$renderer.push(`<!----></label>`);
							},
							$$slots: {
								description: true,
								default: true
							}
						});
					}
					$$renderer.push(`<!----> `);
					{
						function description($$renderer) {
							$$renderer.push(`<span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.oidc-auto-register-tooltip"))}</span>`);
						}
						Setting($$renderer, {
							class: "col-span-full",
							description,
							children: ($$renderer) => {
								$$renderer.push(`<label class="checkbox-label col-span-full"><input id="oidcAutoRegister" name="oidcAutoRegister" class="checkbox"${attr("checked", config.oidc.autoRegister, true)}${attr("disabled", locked("autoRegister"), true)} type="checkbox"/> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.oidc-auto-register"))}</span></label>`);
							},
							$$slots: {
								description: true,
								default: true
							}
						});
					}
					$$renderer.push(`<!----> `);
					{
						function description($$renderer) {
							$$renderer.push(`<span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.enable-sync-description"))}</span>`);
						}
						Setting($$renderer, {
							class: "col-span-full",
							description,
							children: ($$renderer) => {
								$$renderer.push(`<label class="checkbox-label"><input id="oidcEnableSync" name="oidcEnableSync" class="checkbox"${attr("checked", config.oidc.enableSync, true)}${attr("disabled", locked("enableSync"), true)} type="checkbox"/> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.enable-sync"))}</span></label>`);
							},
							$$slots: {
								description: true,
								default: true
							}
						});
					}
					$$renderer.push(`<!----> `);
					{
						function description($$renderer) {
							$$renderer.push(`<span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.disable-email-verification-description"))}</span>`);
						}
						Setting($$renderer, {
							class: "col-span-full",
							description,
							children: ($$renderer) => {
								$$renderer.push(`<label class="checkbox-label"><input id="oidcDisableEmailVerification" name="oidcDisableEmailVerification" class="checkbox"${attr("checked", config.oidc.disableEmailVerification, true)}${attr("disabled", locked("disableEmailVerification"), true)} type="checkbox"/> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.disable-email-verification"))}</span></label>`);
							},
							$$slots: {
								description: true,
								default: true
							}
						});
					}
					$$renderer.push(`<!----></div>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]-->`);
			}});
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/lib/components/admin/Settings/Security/Credentials.svelte
function Credentials($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { config, envManagedKeys = [] } = $$props;
		const t = getFormatter();
		SettingsGroup($$renderer, {
			title: store_get($$store_subs ??= {}, "$t", t)("admin.credentials"),
			children: ($$renderer) => {
				Setting($$renderer, {
					children: ($$renderer) => {
						$$renderer.push(`<label class="checkbox-label"><input id="enableSignup" name="enableSignup" class="checkbox"${attr("checked", config.enableSignup, true)}${attr("disabled", envManagedKeys.includes("enableSignup"), true)} type="checkbox"/> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.enable-signup"))}</span></label>`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----> `);
				{
					function description($$renderer) {
						$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.password-strength-requirement-tooltip"))}`);
					}
					Setting($$renderer, {
						description,
						children: ($$renderer) => {
							$$renderer.push(`<label class="label flex flex-col" for="passwordStrength">`);
							{
								function label($$renderer) {
									$$renderer.push(`<span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.password-strength-requirement"))}</span>`);
								}
								function description($$renderer) {
									$$renderer.push(`<span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.password-strength-warning"))}</span>`);
								}
								function icon($$renderer) {
									$$renderer.push(`<iconify-icon class="text-warning-700" icon="ion:warning-outline"></iconify-icon>`);
								}
								Tooltip($$renderer, {
									label,
									description,
									icon,
									$$slots: {
										label: true,
										description: true,
										icon: true
									}
								});
							}
							$$renderer.push(`<!----> `);
							$$renderer.select({
								id: "passwordStrength",
								name: "passwordStrength",
								class: "select w-fit min-w-64",
								value: config.security.passwordStrength
							}, ($$renderer) => {
								$$renderer.push(`<!--[-->`);
								const each_array = ensure_array_like(strengthOptions);
								for (let idx = 0, $$length = each_array.length; idx < $$length; idx++) {
									let label = each_array[idx];
									$$renderer.option({ value: idx - 1 }, ($$renderer) => {
										$$renderer.push(`${escape_html(store_get($$store_subs ??= {}, "$t", t)(label))}`);
									});
								}
								$$renderer.push(`<!--]-->`);
							});
							$$renderer.push(`</label>`);
						},
						$$slots: {
							description: true,
							default: true
						}
					});
				}
				$$renderer.push(`<!----> `);
				{
					function description($$renderer) {
						$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.disable-password-login-tooltip"))}`);
					}
					Setting($$renderer, {
						description,
						children: ($$renderer) => {
							$$renderer.push(`<label class="checkbox-label"><input id="disablePasswordLogin" name="disablePasswordLogin" class="checkbox"${attr("checked", config.security.disablePasswordLogin, true)}${attr("disabled", envManagedKeys.includes("security.disablePasswordLogin"), true)} type="checkbox"/> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.disable-password-login"))}</span></label>`);
						},
						$$slots: {
							description: true,
							default: true
						}
					});
				}
				$$renderer.push(`<!---->`);
			}});
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/lib/components/admin/Settings/Security/Security.svelte
function Security($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { config, envManagedKeys = [], hidden = false } = $$props;
		const t = getFormatter();
		$$renderer.push(`<div${attr_class(clsx({
			hidden,
			"flex flex-col gap-4": !hidden
		}))}><h2 class="h2">${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.security"))}</h2> `);
		Credentials($$renderer, {
			config,
			envManagedKeys
		});
		$$renderer.push(`<!----> `);
		OIDC($$renderer, {
			config,
			envManagedKeys
		});
		$$renderer.push(`<!----></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/lib/components/admin/Settings/Security/index.ts
var Security_default = Security;
// src/lib/components/admin/Settings/index.ts
var options = [
	{
		label: ($t) => $t("admin.general"),
		hash: "#general"
	},
	{
		label: ($t) => $t("auth.email"),
		hash: "#email"
	},
	{
		label: ($t) => $t("admin.security"),
		hash: "#security"
	}
];

export { Email_default as E, General_default as G, Security_default as S, options as o };
//# sourceMappingURL=Settings.js-DvkMcewm.js.map
