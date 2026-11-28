import { b as private_env } from '../../../chunks/shared-server.js-B6_G0tAr.js';
import { g as generateSessionToken, c as createSession, a as setSessionTokenCookie } from '../../../chunks/auth.js-C7-cSOnT.js';
import { d as getLoginSchema } from '../../../chunks/validations.js-uFn0YlIJ.js';
import { g as getConfig } from '../../../chunks/config.js-465rpi-p.js';
import { R as Role } from '../../../chunks/schema.js-_174nGak.js';
import { c as client } from '../../../chunks/prisma.js-iNNVyVix.js';
import { c as createUser } from '../../../chunks/user.js-DOVQkMm-.js';
import { v as verifyPasswordHash } from '../../../chunks/password.js-Dt-reOTD.js';
import { g as getOIDCConfig } from '../../../chunks/openid.js-Bz_Tsj8l.js';
import { l as logger } from '../../../chunks/logger.js-LYoWHWpz.js';
import { x as error, C as fail, B as redirect } from '../../../chunks/utils.js-CAPFIGDr.js';
import z from 'zod';

// src/routes/login/+page.server.ts
var load = async ({ locals, request, cookies, url, fetch }) => {
	const config = await getConfig();
	const redirectTo = url.searchParams.get("redirectTo");
	if (locals.user) redirect(302, redirectTo || "/");
	if (await client.user.count() === 0 && !config.security.disablePasswordLogin) redirect(302, "/setup-wizard");
	const oidcConfig = await getOIDCConfig(fetch);
	if (oidcConfig.ready && oidcConfig.autoRedirect && canRedirect(url, cookies)) redirect(302, "/login/oidc");
	if ((private_env.HEADER_AUTH_ENABLED ?? "false") == "true" && !!private_env.HEADER_USERNAME) {
		const username = request.headers.get(private_env.HEADER_USERNAME);
		if (username) {
			let user = await client.user.findUnique({
				select: { id: true },
				where: { username }
			});
			if (!user) {
				if (!private_env.HEADER_EMAIL || !private_env.HEADER_NAME) {
					logger.error("Missing required environment variables for header authentication");
					return fail(400, {
						username,
						password: "",
						incorrect: true
					});
				}
				const name = request.headers.get(private_env.HEADER_NAME);
				const email = request.headers.get(private_env.HEADER_EMAIL);
				if (!name || !email) {
					logger.error("Missing required headers for header authentication");
					return fail(400, {
						username,
						password: "",
						incorrect: true
					});
				}
				const userCount = await client.user.count();
				user = await createUser({
					username,
					email,
					name
				}, userCount > 0 ? Role.USER : Role.ADMIN, "");
				if (config.defaultGroup) await client.userGroupMembership.create({ data: {
					groupId: config.defaultGroup,
					userId: user.id,
					active: true
				} });
			}
			const sessionToken = generateSessionToken();
			const session = await createSession(sessionToken, user.id);
			setSessionTokenCookie(cookies, sessionToken, session.expiresAt);
			redirect(302, redirectTo || "/");
		}
	}
	return {
		enableLogin: !config.security.disablePasswordLogin,
		enableSignup: config.enableSignup,
		isCallback: url.searchParams.has("state"),
		error: url.searchParams.get("error"),
		oidcConfig
	};
};
var actions = { default: async ({ request, cookies }) => {
	if ((await getConfig()).security.disablePasswordLogin) error(400, "Password login is disabled");
	const formData = Object.fromEntries(await request.formData());
	const loginData = (await getLoginSchema()).safeParse(formData);
	if (!loginData.success) return fail(400, {
		error: true,
		errors: z.flattenError(loginData.error).fieldErrors
	});
	try {
		const maybeUser = await client.user.findUnique({
			select: {
				id: true,
				hashedPassword: true
			},
			where: { username: loginData.data.username }
		});
		if (!maybeUser) return fail(400, {
			username: loginData.data.username,
			password: "",
			incorrect: true
		});
		if (!await verifyPasswordHash(maybeUser.hashedPassword, loginData.data.password)) return fail(400, {
			username: loginData.data.username,
			password: "",
			incorrect: true
		});
		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, maybeUser.id);
		setSessionTokenCookie(cookies, sessionToken, session.expiresAt);
		cookies.delete("direct", { path: "/" });
	} catch {
		return fail(400, {
			username: loginData.data.username,
			password: "",
			incorrect: true
		});
	}
} };
function canRedirect(url, cookies) {
	return !url.searchParams.has("direct") && !url.searchParams.has("state") && !url.searchParams.has("error") && !cookies.get("direct");
}

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-C_Z5F2Oo.js.map
