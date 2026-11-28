import { g as generateSessionToken, c as createSession, a as setSessionTokenCookie } from '../../../chunks/auth.js-C7-cSOnT.js';
import { c as client } from '../../../chunks/prisma.js-iNNVyVix.js';
import { f as getSignupSchema } from '../../../chunks/validations.js-uFn0YlIJ.js';
import { i as isTokenTimeValid, h as hashToken } from '../../../chunks/token.js-NERTAbbQ.js';
import { g as getConfig } from '../../../chunks/config.js-465rpi-p.js';
import { c as createUser } from '../../../chunks/user.js-DOVQkMm-.js';
import { R as Role } from '../../../chunks/schema.js-_174nGak.js';
import { g as getFormatter } from '../../../chunks/i18n.js-D1Rw55oM.js';
import { l as logger } from '../../../chunks/logger.js-LYoWHWpz.js';
import { C as fail, x as error, B as redirect } from '../../../chunks/utils.js-CAPFIGDr.js';
import z from 'zod';

// src/routes/signup/+page.server.ts
var load = async ({ locals, url }) => {
	if (locals.user) redirect(302, url.searchParams.get("redirectTo") ?? "/");
	const $t = await getFormatter();
	const config = await getConfig();
	const token = url.searchParams.get("token");
	if (token) {
		const signup = await client.signupToken.findFirst({
			where: {
				hashedToken: hashToken(token),
				redeemed: false
			},
			select: {
				id: true,
				createdAt: true
			}
		});
		if (!signup) error(400, $t("errors.invite-code-invalid"));
		if (isTokenTimeValid(signup.createdAt)) return {
			valid: true,
			id: signup.id
		};
		error(400, $t("errors.invite-code-expired"));
	}
	if (!config.enableSignup) error(401, $t("errors.this-instance-is-invite-only"));
};
var actions = { default: async ({ request, cookies }) => {
	const formData = Object.fromEntries(await request.formData());
	if (typeof formData.email !== "string" || formData.email.trim() === "") formData.email = `${String(formData.username ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "membre"}-${Date.now().toString(36)}@sans-email.invalid`;
	const signupData = (await getSignupSchema()).safeParse(formData);
	const $t = await getFormatter();
	if (!signupData.success) return fail(400, {
		error: true,
		errors: z.flattenError(signupData.error).fieldErrors
	});
	if (!(await getConfig()).enableSignup) {
		if (!signupData.data.tokenId) error(401, $t("errors.this-instance-is-invite-only"));
		const signup = await client.signupToken.findUnique({
			where: { id: signupData.data.tokenId },
			select: {
				createdAt: true,
				redeemed: true
			}
		});
		if (!signup || signup.redeemed || !isTokenTimeValid(signup.createdAt)) error(400, $t("errors.invite-code-invalid"));
	}
	const userCount = await client.user.count();
	try {
		const user = await createUser({
			username: signupData.data.username,
			email: signupData.data.email,
			name: signupData.data.name
		}, userCount > 0 ? Role.USER : Role.ADMIN, signupData.data.password, signupData.data.tokenId);
		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, user.id);
		setSessionTokenCookie(cookies, sessionToken, session.expiresAt);
		return { success: true };
	} catch (err) {
		logger.error({ err }, "User with username or email already exists");
		return fail(400, {
			error: true,
			message: $t("errors.user-already-exists")
		});
	}
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-DjDD4yj0.js.map
