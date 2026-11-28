import { r as requireLoginOrError, b as requireLogin } from '../../chunks/auth.js-C7-cSOnT.js';
import { c as client } from '../../chunks/prisma.js-iNNVyVix.js';
import { l as logger } from '../../chunks/logger.js-LYoWHWpz.js';
import { g as getFormatter } from '../../chunks/i18n.js-D1Rw55oM.js';
import { C as fail, x as error, B as redirect } from '../../chunks/utils.js-CAPFIGDr.js';
import { z } from 'zod';

// src/routes/+page.server.ts
var load = (async () => {
	requireLogin();
	redirect(308, "/lists");
});
var actions = { language: async ({ request }) => {
	const user = await requireLoginOrError();
	const $t = await getFormatter();
	const schema = z.object({ language: z.string().nullable() });
	const result = await request.formData().then((data) => {
		return schema.safeParseAsync({ language: data.get("language") || null });
	});
	if (result.error) return fail(422, { message: $t("errors.language-is-required") });
	try {
		await client.user.update({
			data: { preferredLanguage: result.data.language },
			where: { id: user.id }
		});
	} catch (err) {
		logger.error({
			err,
			lang: result.data.language,
			userId: user.id
		}, "Unable to update user's language");
		error(500, $t("errors.unable-to-update-preferred-language"));
	}
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-BKL6g6I3.js.map
