import { c as client } from '../../../../../chunks/prisma.js-iNNVyVix.js';
import { p as publicListCreateSchema } from '../../../../../chunks/validations.js-uFn0YlIJ.js';
import { g as getConfig } from '../../../../../chunks/config.js-465rpi-p.js';
import { g as getFormatter } from '../../../../../chunks/i18n.js-D1Rw55oM.js';
import { b as getById, v as verifyUserCanManageList } from '../../../../../chunks/list.js-B0L9113F.js';
import { r as requireLoginOrError } from '../../../../../chunks/auth.js-C7-cSOnT.js';
import { x as error } from '../../../../../chunks/utils.js-CAPFIGDr.js';
import '../../../../../chunks/shared-server.js-B6_G0tAr.js';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import '@prisma/adapter-better-sqlite3';
import '../../../../../chunks/zxcvbn.js-ByAwPR8u.js';
import '../../../../../chunks/i18n2.js-1SlG2bAu.js';
import '../../../../../chunks/index-server2.js-DZFYXfYm.js';
import '../../../../../chunks/index-server.js-CIVHNbBm.js';
import '@zxcvbn-ts/core';
import 'zod';
import '../../../../../chunks/routing.js-DMTqwvGY.js';
import '../../../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../../../chunks/shared.js-Cb68JbUk.js';
import '../../../../../chunks/sort-filter-util.js-B1LxSaRF.js';
import '../../../../../chunks/item-mapper.js-DUyKoq81.js';
import '../../../../../chunks/items.js-C_2ihKyH.js';
import '../../../../../chunks/comparators.js-DkswRRoE.js';
import '@paralleldrive/cuid2';
import '../../../../../chunks/schema.js-_174nGak.js';
import '@oslojs/encoding';
import '@oslojs/crypto/sha2';

// src/routes/pdc/lists/[listId]/+server.ts
var PATCH = async ({ request, params }) => {
	const user = await requireLoginOrError();
	const $t = await getFormatter();
	const list = await getById(params.listId);
	if (!list) error(404, $t("errors.list-not-found"));
	await verifyUserCanManageList(user.id, list);
	if ((await getConfig(list.groupId)).listMode !== "registry") error(422, $t("errors.group-is-not-in-registry-mode-cannot-get-a-public-link"));
	const data = await request.json().then(publicListCreateSchema.safeParse);
	if (!data.success) error(422, data.error.message);
	const publicList = data.data.public;
	const updateData = {};
	if (publicList !== void 0) updateData.public = publicList;
	const updatedList = await client.list.update({
		where: { id: params.listId },
		data: updateData
	});
	return new Response(JSON.stringify(updatedList), { status: 200 });
};

export { PATCH };
//# sourceMappingURL=_server.ts.js-CxFn2ybb.js.map
