import { at as head, aw as ensure_array_like, ao as escape_html, av as store_get, ax as unsubscribe_stores } from '../../../chunks/index-server.js-CIVHNbBm.js';
import { f as getFormatter } from '../../../chunks/i18n2.js-1SlG2bAu.js';
import { I as InstallHint } from '../../../chunks/InstallHint.js-CckVPPAL.js';
import '../../../chunks/index-server2.js-DZFYXfYm.js';

// src/routes/aide/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const t = getFormatter();
		const questions = [
			"1",
			"-visible",
			"-claim",
			"-install",
			"2",
			"3"
		];
		head("1hxo2lu", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(store_get($$store_subs ??= {}, "$t", t)("help.title"))}</title>`);
			});
		});
		$$renderer.push(`<div class="pt-2"><!--[-->`);
		const each_array = ensure_array_like(questions);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let n = each_array[$$index];
			$$renderer.push(`<details class="paper-faq"><summary>${escape_html(store_get($$store_subs ??= {}, "$t", t)(`help.q${n}`))}</summary> <p>${escape_html(store_get($$store_subs ??= {}, "$t", t)(`help.a${n}`))}</p> `);
			if (n === "-install") {
				$$renderer.push("<!--[0-->");
				InstallHint($$renderer, {});
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></details>`);
		}
		$$renderer.push(`<!--]--></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-D0OAP00X.js.map
