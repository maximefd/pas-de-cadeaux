import { c as client } from '../../../../../chunks/prisma.js-iNNVyVix.js';
import { g as getConfig } from '../../../../../chunks/config.js-465rpi-p.js';
import { g as getActiveMembership } from '../../../../../chunks/group-membership.js-CDZ-5kqi.js';
import { i as isValidImage, c as createImage } from '../../../../../chunks/image-util.js-B62RlHuI.js';
import { i as itemEmitter } from '../../../../../chunks/emitters.js-oJjSRpbk.js';
import { g as getMinorUnits } from '../../../../../chunks/price-formatter.js-Cgx1svgQ.js';
import { g as getFormatter, a as getLocale } from '../../../../../chunks/i18n.js-D1Rw55oM.js';
import { b as getById, a as getNextDisplayOrderForLists, g as getAvailableLists } from '../../../../../chunks/list.js-B0L9113F.js';
import { I as ItemEvent } from '../../../../../chunks/events.js-DQSXhMm7.js';
import { g as getItemInclusions } from '../../../../../chunks/items.js-C_2ihKyH.js';
import { b as requireLogin } from '../../../../../chunks/auth.js-C7-cSOnT.js';
import { b as getItemCreateSchema, e as extractFormData } from '../../../../../chunks/validations.js-uFn0YlIJ.js';
import { C as fail, B as redirect, x as error } from '../../../../../chunks/utils.js-CAPFIGDr.js';
import z from 'zod';

// src/routes/lists/[id]/create-item/+page.server.ts
var load = async ({ params }) => {
	const user = requireLogin();
	const $t = await getFormatter();
	const activeMembership = await getActiveMembership(user);
	const list = await getById(params.id);
	if (!list) error(404, $t("errors.list-not-found"));
	if (!list.public && list.groupId !== activeMembership.groupId) error(404, $t("errors.user-not-in-group"));
	const config = await getConfig(activeMembership.groupId);
	if (!config.suggestions.enable && user.id !== list.owner.id && !list.managers.find(({ userId }) => userId === user.id)) error(401, $t("errors.suggestions-are-disabled"));
	const lists = await getAvailableLists(list.owner.id, user.id);
	const isOwnerOrManager = list.owner.id === user.id || list.managers.find(({ userId }) => userId === user.id) !== void 0;
	return {
		user,
		lists,
		list: {
			id: list.id,
			owner: {
				name: list.owner.name,
				isMe: isOwnerOrManager
			}
		},
		suggestion: !isOwnerOrManager,
		suggestionMethod: config.suggestions.method
	};
};
var actions = { default: async ({ request, params, url: requestUrl }) => {
	const user = requireLogin();
	const $t = await getFormatter();
	const activeMembership = await getActiveMembership(user);
	const list = await getById(params.id);
	if (!list) return fail(404, {
		success: false,
		message: $t("errors.list-not-found")
	});
	if (!list.public && list.groupId !== activeMembership.groupId) return fail(404, {
		success: false,
		message: $t("errors.user-not-in-group")
	});
	const itemFormSchema = await getItemCreateSchema();
	const form = await request.formData().then(extractFormData).then(itemFormSchema.safeParse);
	if (!form.success) {
		z.treeifyError(form.error);
		return fail(400, { errors: z.flattenError(form.error).fieldErrors });
	}
	const { url, imageUrl, image, name, price, currency, quantity, note, lists: listIds, mostWanted } = form.data;
	let newImageFile;
	if (image && isValidImage(image)) newImageFile = await createImage(name, image);
	else if (imageUrl) newImageFile = await createImage(name, imageUrl);
	let itemPriceId = null;
	if (price && currency) await client.itemPrice.create({ data: {
		value: getMinorUnits(parseFloat(price), currency, getLocale()),
		currency
	} }).then((itemPrice) => itemPriceId = itemPrice.id);
	const lists = await client.list.findMany({
		select: {
			id: true,
			ownerId: true,
			groupId: true,
			managers: { select: { userId: true } }
		},
		where: { id: { in: listIds } }
	});
	const nextDisplayOrderByList = await getNextDisplayOrderForLists(listIds, mostWanted);
	const listItems = await Promise.all(lists.map(async (l) => {
		const config = await getConfig(l.groupId);
		return {
			listId: l.id,
			addedById: user.id,
			approved: determineApprovalStatus(config, l, user),
			displayOrder: nextDisplayOrderByList[l.id] || 0
		};
	}));
	const item = await client.item.create({
		data: {
			userId: list.owner.id,
			name,
			url,
			note,
			imageUrl: newImageFile,
			createdById: user.id,
			itemPriceId,
			quantity,
			mostWanted,
			lists: { create: listItems }
		},
		include: getItemInclusions()
	});
	itemEmitter.emit(ItemEvent.ITEM_CREATE, item);
	const redirectTo = requestUrl.searchParams.get("redirectTo");
	redirect(302, redirectTo || "/");
} };
var determineApprovalStatus = (config, list, user) => {
	if (list.ownerId === user.id || config.suggestions.method !== "approval") return true;
	return list.managers.some(({ userId }) => userId === user.id);
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-DdeR7j_l.js.map
