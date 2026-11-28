import { g as getConfig } from './config.js-465rpi-p.js';
import { g as getFormatter } from './i18n.js-D1Rw55oM.js';
import { o as oidcLogger } from './logger.js-LYoWHWpz.js';
import { x as error } from './utils.js-CAPFIGDr.js';
import * as client from 'openid-client';
import { z } from 'zod';

// src/lib/server/openid.ts
var SCOPE = "openid profile email";
var GROUPS_SCOPE = "groups";
var CODE_CHALLENGE_METHOD = "S256";
var NONCE_COOKIE = "oidc_nonce";
var STATE_COOKIE = "oidc_state";
var CODE_VERIFIER_COOKIE = "oidc_code_verifier";
var REDIRECT_TO_COOKIE = "redirectTo";
var COOKIE_EXPIRY_SECONDS = 600;
var discoveryUrl = null;
var clientId = null;
var clientSecret = null;
var oidcConfig = null;
var callbackSchema = z.object({ url: z.url() });
async function getClientConfig(fetch, config) {
	let rediscover = false;
	if (!config) config = await getConfig(void 0, true);
	if (!config.oidc.enable) return null;
	if (config.oidc.discoveryUrl !== discoveryUrl) {
		discoveryUrl = config.oidc.discoveryUrl;
		rediscover = true;
	}
	if (config.oidc.clientId !== clientId) {
		clientId = config.oidc.clientId;
		rediscover = true;
	}
	if (config.oidc.clientSecret !== clientSecret) {
		clientSecret = config.oidc.clientSecret;
		rediscover = true;
	}
	if (oidcConfig === null || rediscover) try {
		oidcConfig = await client.discovery(new URL(discoveryUrl), clientId, clientSecret, void 0, { 
		/** @ts-expect-error Fetch API compatability*/
[client.customFetch]: fetch });
		return oidcConfig;
	} catch (e) {
		oidcLogger.warn(e, "Error during OIDC discovery");
	}
	return oidcConfig;
}
async function getOIDCConfig(fetch) {
	const config = await getConfig(void 0, true);
	return {
		ready: await getClientConfig(fetch, config) !== null,
		providerName: config.oidc.providerName,
		autoRedirect: config.oidc.autoRedirect,
		enableSync: config.oidc.enableSync
	};
}
async function authorizeRedirect(event) {
	const $t = await getFormatter();
	const appConfig = await getConfig(void 0, true);
	const config = await getClientConfig(event.fetch, appConfig);
	if (!config) return Response.json({ message: $t("auth.oidc-client-not-configured") }, { status: 400 });
	const codeVerifier = client.randomPKCECodeVerifier();
	const codeChallenge = await client.calculatePKCECodeChallenge(codeVerifier);
	const nonce = client.randomNonce();
	const state = client.randomState();
	const redirect = event.url.searchParams.get("redirectTo");
	const parameters = {
		redirect_uri: new URL("/login", event.url.origin).toString(),
		scope: appConfig.oidc.adminGroup ? `${SCOPE} ${GROUPS_SCOPE}` : SCOPE,
		code_challenge: codeChallenge,
		code_challenge_method: CODE_CHALLENGE_METHOD,
		nonce,
		state
	};
	event.cookies.set(NONCE_COOKIE, nonce, {
		path: "/",
		httpOnly: true,
		maxAge: COOKIE_EXPIRY_SECONDS,
		sameSite: "lax"
	});
	event.cookies.set(STATE_COOKIE, state, {
		path: "/",
		httpOnly: true,
		maxAge: COOKIE_EXPIRY_SECONDS,
		sameSite: "lax"
	});
	event.cookies.set(CODE_VERIFIER_COOKIE, codeVerifier, {
		path: "/",
		httpOnly: true,
		maxAge: COOKIE_EXPIRY_SECONDS,
		sameSite: "lax"
	});
	if (redirect) event.cookies.set(REDIRECT_TO_COOKIE, redirect, {
		path: "/",
		httpOnly: true,
		maxAge: COOKIE_EXPIRY_SECONDS,
		sameSite: "lax"
	});
	const redirectTo = client.buildAuthorizationUrl(config, parameters);
	return new Response(null, {
		status: 302,
		headers: { Location: redirectTo.toString() }
	});
}
async function handleCallback(event) {
	oidcLogger.debug("Initiating callback");
	const $t = await getFormatter();
	const config = await getClientConfig(event.fetch);
	if (!config) {
		oidcLogger.error("OIDC not configured");
		error(400, $t("auth.oidc-client-not-configured"));
	}
	const expectedNonce = event.cookies.get(NONCE_COOKIE) ?? null;
	const expectedState = event.cookies.get(STATE_COOKIE) ?? null;
	const codeVerifier = event.cookies.get(CODE_VERIFIER_COOKIE) ?? null;
	if (codeVerifier === null || expectedNonce === null || expectedState === null) {
		oidcLogger.error({
			expectedNonce,
			expectedState,
			codeVerifier
		}, "Couldn't retrieve stored one or more required OIDC state variables");
		error(400, $t("auth.couldnt-retrieve-stored-oidc-state"));
	}
	let tokens;
	try {
		const data = await event.request.json().then(callbackSchema.safeParse);
		if (!data.success) {
			oidcLogger.error("Request did not contain the callback url");
			error(400, $t("auth.no-callback-url-supplied"));
		}
		tokens = await client.authorizationCodeGrant(config, new URL(data.data.url), {
			pkceCodeVerifier: codeVerifier,
			expectedNonce,
			expectedState,
			idTokenExpected: true
		});
	} catch (err) {
		oidcLogger.error({ err }, "Exception while handling callback");
		let status = 400;
		let message;
		if (err instanceof client.ResponseBodyError) {
			status = err.status;
			message = err.error_description || err.message;
		} else if (err instanceof client.AuthorizationResponseError) message = err.error_description || err.message;
		else if (err instanceof client.ClientError) message = err.message;
		error(status, message || $t("general.oops"));
	}
	const claims = tokens.claims();
	if (!claims) {
		oidcLogger.error("Claims were not found");
		error(400, $t("auth.no-claims-found"));
	}
	oidcLogger.debug("Successfully authorized callback for %s", claims.sub);
	oidcLogger.debug("Fetching user info for %s", claims.sub);
	return {
		claims,
		userinfo: await client.fetchUserInfo(config, tokens.access_token, claims.sub)
	};
}

export { authorizeRedirect as a, getOIDCConfig as g, handleCallback as h };
//# sourceMappingURL=openid.js-Bz_Tsj8l.js.map
