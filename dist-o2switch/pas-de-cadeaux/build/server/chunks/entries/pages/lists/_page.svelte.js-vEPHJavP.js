import { at as head, ao as escape_html, av as store_get, aw as ensure_array_like, ax as unsubscribe_stores, au as attr, V as derived } from '../../../chunks/index-server.js-CIVHNbBm.js';
import { f as getFormatter } from '../../../chunks/i18n2.js-1SlG2bAu.js';
import '../../../chunks/client.js-CtfT808N.js';
import '../../../chunks/routing.js-DMTqwvGY.js';
import '../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../chunks/utils.js-CAPFIGDr.js';
import { p as page } from '../../../chunks/state.js-DFeh0alp.js';
import { I as InstallHint } from '../../../chunks/InstallHint.js-CckVPPAL.js';
import '../../../chunks/index-server2.js-DZFYXfYm.js';
import '../../../chunks/shared.js-Cb68JbUk.js';
import '../../../chunks/exports.js-BBf-2Qi_.js';

// src/lib/components/papier/ListRow.svelte
function ListRow($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { hasNewItems = false, list } = $$props;
		const t = getFormatter();
		const count = derived(() => list.itemCount ?? 0);
		$$renderer.push(`<a class="paper-person"${attr("href", `/lists/${list.id}`)}><span class="paper-person-name"><span data-testid="list-owner">${escape_html(list.owner.name)}</span> `);
		if (hasNewItems) $$renderer.push(`<!--[0--><span class="paper-new-dot" data-testid="new-ideas"${attr("title", store_get($$store_subs ??= {}, "$t", t)("wishes.new-ideas"))}><span class="sr-only">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.new-ideas"))}</span></span>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (list.name) $$renderer.push(`<!--[0--><small data-testid="list-name">${escape_html(list.name)}</small>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></span> <small data-testid="item-count">${escape_html(count() > 0 ? store_get($$store_subs ??= {}, "$t", t)("wishes.idea-count", { values: { count: count() } }) : store_get($$store_subs ??= {}, "$t", t)("wishes.nothing-yet"))} <span aria-hidden="true">›</span></small></a>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/lib/components/papier/CircleTabs.svelte
function CircleTabs($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { groups } = $$props;
		const t = getFormatter();
		if (groups && groups.length > 1) {
			$$renderer.push(`<!--[0--><nav class="paper-tabs print:hidden"${attr("aria-label", store_get($$store_subs ??= {}, "$t", t)("wishes.circles"))}><!--[-->`);
			const each_array = ensure_array_like(groups);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let group = each_array[$$index];
				$$renderer.push(`<button class="paper-tab"${attr("aria-current", group.active ? "true" : void 0)}${attr("disabled", false, true)} type="button">${escape_html(group.name)}</button>`);
			}
			$$renderer.push(`<!--]--></nav>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/routes/lists/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { data } = $$props;
		const t = getFormatter();
		head("18annmq", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.my-relatives"))}</title>`);
			});
		});
		InstallHint($$renderer, { banner: true });
		$$renderer.push(`<!----> `);
		CircleTabs($$renderer, {
			groups: page.data.groups,
			user: page.data.user
		});
		$$renderer.push(`<!----> `);
		if (data.otherLists.length === 0) $$renderer.push(`<!--[0--><p class="paper-empty" data-testid="list-container-empty">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.no-relatives-yet"))}</p>`);
		else {
			$$renderer.push(`<!--[-1--><div data-testid="list-container"><!--[-->`);
			const each_array = ensure_array_like(data.otherLists);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let list = each_array[$$index];
				ListRow($$renderer, {
					hasNewItems: list.hasNewItems,
					list
				});
			}
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]-->`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-vEPHJavP.js.map
