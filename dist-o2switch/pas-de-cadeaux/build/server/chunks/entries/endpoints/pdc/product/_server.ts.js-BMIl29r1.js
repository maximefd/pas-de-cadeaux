import { p as parseAcceptLanguageHeader } from '../../../../chunks/i18n2.js-1SlG2bAu.js';
import { g as getFormatter } from '../../../../chunks/i18n.js-D1Rw55oM.js';
import { r as requireLoginOrError } from '../../../../chunks/auth.js-C7-cSOnT.js';
import { l as logger } from '../../../../chunks/logger.js-LYoWHWpz.js';
import { b as private_env } from '../../../../chunks/shared-server.js-B6_G0tAr.js';
import { g as getSafeUrl } from '../../../../chunks/safeurl.js-Db9s3Iek.js';
import { x as error } from '../../../../chunks/utils.js-CAPFIGDr.js';
import { gotScraping } from 'got-scraping';
import metascraper from 'metascraper';
import metascraperTitle from 'metascraper-title';
import metascraperImage from 'metascraper-image';
import pkg from '@metascraper/helpers';
import '../../../../chunks/index-server2.js-DZFYXfYm.js';
import '../../../../chunks/index-server.js-CIVHNbBm.js';
import '../../../../chunks/routing.js-DMTqwvGY.js';
import '../../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../../chunks/shared.js-Cb68JbUk.js';
import '../../../../chunks/prisma.js-iNNVyVix.js';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import '@prisma/adapter-better-sqlite3';
import '../../../../chunks/schema.js-_174nGak.js';
import '@oslojs/encoding';
import '@oslojs/crypto/sha2';
import 'pino';
import 'dns/promises';
import 'ipaddr.js';

