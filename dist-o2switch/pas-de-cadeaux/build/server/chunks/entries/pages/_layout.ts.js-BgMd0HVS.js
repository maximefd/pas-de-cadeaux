import { i as initLang, b as initFormatter } from '../../chunks/i18n2.js-1SlG2bAu.js';

// src/routes/+layout.ts
var load = (async ({ data }) => {
	const locale = data.locale;
	await initLang(locale);
	return {
		t: await initFormatter(locale),
		...data,
		locale
	};
});

var _layout_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _layout_ts as _ };
//# sourceMappingURL=_layout.ts.js-BgMd0HVS.js.map
