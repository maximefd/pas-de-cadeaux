import { d as defaultLang, g as getPrimaryLang } from './i18n2.js-1SlG2bAu.js';
import { ZxcvbnFactory } from '@zxcvbn-ts/core';

// src/lib/zxcvbn.ts
var init = async (locale) => {
	const locale_ = locale ? locale : defaultLang.code;
	const langCommon = await import('@zxcvbn-ts/language-common');
	const langEn = await import('@zxcvbn-ts/language-en');
	let langUser;
	if (locale_.toLowerCase() === "es-es") langUser = await import('@zxcvbn-ts/language-es-es');
	else if (getPrimaryLang(locale_) === "fr") langUser = await import('@zxcvbn-ts/language-fr');
	else if (getPrimaryLang(locale_) === "de") langUser = await import('@zxcvbn-ts/language-de');
	return new ZxcvbnFactory({
		dictionary: {
			...langCommon.dictionary,
			...langEn.dictionary,
			...langUser?.dictionary
		},
		graphs: langCommon.adjacencyGraphs,
		translations: {
			...langEn.translations,
			...langUser?.translations
		}
	});
};
var meterLabel = [
	"general.very-weak",
	"general.weak",
	"general.moderate",
	"general.strong",
	"general.very-strong"
];
var strengthOptions = ["general.off", ...meterLabel];

export { init as i, meterLabel as m, strengthOptions as s };
//# sourceMappingURL=zxcvbn.js-ByAwPR8u.js.map