// src/lib/server/shopping/helpers.ts
var toPriceFormat = (price) => {
	if (!price) return;
	if (typeof price === "string") {
		price = price.replace(/[^\d\.\,]/g, "");
		price = /^(\d+\.?){1}(\.\d{2,3})*\,\d{1,2}$/.test(price) ? price.replace(/\./g, "").replace(",", ".") : price.replace(/,/g, "");
	}
	const num = parseFloat(price);
	if (Number.isNaN(num)) return;
	return +num.toFixed(2);
};
var getHostname = (url) => {
	return new URL(url).hostname.replace("www.", "");
};
// src/lib/server/shopping/index.ts
var { memoizeOne, $jsonld, toRule, title, $filter } = pkg;
var jsonLd = memoizeOne(($) => {
	return JSON.parse($("script[type=\"application/ld+json\"]").html());
});
var jsonLdGraph = memoizeOne(($) => {
	const jsonld = JSON.parse($("script[type=\"application/ld+json\"]").html());
	return jsonld && jsonld["@graph"];
});
var jsonLdGraphProduct = memoizeOne(($) => {
	const jsonld = jsonLdGraph($);
	if (jsonld) {
		const products = jsonld.filter((i) => {
			return i["@type"] === "Product";
		});
		return products.length > 0 ? products[0] : null;
	}
});
var jsonLdLastBreadcrumb = memoizeOne(($) => {
	const jsonld = jsonLdGraph($);
	if (jsonld) {
		const breadcrumbs = jsonld.filter((i) => {
			return i["@type"] === "BreadcrumbList";
		});
		const items = (breadcrumbs.length > 0 && breadcrumbs[0]).itemListElement;
		if (items && items.length > 0) return items[items.length - 1];
	}
	return null;
});
var toTitle = toRule(title, { removeSeparator: false });
/**
* A set of rules we want to declare under the `metascraper-shopping` namespace.
*
**/
var shopping_default = () => {
	const rules = {
		brand: [({ htmlDom: $ }) => {
			const jsonld = jsonLd($);
			let brand = jsonld && jsonld.brand;
			if (brand && brand.name) brand = brand.name;
			return brand;
		}],
		name: [
			({ htmlDom: $ }) => {
				const jsonld = jsonLd($);
				return jsonld && jsonld.name;
			},
			({ htmlDom: $ }) => {
				const jsonld = jsonLdLastBreadcrumb($);
				return jsonld && jsonld.name;
			},
			({ htmlDom: $ }) => {
				const jsonld = jsonLdGraphProduct($);
				return jsonld && jsonld.name;
			},
			({ htmlDom: $ }) => $("[property=\"og:title\"]").attr("content")
		],
		title: [
			toTitle(($) => $filter($, $("#productTitle"))),
			toTitle(($) => $filter($, $("#btAsinTitle"))),
			toTitle(($) => $filter($, $("h1.a-size-large"))),
			toTitle(($) => $filter($, $("#item_name")))
		],
		url: [({ url }) => url],
		image: [
			({ htmlDom: $ }) => $("div#imgTagWrapperId img").attr("src"),
			({ htmlDom: $ }) => $("[property=\"og:image:secure_url\"]").attr("content"),
			({ htmlDom: $, url }) => {
				let content = $("[property=\"og:image\"]").attr("content");
				if (content && url.includes("rh.com")) content = content.replace("$GAL4$", "$np-fullwidth-lg$");
				return content;
			},
			({ htmlDom: $ }) => {
				const jsonld = jsonLd($);
				let image = jsonld && jsonld.image;
				if (image && image["@type"] === "ImageObject") image = image.image;
				if (Array.isArray(image)) image = image[0];
				if (image) return image;
			},
			({ htmlDom: $ }) => $("meta.swiftype[name=\"image\"]").attr("content"),
			({ htmlDom: $, url }) => {
				const image = $("[property=\"og:image\"]").attr("content");
				const protocol = new URL(url).protocol;
				try {
					if (image) new URL(image);
				} catch {
					if (image) return `${protocol}${image}`;
				}
				if (image) return image;
			}
		],
		currency: [
			({ htmlDom: $ }) => {
				const jsonld = jsonLdGraphProduct($);
				return jsonld && jsonld.offers && jsonld.offers.priceCurrency;
			},
			({ htmlDom: $ }) => $("[property=\"og:price:currency\"]").attr("content"),
			({ htmlDom: $, url }) => $jsonld("offers.0.priceCurrency")($, url),
			({ htmlDom: $, url }) => $jsonld("offers.priceCurrency")($, url),
			({ htmlDom: $ }) => $("[data-asin-currency-code]").attr("data-asin-currency-code"),
			({ htmlDom: $ }) => $("[property=\"product:price:currency\"]").attr("content"),
			({ htmlDom: $ }) => $("[itemprop=priceCurrency]").attr("content")
		],
		condition: [
			({ htmlDom: $, url }) => $jsonld("itemCondition")($, url),
			({ htmlDom: $, url }) => $jsonld("offers.itemCondition")($, url),
			({ htmlDom: $, url }) => $jsonld("offers.0.itemCondition")($, url)
		],
		sku: [
			({ htmlDom: $ }) => {
				const jsonld = jsonLdGraphProduct($);
				return jsonld && jsonld.sku;
			},
			({ htmlDom: $, url }) => $jsonld("sku")($, url),
			({ htmlDom: $, url }) => $jsonld("offers.sku")($, url),
			({ htmlDom: $, url }) => $jsonld("offers.0.sku")($, url),
			({ htmlDom: $ }) => $("[itemprop=sku]").html()
		],
		mpn: [
			({ htmlDom: $, url }) => $jsonld("mpn")($, url),
			({ htmlDom: $, url }) => $jsonld("offers.mpn")($, url),
			({ htmlDom: $, url }) => $jsonld("offers.0.mpn")($, url)
		],
		availability: [
			({ htmlDom: $ }) => {
				const jsonld = jsonLdGraphProduct($);
				return jsonld && jsonld.offers && jsonld.offers.availability;
			},
			({ htmlDom: $ }) => $("[property=\"og:availability\"]").attr("content"),
			({ htmlDom: $, url }) => $jsonld("offers.availability")($, url),
			({ htmlDom: $, url }) => $jsonld("offers.0.availability")($, url),
			({ htmlDom: $ }) => $("[itemprop=availability]").attr("href")
		],
		price: [
			({ htmlDom: $ }) => {
				const jsonld = jsonLdGraphProduct($);
				return jsonld && jsonld.offers && toPriceFormat(jsonld.offers.price);
			},
			({ htmlDom: $ }) => toPriceFormat($("[property=\"og:price:amount\"]").attr("content")),
			({ htmlDom: $ }) => toPriceFormat($("[itemprop=price]").attr("content")),
			({ htmlDom: $ }) => toPriceFormat($("[property=\"product:price:amount\"]").attr("content")),
			({ htmlDom: $, url }) => toPriceFormat($jsonld("price")($, url)),
			({ htmlDom: $, url }) => toPriceFormat($jsonld("offers.price")($, url)),
			({ htmlDom: $, url }) => toPriceFormat($jsonld("offers.0.price")($, url)),
			({ htmlDom: $, url }) => toPriceFormat($jsonld("0.offers.price")($, url)),
			({ htmlDom: $, url }) => toPriceFormat($jsonld("offers.lowPrice")($, url)),
			({ htmlDom: $, url }) => toPriceFormat($jsonld("offers.0.lowPrice")($, url)),
			({ htmlDom: $, url }) => toPriceFormat($jsonld("offers.highPrice")($, url)),
			({ htmlDom: $, url }) => toPriceFormat($jsonld("offers.0.highPrice")($, url)),
			({ htmlDom: $ }) => toPriceFormat($("[data-asin-price]").attr("data-asin-price")),
			({ htmlDom: $ }) => toPriceFormat($("[itemprop=price]").html()),
			({ htmlDom: $ }) => toPriceFormat($("#attach-base-product-price").attr("value")),
			({ htmlDom: $ }) => toPriceFormat($("span.a-offscreen", "span.a-price").html()),
			({ htmlDom: $ }) => toPriceFormat($("span.price-amount").html())
		],
		asin: [({ htmlDom: $ }) => $("[data-asin]").attr("data-asin")],
		hostname: [({ url }) => getHostname(url)],
		retailer: [({ htmlDom: $ }) => $("[property=\"og:site_name\"]").attr("content")]
	};
	rules.pkgName = "metascraper-shopping";
	return rules;
};
// src/routes/pdc/product/+server.ts
var scraper = metascraper([
	shopping_default(),
	metascraperTitle(),
	metascraperImage()
]);
var determineProxy = (url) => {
	if (url.protocol === "http:") return private_env.http_proxy || private_env.HTTP_PROXY;
	else if (url.protocol === "https:") return private_env.https_proxy || private_env.HTTPS_PROXY;
};
var goShopping = async (targetUrl, locales) => {
	const resp = await gotScraping({
		url: targetUrl,
		proxyUrl: determineProxy(targetUrl),
		headerGeneratorOptions: {
			devices: ["desktop"],
			locales
		},
		hooks: { beforeRedirect: [async (options) => {
			if (options.url) {
				const safeUrl = await getSafeUrl(options.url);
				if (safeUrl === null) throw new Error("The resolved IP of the domain is reserved");
				options.url = safeUrl;
			}
		}] }
	});
	const metadata = await scraper({
		html: resp.body,
		url: resp.url
	});
	logger.debug({
		url: targetUrl.toString(),
		resolvedUrl: resp.url,
		status: resp.statusCode,
		bodyLength: resp.body?.length
	}, "Scraped product URL");
	return metadata;
};
var isCaptchaResponse = (metadata) => {
	return metadata.image && metadata.image.toLocaleLowerCase().indexOf("captcha") >= 0;
};
var hasUsableMetadata = (metadata) => {
	const { name, title, image } = metadata;
	return Boolean(name || title || image);
};
var getUrlOrError = async (url) => {
	const $t = await getFormatter();
	const safeUrl = await getSafeUrl(url);
	if (safeUrl === null) error(400, $t("errors.valid-url-not-provided"));
	return safeUrl;
};
var GET = async ({ request, url }) => {
	await requireLoginOrError();
	const $t = await getFormatter();
	const encodedUrl = url.searchParams.get("url");
	const acceptLanguage = request.headers?.get("accept-language");
	const locales = parseAcceptLanguageHeader(acceptLanguage);
	if (encodedUrl) {
		const targetUrl = await getUrlOrError(decodeURI(encodedUrl));
		let metadata = await goShopping(targetUrl, locales);
		if (isCaptchaResponse(metadata) && metadata.url) metadata = await getUrlOrError(metadata.url).then((url) => goShopping(url, locales));
		if (isCaptchaResponse(metadata)) error(424, $t("errors.product-information-not-available"));
		if (!hasUsableMetadata(metadata)) error(424, $t("errors.product-information-not-available"));
		if (metadata.url == metadata.image) metadata.url = targetUrl.toString();
		return new Response(JSON.stringify(metadata));
	} else error(400, $t("errors.must-specify-url-in-query-parameters"));
};

export { GET };
//# sourceMappingURL=_server.ts.js-BMIl29r1.js.map
