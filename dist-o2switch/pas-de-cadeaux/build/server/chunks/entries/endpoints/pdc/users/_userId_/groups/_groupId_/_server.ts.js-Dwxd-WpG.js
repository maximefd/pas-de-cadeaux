import { R as Role } from '../../../../../../../chunks/schema.js-_174nGak.js';
import { g as getFormatter } from '../../../../../../../chunks/i18n.js-D1Rw55oM.js';
import { r as requireLoginOrError } from '../../../../../../../chunks/auth.js-C7-cSOnT.js';
import { s as setActiveMembership } from '../../../../../../../chunks/group-membership.js-CDZ-5kqi.js';
import { x as error } from '../../../../../../../chunks/utils.js-CAPFIGDr.js';
import '../../../../../../../chunks/routing.js-DMTqwvGY.js';
import '../../../../../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../../../../../chunks/index-server.js-CIVHNbBm.js';
import '../../../../../../../chunks/shared.js-Cb68JbUk.js';
import '../../../../../../../chunks/i18n2.js-1SlG2bAu.js';
import '../../../../../../../chunks/index-server2.js-DZFYXfYm.js';
import '../../../../../../../chunks/prisma.js-iNNVyVix.js';
import '../../../../../../../chunks/shared-server.js-B6_G0tAr.js';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import '@prisma/adapter-better-sqlite3';
import '@oslojs/encoding';
import '@oslojs/crypto/sha2';

// src/routes/pdc/users/[userId]/groups/[groupId]/+server.ts
var PATCH = async ({ params, request }) => {
	const user = await requireLoginOrError();
	const $t = await getFormatter();
	if (params.userId !== user.id && user.roleId !== Role.ADMIN) error(401, $t("errors.not-authorized"));
	if ((await request.json()).active) {
		const membership = await setActiveMembership(params.userId, params.groupId);
		return new Response(JSON.stringify({ membership }));
	}
	return new Response();
};

export { PATCH };
//# sourceMappingURL=_server.ts.js-Dwxd-WpG.js.map
