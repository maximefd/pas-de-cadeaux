import { at as head, au as attr, ao as escape_html, av as store_get, aw as ensure_array_like, aB as stringify, ax as unsubscribe_stores, V as derived } from '../../../../chunks/index-server.js-CIVHNbBm.js';
import { I as ItemCard_1 } from '../../../../chunks/ItemCard.js-Df02Pz2E.js';
import '../../../../chunks/client.js-CtfT808N.js';
import { r as resolve } from '../../../../chunks/paths.js-BuehRTbY.js';
import { f as getFormatter } from '../../../../chunks/i18n2.js-1SlG2bAu.js';
import { M as Markdown } from '../../../../chunks/Markdown.js-Dm7PA_S2.js';
import '../../../../chunks/price-formatter.js-Cgx1svgQ.js';
import '../../../../chunks/shared-server.js-B6_G0tAr.js';
import '../../../../chunks/index-server2.js-DZFYXfYm.js';
import '../../../../chunks/users.js-DwrjtQr5.js';
import '../../../../chunks/toaster.js-DRl3MQi1.js';
import '../../../../chunks/warning.js-12YgogjO.js';
import '../../../../chunks/BaseModal.js-_UDlR-j4.js';
import '../../../../chunks/create-anatomy.js-CLhpGM8y.js';
import '../../../../chunks/dist.js-BvNxsp9_.js';
import '../../../../chunks/anatomy2.js-Deb7OEEc.js';
import '../../../../chunks/ConfirmModal.js-BchEguXy.js';
import '../../../../chunks/items2.js-C4c-wPjk.js';
import '../../../../chunks/state.js-DFeh0alp.js';
import '../../../../chunks/item-util.js-B_1B95Df.js';
import '../../../../chunks/index-server3.js-6tNgzrAG.js';
import '../../../../chunks/routing.js-DMTqwvGY.js';
import '../../../../chunks/shared.js-Cb68JbUk.js';
import '../../../../chunks/exports.js-BBf-2Qi_.js';
import '../../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../../chunks/utils.js-CAPFIGDr.js';
import '../../../../chunks/internal.js-B0ORXlkz.js';

// src/routes/lists/[id]/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { data } = $$props;
		const t = getFormatter();
		let allItems = data.list.items;
		let approvals = derived(() => allItems.filter((item) => !item.approved));
		let items = derived(() => allItems.filter((item) => item.approved && !item.offered));
		let pageTitle = derived(() => data.list.owner.isMe ? data.list.name || store_get($$store_subs ??= {}, "$t", t)("wishes.my-lists") : data.list.name || data.list.owner.name);
		let newIds = new Set(data.newItemIds);
		data.list.id;
		head("3265l6", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(pageTitle())}</title>`);
			});
		});
		if (data.loggedInUser && !data.list.owner.isMe) $$renderer.push(`<!--[0--><a class="paper-back print:hidden"${attr("href", resolve("/lists"))}>‹ ${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.back"))}</a>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="paper-title-block"><h1 class="h1">${escape_html(pageTitle())}</h1> `);
		if (data.list.description) {
			$$renderer.push(`<!--[0--><div class="paper-sub">`);
			Markdown($$renderer, { source: data.list.description });
			$$renderer.push(`<!----></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> `);
		if ((data.list.owner.isMe || data.list.isManager) && approvals().length > 0) {
			$$renderer.push(`<!--[0--><div class="pb-4 print:hidden"><h2 class="paper-section">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.approvals"))}</h2> <div class="paper-list" data-testid="approvals-container"><!--[-->`);
			const each_array = ensure_array_like(approvals());
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let item = each_array[$$index];
				$$renderer.push(`<div>`);
				ItemCard_1($$renderer, {
					groupId: data.list.groupId,
					isTileView: false,
					item,
					onPublicList: !data.loggedInUser && data.list.public,
					requireClaimEmail: data.requireClaimEmail,
					showClaimForOwner: data.showClaimForOwner,
					showClaimedName: data.showClaimedName,
					showNameAcrossGroups: data.showNameAcrossGroups,
					showPublicClaimName: data.showPublicClaimName,
					user: data.loggedInUser,
					userCanManage: data.list.isManager
				});
				$$renderer.push(`<!----></div>`);
			}
			$$renderer.push(`<!--]--></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (items().length === 0) {
			$$renderer.push(`<!--[0--><div class="paper-empty" data-testid="list-empty">`);
			if (data.list.owner.isMe) $$renderer.push(`<!--[0--><h2>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.my-empty-title"))}</h2> <p>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.my-empty-text"))}</p>`);
			else $$renderer.push(`<!--[-1--><h2>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.other-empty-title", { values: { name: data.list.owner.name } }))}</h2> <p>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.other-empty-text", { values: { name: data.list.owner.name } }))}</p>`);
			$$renderer.push(`<!--]--></div>`);
		} else {
			$$renderer.push(`<!--[-1--><div class="paper-list" data-testid="items-container"><!--[-->`);
			const each_array_1 = ensure_array_like(items());
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let item = each_array_1[$$index_1];
				$$renderer.push(`<div${attr("id", `item-${stringify(item.id)}-wrapper`)}>`);
				ItemCard_1($$renderer, {
					commentCount: data.commentCounts[item.id] ?? 0,
					groupId: data.list.groupId,
					isNew: newIds.has(item.id),
					isSelfClaimable: data.list.isSelfClaimable,
					isTileView: false,
					item,
					onPublicList: !data.loggedInUser && data.list.public,
					requireClaimEmail: data.requireClaimEmail,
					showClaimForOwner: data.showClaimForOwner,
					showClaimedName: data.showClaimedName,
					showNameAcrossGroups: data.showNameAcrossGroups,
					showPublicClaimName: data.showPublicClaimName,
					user: data.loggedInUser,
					userCanManage: data.list.isManager
				});
				$$renderer.push(`<!----></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]--> `);
		if (data.loggedInUser && (data.list.owner.isMe || data.list.isManager || data.suggestionsEnabled)) $$renderer.push(`<!--[0--><button class="paper-add print:hidden"${attr("aria-label", store_get($$store_subs ??= {}, "$t", t)("a11y.add-item"))}><b aria-hidden="true">+</b> <span>${escape_html(data.list.owner.isMe ? store_get($$store_subs ??= {}, "$t", t)("wishes.add-my-wish") : store_get($$store_subs ??= {}, "$t", t)("wishes.add-idea-for", { values: { name: data.list.owner.name } }))}</span></button>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (data.loggedInUser && !data.list.owner.isMe && !data.list.isManager) {
			$$renderer.push("<!--[0-->");
			if (items().length > 0) $$renderer.push(`<!--[0--><p class="paper-hint">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.other-list-hint", { values: { name: data.list.owner.name } }))}</p>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <p class="paper-hint print:hidden"><a class="paper-link"${attr("href", `/wishlists/${data.list.owner.username}/history`)}>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.history"))} ›</a></p>`);
		} else if (data.list.owner.isMe && items().length > 0) $$renderer.push(`<!--[1--><p class="paper-hint">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.my-list-hint"))}</p>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-EspyetkS.js.map
