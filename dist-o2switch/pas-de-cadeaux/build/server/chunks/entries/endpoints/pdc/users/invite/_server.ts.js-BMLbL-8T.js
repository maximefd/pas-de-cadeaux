import { g as getFormatter } from '../../../../../chunks/i18n.js-D1Rw55oM.js';
import { R as Role } from '../../../../../chunks/schema.js-_174nGak.js';
import { r as requireLoginOrError } from '../../../../../chunks/auth.js-C7-cSOnT.js';
import { g as getConfig } from '../../../../../chunks/config.js-465rpi-p.js';
import { b as sendSignupLink } from '../../../../../chunks/email.js-CjpRgx6W.js';
import { c as client } from '../../../../../chunks/prisma.js-iNNVyVix.js';
import { g as generateToken, h as hashToken } from '../../../../../chunks/token.js-NERTAbbQ.js';
import { x as error } from '../../../../../chunks/utils.js-CAPFIGDr.js';
import { z } from 'zod';
import '../../../../../chunks/routing.js-DMTqwvGY.js';
import '../../../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../../../chunks/index-server.js-CIVHNbBm.js';
import '../../../../../chunks/shared.js-Cb68JbUk.js';
import '../../../../../chunks/i18n2.js-1SlG2bAu.js';
import '../../../../../chunks/index-server2.js-DZFYXfYm.js';
import '../../../../../chunks/shared-server.js-B6_G0tAr.js';
import '@oslojs/encoding';
import '@oslojs/crypto/sha2';
import '../../../../../chunks/logger.js-LYoWHWpz.js';
import 'pino';
import 'fs';
import 'nodemailer';
import 'handlebars';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import '@prisma/adapter-better-sqlite3';

// src/routes/pdc/users/invite/+server.ts
var POST = async ({ url, request }) => {
	const user = await requireLoginOrError();
	const $t = await getFormatter();
	const config = await getConfig();
	let schema;
	if (config.smtp.enable) schema = z.object({
		email: z.union([z.email().nullish(), z.literal("")]),
		group: z.string().optional(),
		method: z.enum(["link", "email"])
	});
	else schema = z.object({
		email: z.string().optional(),
		group: z.string().optional(),
		method: z.enum(["link"])
	});
	const data = schema.safeParse(await request.json());
	if (!data.success) error(400, z.prettifyError(data.error));
	if (data.data.group && user.roleId !== Role.ADMIN) {
		const membership = await client.userGroupMembership.findFirst({
			select: { roleId: true },
			where: {
				userId: user.id,
				groupId: data.data.group
			}
		});
		if (!membership || membership.roleId !== Role.GROUP_MANAGER) error(401, $t("errors.not-authorized"));
	}
	const token = await generateToken();
	const tokenUrl = new URL(`/signup?token=${token}`, url);
	if (data.data.method === "link" || !config.smtp.enable) {
		await client.signupToken.create({ data: {
			hashedToken: hashToken(token),
			groupId: data.data.group
		} });
		return new Response(JSON.stringify({ url: tokenUrl.href }));
	}
	if (!data.data.email) error(400, $t("errors.no-email-provided"));
	await client.signupToken.create({ data: {
		hashedToken: hashToken(token),
		groupId: data.data.group
	} });
	const msgInfo = await sendSignupLink(data.data.email, tokenUrl.href);
	if (msgInfo.success) return new Response(JSON.stringify({}));
	error(422, msgInfo.message);
};

export { POST };
//# sourceMappingURL=_server.ts.js-BMLbL-8T.js.map
