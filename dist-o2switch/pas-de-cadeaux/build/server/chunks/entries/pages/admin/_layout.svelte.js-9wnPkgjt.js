import { av as store_get, at as head, aw as ensure_array_like, ao as escape_html, ax as unsubscribe_stores, aq as bind_props } from '../../../chunks/index-server.js-CIVHNbBm.js';
import { g as goto } from '../../../chunks/client.js-CtfT808N.js';
import { T as Tabs } from '../../../chunks/anatomy4.js-BBZ3aFXa.js';
import { f as getFormatter } from '../../../chunks/i18n2.js-1SlG2bAu.js';
import { r as resolve } from '../../../chunks/paths.js-BuehRTbY.js';
import '../../../chunks/routing.js-DMTqwvGY.js';
import '../../../chunks/shared.js-Cb68JbUk.js';
import '../../../chunks/exports.js-BBf-2Qi_.js';
import '../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../chunks/utils.js-CAPFIGDr.js';
import '../../../chunks/create-anatomy.js-CLhpGM8y.js';
import '../../../chunks/warning.js-12YgogjO.js';
import '../../../chunks/number.js-B87QIgOI.js';
import '../../../chunks/navigate.js-CQMmEWI4.js';
import '../../../chunks/equal.js-nd5Stm03.js';
import '../../../chunks/index-server2.js-DZFYXfYm.js';
import '../../../chunks/internal.js-B0ORXlkz.js';

// src/routes/admin/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { children } = $$props;
		const t = getFormatter();
		const tabs = {
			users: {
				href: resolve("/admin/users"),
				label: store_get($$store_subs ??= {}, "$t", t)("admin.users")
			},
			groups: {
				href: resolve("/admin/groups"),
				label: store_get($$store_subs ??= {}, "$t", t)("admin.groups")
			},
			settings: {
				href: resolve("/admin/settings"),
				label: store_get($$store_subs ??= {}, "$t", t)("admin.settings")
			},
			actions: {
				href: resolve("/admin/actions"),
				label: store_get($$store_subs ??= {}, "$t", t)("admin.actions")
			},
			about: {
				href: resolve("/admin/about"),
				label: store_get($$store_subs ??= {}, "$t", t)("admin.about")
			}
		};
		let selectedTab = "users";
		async function onValueChange(value) {
			selectedTab = value;
			return goto(tabs[value].href, { });
		}
		const snapshot = {
			capture: () => selectedTab,
			restore: (value) => selectedTab = value
		};
		head("1qg5d05", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.administration"))}</title>`);
			});
		});
		Tabs($$renderer, {
			onValueChange: ({ value }) => onValueChange(value),
			value: selectedTab,
			children: ($$renderer) => {
				if (Tabs.List) {
					$$renderer.push("<!--[-->");
					Tabs.List($$renderer, {
						class: "flex overflow-auto",
						children: ($$renderer) => {
							$$renderer.push(`<!--[-->`);
							const each_array = ensure_array_like(Object.entries(tabs));
							for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
								let [value, { label }] = each_array[$$index];
								if (Tabs.Trigger) {
									$$renderer.push("<!--[-->");
									Tabs.Trigger($$renderer, {
										value,
										children: ($$renderer) => {
											$$renderer.push(`<!---->${escape_html(label)}`);
										},
										$$slots: { default: true }
									});
									$$renderer.push("<!--]-->");
								} else {
									$$renderer.push("<!--[!-->");
									$$renderer.push("<!--]-->");
								}
							}
							$$renderer.push(`<!--]--> `);
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
						value: selectedTab,
						children: ($$renderer) => {
							children?.($$renderer);
							$$renderer.push(`<!---->`);
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
		bind_props($$props, { snapshot });
	});
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte.js-9wnPkgjt.js.map
