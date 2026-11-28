import { ao as escape_html, av as store_get, aw as ensure_array_like, au as attr, ax as unsubscribe_stores, V as derived } from '../../../../chunks/index-server.js-CIVHNbBm.js';
import '../../../../chunks/client.js-CtfT808N.js';
import { f as getFormatter } from '../../../../chunks/i18n2.js-1SlG2bAu.js';
import '../../../../chunks/routing.js-DMTqwvGY.js';
import '../../../../chunks/shared.js-Cb68JbUk.js';
import '../../../../chunks/exports.js-BBf-2Qi_.js';
import '../../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../../chunks/utils.js-CAPFIGDr.js';
import '../../../../chunks/index-server2.js-DZFYXfYm.js';

// src/routes/items/import/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { $$slots, $$events, ...props } = $$props;
		const t = getFormatter();
		let data = derived(() => props.data);
		let form = derived(() => props.form);
		let currentGroup = props.data.groups?.find((group) => group.active);
		let selectedGroupId = currentGroup?.id;
		let lists = derived(() => data().lists.filter((list) => list.groupId === selectedGroupId));
		$$renderer.push(`<div class="flex w-full flex-col items-center"><form class="card flex w-2/3 flex-col gap-4 p-4" method="POST">`);
		if (!data().url) $$renderer.push(`<!--[0--><div class="flex flex-col gap-2"><h2 class="h2">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.import-error-title"))}</h2> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.import-error-text"))}</span></div>`);
		else {
			$$renderer.push(`<!--[-1--><div><h2 class="h2">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.import-item"))}</h2> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.import-item-text"))}</span></div> <div class="flex flex-col gap-2"><label class="label w-full"><span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("admin.select-a-group-option"))}</span> `);
			$$renderer.select({
				name: "group",
				class: "select",
				onchange: (e) => selectedGroupId = e.currentTarget.value,
				required: true,
				value: currentGroup?.id
			}, ($$renderer) => {
				$$renderer.push(`<!--[-->`);
				const each_array = ensure_array_like(data().groups);
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let group = each_array[$$index];
					$$renderer.option({ value: group.id }, ($$renderer) => {
						$$renderer.push(`${escape_html(group.name)}`);
					});
				}
				$$renderer.push(`<!--]-->`);
			});
			$$renderer.push(` `);
			if (form()?.group) $$renderer.push(`<!--[0--><span class="text-invalid">${escape_html(form().group)}</span>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></label> <label class="label w-full"><span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.select-a-list"))}</span> <select name="list" class="select"${attr("disabled", selectedGroupId === void 0 || lists().length === 0, true)} required="">`);
			if (lists().length === 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.option({ value: void 0 }, ($$renderer) => {
					$$renderer.push(`${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.no-lists-available"))}`);
				});
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--><!--[-->`);
			const each_array_1 = ensure_array_like(lists());
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let list = each_array_1[$$index_1];
				const listName = list.name || store_get($$store_subs ??= {}, "$t", t)("wishes.wishes-for", { values: { listOwner: list.owner.name } });
				$$renderer.push(`<!---->; } `);
				$$renderer.option({ value: list.id }, ($$renderer) => {
					$$renderer.push(`${escape_html(listName)}`);
				});
			}
			$$renderer.push(`<!--]--><!></select> `);
			if (form()?.list) $$renderer.push(`<!--[0--><span class="text-invalid">${escape_html(form().list)}</span>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></label> <input name="url" class="hidden"${attr("value", data().url)}/></div> <div class="flex flex-row-reverse"><button class="preset-filled-primary-500 btn">${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.import"))}</button></div>`);
		}
		$$renderer.push(`<!--]--></form></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-ClPCa_Uy.js.map
