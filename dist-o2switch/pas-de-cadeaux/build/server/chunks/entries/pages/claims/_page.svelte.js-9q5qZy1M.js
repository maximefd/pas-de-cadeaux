import { at as head, ao as escape_html, av as store_get, aw as ensure_array_like, ay as attr_class, am as clsx, ax as unsubscribe_stores, V as derived } from '../../../chunks/index-server.js-CIVHNbBm.js';
import { I as ItemCard_1 } from '../../../chunks/ItemCard.js-Df02Pz2E.js';
import { f as getFormatter } from '../../../chunks/i18n2.js-1SlG2bAu.js';
import '../../../chunks/client.js-CtfT808N.js';
import '../../../chunks/routing.js-DMTqwvGY.js';
import '../../../chunks/shared.js-Cb68JbUk.js';
import '../../../chunks/exports.js-BBf-2Qi_.js';
import '../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../chunks/utils.js-CAPFIGDr.js';
import '../../../chunks/Markdown.js-Dm7PA_S2.js';
import '../../../chunks/price-formatter.js-Cgx1svgQ.js';
import '../../../chunks/shared-server.js-B6_G0tAr.js';
import '../../../chunks/index-server2.js-DZFYXfYm.js';
import '../../../chunks/users.js-DwrjtQr5.js';
import '../../../chunks/toaster.js-DRl3MQi1.js';
import '../../../chunks/warning.js-12YgogjO.js';
import '../../../chunks/BaseModal.js-_UDlR-j4.js';
import '../../../chunks/create-anatomy.js-CLhpGM8y.js';
import '../../../chunks/dist.js-BvNxsp9_.js';
import '../../../chunks/anatomy2.js-Deb7OEEc.js';
import '../../../chunks/ConfirmModal.js-BchEguXy.js';
import '../../../chunks/items2.js-C4c-wPjk.js';
import '../../../chunks/paths.js-BuehRTbY.js';
import '../../../chunks/internal.js-B0ORXlkz.js';
import '../../../chunks/state.js-DFeh0alp.js';
import '../../../chunks/item-util.js-B_1B95Df.js';
import '../../../chunks/index-server3.js-6tNgzrAG.js';

// src/routes/claims/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { data } = $$props;
		const t = getFormatter();
		let items = data.items;
		const isTileView = false;
		let groupedItems = derived(() => {
			const byUser = {};
			for (const item of items) (byUser[item.user.name] ??= []).push(item);
			return Object.entries(byUser).toSorted(([a], [b]) => a.localeCompare(b));
		});
		head("huzde6", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(store_get($$store_subs ??= {}, "$t", t)("app.my-claims"))}</title>`);
			});
		});
		$$renderer.push(`<p class="paper-intro">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.claims-intro"))}</p> `);
		if (data.items.length === 0) $$renderer.push(`<!--[0--><p class="paper-empty">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.nothing-claimed-yet"))}</p>`);
		else {
			$$renderer.push(`<!--[-1--><div class="paper-claims" data-testid="claims-container"><!--[-->`);
			const each_array = ensure_array_like(groupedItems());
			for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
				let [category, items] = each_array[$$index_1];
				$$renderer.push(`<h2 class="paper-section">${escape_html(category)}</h2> <div${attr_class(clsx(["paper-list"]))} data-testid="category"><!--[-->`);
				const each_array_1 = ensure_array_like(items);
				for (let $$index = 0, $$length = each_array_1.length; $$index < $$length; $$index++) {
					let item = each_array_1[$$index];
					$$renderer.push(`<div>`);
					ItemCard_1($$renderer, {
						groupId: data.user.activeGroupId,
						isTileView,
						item,
						requireClaimEmail: true,
						showClaimForOwner: data.config.claims.showForOwner,
						showClaimedName: true,
						showFor: true,
						user: data.user
					});
					$$renderer.push(`<!----></div>`);
				}
				$$renderer.push(`<!--]--></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]-->`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-9q5qZy1M.js.map
