import { g as getFormatter } from '../../../../../../../chunks/i18n.js-D1Rw55oM.js';
import { i as itemEmitter } from '../../../../../../../chunks/emitters.js-oJjSRpbk.js';
import { c as client } from '../../../../../../../chunks/prisma.js-iNNVyVix.js';
import { j as listItemUpdateSchema } from '../../../../../../../chunks/validations.js-uFn0YlIJ.js';
import { g as getItemInclusions } from '../../../../../../../chunks/items.js-C_2ihKyH.js';
import { I as ItemEvent } from '../../../../../../../chunks/events.js-DQSXhMm7.js';
import { t as tryDeleteImage } from '../../../../../../../chunks/image-util.js-B62RlHuI.js';
import { r as requireLoginOrError } from '../../../../../../../chunks/auth.js-C7-cSOnT.js';
import { l as logger } from '../../../../../../../chunks/logger.js-LYoWHWpz.js';
import { x as error } from '../../../../../../../chunks/utils.js-CAPFIGDr.js';
import z from 'zod';
import '../../../../../../../chunks/routing.js-DMTqwvGY.js';
import '../../../../../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../../../../../chunks/index-server.js-CIVHNbBm.js';
import '../../../../../../../chunks/shared.js-Cb68JbUk.js';
import '../../../../../../../chunks/i18n2.js-1SlG2bAu.js';
import '../../../../../../../chunks/index-server2.js-DZFYXfYm.js';
import 'node:events';
import '../../../../../../../chunks/shared-server.js-B6_G0tAr.js';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import '@prisma/adapter-better-sqlite3';
import '../../../../../../../chunks/zxcvbn.js-ByAwPR8u.js';
import '@zxcvbn-ts/core';
import '../../../../../../../chunks/config.js-465rpi-p.js';
import '../../../../../../../chunks/item-mapper.js-DUyKoq81.js';
import '../../../../../../../chunks/safeurl.js-Db9s3Iek.js';
import 'dns/promises';
import 'ipaddr.js';
import 'sharp';
import 'fs/promises';
import 'stream';
import 'stream/promises';
import 'node:fs';
import '../../../../../../../chunks/schema.js-_174nGak.js';
import '@oslojs/encoding';
import '@oslojs/crypto/sha2';
import 'pino';

// src/routes/pdc/lists/[listId]/items/[itemId]/+server.ts
var PATCH = async ({ request, params }) => {
	const user = await requireLoginOrError();
	const $t = await getFormatter();
	const list = await client.list.findUnique({
		select: {
			ownerId: true,
			managers: { select: { userId: true } }
		},
		where: { id: params.listId }
	});
	if (!list) error(404, $t("errors.list-not-found"));
	else if (list.ownerId !== user.id && !list.managers.find(({ userId }) => userId === user.id)) error(401, $t("errors.not-authorized"));
	if (isNaN(parseInt(params.itemId))) error(400, $t("errors.item-id-must-be-a-number"));
	const body = await request.json();
	const updateData = listItemUpdateSchema.safeParse(body);
	if (updateData.error) error(422, JSON.stringify(z.flattenError(updateData.error).fieldErrors));
	try {
		if (updateData.data.approved !== null && updateData.data.approved !== void 0) {
			await client.listItem.update({
				where: { listId_itemId: {
					listId: params.listId,
					itemId: parseInt(params.itemId)
				} },
				data: { approved: updateData.data.approved }
			});
			const item = await client.item.findUnique({
				where: { id: parseInt(params.itemId) },
				include: getItemInclusions(params.listId)
			});
			if (item) itemEmitter.emit(ItemEvent.ITEM_UPDATE, item);
		}
		return new Response(null, { status: 200 });
	} catch (err) {
		logger.error({ err }, "Error patching list item");
		error(404, $t("errors.item-not-found"));
	}
};
var DELETE = async ({ params }) => {
	const user = await requireLoginOrError();
	const $t = await getFormatter();
	if (isNaN(parseInt(params.itemId))) error(400, $t("errors.item-id-must-be-a-number"));
	const [list, item, listItem, claims] = await Promise.all([
		client.list.findUnique({
			select: {
				ownerId: true,
				managers: { select: { userId: true } }
			},
			where: { id: params.listId }
		}),
		client.item.findUnique({
			select: {
				id: true,
				userId: true,
				createdById: true,
				imageUrl: true,
				lists: { select: { id: true } }
			},
			where: { id: parseInt(params.itemId) }
		}),
		client.listItem.findUnique({
			select: {
				id: true,
				addedById: true
			},
			where: { listId_itemId: {
				listId: params.listId,
				itemId: parseInt(params.itemId)
			} }
		}),
		client.itemClaim.findMany({
			select: { id: true },
			where: {
				listId: params.listId,
				itemId: parseInt(params.itemId)
			}
		})
	]);
	if (!listItem) error(404, $t("errors.item-not-found-on-list"));
	if (!list) error(404, $t("errors.list-not-found"));
	if (!item) error(404, $t("errors.item-not-found"));
	if (listItem.addedById !== user.id && list.ownerId !== user.id && !list.managers.find(({ userId }) => userId === user.id)) error(401, $t("errors.not-authorized"));
	try {
		await client.$transaction(async (tx) => {
			await tx.listItem.delete({ where: { id: listItem.id } });
			if (claims.length > 0) await tx.itemClaim.deleteMany({ where: { id: { in: claims.map(({ id }) => id) } } });
			if (item.lists.length === 1 && (item.createdById === user.id || item.userId === user.id)) {
				await tx.item.delete({ where: { id: item.id } });
				if (item.imageUrl) tryDeleteImage(item.imageUrl);
			}
		});
		itemEmitter.emit(ItemEvent.ITEM_DELETE, {
			id: parseInt(params.itemId),
			lists: [{ id: params.listId }]
		});
		return new Response(null, { status: 200 });
	} catch (err) {
		logger.error({ err }, "Error deleting list item");
		error(404, $t("errors.item-not-found"));
	}
};

export { DELETE, PATCH };
//# sourceMappingURL=_server.ts.js-DQ8Vsu4m.js.map
