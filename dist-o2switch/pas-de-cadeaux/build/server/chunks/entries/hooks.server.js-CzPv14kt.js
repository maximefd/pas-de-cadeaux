import { b as private_env } from '../chunks/shared-server.js-B6_G0tAr.js';
import { a as getClosestAvailableLocale, d as defaultLang } from '../chunks/i18n2.js-1SlG2bAu.js';
import { s as sessionCookieName, v as validateSessionToken, d as deleteSessionTokenCookie, a as setSessionTokenCookie } from '../chunks/auth.js-C7-cSOnT.js';
import { l as logger } from '../chunks/logger.js-LYoWHWpz.js';
import { l as loadLocale } from '../chunks/validations.js-uFn0YlIJ.js';
import '../chunks/index-server2.js-DZFYXfYm.js';
import '../chunks/index-server.js-CIVHNbBm.js';
import '../chunks/prisma.js-iNNVyVix.js';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import '@prisma/adapter-better-sqlite3';
import '../chunks/i18n.js-D1Rw55oM.js';
import '../chunks/routing.js-DMTqwvGY.js';
import '../chunks/internal2.js-CM4IiAcJ.js';
import '../chunks/utils.js-CAPFIGDr.js';
import '../chunks/shared.js-Cb68JbUk.js';
import '../chunks/schema.js-_174nGak.js';
import '@oslojs/encoding';
import '@oslojs/crypto/sha2';
import 'pino';
import '../chunks/zxcvbn.js-ByAwPR8u.js';
import '@zxcvbn-ts/core';
import '../chunks/config.js-465rpi-p.js';
import 'zod';

// src/hooks.server.ts
var handle = async ({ event, resolve }) => {
	const lang = private_env.PDC_LOCALE ? getClosestAvailableLocale([private_env.PDC_LOCALE]) : defaultLang;
	const sessionToken = event.cookies.get(sessionCookieName);
	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;
		event.locals.isProxyUser = false;
		event.locals.locale = lang.code;
		return resolve(event, { transformPageChunk({ html }) {
			return transformForLang(html, lang);
		} });
	}
	const { session, user, fresh } = await validateSessionToken(sessionToken);
	await loadLocale(lang.code);
	if (session === null) deleteSessionTokenCookie(event.cookies);
	else if (fresh) setSessionTokenCookie(event.cookies, sessionToken, session.expiresAt);
	const isProxyUser = (private_env.HEADER_AUTH_ENABLED ?? "false") == "true" && !!private_env.HEADER_USERNAME && !!event.request.headers.get(private_env.HEADER_USERNAME);
	event.locals.isProxyUser = isProxyUser;
	event.locals.user = user;
	event.locals.session = session;
	event.locals.locale = lang.code;
	if (isPrivateRoute(event.route.id)) event.setHeaders({ "Cache-Control": "private" });
	return resolve(event, { transformPageChunk({ html }) {
		return transformForLang(html, lang);
	} });
};
var handleError = async ({ error: err, event, status, message }) => {
	logger.error({
		status,
		method: event.request.method,
		uri: event.url.pathname + event.url.search + event.url.hash,
		err
	}, message);
};
var nonPrivateRoutes = [
	"/login",
	"/signup",
	"/setup-wizard",
	"/setup-wizard/step",
	"/setup-wizard/step/[step]",
	"/reset-password",
	"/group-error",
	"/pdc/assets/[id]"
];
function transformForLang(html, lang) {
	return html.replace("%lang%", lang.code).replace("%dir%", lang.rtl ? "rtl" : "ltr");
}
function isPrivateRoute(routeId) {
	return routeId && !nonPrivateRoutes.includes(routeId);
}

export { handle, handleError };
//# sourceMappingURL=hooks.server.js-CzPv14kt.js.map
