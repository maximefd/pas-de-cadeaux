import { c as client } from '../../../../chunks/prisma.js-iNNVyVix.js';
import { R as Role } from '../../../../chunks/schema.js-_174nGak.js';
import { g as getFormatter } from '../../../../chunks/i18n.js-D1Rw55oM.js';
import { f as create } from '../../../../chunks/list.js-B0L9113F.js';
import { g as getConfig } from '../../../../chunks/config.js-465rpi-p.js';
import { r as requireLoginOrError } from '../../../../chunks/auth.js-C7-cSOnT.js';
import { x as error } from '../../../../chunks/utils.js-CAPFIGDr.js';
import '../../../../chunks/shared-server.js-B6_G0tAr.js';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import '@prisma/adapter-better-sqlite3';
import '../../../../chunks/routing.js-DMTqwvGY.js';
import '../../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../../chunks/index-server.js-CIVHNbBm.js';
import '../../../../chunks/shared.js-Cb68JbUk.js';
import '../../../../chunks/i18n2.js-1SlG2bAu.js';
import '../../../../chunks/index-server2.js-DZFYXfYm.js';
import '../../../../chunks/sort-filter-util.js-B1LxSaRF.js';
import '../../../../chunks/item-mapper.js-DUyKoq81.js';
import '../../../../chunks/items.js-C_2ihKyH.js';
import '../../../../chunks/comparators.js-DkswRRoE.js';
import '@paralleldrive/cuid2';
import '@oslojs/encoding';
import '@oslojs/crypto/sha2';

// src/routes/pdc/groups/+server.ts
var PUT = async ({ request }) => {
	const user = await requireLoginOrError();
	const $t = await getFormatter();
	if (user.roleId !== Role.ADMIN) error(403, $t("errors.not-authorized"));
	const data = await request.json();
	if (!data.name) error(400, $t("errors.must-specify-group-name-in-body"));
	const group = await client.group.create({ data: { name: data.name } });
	if (!data.createOnly) {
		const config = await getConfig(group.id);
		const hasActiveMembership = await client.userGroupMembership.findFirst({ where: {
			userId: user.id,
			active: true
		} }) !== null;
		const createList = config.enableDefaultListCreation ? create(user.id, group.id) : Promise.resolve();
		await Promise.all([client.userGroupMembership.create({ data: {
			userId: user.id,
			groupId: group.id,
			roleId: Role.GROUP_MANAGER,
			active: !hasActiveMembership
		} }), createList]);
	}
	return new Response(JSON.stringify({ group }), { status: 201 });
};

export { PUT };
//# sourceMappingURL=_server.ts.js-B5tp6Ac4.js.map
