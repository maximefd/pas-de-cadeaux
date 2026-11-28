import { g as getConfig } from '../../../chunks/config.js-465rpi-p.js';
import { a as sendPasswordReset } from '../../../chunks/email.js-CjpRgx6W.js';
import { c as client } from '../../../chunks/prisma.js-iNNVyVix.js';
import { g as generateToken, h as hashToken } from '../../../chunks/token.js-NERTAbbQ.js';
import { C as fail } from '../../../chunks/utils.js-CAPFIGDr.js';
import { z } from 'zod';

// src/routes/forgot-password/+page.server.ts
var load = async () => {
	return { smtpEnabled: (await getConfig()).smtp.enable };
};
var actions = { default: async ({ request, url }) => {
	const config = await getConfig();
	const formData = Object.fromEntries(await request.formData());
	const emailData = z.object({ email: z.email() }).safeParse(formData);
	if (!emailData.success) return fail(400, {
		error: true,
		errors: z.flattenError(emailData.error).fieldErrors
	});
	const user = await client.user.findUnique({
		where: { email: emailData.data.email },
		select: {
			id: true,
			email: true
		}
	});
	if (user) {
		const token = await generateToken();
		const tokenUrl = new URL(`/reset-password?token=${token}`, url);
		await client.passwordReset.create({ data: {
			userId: user.id,
			hashedToken: hashToken(token)
		} });
		if (config.smtp.enable && user.email) await sendPasswordReset(user.email, tokenUrl.href);
	}
	return { success: true };
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-CuRV-tHS.js.map
