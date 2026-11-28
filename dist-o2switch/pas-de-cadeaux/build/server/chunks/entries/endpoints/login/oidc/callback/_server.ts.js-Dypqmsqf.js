import { g as generateSessionToken, c as createSession, a as setSessionTokenCookie } from '../../../../../chunks/auth.js-C7-cSOnT.js';
import { h as handleCallback } from '../../../../../chunks/openid.js-Bz_Tsj8l.js';
import { c as client } from '../../../../../chunks/prisma.js-iNNVyVix.js';
import { c as createUser } from '../../../../../chunks/user.js-DOVQkMm-.js';
import { R as Role } from '../../../../../chunks/schema.js-_174nGak.js';
import { g as getConfig } from '../../../../../chunks/config.js-465rpi-p.js';
import { g as getFormatter } from '../../../../../chunks/i18n.js-D1Rw55oM.js';
import { o as oidcLogger } from '../../../../../chunks/logger.js-LYoWHWpz.js';
import { x as error, B as redirect } from '../../../../../chunks/utils.js-CAPFIGDr.js';
import '../../../../../chunks/shared-server.js-B6_G0tAr.js';
import '@oslojs/encoding';
import '@oslojs/crypto/sha2';
import 'openid-client';
import 'zod';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import '@prisma/adapter-better-sqlite3';
import '../../../../../chunks/list.js-B0L9113F.js';
import '../../../../../chunks/sort-filter-util.js-B1LxSaRF.js';
import '../../../../../chunks/item-mapper.js-DUyKoq81.js';
import '../../../../../chunks/items.js-C_2ihKyH.js';
import '../../../../../chunks/comparators.js-DkswRRoE.js';
import '@paralleldrive/cuid2';
import '../../../../../chunks/password.js-Dt-reOTD.js';
import '@noble/hashes/scrypt.js';
import '@oslojs/crypto/subtle';
import '../../../../../chunks/routing.js-DMTqwvGY.js';
import '../../../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../../../chunks/index-server.js-CIVHNbBm.js';
import '../../../../../chunks/shared.js-Cb68JbUk.js';
import '../../../../../chunks/i18n2.js-1SlG2bAu.js';
import '../../../../../chunks/index-server2.js-DZFYXfYm.js';
import 'pino';

