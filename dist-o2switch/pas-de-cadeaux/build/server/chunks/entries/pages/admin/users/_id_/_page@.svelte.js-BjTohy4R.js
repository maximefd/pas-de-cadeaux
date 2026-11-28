import { at as head, ao as escape_html, av as store_get, ax as unsubscribe_stores, V as derived, ak as attributes } from '../../../../../chunks/index-server.js-CIVHNbBm.js';
import { g as goto, i as invalidateAll } from '../../../../../chunks/client.js-CtfT808N.js';
import { T as TokenCopy } from '../../../../../chunks/TokenCopy.js-CY3taoB-.js';
import { f as getFormatter } from '../../../../../chunks/i18n2.js-1SlG2bAu.js';
import { t as toaster } from '../../../../../chunks/toaster.js-DRl3MQi1.js';
import { C as ConfirmModal } from '../../../../../chunks/ConfirmModal.js-BchEguXy.js';
import { r as resolve } from '../../../../../chunks/paths.js-BuehRTbY.js';
import { U as UserAPI } from '../../../../../chunks/users.js-DwrjtQr5.js';
import { E as EditProfile } from '../../../../../chunks/EditProfile.js-hT54Ue5m.js';
import '../../../../../chunks/routing.js-DMTqwvGY.js';
import '../../../../../chunks/shared.js-Cb68JbUk.js';
import '../../../../../chunks/exports.js-BBf-2Qi_.js';
import '../../../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../../../chunks/utils.js-CAPFIGDr.js';
import '../../../../../chunks/anatomy2.js-Deb7OEEc.js';
import '../../../../../chunks/create-anatomy.js-CLhpGM8y.js';
import '../../../../../chunks/warning.js-12YgogjO.js';
import '../../../../../chunks/attachments.js-DNhXZ-Re.js';
import '../../../../../chunks/dist2.js-Cjb_BOMc.js';
import '../../../../../chunks/get-styles.js-Boa-8w4M.js';
import '../../../../../chunks/index-server2.js-DZFYXfYm.js';
import '../../../../../chunks/BaseModal.js-_UDlR-j4.js';
import '../../../../../chunks/dist.js-BvNxsp9_.js';
import '../../../../../chunks/internal.js-B0ORXlkz.js';
import '../../../../../chunks/state.js-DFeh0alp.js';

// src/routes/admin/users/[id]/+page@.svelte
function _page_($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { data, form } = $$props;
		const t = getFormatter();
		const profileEditDisabled = derived(() => data.oidcConfig.ready && data.oidcConfig.enableSync === true && data.editingUser.oauthId !== null);
		const handleDelete = async () => {
			if ((await new UserAPI(data.editingUser.id).delete()).ok) {
				await goto(resolve("/admin/users"));
				invalidateAll();
				toaster.info({ description: store_get($$store_subs ??= {}, "$t", t)("admin.user-was-deleted", { values: { username: data.editingUser.username } }) });
			} else toaster.error({ description: store_get($$store_subs ??= {}, "$t", t)("general.oops") });
		};
		const handleClearSessions = () => {};
		head("d9z0nr", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(data.editingUser.name)} - ${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.administration"))}</title>`);
			});
		});
		EditProfile($$renderer, {
			autocomplete: false,
			disabled: profileEditDisabled(),
			user: data.editingUser
		});
		$$renderer.push(`<!----> <form class="mt-4 flex flex-col flex-wrap gap-4" method="POST"><div class="flex flex-wrap gap-4"><button class="preset-filled-primary-500 btn w-full sm:w-fit" formaction="?/reset-password">${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.generate-reset-password-link"))}</button> `);
		if (form?.success && form?.url) {
			$$renderer.push("<!--[0-->");
			TokenCopy($$renderer, {
				url: form.url,
				children: ($$renderer) => {
					$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.password-reset-link"))}`);
				}});
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (data.editingUser.role.name == "ADMIN") $$renderer.push(`<!--[0--><button class="preset-tonal-secondary inset-ring-secondary-500 btn w-full inset-ring sm:w-fit" formaction="?/remove-admin">${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.remove-admin"))}</button>`);
		else $$renderer.push(`<!--[-1--><button class="preset-tonal-secondary inset-ring-secondary-500 btn w-full inset-ring sm:w-fit" formaction="?/make-admin">${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.make-admin"))}</button>`);
		$$renderer.push(`<!--]--></div> <div class="flex flex-wrap gap-4">`);
		if (data.editingUser.oauthId) $$renderer.push(`<!--[0--><button class="preset-filled-primary-500 btn w-fit" formaction="?/unlinkoauth">${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.unlink-oauth", { values: { providerName: data.oidcConfig.providerName } }))}</button>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		{
			function trigger($$renderer, props) {
				$$renderer.push(`<button${attributes({
					class: "preset-tonal-error inset-ring-error-500 btn w-full inset-ring sm:w-fit",
					...props
				})}>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.clear-sessions"))}</button>`);
			}
			ConfirmModal($$renderer, {
				description: store_get($$store_subs ??= {}, "$t", t)("admin.clear-sessions-confirmation"),
				onConfirm: handleClearSessions,
				title: store_get($$store_subs ??= {}, "$t", t)("general.please-confirm"),
				trigger,
				$$slots: { trigger: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function trigger($$renderer, props) {
				$$renderer.push(`<button${attributes({
					class: "preset-filled-error-400-600 btn w-full sm:w-fit",
					...props
				})}>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.delete-user"))}</button>`);
			}
			ConfirmModal($$renderer, {
				description: store_get($$store_subs ??= {}, "$t", t)("admin.delete-user-confirmation", { values: { username: data.editingUser.username } }),
				onConfirm: handleDelete,
				title: store_get($$store_subs ??= {}, "$t", t)("general.please-confirm"),
				trigger,
				$$slots: { trigger: true }
			});
		}
		$$renderer.push(`<!----></div></form>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { _page_ as default };
//# sourceMappingURL=_page@.svelte.js-BjTohy4R.js.map
