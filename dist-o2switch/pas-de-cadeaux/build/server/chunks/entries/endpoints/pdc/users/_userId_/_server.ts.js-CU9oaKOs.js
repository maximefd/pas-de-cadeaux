import { g as getFormatter } from '../../../../../chunks/i18n.js-D1Rw55oM.js';
import { R as Role } from '../../../../../chunks/schema.js-_174nGak.js';
import { f as requireRole } from '../../../../../chunks/auth.js-C7-cSOnT.js';
import { t as tryDeleteImage } from '../../../../../chunks/image-util.js-B62RlHuI.js';
import { c as client } from '../../../../../chunks/prisma.js-iNNVyVix.js';
import { x as error } from '../../../../../chunks/utils.js-CAPFIGDr.js';
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
import '../../../../../chunks/safeurl.js-Db9s3Iek.js';
import 'dns/promises';
import 'ipaddr.js';
import 'sharp';
import 'fs/promises';
import 'stream';
import 'stream/promises';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import '@prisma/adapter-better-sqlite3';

// src/routes/pdc/users/[userId]/+server.ts
var DELETE = async ({ params }) => {
	const authUser = await requireRole(Role.ADMIN);
	const $t = await getFormatter();
	if (!params.userId) error(400, $t("errors.must-specify-an-item-to-delete"));
	const user = await client.user.findUnique({
		where: { id: params.userId },
		select: { id: true }
	});
	if (!user) error(404, $t("errors.user-not-found"));
	if (user.id === authUser.id) error(400, $t("errors.cannot-delete-yourself"));
	try {
		const deletedUser = await client.user.delete({ where: { id: user.id } });
		if (deletedUser && deletedUser.picture) await tryDeleteImage(deletedUser.picture);
		return new Response(JSON.stringify(deletedUser), { status: 200 });
	} catch {
		error(404, $t("errors.user-not-found"));
	}
};

export { DELETE };
//# sourceMappingURL=_server.ts.js-CU9oaKOs.js.map
