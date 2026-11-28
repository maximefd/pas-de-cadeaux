import { i as invalidateUserSessions } from '../../../chunks/auth.js-C7-cSOnT.js';
import { c as client } from '../../../chunks/prisma.js-iNNVyVix.js';
import { i as isTokenTimeValid, h as hashToken } from '../../../chunks/token.js-NERTAbbQ.js';
import { g as getResetPasswordSchema } from '../../../chunks/validations.js-uFn0YlIJ.js';
import { g as getFormatter } from '../../../chunks/i18n.js-D1Rw55oM.js';
import { h as hashPassword } from '../../../chunks/password.js-Dt-reOTD.js';
import { l as logger } from '../../../chunks/logger.js-LYoWHWpz.js';
import { C as fail, x as error, B as redirect } from '../../../chunks/utils.js-CAPFIGDr.js';
import { z } from 'zod';

// src/routes/reset-password/+page.server.ts
var load = async ({ url }) => {
	const $t = await getFormatter();
	const token = url.searchParams.get("token");
	if (token) {
		const reset = await client.passwordReset.findFirst({
			where: {
				hashedToken: hashToken(token),
				redeemed: false
			},
			select: {
				id: true,
				userId: true,
				createdAt: true
			}
		});
		if (reset && isTokenTimeValid(reset.createdAt)) return {
			userId: reset.userId,
			id: reset.id
		};
	}
	error(400, $t("errors.reset-token-not-found"));
};
var actions = { default: async ({ request, url }) => {
	const $t = await getFormatter();
	const formData = Object.fromEntries(await request.formData());
	const pwdData = (await getResetPasswordSchema()).and(z.object({
		userId: z.string(),
		id: z.uuid()
	})).safeParse({
		...formData,
		oldPassword: "reset",
		newPassword: formData.password
	});
	if (!pwdData.success) return fail(400, {
		error: true,
		errors: z.flattenError(pwdData.error).fieldErrors
	});
	const resetToken = await client.passwordReset.findUnique({
		where: { id: pwdData.data.id },
		select: {
			redeemed: true,
			userId: true,
			createdAt: true
		}
	});
	const user = await client.user.findUnique({
		where: { id: pwdData.data.userId },
		select: {
			id: true,
			username: true
		}
	});
	if (!user) {
		logger.error("Could not find user by id");
		error(404, $t("general.oops"));
	}
	if (!resetToken || resetToken.userId !== user.id || resetToken.redeemed || !isTokenTimeValid(resetToken.createdAt)) {
		logger.error("Unable to reset password using token. Token is either redeemed, expired, or does not match the userId of the request.");
		error(400, $t("setup.unable-to-update-password"));
	}
	try {
		const [_, hashedPassword] = await Promise.all([await invalidateUserSessions(user.id), await hashPassword(pwdData.data.newPassword)]);
		await client.user.update({
			data: { hashedPassword },
			where: { id: user.id }
		});
		await client.passwordReset.update({
			where: { id: pwdData.data.id },
			data: { redeemed: true }
		});
	} catch (err) {
		logger.error({ err }, "Failed to update password");
		error(422, $t("setup.unable-to-update-password"));
	}
	redirect(302, url.searchParams.get("redirectTo") ?? "/");
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-Bq0xQ9Uz.js.map
