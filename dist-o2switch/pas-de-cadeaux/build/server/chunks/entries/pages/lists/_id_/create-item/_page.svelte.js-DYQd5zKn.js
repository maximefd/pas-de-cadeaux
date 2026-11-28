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

// src/routes/lists/[id]/create-item/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { data } = $$props;
		const t = getFormatter();
		let itemData = {
			name: "",
			price: null,
			url: null,
			note: null,
			imageUrl: null
		};
		let saving = false;
		head("15eoxlv", $$renderer, ($$renderer) => {
			if (data.list.owner.isMe) {
				$$renderer.push("<!--[0-->");
				$$renderer.title(($$renderer) => {
					$$renderer.push(`<title>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.idea-title-me"))}</title>`);
				});
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.title(($$renderer) => {
					$$renderer.push(`<title>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.idea-title-other", { values: { name: data.list.owner.name } }))}</title>`);
				});
			}
			$$renderer.push(`<!--]-->`);
		});
		$$renderer.push(`<form enctype="multipart/form-data" method="POST">`);
		ItemForm($$renderer, {
			buttonText: store_get($$store_subs ??= {}, "$t", t)("wishes.add-short"),
			currentList: data.list.id,
			item: itemData,
			lists: data.lists,
			namePlaceholder: data.list.owner.isMe ? store_get($$store_subs ??= {}, "$t", t)("wishes.idea-placeholder-me") : store_get($$store_subs ??= {}, "$t", t)("wishes.idea-placeholder-other", { values: { name: data.list.owner.name } }),
			saving,
			userId: data.user.id
		});
		$$renderer.push(`<!----></form>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-DYQd5zKn.js.map
