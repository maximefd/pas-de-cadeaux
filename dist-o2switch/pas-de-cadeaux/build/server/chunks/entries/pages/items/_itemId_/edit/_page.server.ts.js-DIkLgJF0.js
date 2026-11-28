import { c as client } from '../../../../../chunks/prisma.js-iNNVyVix.js';
import { g as getConfig } from '../../../../../chunks/config.js-465rpi-p.js';
import { i as isValidImage, c as createImage, t as tryDeleteImage } from '../../../../../chunks/image-util.js-B62RlHuI.js';
import { i as itemEmitter } from '../../../../../chunks/emitters.js-oJjSRpbk.js';
import { g as getMinorUnits } from '../../../../../chunks/price-formatter.js-Cgx1svgQ.js';
import { g as getFormatter, a as getLocale } from '../../../../../chunks/i18n.js-D1Rw55oM.js';
import { I as ItemEvent } from '../../../../../chunks/events.js-DQSXhMm7.js';
import { g as getItemInclusions } from '../../../../../chunks/items.js-C_2ihKyH.js';
import { g as getAvailableLists, a as getNextDisplayOrderForLists } from '../../../../../chunks/list.js-B0L9113F.js';
import { b as requireLogin } from '../../../../../chunks/auth.js-C7-cSOnT.js';
import { a as getItemUpdateSchema, e as extractFormData } from '../../../../../chunks/validations.js-uFn0YlIJ.js';
import { u as userCanEditOnSomeList } from '../../../../../chunks/item-util.js-B_1B95Df.js';
import { C as fail, B as redirect, x as error } from '../../../../../chunks/utils.js-CAPFIGDr.js';
import z from 'zod';

// src/routes/items/[itemId]/edit/+page.server.ts
var load = async ({ params }) => {
	const user = requireLogin();
	const $t = await getFormatter();
	if (isNaN(parseInt(params.itemId))) error(400, $t("errors.item-id-must-be-a-number"));
	const item = await client.item.findUnique({
		where: { id: parseInt(params.itemId) },
		include: {
			itemPrice: true,
			user: { select: {
				id: true,
				name: true
			} },
			lists: { select: {
				addedById: true,
				list: { select: {
					id: true,
					ownerId: true,
					managers: { select: { userId: true } }
				} }
			} }
		}
	});
	if (!item) error(404, $t("errors.item-not-found"));
	if (!userCanEditOnSomeList(item, user.id)) error(403, $t("errors.user-is-not-allowed-to-edit-this-item"));
	const lists = await getAvailableLists(item.userId, user.id);
	return {
		user,
		item: {
			...item,
			offeredAt: null,
			offered: false,
			lists: item.lists.map(({ list, addedById }) => ({
				id: list.id,
				canModify: list.ownerId === user.id || addedById === user.id || list.managers.find(({ userId }) => userId === user.id) !== void 0
			}))
		},
		lists
	};
};
var actions = { default: async ({ request, params, url: requestUrl }) => {
	const user = requireLogin();
	const $t = await getFormatter();
	const itemFormSchema = await getItemUpdateSchema();
	const form = await request.formData().then(extractFormData).then(itemFormSchema.safeParse);
	if (!form.success) return fail(400, { errors: z.flattenError(form.error).fieldErrors });
	const { url, imageUrl, image, name, price, currency, quantity, note, lists, mostWanted } = form.data;
	const item = await client.item.findUniqueOrThrow({
		include: {
			user: { select: {
				id: true,
				name: true
			} },
			lists: { select: {
				id: true,
				addedById: true,
				displayOrder: true,
				list: { select: {
					id: true,
					ownerId: true,
					managers: { select: { userId: true } }
				} }
			} }
		},
		where: { id: parseInt(params.itemId) }
	});
	if (!userCanEditOnSomeList(item, user.id)) return fail(403, $t("errors.user-is-not-allowed-to-edit-this-item"));
	let newImageFile;
	if (image && isValidImage(image)) newImageFile = await createImage(name, image);
	else if (imageUrl && item.imageUrl !== imageUrl) newImageFile = await createImage(name, imageUrl);
	let itemPriceId = null;
	if (price && currency) await client.itemPrice.create({ data: {
		value: getMinorUnits(parseFloat(price), currency, getLocale()),
		currency
	} }).then((itemPrice) => itemPriceId = itemPrice.id);
	const listsToUpdate = await determineListsForUpdate(user, item, lists, mostWanted);
	if (listsToUpdate === null) return fail(400, { errors: { lists: [$t("errors.an-item-must-be-added-to-at-least-one-list")] } });
	const updatedItem = await client.item.update({
		where: { id: parseInt(params.itemId) },
		data: {
			name,
			url,
			imageUrl: newImageFile,
			note,
			itemPriceId,
			quantity,
			mostWanted,
			lists: listsToUpdate
		},
		include: getItemInclusions()
	});
	if (item.itemPriceId !== null && item.itemPriceId !== itemPriceId) await client.itemPrice.delete({ where: { id: item.itemPriceId } });
	itemEmitter.emit(ItemEvent.ITEM_UPDATE, updatedItem);
	if (newImageFile !== void 0 && item.imageUrl) await tryDeleteImage(item.imageUrl);
	const redirectTo = requestUrl.searchParams.get("redirectTo");
	redirect(302, redirectTo || "/");
} };
var determineApprovalStatus = (config, list, user) => {
	if (list.ownerId === user.id || config.suggestions.method !== "approval") return true;
	return list.managers.some(({ userId }) => userId === user.id);
};
var determineListsForUpdate = async (user, item, lists, mostWanted) => {
	if (item.createdById !== user.id) return;
	if (lists === void 0) return null;
	const desiredLists = await client.list.findMany({
		select: {
			id: true,
			ownerId: true,
			groupId: true,
			managers: { select: { userId: true } }
		},
		where: { id: { in: lists } }
	});
	const desiredListIds = new Set(desiredLists.map(({ id }) => id));
	const nextDisplayOrderByList = await getNextDisplayOrderForLists([...desiredListIds], mostWanted);
	const listItemsToDelete = item.lists.filter((listItem) => !desiredListIds.has(listItem.list.id) && (listItem.addedById === user.id || listItem.list.ownerId === user.id)).map(({ id }) => id);
	const listItemsToCreate = await Promise.all(desiredLists.filter((l) => item.lists.find(({ list }) => list.id === l.id) === void 0).map(async (l) => {
		const config = await getConfig(l.groupId);
		return {
			listId: l.id,
			addedById: user.id,
			approved: determineApprovalStatus(config, l, user),
			displayOrder: nextDisplayOrderByList[l.id] || 0
		};
	}));
	let listItemsToUpdate = void 0;
	if (!item.mostWanted && mostWanted) listItemsToUpdate = desiredLists.filter((l) => item.lists.find(({ list }) => list.id === l.id) !== void 0).map((list) => ({
		data: { displayOrder: -1 },
		where: { listId_itemId: {
			itemId: item.id,
			listId: list.id
		} }
	}));
	return {
		create: listItemsToCreate,
		update: listItemsToUpdate,
		deleteMany: { id: { in: listItemsToDelete } }
	};
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-DIkLgJF0.js.map
