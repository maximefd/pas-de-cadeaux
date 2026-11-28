import { av as store_get, ai as spread_props, ax as unsubscribe_stores, ao as escape_html } from './index-server.js-CIVHNbBm.js';
import { f as getFormatter } from './i18n2.js-1SlG2bAu.js';
import { B as BaseModal, D as Dialog } from './BaseModal.js-_UDlR-j4.js';

// src/lib/components/modals/ConfirmModal.svelte
function ConfirmModal($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const t = getFormatter();
		const { title = store_get($$store_subs ??= {}, "$t", t)("general.please-confirm"), onConfirm, onCancel, confirmText = store_get($$store_subs ??= {}, "$t", t)("general.confirm"), cancelText = store_get($$store_subs ??= {}, "$t", t)("general.cancel"), confirmButtonProps, cancelButtonProps, $$slots, $$events, ...rest } = $$props;
		{
			function actions($$renderer, { neutralStyle, positiveStyle }) {
				if (Dialog.CloseTrigger) {
					$$renderer.push("<!--[-->");
					Dialog.CloseTrigger($$renderer, spread_props([
						{
							class: neutralStyle,
							onclick: onCancel
						},
						cancelButtonProps,
						{
							children: ($$renderer) => {
								$$renderer.push(`<!---->${escape_html(cancelText)}`);
							},
							$$slots: { default: true }
						}
					]));
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
				$$renderer.push(` `);
				if (Dialog.CloseTrigger) {
					$$renderer.push("<!--[-->");
					Dialog.CloseTrigger($$renderer, spread_props([
						{
							class: positiveStyle,
							onclick: onConfirm
						},
						confirmButtonProps,
						{
							children: ($$renderer) => {
								$$renderer.push(`<!---->${escape_html(confirmText)}`);
							},
							$$slots: { default: true }
						}
					]));
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
			}
			BaseModal($$renderer, spread_props([
				{ title },
				rest,
				{
					actions,
					$$slots: { actions: true }
				}
			]));
		}
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { ConfirmModal as C };
//# sourceMappingURL=ConfirmModal.js-BchEguXy.js.map
