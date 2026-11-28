import { R as Role } from '../../../../chunks/schema.js-_174nGak.js';
import { c as client } from '../../../../chunks/prisma.js-iNNVyVix.js';
import { r as requireAccessToGroup } from '../../../../chunks/auth2.js-B5r9tiLU.js';
import { t as tryDeleteImage } from '../../../../chunks/image-util.js-B62RlHuI.js';
import { g as getFormatter } from '../../../../chunks/i18n.js-D1Rw55oM.js';
import { r as requireLoginOrError } from '../../../../chunks/auth.js-C7-cSOnT.js';
import { l as logger } from '../../../../chunks/logger.js-LYoWHWpz.js';
import { x as error } from '../../../../chunks/utils.js-CAPFIGDr.js';
import '../../../../chunks/shared-server.js-B6_G0tAr.js';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import '@prisma/adapter-better-sqlite3';
import '../../../../chunks/safeurl.js-Db9s3Iek.js';
import 'dns/promises';
import 'ipaddr.js';
import 'sharp';
import 'fs/promises';
import 'stream';
import 'stream/promises';
import 'node:fs';
import '../../../../chunks/routing.js-DMTqwvGY.js';
import '../../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../../chunks/index-server.js-CIVHNbBm.js';
import '../../../../chunks/shared.js-Cb68JbUk.js';
import '../../../../chunks/i18n2.js-1SlG2bAu.js';
import '../../../../chunks/index-server2.js-DZFYXfYm.js';
import '@oslojs/encoding';
import '@oslojs/crypto/sha2';
import 'pino';

// src/routes/pdc/items/+server.ts
var DELETE = async ({ url }) => {
	const $t = await getFormatter();
	const groupId = url.searchParams.get("groupId");
	const claimed = url.searchParams.get("claimed");
	if (groupId) {
		const { authenticated } = await requireAccessToGroup(groupId);
		if (!authenticated) error(403, $t("errors.not-authorized"));
	} else if ((await requireLoginOrError()).roleId !== Role.ADMIN) error(403, $t("errors.not-authorized"));
	let items = await client.item.findMany({
		select: {
			id: true,
			imageUrl: true,
			quantity: true,
			lists: { select: { listId: true } },
			claims: { select: {
				id: true,
				quantity: true
			} }
		},
		where: { lists: { some: { list: { groupId: groupId || void 0 } } } }
	});
	const partiallyClaimedItems = [];
	if (claimed && Boolean(claimed)) {
		const fullyClaimedItems = [];
		items.forEach((item) => {
			const claimedQty = item.claims.reduce((accum, claim) => accum + claim.quantity, 0);
			if (item.quantity === null || claimedQty < item.quantity) partiallyClaimedItems.push(item);
			else fullyClaimedItems.push(item);
		});
		items = fullyClaimedItems;
	}
	const fullyClaimedListItems = await client.listItem.findMany({
		select: {
			id: true,
			itemId: true,
			listId: true
		},
		where: {
			list: { groupId: groupId || void 0 },
			itemId: { in: items.map(({ id }) => id) }
		}
	});
	try {
		await client.$transaction(async (tx) => {
			await tx.listItem.deleteMany({ where: { id: { in: fullyClaimedListItems.map(({ id }) => id) } } });
			await Promise.all(fullyClaimedListItems.map((li) => tx.itemClaim.deleteMany({ where: {
				itemId: li.itemId,
				listId: li.listId
			} })));
			const itemsWithNoLists = await tx.item.findMany({
				select: {
					id: true,
					imageUrl: true
				},
				where: {
					id: { in: items.map(({ id }) => id) },
					lists: { none: {} }
				}
			});
			await tx.item.deleteMany({ where: { id: { in: itemsWithNoLists.map(({ id }) => id) } } });
			itemsWithNoLists.forEach((item) => {
				if (item.imageUrl) tryDeleteImage(item.imageUrl);
			});
		});
		if (partiallyClaimedItems.length > 0) {
			const itemsToUpdate = [];
			let claimsToDelete = [];
			partiallyClaimedItems.forEach((item) => {
				const claimedQty = item.claims.reduce((accum, claim) => accum + claim.quantity, 0);
				if (item.quantity) itemsToUpdate.push({
					id: item.id,
					quantity: item.quantity - claimedQty
				});
				claimsToDelete = [...claimsToDelete, ...item.claims.map(({ id }) => id)];
			});
			await client.$transaction(async (tx) => {
				await tx.itemClaim.deleteMany({ where: { id: { in: claimsToDelete } } });
				await Promise.all(itemsToUpdate.map(({ id, quantity }) => tx.item.update({
					data: { quantity },
					where: { id }
				})));
			});
		}
		return new Response(null, { status: 200 });
	} catch (err) {
		logger.error({ err }, "Unable to delete items");
		error(500, $t("errors.unable-to-delete-items"));
	}
};

export { DELETE };
//# sourceMappingURL=_server.ts.js-RxvpPV71.js.map
