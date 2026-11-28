import './routing.js-DMTqwvGY.js';
import './internal2.js-CM4IiAcJ.js';
import { A as getRequestEvent } from './utils.js-CAPFIGDr.js';
import './shared.js-Cb68JbUk.js';
import { w as waitLocale, d as defaultLang, $ as $format } from './i18n2.js-1SlG2bAu.js';
import { g as get } from './index-server2.js-DZFYXfYm.js';

// src/lib/server/i18n.ts
async function getFormatter(locale) {
	if (!locale) locale = getLocale();
	await waitLocale(locale);
	return (id, options) => {
		let options_ = { locale };
		if (options) options_ = { ...options };
		return get($format)(id, options_);
	};
}
function getLocale() {
	return getRequestEvent().locals.locale || defaultLang.code;
}

export { getLocale as a, getFormatter as g };
//# sourceMappingURL=i18n.js-D1Rw55oM.js.map
