import { at as head, av as store_get, ax as unsubscribe_stores, ao as escape_html } from '../../../../../chunks/index-server.js-CIVHNbBm.js';
import '../../../../../chunks/client.js-CtfT808N.js';
import { I as ItemForm } from '../../../../../chunks/ItemForm.js-D9OPOqUR.js';
import { f as getFormatter } from '../../../../../chunks/i18n2.js-1SlG2bAu.js';
import '../../../../../chunks/toaster.js-DRl3MQi1.js';
import '../../../../../chunks/routing.js-DMTqwvGY.js';
import '../../../../../chunks/shared.js-Cb68JbUk.js';
import '../../../../../chunks/exports.js-BBf-2Qi_.js';
import '../../../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../../../chunks/utils.js-CAPFIGDr.js';
import '../../../../../chunks/state.js-DFeh0alp.js';
import '../../../../../chunks/price-formatter.js-Cgx1svgQ.js';
import '../../../../../chunks/shared-server.js-B6_G0tAr.js';
import '../../../../../chunks/anatomy.js-Dd71kskB.js';
import '../../../../../chunks/create-anatomy.js-CLhpGM8y.js';
import '../../../../../chunks/warning.js-12YgogjO.js';
import '../../../../../chunks/use-list-collection.js-brFPftRE.js';
import '../../../../../chunks/equal.js-nd5Stm03.js';
import '../../../../../chunks/get-styles.js-Boa-8w4M.js';
import '../../../../../chunks/anatomy2.js-Deb7OEEc.js';
import '../../../../../chunks/navigate.js-CQMmEWI4.js';
import '../../../../../chunks/dist2.js-Cjb_BOMc.js';
import '../../../../../chunks/index-server2.js-DZFYXfYm.js';

// src/routes/items/[itemId]/edit/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { data } = $$props;
		const t = getFormatter();
		let saving = false;
		head("1mphwpj", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.edit-title"))}</title>`);
			});
		});
		if (data.item) {
			$$renderer.push(`<!--[0--><form enctype="multipart/form-data" method="POST">`);
			ItemForm($$renderer, {
				buttonText: store_get($$store_subs ??= {}, "$t", t)("general.save"),
				item: data.item,
				lists: data.lists,
				namePlaceholder: store_get($$store_subs ??= {}, "$t", t)("wishes.idea-placeholder-me"),
				saving,
				userId: data.user.id
			});
			$$renderer.push(`<!----></form>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-NDg6r67J.js.map
