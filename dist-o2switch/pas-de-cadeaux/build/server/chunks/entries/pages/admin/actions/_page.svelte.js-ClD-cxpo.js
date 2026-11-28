import { C as ClearListsButton } from '../../../../chunks/ClearListsButton.js-BfQAGfuC.js';
import '../../../../chunks/index-server.js-CIVHNbBm.js';
import '../../../../chunks/client.js-CtfT808N.js';
import '../../../../chunks/routing.js-DMTqwvGY.js';
import '../../../../chunks/shared.js-Cb68JbUk.js';
import '../../../../chunks/exports.js-BBf-2Qi_.js';
import '../../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../../chunks/utils.js-CAPFIGDr.js';
import '../../../../chunks/items2.js-C4c-wPjk.js';
import '../../../../chunks/ConfirmModal.js-BchEguXy.js';
import '../../../../chunks/i18n2.js-1SlG2bAu.js';
import '../../../../chunks/index-server2.js-DZFYXfYm.js';
import '../../../../chunks/BaseModal.js-_UDlR-j4.js';
import '../../../../chunks/create-anatomy.js-CLhpGM8y.js';
import '../../../../chunks/warning.js-12YgogjO.js';
import '../../../../chunks/dist.js-BvNxsp9_.js';
import '../../../../chunks/anatomy2.js-Deb7OEEc.js';
import '../../../../chunks/toaster.js-DRl3MQi1.js';

// src/lib/components/admin/ActionsForm.svelte
function ActionsForm($$renderer) {
	$$renderer.push(`<div class="flex flex-wrap gap-2">`);
	ClearListsButton($$renderer, {});
	$$renderer.push(`<!----> `);
	ClearListsButton($$renderer, { claimed: true });
	$$renderer.push(`<!----></div>`);
}
// src/routes/admin/actions/+page.svelte
function _page($$renderer) {
	ActionsForm($$renderer);
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-ClD-cxpo.js.map
