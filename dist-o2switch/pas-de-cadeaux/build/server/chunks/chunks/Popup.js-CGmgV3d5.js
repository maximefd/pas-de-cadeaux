import { aq as bind_props } from './index-server.js-CIVHNbBm.js';
import { P as Popover } from './anatomy3.js-HwVFkfZZ.js';
import { P as Portal } from './anatomy2.js-Deb7OEEc.js';

// src/lib/components/Popup.svelte
function Popup($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { open = false, trigger, content, zIndex } = $$props;
		Popover($$renderer, {
			autoFocus: false,
			onOpenChange: (e) => open = e.open,
			open,
			children: ($$renderer) => {
				if (Popover.Trigger) {
					$$renderer.push("<!--[-->");
					Popover.Trigger($$renderer, { element: trigger });
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
								class: zIndex,
								children: ($$renderer) => {
									if (Popover.Content) {
										$$renderer.push("<!--[-->");
										Popover.Content($$renderer, {
											class: "transition-all transition-discrete data-[state=closed]:opacity-0 data-[state=open]:opacity-100 starting:data-[state=closed]:opacity-100 starting:data-[state=open]:opacity-0 data-[state=closed]:scale-90 data-[state=open]:scale-100 starting:data-[state=closed]:scale-100 starting:data-[state=open]:scale-90",
											element: content
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
		bind_props($$props, { open });
	});
}

export { Popup as P };
//# sourceMappingURL=Popup.js-CGmgV3d5.js.map
