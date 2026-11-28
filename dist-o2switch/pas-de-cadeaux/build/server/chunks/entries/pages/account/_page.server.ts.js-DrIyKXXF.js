import { b as requireLogin, g as generateSessionToken, c as createSession, i as invalidateUserSessions, e as invalidateSession, a as setSessionTokenCookie } from '../../../chunks/auth.js-C7-cSOnT.js';
import { c as client } from '../../../chunks/prisma.js-iNNVyVix.js';
import { g as getResetPasswordSchema } from '../../../chunks/validations.js-uFn0YlIJ.js';
import { g as getFormatter } from '../../../chunks/i18n.js-D1Rw55oM.js';
import { v as verifyPasswordHash, h as hashPassword } from '../../../chunks/password.js-Dt-reOTD.js';
import { g as getOIDCConfig } from '../../../chunks/openid.js-Bz_Tsj8l.js';
import { u as unlinkOauth, a as updatePicture, b as updateProfile } from '../../../chunks/profile.js-D-1NKONn.js';
import { C as fail } from '../../../chunks/utils.js-CAPFIGDr.js';
import { z } from 'zod';

// src/routes/account/+page.server.ts
var load = async ({ locals, fetch }) => {
	const user = requireLogin();
	const oidcConfig = await getOIDCConfig(fetch);
	return {
		user,
		isProxyUser: locals.isProxyUser,
		oidcConfig
	};
};
var actions = {
	profile: async ({ request }) => {
		const user = requireLogin();
		return request.formData().then((fd) => updateProfile(user.id, fd));
	},
	profilePicture: async ({ request }) => {
		const authUser = requireLogin();
		return request.formData().then((fd) => updatePicture(authUser.id, authUser.username, fd));
	},
	passwordchange: async ({ request, cookies, locals }) => {
		const authUser = requireLogin();
		const $t = await getFormatter();
		const formData = Object.fromEntries(await request.formData());
		const pwdData = (await getResetPasswordSchema()).safeParse(formData);
		if (!pwdData.success) return fail(400, {
			error: true,
			errors: z.flattenError(pwdData.error).fieldErrors
		});
		try {
			const user = await client.user.findUniqueOrThrow({
				select: { hashedPassword: true },
				where: { id: authUser.id }
			});
			if (!await verifyPasswordHash(user.hashedPassword, pwdData.data.oldPassword)) return fail(400, {
				error: true,
				errors: { currentPassword: [$t("errors.incorrect-password")] }
			});
		} catch {
			return fail(400, {
				error: true,
				errors: { currentPassword: [$t("errors.incorrect-password")] }
			});
		}
		try {
			const newHashedPassword = await hashPassword(pwdData.data.newPassword);
			await client.user.update({
				data: { hashedPassword: newHashedPassword },
				where: { id: authUser.id }
			});
			const sessionToken = generateSessionToken();
			const session = await createSession(sessionToken, authUser.id);
			if (pwdData.data.invalidateSessions) await invalidateUserSessions(authUser.id);
			else {
				await invalidateSession(locals.session.id);
				setSessionTokenCookie(cookies, sessionToken, session.expiresAt);
			}
		} catch {
			return fail(400, {
				error: true,
				errors: { newPassword: $t("setup.unable-to-update-password") }
			});
		}
	},
	unlinkoauth: async () => {
		const user = requireLogin();
		await unlinkOauth(user.id);
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-DrIyKXXF.js.map
