import { c as client } from '../../../../../chunks/prisma.js-iNNVyVix.js';
import { g as getConfig } from '../../../../../chunks/config.js-465rpi-p.js';
import { g as getFormatter } from '../../../../../chunks/i18n.js-D1Rw55oM.js';
import { m as createPublicUserSchema } from '../../../../../chunks/validations.js-uFn0YlIJ.js';
import { x as error } from '../../../../../chunks/utils.js-CAPFIGDr.js';
import { prettifyError } from 'zod';
import '../../../../../chunks/shared-server.js-B6_G0tAr.js';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import '@prisma/adapter-better-sqlite3';
import '../../../../../chunks/routing.js-DMTqwvGY.js';
import '../../../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../../../chunks/index-server.js-CIVHNbBm.js';
import '../../../../../chunks/shared.js-Cb68JbUk.js';
import '../../../../../chunks/i18n2.js-1SlG2bAu.js';
import '../../../../../chunks/index-server2.js-DZFYXfYm.js';
import '../../../../../chunks/zxcvbn.js-ByAwPR8u.js';
import '@zxcvbn-ts/core';

// src/routes/pdc/users/public/+server.ts
var POST = async ({ request }) => {
	const dataRaw = await request.json();
	const result = createPublicUserSchema.safeParse(dataRaw);
	if (!result.success) {
		const errorMessages = prettifyError(result.error);
		error(422, errorMessages);
	}
	const data = result.data;
	if ((await getConfig(data.groupId)).claims.requireEmail && !data.username) {
		const $t = await getFormatter();
		error(422, $t("errors.email-is-required-for-public-claims"));
	}
	if (data.username) {
		const user = await client.systemUser.findFirst({
			where: {
				username: data.username,
				name: data.name || "ANONYMOUS_NAME"
			},
			select: { id: true }
		});
		if (user) return new Response(JSON.stringify(user));
	}
	const user = await client.systemUser.create({
		select: { id: true },
		data: {
			username: data.username,
			name: data.name
		}
	});
	return new Response(JSON.stringify(user));
};

export { POST };
//# sourceMappingURL=_server.ts.js-CDgkgHh3.js.map
