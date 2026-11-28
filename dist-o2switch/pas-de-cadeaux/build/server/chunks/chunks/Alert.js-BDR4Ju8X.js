import { ak as attributes, aB as stringify, au as attr, ao as escape_html, V as derived } from './index-server.js-CIVHNbBm.js';

// src/lib/components/Alert.svelte
function Alert($$renderer, $$props) {
	let { title = null, type, noicon = false, children, actions, class: clazz, $$slots, $$events, ...rest } = $$props;
	const icon = derived(() => type === "info" ? "ion:information-circle" : "ion:warning");
	const variant = derived(() => type === "info" ? "preset-tonal-primary border-primary-500" : type === "warning" ? "preset-tonal-warning border-warning-500" : "preset-tonal-error border-error-500");
	const buttonVariant = derived(() => type === "info" ? "preset-filled-primary-500" : type === "warning" ? "preset-filled-warning-500" : "preset-filled-error-500");
	$$renderer.push(`<aside${attributes({
		class: `alert mb-2 border ${variant()} ${stringify(clazz)}`,
		...rest
	})}>`);
	if (!noicon) $$renderer.push(`<!--[0--><span class="alert-icon"><iconify-icon class="text-3xl md:text-4xl"${attr("icon", icon())}></iconify-icon></span>`);
	else $$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]--> <div class="alert-message flex flex-row items-center space-y-0 gap-x-4"><div>`);
	if (title) $$renderer.push(`<!--[0--><span class="font-bold md:text-lg">${escape_html(title)}</span>`);
	else $$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]--> <p class="text-sm md:text-base">`);
	children?.($$renderer);
	$$renderer.push(`<!----></p></div></div> `);
	if (actions) {
		$$renderer.push(`<!--[0--><div class="alert-actions">`);
		actions($$renderer, buttonVariant());
		$$renderer.push(`<!----></div>`);
	} else $$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]--></aside>`);
}

export { Alert as A };
//# sourceMappingURL=Alert.js-BDR4Ju8X.js.map
