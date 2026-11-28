import { g as getFormatter } from '../../../../../chunks/i18n.js-D1Rw55oM.js';
import { c as client } from '../../../../../chunks/prisma.js-iNNVyVix.js';
import { i as itemEmitter } from '../../../../../chunks/emitters.js-oJjSRpbk.js';
import { g as getItemInclusions } from '../../../../../chunks/items.js-C_2ihKyH.js';
import { h as listItemClaimUpdateSchema } from '../../../../../chunks/validations.js-uFn0YlIJ.js';
import { I as ItemEvent } from '../../../../../chunks/events.js-DQSXhMm7.js';
import { r as requireLoginOrError } from '../../../../../chunks/auth.js-C7-cSOnT.js';
import { l as logger } from '../../../../../chunks/logger.js-LYoWHWpz.js';
import { x as error } from '../../../../../chunks/utils.js-CAPFIGDr.js';
import z from 'zod';
import '../../../../../chunks/routing.js-DMTqwvGY.js';
import '../../../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../../../chunks/index-server.js-CIVHNbBm.js';
import '../../../../../chunks/shared.js-Cb68JbUk.js';
import '../../../../../chunks/i18n2.js-1SlG2bAu.js';
import '../../../../../chunks/index-server2.js-DZFYXfYm.js';
import '../../../../../chunks/shared-server.js-B6_G0tAr.js';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import '@prisma/adapter-better-sqlite3';
import 'node:events';
import '../../../../../chunks/zxcvbn.js-ByAwPR8u.js';
import '@zxcvbn-ts/core';
import '../../../../../chunks/config.js-465rpi-p.js';
import '../../../../../chunks/item-mapper.js-DUyKoq81.js';
import '../../../../../chunks/schema.js-_174nGak.js';
import '@oslojs/encoding';
import '@oslojs/crypto/sha2';
import 'pino';

// src/routes/pdc/claims/[claimId]/+server.ts
var DELETE = async ({ params }) => {
	const user = await requireLoginOrError();
	return deleteClaim(await findClaim(params.claimId, user));
};
var PATCH = async ({ request, params }) => {
	const user = await requireLoginOrError();
	const $t = await getFormatter();
	const claim = await findClaim(params.claimId, user);
	const updateData = await request.json().then((d) => listItemClaimUpdateSchema.safeParse(d));
	if (updateData.error) error(422, JSON.stringify(z.flattenError(updateData.error).fieldErrors));
	try {
		if (updateData.data?.quantity === 0) return deleteClaim(claim);
		if (updateData.data.purchased !== null && updateData.data.purchased !== void 0 || updateData.data.quantity) {
			await client.itemClaim.update({
				data: {
					purchased: updateData.data.purchased !== null && updateData.data.purchased !== void 0 ? updateData.data.purchased : void 0,
					quantity: updateData.data.quantity ?? void 0
				},
				where: { id: claim.id }
			});
			const updatedItem = await client.item.findUnique({
				where: { id: claim.item.id },
				include: getItemInclusions()
			});
			if (updatedItem) itemEmitter.emit(ItemEvent.ITEM_UPDATE, updatedItem);
		}
		return new Response();
	} catch (err) {
		logger.error({ err }, "Unable to update claim");
		error(500, $t("errors.unable-to-update-claim"));
	}
};
async function findClaim(claimId, user) {
	const $t = await getFormatter();
	const claim = await client.itemClaim.findUnique({
		select: {
			id: true,
			claimedById: true,
			publicClaimedById: true,
			quantity: true,
			item: { select: {
				id: true,
				userId: true
			} }
		},
		where: { id: claimId }
	});
	if (!claim) error(404, $t("errors.claim-was-not-found"));
	if (claim.claimedById !== user.id && user.id !== claim.item.userId) error(403, $t("errors.cannot-update-a-claim-that-is-not-yours"));
	return claim;
}
async function deleteClaim(claim) {
	const $t = await getFormatter();
	try {
		await client.$transaction(async (tx) => {
			await tx.itemClaim.delete({ where: { id: claim.id } });
			if (claim.quantity > 0) {
				const participant = await tx.itemClaim.findFirst({ where: {
					itemId: claim.item.id,
					quantity: 0
				} });
				if (participant) await tx.itemClaim.update({
					where: { id: participant.id },
					data: { quantity: claim.quantity }
				});
			}
		});
		const item = await client.item.findUnique({
			where: { id: claim.item.id },
			include: getItemInclusions()
		});
		if (item) itemEmitter.emit(ItemEvent.ITEM_UPDATE, item);
		return new Response();
	} catch (err) {
		logger.error({ err }, "Unable to unclaim item");
		error(500, $t("errors.unable-to-unclaim-item"));
	}
}

export { DELETE, PATCH };
//# sourceMappingURL=_server.ts.js-BkoTFpFT.js.map
