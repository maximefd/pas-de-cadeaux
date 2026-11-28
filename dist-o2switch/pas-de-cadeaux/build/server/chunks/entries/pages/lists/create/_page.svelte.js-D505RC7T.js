import { at as head, ai as spread_props, av as store_get, ax as unsubscribe_stores, ao as escape_html } from '../../../../chunks/index-server.js-CIVHNbBm.js';
import { M as ManageListForm } from '../../../../chunks/ManageListForm.js-CMDd5hSX.js';
import '../../../../chunks/client.js-CtfT808N.js';
import { f as getFormatter } from '../../../../chunks/i18n2.js-1SlG2bAu.js';
import '../../../../chunks/toaster.js-DRl3MQi1.js';
import '../../../../chunks/anatomy.js-Dd71kskB.js';
import '../../../../chunks/create-anatomy.js-CLhpGM8y.js';
import '../../../../chunks/warning.js-12YgogjO.js';
import '../../../../chunks/use-list-collection.js-brFPftRE.js';
import '../../../../chunks/equal.js-nd5Stm03.js';
import '../../../../chunks/get-styles.js-Boa-8w4M.js';
import '../../../../chunks/anatomy2.js-Deb7OEEc.js';
import '../../../../chunks/navigate.js-CQMmEWI4.js';
import '../../../../chunks/dist2.js-Cjb_BOMc.js';
import '../../../../chunks/anatomy4.js-BBZ3aFXa.js';
import '../../../../chunks/number.js-B87QIgOI.js';
import '../../../../chunks/Markdown.js-Dm7PA_S2.js';
import '../../../../chunks/state.js-DFeh0alp.js';
import '../../../../chunks/Tooltip.js-D0qklLov.js';
import '../../../../chunks/anatomy3.js-HwVFkfZZ.js';
import '../../../../chunks/dist.js-BvNxsp9_.js';
import '../../../../chunks/ConfirmModal.js-BchEguXy.js';
import '../../../../chunks/BaseModal.js-_UDlR-j4.js';
import '../../../../chunks/anatomy5.js-STbBfBjf.js';
import '../../../../chunks/Search.js-DiRQYlEs.js';
import '../../../../chunks/routing.js-DMTqwvGY.js';
import '../../../../chunks/shared.js-Cb68JbUk.js';
import '../../../../chunks/exports.js-BBf-2Qi_.js';
import '../../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../../chunks/utils.js-CAPFIGDr.js';
import '../../../../chunks/index-server2.js-DZFYXfYm.js';

// src/routes/lists/create/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { data } = $$props;
		const t = getFormatter();
		head("15gabaf", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.create-list"))}</title>`);
			});
		});
		ManageListForm($$renderer, spread_props([data, { persistButtonName: store_get($$store_subs ??= {}, "$t", t)("general.create") }]));
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-D505RC7T.js.map
