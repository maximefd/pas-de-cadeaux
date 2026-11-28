import { R as Role } from '../../../../chunks/schema.js-_174nGak.js';
import { r as requireLoginOrError, f as requireRole } from '../../../../chunks/auth.js-C7-cSOnT.js';
import { g as getActiveMembership } from '../../../../chunks/group-membership.js-CDZ-5kqi.js';
import { g as getFormatter } from '../../../../chunks/i18n.js-D1Rw55oM.js';
import { l as logger } from '../../../../chunks/logger.js-LYoWHWpz.js';
import { c as client } from '../../../../chunks/prisma.js-iNNVyVix.js';
import { c as createUser } from '../../../../chunks/user.js-DOVQkMm-.js';
import { f as getSignupSchema } from '../../../../chunks/validations.js-uFn0YlIJ.js';
import { x as error } from '../../../../chunks/utils.js-CAPFIGDr.js';
import { treeifyError } from 'zod';
import '../../../../chunks/shared-server.js-B6_G0tAr.js';
import '@oslojs/encoding';
import '@oslojs/crypto/sha2';
import '../../../../chunks/routing.js-DMTqwvGY.js';
import '../../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../../chunks/index-server.js-CIVHNbBm.js';
import '../../../../chunks/shared.js-Cb68JbUk.js';
import '../../../../chunks/i18n2.js-1SlG2bAu.js';
import '../../../../chunks/index-server2.js-DZFYXfYm.js';
import 'pino';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import '@prisma/adapter-better-sqlite3';
import '../../../../chunks/config.js-465rpi-p.js';
import '../../../../chunks/list.js-B0L9113F.js';
import '../../../../chunks/sort-filter-util.js-B1LxSaRF.js';
import '../../../../chunks/item-mapper.js-DUyKoq81.js';
import '../../../../chunks/items.js-C_2ihKyH.js';
import '../../../../chunks/comparators.js-DkswRRoE.js';
import '@paralleldrive/cuid2';
import '../../../../chunks/password.js-Dt-reOTD.js';
import '@noble/hashes/scrypt.js';
import '@oslojs/crypto/subtle';
import '../../../../chunks/zxcvbn.js-ByAwPR8u.js';
import '@zxcvbn-ts/core';

// src/routes/pdc/users/+server.ts
var GET = async ({ url }) => {
	const loggedInUser = await requireLoginOrError();
	const activeGroup = await getActiveMembership(loggedInUser);
	const $t = await getFormatter();
	if (!url.searchParams.has("groupId") && !(loggedInUser.roleId === Role.ADMIN || activeGroup.roleId === Role.GROUP_MANAGER)) {
		logger.error({
			userId: loggedInUser.id,
			role: loggedInUser.roleId
		}, "User tried to list all users but is not an admin or group manager");
		error(403, $t("errors.not-authorized"));
	}
	if (url.searchParams.has("groupId") && loggedInUser.roleId === Role.USER) {
		if (activeGroup.groupId !== url.searchParams.get("groupId")) {
			logger.error({ userId: loggedInUser.id }, "User tried to list users in a group they are not part of");
			error(403, $t("errors.not-authorized"));
		}
	}
	const users = await client.user.findMany({
		select: {
			id: true,
			name: true,
			username: true,
			email: true
		},
		where: {
			id: { notIn: url.searchParams.get("excludedUserIds")?.split(",") || void 0 },
			OR: [{ name: { contains: url.searchParams.get("name") || void 0 } }, { username: { contains: url.searchParams.get("name") || void 0 } }],
			UserGroupMembership: url.searchParams.has("groupId") ? { some: { groupId: url.searchParams.get("groupId") || void 0 } } : {}
		}
	});
	return new Response(JSON.stringify(users));
};
var PUT = async ({ request }) => {
	await requireRole(Role.ADMIN);
	const result = await getSignupSchema().then(async (schema) => {
		const data = await request.json();
		return schema.safeParseAsync(data);
	});
	if (result.error) return error(422, JSON.stringify(treeifyError(result.error)));
	const data = await createUser(result.data, Role.USER, result.data.password);
	return new Response(JSON.stringify(data), { status: 201 });
};

export { GET, PUT };
//# sourceMappingURL=_server.ts.js-8xTw5Trd.js.map