// src/routes/login/oidc/callback/+server.ts
var POST = async (event) => {
	const $t = await getFormatter();
	const { claims, userinfo } = await handleCallback(event);
	const config = await getConfig();
	const isAdmin = isAdminByGroup(claims, userinfo, config);
	oidcLogger.debug("Searching for existing user via oauthId: %s", userinfo.sub);
	let user = await client.user.findFirst({
		select: {
			id: true,
			name: true,
			email: true,
			username: true,
			roleId: true
		},
		where: { oauthId: userinfo.sub }
	});
	if (user) {
		oidcLogger.debug("Found existing user: %s", user.id);
		await syncUserDetails(user, userinfo, config);
		await syncUserRole(user, isAdmin, config);
		await authenticate(event, user.id);
	}
	oidcLogger.debug("No existing user found");
	if (!userinfo.email) {
		oidcLogger.error("No email found in userinfo");
		error(400, $t("auth.email-was-not-provided-by-the-identity-provider"));
	}
	if (userinfo.email_verified === false && !config.oidc.disableEmailVerification) {
		oidcLogger.error("Found email for user, but email is not verified with the IdP");
		error(400, $t("auth.email-is-not-verified-with-the-identity-provider"));
	}
	oidcLogger.debug("Looking for existing user via email: %s", userinfo.email);
	user = await client.user.findUnique({
		select: {
			id: true,
			name: true,
			email: true,
			username: true,
			roleId: true
		},
		where: { email: userinfo.email }
	});
	if (user) {
		oidcLogger.debug("Found existing user: %s", user.id);
		await client.user.update({
			data: { oauthId: userinfo.sub },
			where: { id: user.id }
		});
		oidcLogger.debug("Linked user account to OAuth via oauthId: %s", userinfo.sub);
		await syncUserDetails(user, userinfo, config);
		await syncUserRole(user, isAdmin, config);
		await authenticate(event, user.id);
	}
	oidcLogger.debug("No existing user found");
	if (!config.oidc.autoRegister) {
		oidcLogger.warn(`Could not register ${userinfo.sub}/${userinfo.email || "(no email)"}. Auto registration is disabled.`);
		error(400, $t("errors.registration-is-disabled"));
	}
	const userData = {
		name: extractClaim(config.oidc.nameClaim || "name", userinfo, userinfo.email),
		username: extractClaim(config.oidc.usernameClaim || "preferred_username", userinfo, userinfo.email),
		email: userinfo.email,
		oauthId: userinfo.sub
	};
	oidcLogger.debug(userData, "Registering a new user");
	const isOidcOnlyFirstUser = !config.oidc.adminGroup && config.security.disablePasswordLogin && await client.user.count() === 0;
	const role = isAdmin || isOidcOnlyFirstUser ? Role.ADMIN : Role.USER;
	await authenticate(event, (await createUser(userData, role, "")).id);
	return new Response(null, {
		status: 302,
		headers: { Location: "/" }
	});
};
async function authenticate(event, userId) {
	const sessionToken = generateSessionToken();
	const session = await createSession(sessionToken, userId);
	setSessionTokenCookie(event.cookies, sessionToken, session.expiresAt);
	oidcLogger.debug("Authenticated user successfully");
	const redirectTo = event.cookies.get("redirectTo") ?? "/";
	redirect(302, redirectTo);
}
function isAdminByGroup(claims, userinfo, config) {
	const adminGroup = config.oidc.adminGroup;
	if (!adminGroup) return false;
	const groupsClaim = config.oidc.groupsClaim || "groups";
	const groups = userinfo[groupsClaim] ?? claims[groupsClaim];
	if (Array.isArray(groups)) return groups.includes(adminGroup);
	if (typeof groups === "string") return groups === adminGroup;
	oidcLogger.warn(`'${groupsClaim}' claim was not found in user's claims. Available claims: ${Object.keys(userinfo)}`);
	return false;
}
async function syncUserRole(user, isAdmin, config) {
	if (!config.oidc.adminGroup) return;
	if (isAdmin === (user.roleId === Role.ADMIN)) return;
	await client.user.update({
		where: { id: user.id },
		data: { roleId: isAdmin ? Role.ADMIN : Role.USER }
	});
	oidcLogger.debug("Synced user role from IdP groups, admin: %s", isAdmin);
}
function extractClaim(claim, userinfo, fallback) {
	if (claim) {
		const value = userinfo[claim];
		if (value && typeof value === "string") return value;
	}
	oidcLogger.warn(`'${claim}' claim was not found in user's claims. Available claims: ${Object.keys(userinfo)}`);
	return fallback;
}
async function syncUserDetails(user, userinfo, config) {
	const updateData = {};
	if (userinfo.email && user.email !== userinfo.email) updateData["email"] = userinfo.email;
	const name = extractClaim(config.oidc.nameClaim || "name", userinfo);
	if (name && user.name !== name) updateData["name"] = name;
	const username = extractClaim(config.oidc.usernameClaim || "preferred_username", userinfo);
	if (username && user.username !== username) updateData["username"] = username;
	if (Object.keys(updateData).length === 0) return;
	oidcLogger.debug("Syncing user attributes from IdP");
	if ("email" in updateData || "username" in updateData) {
		const users = await client.user.findMany({
			select: {
				email: true,
				username: true
			},
			where: {
				id: { not: user.id },
				OR: [userinfo.email ? { email: userinfo.email } : {}, username ? { username } : {}]
			}
		});
		if (users.length > 0) {
			const conflictingEmail = users.find(({ email }) => email === userinfo.email) !== void 0;
			const conflictingUsername = users.find(({ email }) => email === username) !== void 0;
			const conflicts = {};
			if (conflictingEmail) {
				conflicts["email"] = userinfo.email;
				updateData["email"] = void 0;
			}
			if (conflictingUsername) {
				conflicts["username"] = username;
				updateData["username"] = void 0;
			}
			oidcLogger.warn("Unable to sync the following attributes due to conflicts: %s", conflicts);
		}
	}
	await client.user.update({
		where: { id: user.id },
		data: updateData
	});
	oidcLogger.debug("User attributes synced from IdP");
}

export { POST };
//# sourceMappingURL=_server.ts.js-Dypqmsqf.js.map
