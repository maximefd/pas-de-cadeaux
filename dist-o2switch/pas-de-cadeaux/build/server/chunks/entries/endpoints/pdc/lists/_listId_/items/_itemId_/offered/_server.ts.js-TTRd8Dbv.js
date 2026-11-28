import { c as client } from '../../../../../../../../chunks/prisma.js-iNNVyVix.js';
import { g as getFormatter } from '../../../../../../../../chunks/i18n.js-D1Rw55oM.js';
import { r as requireLoginOrError } from '../../../../../../../../chunks/auth.js-C7-cSOnT.js';
import { g as getActiveMembership } from '../../../../../../../../chunks/group-membership.js-CDZ-5kqi.js';
import { g as getItemInclusions } from '../../../../../../../../chunks/items.js-C_2ihKyH.js';
import { i as itemEmitter } from '../../../../../../../../chunks/emitters.js-oJjSRpbk.js';
import { I as ItemEvent } from '../../../../../../../../chunks/events.js-DQSXhMm7.js';
import { l as logger } from '../../../../../../../../chunks/logger.js-LYoWHWpz.js';
import { x as error } from '../../../../../../../../chunks/utils.js-CAPFIGDr.js';
import z from 'zod';
import '../../../../../../../../chunks/shared-server.js-B6_G0tAr.js';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import '@prisma/adapter-better-sqlite3';
import '../../../../../../../../chunks/routing.js-DMTqwvGY.js';
import '../../../../../../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../../../../../../chunks/index-server.js-CIVHNbBm.js';
import '../../../../../../../../chunks/shared.js-Cb68JbUk.js';
import '../../../../../../../../chunks/i18n2.js-1SlG2bAu.js';
import '../../../../../../../../chunks/index-server2.js-DZFYXfYm.js';
import '../../../../../../../../chunks/schema.js-_174nGak.js';
import '@oslojs/encoding';
import '@oslojs/crypto/sha2';
import 'node:events';
import '../../../../../../../../chunks/item-mapper.js-DUyKoq81.js';
import 'pino';

// src/routes/pdc/lists/[listId]/items/[itemId]/offered/+server.ts
var offeredSchema = z.object({ offered: z.boolean() });
var PUT = async ({ request, params }) => {
	const user = await requireLoginOrError();
	const $t = await getFormatter();
	const itemId = parseInt(params.itemId);
	if (isNaN(itemId)) error(400, $t("errors.item-id-must-be-a-number"));
	const body = offeredSchema.safeParse(await request.json().catch(() => null));
	if (!body.success) error(422, JSON.stringify(z.flattenError(body.error).fieldErrors));
	const list = await client.list.findUnique({
		select: {
			id: true,
			groupId: true,
			ownerId: true,
			allowSelfClaims: true,
			notForMe: true,
			managers: { select: { userId: true } },
			items: {
				select: { addedById: true },
				where: { itemId }
			}
		},
		where: { id: params.listId }
	});
	if (!list || list.items.length === 0) error(404, $t("errors.item-not-found"));
	const activeMembership = await getActiveMembership(user);
	if (list.groupId !== activeMembership.groupId) error(404, $t("errors.list-not-found"));
	const managerIds = list.managers.map(({ userId }) => userId);
	const isOwnerSide = list.ownerId === user.id || managerIds.includes(user.id);
	const isSelfClaimable = list.allowSelfClaims || list.notForMe;
	if (isOwnerSide && !isSelfClaimable) error(403, $t("errors.not-authorized"));
	try {
		await client.item.update({
			where: { id: itemId },
			data: {
				offered: body.data.offered,
				offeredAt: body.data.offered ? /* @__PURE__ */ new Date() : null
			}
		});
		const updatedItem = await client.item.findUnique({
			where: { id: itemId },
			include: getItemInclusions()
		});
		if (updatedItem) itemEmitter.emit(ItemEvent.ITEM_UPDATE, updatedItem);
		return new Response();
	} catch (err) {
		logger.error({ err }, "Unable to update offered state");
		error(500, $t("errors.unable-to-update-claim"));
	}
};

export { PUT };
//# sourceMappingURL=_server.ts.js-TTRd8Dbv.js.map
