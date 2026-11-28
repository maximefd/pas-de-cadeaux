import { av as store_get, at as head, ao as escape_html, au as attr, aw as ensure_array_like, ax as unsubscribe_stores, aq as bind_props, V as derived } from '../../../../../chunks/index-server.js-CIVHNbBm.js';
import { g as goto } from '../../../../../chunks/client.js-CtfT808N.js';
import { T as Tabs } from '../../../../../chunks/anatomy4.js-BBZ3aFXa.js';
import { G as GroupAPI } from '../../../../../chunks/groups.js-9o7-Je8O.js';
import { f as getFormatter } from '../../../../../chunks/i18n2.js-1SlG2bAu.js';
import { r as resolve } from '../../../../../chunks/paths.js-BuehRTbY.js';
import '../../../../../chunks/routing.js-DMTqwvGY.js';
import '../../../../../chunks/shared.js-Cb68JbUk.js';
import '../../../../../chunks/exports.js-BBf-2Qi_.js';
import '../../../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../../../chunks/utils.js-CAPFIGDr.js';
import '../../../../../chunks/create-anatomy.js-CLhpGM8y.js';
import '../../../../../chunks/warning.js-12YgogjO.js';
import '../../../../../chunks/number.js-B87QIgOI.js';
import '../../../../../chunks/navigate.js-CQMmEWI4.js';
import '../../../../../chunks/equal.js-nd5Stm03.js';
import '../../../../../chunks/schema.js-_174nGak.js';
import '../../../../../chunks/index-server2.js-DZFYXfYm.js';
import '../../../../../chunks/internal.js-B0ORXlkz.js';

// src/routes/admin/groups/[groupId]/+layout@.svelte
function _layout_($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { data, children } = $$props;
		const t = getFormatter();
		new GroupAPI(data.group.id);
		const groupId = derived(() => data.group.id);
		const tabs = {
			members: {
				href: () => resolve("/admin/groups/[groupId]/members", { groupId: groupId() }),
				label: store_get($$store_subs ??= {}, "$t", t)("admin.members")
			},
			settings: {
				href: () => resolve("/admin/groups/[groupId]/settings", { groupId: groupId() }),
				label: store_get($$store_subs ??= {}, "$t", t)("admin.settings")
			}
		};
		let selectedTab = "members";
		async function onValueChange(value) {
			selectedTab = value;
			return goto(tabs[value].href(), { });
		}
		let dir = "ltr";
		const snapshot = {
			capture: () => selectedTab,
			restore: (value) => selectedTab = value
		};
		head("1cirq1z", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.group-settings"))}</title>`);
			});
		});
		$$renderer.push(`<div class="flex flex-row items-center gap-x-2">`);
		$$renderer.push(`<!--[-1--><h2 class="h2 pb-2">${escape_html(data.group.name)}</h2> <button class="btn-icon"${attr("aria-label", store_get($$store_subs ??= {}, "$t", t)("a11y.edit-group-name"))}><iconify-icon icon="ion:create-outline" width="24px"></iconify-icon></button>`);
		$$renderer.push(`<!--]--></div> `);
		Tabs($$renderer, {
			dir,
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
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----> `);
		children?.($$renderer);
		$$renderer.push(`<!---->`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
		bind_props($$props, { snapshot });
	});
}

export { _layout_ as default };
//# sourceMappingURL=_layout@.svelte.js-DXmchBz8.js.map
