import { g as getFormatter } from '../../../../../chunks/i18n.js-D1Rw55oM.js';
import { i as itemEmitter } from '../../../../../chunks/emitters.js-oJjSRpbk.js';
import { I as ItemEvent } from '../../../../../chunks/events.js-DQSXhMm7.js';
import { t as tryDeleteImage } from '../../../../../chunks/image-util.js-B62RlHuI.js';
import { c as client } from '../../../../../chunks/prisma.js-iNNVyVix.js';
import { r as requireLoginOrError } from '../../../../../chunks/auth.js-C7-cSOnT.js';
import { g as getConfig } from '../../../../../chunks/config.js-465rpi-p.js';
import { x as error } from '../../../../../chunks/utils.js-CAPFIGDr.js';
import '../../../../../chunks/routing.js-DMTqwvGY.js';
import '../../../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../../../chunks/index-server.js-CIVHNbBm.js';
import '../../../../../chunks/shared.js-Cb68JbUk.js';
import '../../../../../chunks/i18n2.js-1SlG2bAu.js';
import '../../../../../chunks/index-server2.js-DZFYXfYm.js';
import 'node:events';
import '../../../../../chunks/item-mapper.js-DUyKoq81.js';
import '../../../../../chunks/logger.js-LYoWHWpz.js';
import '../../../../../chunks/shared-server.js-B6_G0tAr.js';
import 'pino';
import '../../../../../chunks/safeurl.js-Db9s3Iek.js';
import 'dns/promises';
import 'ipaddr.js';
import 'sharp';
import 'fs/promises';
import 'stream';
import 'stream/promises';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import '@prisma/adapter-better-sqlite3';
import '../../../../../chunks/schema.js-_174nGak.js';
import '@oslojs/encoding';
import '@oslojs/crypto/sha2';

// src/routes/pdc/items/[itemId]/+server.ts
var validateItem = async (itemId) => {
	const $t = await getFormatter();
	if (!itemId) error(400, $t("errors.must-specify-an-item-to-delete"));
	else if (isNaN(parseInt(itemId))) error(400, $t("errors.item-id-must-be-a-number"));
	const item = await client.item.findUnique({
		where: { id: parseInt(itemId) },
		select: {
			id: true,
			createdById: true,
			userId: true,
			lists: { select: { list: { select: {
				groupId: true,
				managers: { select: { userId: true } }
			} } } }
		}
	});
	if (!item) error(404, $t("errors.item-not-found"));
	const { lists, ...rest } = item;
	return {
		...rest,
		lists: lists.map((li) => ({
			groupId: li.list.groupId,
			managers: li.list.managers.map(({ userId }) => userId)
		}))
	};
};
var isItemOnManagedList = (item, user) => {
	if (item.lists.length > 1 || item.lists.length === 0) return false;
	return item.lists[0].managers.find((userId) => user.id === userId) !== void 0;
};
/**
* Who may delete an item:
* - its creator, or a manager of the (single) list it is on;
* - the owner, unless the item is hidden from them ("surprise" mode and added by someone else);
* - any other member of the list's group, if the admin enabled "anyoneCanDeleteItems".
*/
var canDeleteItem = async (item, user) => {
	if (user.id === item.createdById || isItemOnManagedList(item, user)) return true;
	const lists = item.lists;
	const configs = await Promise.all(lists.map((list) => getConfig(list.groupId)));
	if (user.id === item.userId) return !configs.some((config) => config.suggestions.method === "surprise");
	if (!configs.some((config) => config.anyoneCanDeleteItems)) return false;
	return await client.userGroupMembership.findFirst({
		where: {
			userId: user.id,
			groupId: { in: lists.map((list) => list.groupId) }
		},
		select: { id: true }
	}) !== null;
};
var DELETE = async ({ params }) => {
	const user = await requireLoginOrError();
	const $t = await getFormatter();
	const item = await validateItem(params?.itemId);
	if (!await canDeleteItem(item, user)) error(403, $t("errors.not-authorized"));
	try {
		const { lists, ...rest } = await client.item.delete({
			where: { id: item.id },
			select: {
				id: true,
				userId: true,
				lists: { select: { list: { select: { id: true } } } },
				imageUrl: true
			}
		});
		const itemToReturn = {
			...rest,
			lists: lists.map((li) => ({ ...li.list }))
		};
		itemEmitter.emit(ItemEvent.ITEM_DELETE, itemToReturn);
		if (itemToReturn.imageUrl) await tryDeleteImage(itemToReturn.imageUrl);
		return new Response(JSON.stringify(item), { status: 200 });
	} catch {
		error(404, $t("errors.item-not-found"));
	}
};

export { DELETE };
//# sourceMappingURL=_server.ts.js-LfctBBrw.js.map
