import { p as public_env } from './shared-server.js-B6_G0tAr.js';
import { c as getNumberFormatter, d as defaultLang } from './i18n2.js-1SlG2bAu.js';

// src/lib/price-formatter.ts
var getMaximumFractionDigits = (currency, locale) => {
	return getFormatter(currency, locale).resolvedOptions().maximumFractionDigits || 2;
};
var getDefaultCurrency = () => {
	if (!public_env.PUBLIC_DEFAULT_CURRENCY) return "USD";
	try {
		new Intl.NumberFormat("en-US", { currency: public_env.PUBLIC_DEFAULT_CURRENCY });
	} catch {
		console.warn("Invalid currency: ", public_env.PUBLIC_DEFAULT_CURRENCY);
		return "USD";
	}
	return public_env.PUBLIC_DEFAULT_CURRENCY;
};
var getFormatter = (currency, locale) => {
	return getNumberFormatter({
		locale: locale ?? defaultLang.code,
		style: "currency",
		currency: currency || getDefaultCurrency(),
		currencyDisplay: "narrowSymbol"
	});
};
var formatPrice = (item, locale) => {
	if (!item.itemPrice) return item.price;
	return formatNumberAsPrice(item.itemPrice.currency, item.itemPrice.value, locale);
};
var formatNumberAsPrice = (currency, price, locale) => {
	const formatter = getFormatter(currency, locale);
	const maxFracDigits = getMaximumFractionDigits(currency, locale);
	const value = price / Math.pow(10, maxFracDigits);
	return formatter.format(value);
};
var getPriceValue = (item, locale) => {
	if (!item.itemPrice) return null;
	const maxFracDigits = getMaximumFractionDigits(item.itemPrice.currency, locale);
	return item.itemPrice.value / Math.pow(10, maxFracDigits);
};
var getMinorUnits = (value, currency, locale) => {
	const maxFracDigits = getMaximumFractionDigits(currency, locale);
	return value * Math.pow(10, maxFracDigits);
};

export { getPriceValue as a, getDefaultCurrency as b, getFormatter as c, formatPrice as f, getMinorUnits as g };
//# sourceMappingURL=price-formatter.js-Cgx1svgQ.js.map
