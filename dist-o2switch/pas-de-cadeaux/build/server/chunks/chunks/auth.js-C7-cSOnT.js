import { c as client } from './prisma.js-iNNVyVix.js';
import { b as private_env } from './shared-server.js-B6_G0tAr.js';
import { g as getFormatter } from './i18n.js-D1Rw55oM.js';
import { R as Role } from './schema.js-_174nGak.js';
import { A as getRequestEvent, x as error, B as redirect } from './utils.js-CAPFIGDr.js';
import { encodeHexLowerCase, encodeBase32LowerCaseNoPadding } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';

// src/lib/server/auth.ts
var EXPIRES_IN = 2592e6;
var REFRESH_TIME = 25056e5;
var origin = new URL(private_env.ORIGIN || "localhost:3280");
var sessionCookieName = "wishlist_session";
function generateSessionToken() {
	const bytes = /* @__PURE__ */ new Uint8Array(20);
	crypto.getRandomValues(bytes);
	return encodeBase32LowerCaseNoPadding(bytes);
}
async function createSession(token, userId) {
	const session = {
		id: encodeHexLowerCase(sha256(new TextEncoder().encode(token))),
		userId,
		expiresAt: new Date(Date.now() + EXPIRES_IN)
	};
	await client.session.create({ data: session });
	return session;
}
async function validateSessionToken(token) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const result = await client.session.findUnique({
		where: { id: sessionId },
		include: { user: { select: {
			id: true,
			username: true,
			email: true,
			name: true,
			roleId: true,
			picture: true,
			oauthId: true,
			preferredLanguage: true,
			onboardedAt: true
		} } }
	});
	if (result === null) return {
		session: null,
		user: null,
		fresh: false
	};
	const { user, ...session } = result;
	if (Date.now() >= session.expiresAt.getTime()) {
		await client.session.delete({ where: { id: sessionId } });
		return {
			session: null,
			user: null,
			fresh: false
		};
	}
	if (Date.now() >= session.expiresAt.getTime() - REFRESH_TIME) {
		session.expiresAt = new Date(Date.now() + EXPIRES_IN);
		await client.session.update({
			where: { id: session.id },
			data: { expiresAt: session.expiresAt }
		});
		return {
			session,
			user,
			fresh: true
		};
	}
	return {
		session,
		user,
		fresh: false
	};
}
async function invalidateSession(sessionId) {
	await client.session.delete({ where: { id: sessionId } });
}
async function invalidateUserSessions(userId) {
	await client.session.deleteMany({ where: { userId } });
}
function setSessionTokenCookie(cookies, token, expiresAt) {
	cookies.set(sessionCookieName, token, {
		httpOnly: true,
		sameSite: "lax",
		expires: expiresAt,
		path: "/",
		secure: origin.protocol === "https:"
	});
}
function deleteSessionTokenCookie(cookies) {
	cookies.set(sessionCookieName, "", {
		httpOnly: true,
		sameSite: "lax",
		maxAge: 0,
		path: "/",
		secure: origin.protocol === "https:"
	});
}
function requireLogin() {
	const { locals, url } = getRequestEvent();
	if (!locals.user) {
		const redirectTo = url.pathname + url.search;
		const params = new URLSearchParams({ redirectTo });
		redirect(307, `/login?${params}`);
	}
	return locals.user;
}
async function requireLoginOrError() {
	const { locals } = getRequestEvent();
	if (!locals.user) {
		const $t = await getFormatter(locals.locale);
		error(401, $t("errors.unauthenticated"));
	}
	return locals.user;
}
async function requireRole(role) {
	const user = requireLogin();
	const { locals } = getRequestEvent();
	if (user.roleId !== role) {
		const $t = await getFormatter(locals.locale);
		error(403, $t("errors.not-authorized"));
	}
	return user;
}
async function requireAdminOrManager(groupId) {
	const user = requireLogin();
	if (user.roleId === Role.ADMIN) return user;
	const userGroupMembership = await client.userGroupMembership.findFirst({
		where: {
			userId: user.id,
			groupId
		},
		select: { roleId: true }
	});
	if (userGroupMembership && userGroupMembership.roleId === Role.GROUP_MANAGER) return user;
	const { locals } = getRequestEvent();
	const $t = await getFormatter(locals.locale);
	error(403, $t("errors.not-authorized"));
}

export { setSessionTokenCookie as a, requireLogin as b, createSession as c, deleteSessionTokenCookie as d, invalidateSession as e, requireRole as f, generateSessionToken as g, requireAdminOrManager as h, invalidateUserSessions as i, requireLoginOrError as r, sessionCookieName as s, validateSessionToken as v };
//# sourceMappingURL=auth.js-C7-cSOnT.js.map
