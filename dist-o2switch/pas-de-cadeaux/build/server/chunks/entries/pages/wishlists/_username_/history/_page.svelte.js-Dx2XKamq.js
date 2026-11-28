import { at as head, au as attr, ao as escape_html, av as store_get, aw as ensure_array_like, ax as unsubscribe_stores } from '../../../../../chunks/index-server.js-CIVHNbBm.js';
import { f as getFormatter } from '../../../../../chunks/i18n2.js-1SlG2bAu.js';
import '../../../../../chunks/client.js-CtfT808N.js';
import '../../../../../chunks/toaster.js-DRl3MQi1.js';
import '../../../../../chunks/index-server2.js-DZFYXfYm.js';
import '../../../../../chunks/routing.js-DMTqwvGY.js';
import '../../../../../chunks/shared.js-Cb68JbUk.js';
import '../../../../../chunks/exports.js-BBf-2Qi_.js';
import '../../../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../../../chunks/utils.js-CAPFIGDr.js';
import '../../../../../chunks/warning.js-12YgogjO.js';

// src/routes/wishlists/[username]/history/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { data } = $$props;
		const t = getFormatter();
		head("1wa7yw7", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.history-of", { values: { name: data.owner.name } }))}</title>`);
			});
		});
		$$renderer.push(`<div class="flex flex-col gap-2"><a class="paper-link paper-back self-start"${attr("href", `/lists/${data.listId}`)}>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.back-to-list"))}</a> <h1 class="h1">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.history-of", { values: { name: data.owner.name } }))}</h1> `);
		if (data.years.length === 0) $$renderer.push(`<!--[0--><p class="paper-empty">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.history-empty", { values: { name: data.owner.name } }))}</p>`);
		else {
			$$renderer.push(`<!--[-1--><div data-testid="history-items"><!--[-->`);
			const each_array = ensure_array_like(data.years);
			for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
				let { year, items } = each_array[$$index_1];
				$$renderer.push(`<h2 class="paper-section">${escape_html(year)}</h2> <ul class="paper-list"><!--[-->`);
				const each_array_1 = ensure_array_like(items);
				for (let $$index = 0, $$length = each_array_1.length; $$index < $$length; $$index++) {
					let item = each_array_1[$$index];
					$$renderer.push(`<li class="card paper-row" role="none"><div class="paper-body"><div class="paper-text"><div class="paper-title">`);
					if (item.url) $$renderer.push(`<!--[0--><a${attr("href", item.url)} rel="noopener noreferrer" target="_blank">${escape_html(item.name)}</a>`);
					else $$renderer.push(`<!--[-1--><span>${escape_html(item.name)}</span>`);
					$$renderer.push(`<!--]--></div></div> <div class="paper-actions"><button class="btn btn-sm paper-quiet">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.history-put-back"))}</button></div></div></li>`);
				}
				$$renderer.push(`<!--]--></ul>`);
			}
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]--></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-Dx2XKamq.js.map
