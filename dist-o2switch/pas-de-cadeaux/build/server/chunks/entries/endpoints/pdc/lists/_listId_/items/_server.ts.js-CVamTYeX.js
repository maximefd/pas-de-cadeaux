import { g as getFormatter } from '../../../../../../chunks/i18n.js-D1Rw55oM.js';
import { i as itemEmitter } from '../../../../../../chunks/emitters.js-oJjSRpbk.js';
import { c as client } from '../../../../../../chunks/prisma.js-iNNVyVix.js';
import { i as listItemsUpdateSchema } from '../../../../../../chunks/validations.js-uFn0YlIJ.js';
import { I as ItemEvent } from '../../../../../../chunks/events.js-DQSXhMm7.js';
import { r as requireLoginOrError } from '../../../../../../chunks/auth.js-C7-cSOnT.js';
import { l as logger } from '../../../../../../chunks/logger.js-LYoWHWpz.js';
import { b as getById, v as verifyUserCanManageList } from '../../../../../../chunks/list.js-B0L9113F.js';
import { x as error } from '../../../../../../chunks/utils.js-CAPFIGDr.js';
import '../../../../../../chunks/routing.js-DMTqwvGY.js';
import '../../../../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../../../../chunks/index-server.js-CIVHNbBm.js';
import '../../../../../../chunks/shared.js-Cb68JbUk.js';
import '../../../../../../chunks/i18n2.js-1SlG2bAu.js';
import '../../../../../../chunks/index-server2.js-DZFYXfYm.js';
import 'node:events';
import '../../../../../../chunks/shared-server.js-B6_G0tAr.js';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import '@prisma/adapter-better-sqlite3';
import '../../../../../../chunks/zxcvbn.js-ByAwPR8u.js';
import '@zxcvbn-ts/core';
import '../../../../../../chunks/config.js-465rpi-p.js';
import 'zod';
import '../../../../../../chunks/item-mapper.js-DUyKoq81.js';
import '../../../../../../chunks/schema.js-_174nGak.js';
import '@oslojs/encoding';
import '@oslojs/crypto/sha2';
import 'pino';
import '../../../../../../chunks/sort-filter-util.js-B1LxSaRF.js';
import '../../../../../../chunks/items.js-C_2ihKyH.js';
import '../../../../../../chunks/comparators.js-DkswRRoE.js';
import '@paralleldrive/cuid2';

// src/routes/pdc/lists/[listId]/items/+server.ts
var PATCH = async ({ request, params }) => {
	const user = await requireLoginOrError();
	const $t = await getFormatter();
	const list = await getById(params.listId);
	if (!list) error(404, $t("errors.list-not-found"));
	await verifyUserCanManageList(user.id, list);
	const body = await request.json();
	const updateData = listItemsUpdateSchema.array().safeParse(body);
	if (updateData.error) error(422, $t("errors.one-or-more-items-missing-an-id"));
	try {
		await client.$transaction(updateData.data.map((d) => {
			return client.listItem.update({
				where: { listId_itemId: {
					listId: params.listId,
					itemId: d.itemId
				} },
				data: { displayOrder: d.displayOrder }
			});
		}));
		itemEmitter.emit(ItemEvent.ITEMS_UPDATE);
		return new Response(null, { status: 200 });
	} catch (err) {
		logger.error({ err }, "Error patching list items");
		error(404, $t("errors.item-not-found"));
	}
};

export { PATCH };
//# sourceMappingURL=_server.ts.js-CVamTYeX.js.map
