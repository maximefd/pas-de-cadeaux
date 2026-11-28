import { c as client } from '../../../../../chunks/prisma.js-iNNVyVix.js';
import { r as requireAccessToGroup } from '../../../../../chunks/auth2.js-B5r9tiLU.js';
import { g as getFormatter } from '../../../../../chunks/i18n.js-D1Rw55oM.js';
import { h as deleteLists } from '../../../../../chunks/list.js-B0L9113F.js';
import { x as error } from '../../../../../chunks/utils.js-CAPFIGDr.js';
import '../../../../../chunks/shared-server.js-B6_G0tAr.js';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import '@prisma/adapter-better-sqlite3';
import '../../../../../chunks/schema.js-_174nGak.js';
import '../../../../../chunks/auth.js-C7-cSOnT.js';
import '@oslojs/encoding';
import '@oslojs/crypto/sha2';
import '../../../../../chunks/routing.js-DMTqwvGY.js';
import '../../../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../../../chunks/index-server.js-CIVHNbBm.js';
import '../../../../../chunks/shared.js-Cb68JbUk.js';
import '../../../../../chunks/i18n2.js-1SlG2bAu.js';
import '../../../../../chunks/index-server2.js-DZFYXfYm.js';
import '../../../../../chunks/sort-filter-util.js-B1LxSaRF.js';
import '../../../../../chunks/item-mapper.js-DUyKoq81.js';
import '../../../../../chunks/items.js-C_2ihKyH.js';
import '../../../../../chunks/config.js-465rpi-p.js';
import '../../../../../chunks/comparators.js-DkswRRoE.js';
import '@paralleldrive/cuid2';

// src/routes/pdc/groups/[groupId]/+server.ts
var DELETE = async ({ params }) => {
	const $t = await getFormatter();
	const { authenticated } = await requireAccessToGroup(params.groupId);
	if (!authenticated) error(401, $t("errors.not-authorized"));
	const group = await client.group.findUnique({ where: { id: params.groupId } });
	if (!group) error(404, $t("errors.group-does-not-exist"));
	await client.userGroupMembership.deleteMany({ where: { groupId: group.id } });
	const deletedGroup = await client.group.delete({ where: { id: group.id } });
	await deleteLists(void 0, group.id);
	return new Response(JSON.stringify(deletedGroup));
};
var PATCH = async ({ params, request }) => {
	const $t = await getFormatter();
	const { authenticated } = await requireAccessToGroup(params.groupId);
	if (!authenticated) error(401, $t("errors.not-authorized"));
	const body = await request.json();
	if (!body?.name) return new Response(JSON.stringify({}), { status: 200 });
	const group = await client.group.findUnique({ where: { id: params.groupId } });
	if (!group) error(404, $t("errors.group-does-not-exist"));
	const updatedGroup = await client.group.update({
		data: { name: body.name },
		where: { id: group.id }
	});
	return new Response(JSON.stringify(updatedGroup), { status: 200 });
};

export { DELETE, PATCH };
//# sourceMappingURL=_server.ts.js-DuQSscCD.js.map
