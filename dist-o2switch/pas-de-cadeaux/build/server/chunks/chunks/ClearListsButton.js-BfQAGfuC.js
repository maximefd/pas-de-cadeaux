import { av as store_get, ax as unsubscribe_stores, ak as attributes, ao as escape_html, V as derived } from './index-server.js-CIVHNbBm.js';
import { i as invalidateAll } from './client.js-CtfT808N.js';
import { I as ItemsAPI } from './items2.js-C4c-wPjk.js';
import { C as ConfirmModal } from './ConfirmModal.js-BchEguXy.js';
import { t as toaster } from './toaster.js-DRl3MQi1.js';
import { f as getFormatter } from './i18n2.js-1SlG2bAu.js';

// src/lib/components/admin/Actions/ClearListsButton.svelte
function ClearListsButton($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { groupId = void 0, claimed = false } = $$props;
		const t = getFormatter();
		const itemsAPI = new ItemsAPI();
		let description = derived(() => store_get($$store_subs ??= {}, "$t", t)("admin.clear-lists-confirmation", { values: {
			claimedOnly: claimed,
			groupSpecific: groupId !== void 0
		} }));
		const onConfirm = async () => {
			if ((await itemsAPI.clearItemsFromLists(groupId, claimed)).ok) {
				invalidateAll();
				toaster.info({ description: store_get($$store_subs ??= {}, "$t", t)("general.wishlists-cleared") });
			} else toaster.error({ description: store_get($$store_subs ??= {}, "$t", t)("general.oops") });
		};
		{
			function trigger($$renderer, props) {
				$$renderer.push(`<button${attributes({
					class: "preset-filled-error-500 btn w-fit",
					...props,
					type: "button"
				})}>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.clear-lists", { values: {
					claimedOnly: claimed,
					groupSpecific: groupId !== void 0
				} }))}</button>`);
			}
			ConfirmModal($$renderer, {
				description: description(),
				onConfirm,
				title: store_get($$store_subs ??= {}, "$t", t)("general.please-confirm"),
				trigger,
				$$slots: { trigger: true }
			});
		}
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { ClearListsButton as C };
//# sourceMappingURL=ClearListsButton.js-BfQAGfuC.js.map
