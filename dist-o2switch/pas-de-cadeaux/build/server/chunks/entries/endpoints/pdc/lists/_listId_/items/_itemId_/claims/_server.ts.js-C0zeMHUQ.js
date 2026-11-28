import { g as getFormatter } from '../../../../../../../../chunks/i18n.js-D1Rw55oM.js';
import { i as itemEmitter } from '../../../../../../../../chunks/emitters.js-oJjSRpbk.js';
import { c as client } from '../../../../../../../../chunks/prisma.js-iNNVyVix.js';
import { k as listItemClaimSchema } from '../../../../../../../../chunks/validations.js-uFn0YlIJ.js';
import { g as getItemInclusions } from '../../../../../../../../chunks/items.js-C_2ihKyH.js';
import { I as ItemEvent } from '../../../../../../../../chunks/events.js-DQSXhMm7.js';
import { l as logger } from '../../../../../../../../chunks/logger.js-LYoWHWpz.js';
import { g as getActiveMembership } from '../../../../../../../../chunks/group-membership.js-CDZ-5kqi.js';
import { x as error } from '../../../../../../../../chunks/utils.js-CAPFIGDr.js';
import z from 'zod';
import '../../../../../../../../chunks/routing.js-DMTqwvGY.js';
import '../../../../../../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../../../../../../chunks/index-server.js-CIVHNbBm.js';
import '../../../../../../../../chunks/shared.js-Cb68JbUk.js';
import '../../../../../../../../chunks/i18n2.js-1SlG2bAu.js';
import '../../../../../../../../chunks/index-server2.js-DZFYXfYm.js';
import 'node:events';
import '../../../../../../../../chunks/shared-server.js-B6_G0tAr.js';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import '@prisma/adapter-better-sqlite3';
import '../../../../../../../../chunks/zxcvbn.js-ByAwPR8u.js';
import '@zxcvbn-ts/core';
import '../../../../../../../../chunks/config.js-465rpi-p.js';
import '../../../../../../../../chunks/item-mapper.js-DUyKoq81.js';
import 'pino';

// src/routes/pdc/lists/[listId]/items/[itemId]/claims/+server.ts
var PUT = async ({ locals, request, params }) => {
	const $t = await getFormatter();
	const itemId = parseInt(params.itemId);
	if (isNaN(itemId)) error(400, $t("errors.item-id-must-be-a-number"));
	const body = await request.json();
	const updateData = listItemClaimSchema.safeParse(body);
	if (updateData.error) error(422, JSON.stringify(z.flattenError(updateData.error).fieldErrors));
	if (!updateData.data.claimedById && !updateData.data.publicClaimedById) error(400, $t("errors.claimed-by-user-must-be-specified"));
	const list = await client.list.findUnique({
		select: {
			id: true,
			public: true,
			groupId: true,
			allowSelfClaims: true,
			notForMe: true,
			ownerId: true
		},
		where: { id: params.listId }
	});
	if (!list) error(404, $t("errors.list-not-found"));
	if (updateData.data.claimedById !== void 0 && updateData.data.claimedById !== null) {
		if (!locals.user) error(401, $t("errors.unauthenticated"));
		else if (locals.user.id !== updateData.data.claimedById) error(403, $t("errors.no-claim-on-behalf-of"));
	}
	if (updateData.data.publicClaimedById && !list.public) error(404, $t("errors.list-not-found"));
	const isSelfClaimable = list.allowSelfClaims || list.notForMe;
	if (updateData.data.claimedById === list.ownerId && !isSelfClaimable) error(400, $t("errors.this-list-does-not-allow-self-claimed-items"));
	const item = await client.item.findUnique({
		select: {
			id: true,
			quantity: true,
			claims: { select: {
				quantity: true,
				claimedById: true
			} }
		},
		where: {
			id: itemId,
			lists: { some: { listId: list.id } }
		}
	});
	if (!item) error(404, $t("errors.item-not-found-on-list"));
	if (locals.user) {
		if ((await getActiveMembership(locals.user)).groupId !== list.groupId) error(403, $t("errors.this-list-is-not-part-of-your-active-group"));
	}
	if (updateData.data.quantity === 0) {
		if (!updateData.data.claimedById) error(400, $t("errors.claimed-by-user-must-be-specified"));
		if (!item.claims.some(({ claimedById }) => claimedById !== updateData.data.claimedById)) error(400, $t("errors.nothing-to-join"));
	}
	if (updateData.data.claimedById && item.claims.some(({ claimedById }) => claimedById === updateData.data.claimedById)) error(409, $t("errors.already-claimed"));
	const claimedQuantity = item.claims.reduce((a, { quantity }) => a + quantity, 0);
	if (item.quantity !== null && claimedQuantity + updateData.data.quantity > item.quantity) error(422, $t("errors.could-not-claim-quantity-items", { values: {
		quantity: updateData.data.quantity,
		availableQuantity: item.quantity - claimedQuantity
	} }));
	try {
		const data = {
			item: { connect: { id: item.id } },
			list: { connect: { id: list.id } },
			quantity: updateData.data.quantity
		};
		if (updateData.data.claimedById) data.claimedBy = { connect: { id: updateData.data.claimedById } };
		else if (updateData.data.publicClaimedById) data.publicClaimedBy = { connect: { id: updateData.data.publicClaimedById } };
		await client.itemClaim.create({ data });
		const updatedItem = await client.item.findUnique({
			where: { id: item.id },
			include: getItemInclusions()
		});
		if (updatedItem) itemEmitter.emit(ItemEvent.ITEM_UPDATE, updatedItem);
		return new Response(null, { status: 200 });
	} catch (err) {
		logger.error({ err }, "Error claiming item");
		error(422, $t("general.oops"));
	}
};

export { PUT };
//# sourceMappingURL=_server.ts.js-C0zeMHUQ.js.map
