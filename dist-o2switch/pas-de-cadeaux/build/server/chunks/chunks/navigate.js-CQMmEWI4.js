import { a0 as isFirefox, a1 as queueBeforeEvent, d as getWindow } from './create-anatomy.js-CLhpGM8y.js';

// node_modules/.pnpm/@zag-js+dom-query@1.39.1/node_modules/@zag-js/dom-query/dist/navigate.mjs
function clickIfLink(el) {
	const click = () => {
		const win = getWindow(el);
		el.dispatchEvent(new win.MouseEvent("click"));
	};
	if (isFirefox()) queueBeforeEvent(el, "keyup", click);
	else queueMicrotask(click);
}

export { clickIfLink as c };
//# sourceMappingURL=navigate.js-CQMmEWI4.js.map
