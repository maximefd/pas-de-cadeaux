import { ay as attr_class, am as clsx, av as store_get, ax as unsubscribe_stores } from './index-server.js-CIVHNbBm.js';
import { P as Popover } from './anatomy3.js-HwVFkfZZ.js';
import { P as Portal } from './anatomy2.js-Deb7OEEc.js';
import { f as getFormatter } from './i18n2.js-1SlG2bAu.js';

// src/lib/components/Tooltip.svelte
function Tooltip($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { $$slots, $$events, ...props } = $$props;
		const t = getFormatter();
		$$renderer.push(`<div class="flex items-center gap-2">`);
		props.label($$renderer);
		$$renderer.push(`<!----> `);
		Popover($$renderer, {
			children: ($$renderer) => {
				if (Popover.Trigger) {
					$$renderer.push("<!--[-->");
					Popover.Trigger($$renderer, {
						"aria-label": store_get($$store_subs ??= {}, "$t", t)("a11y.more-info"),
						type: "button",
						children: ($$renderer) => {
							$$renderer.push(`<span class="flex content-center items-center">`);
							if (props.icon) {
								$$renderer.push("<!--[0-->");
								props.icon($$renderer);
								$$renderer.push(`<!---->`);
							} else $$renderer.push(`<!--[-1--><iconify-icon${attr_class(clsx(["text-secondary-500", props.iconClass]))} icon="ion:help-circle-outline"></iconify-icon>`);
							$$renderer.push(`<!--]--></span>`);
						},
						$$slots: { default: true }
					});
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
				$$renderer.push(` `);
				Portal($$renderer, {
					children: ($$renderer) => {
						if (Popover.Positioner) {
							$$renderer.push("<!--[-->");
							Popover.Positioner($$renderer, {
								children: ($$renderer) => {
									if (Popover.Content) {
										$$renderer.push("<!--[-->");
										Popover.Content($$renderer, {
											class: "card preset-filled-surface-500 z-20 w-80 p-4 transition-all transition-discrete data-[state=closed]:scale-90 data-[state=open]:scale-100 starting:data-[state=closed]:scale-100 starting:data-[state=open]:scale-90",
											children: ($$renderer) => {
												if (Popover.Description) {
													$$renderer.push("<!--[-->");
													Popover.Description($$renderer, {
														children: ($$renderer) => {
															props.description($$renderer);
															$$renderer.push(`<!---->`);
														},
														$$slots: { default: true }
													});
													$$renderer.push("<!--]-->");
												} else {
													$$renderer.push("<!--[!-->");
													$$renderer.push("<!--]-->");
												}
												$$renderer.push(` `);
												if (Popover.Arrow) {
													$$renderer.push("<!--[-->");
													Popover.Arrow($$renderer, {
														style: "--arrow-size: calc(var(--spacing) * 2); --arrow-background: var(--color-surface-500);",
														children: ($$renderer) => {
															if (Popover.ArrowTip) {
																$$renderer.push("<!--[-->");
																Popover.ArrowTip($$renderer, {});
																$$renderer.push("<!--]-->");
															} else {
																$$renderer.push("<!--[!-->");
																$$renderer.push("<!--]-->");
															}
														},
														$$slots: { default: true }
													});
													$$renderer.push("<!--]-->");
												} else {
													$$renderer.push("<!--[!-->");
													$$renderer.push("<!--]-->");
												}
											},
											$$slots: { default: true }
										});
										$$renderer.push("<!--]-->");
									} else {
										$$renderer.push("<!--[!-->");
										$$renderer.push("<!--]-->");
									}
								},
								$$slots: { default: true }
							});
							$$renderer.push("<!--]-->");
						} else {
							$$renderer.push("<!--[!-->");
							$$renderer.push("<!--]-->");
						}
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!---->`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { Tooltip as T };
//# sourceMappingURL=Tooltip.js-D0qklLov.js.map
