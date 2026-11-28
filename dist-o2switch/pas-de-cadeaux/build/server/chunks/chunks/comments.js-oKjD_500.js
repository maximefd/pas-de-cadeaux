import { c as client } from './prisma.js-iNNVyVix.js';
import { g as getFormatter } from './i18n.js-D1Rw55oM.js';
import { g as getActiveMembership } from './group-membership.js-CDZ-5kqi.js';
import { x as error } from './utils.js-CAPFIGDr.js';

// src/lib/server/comments.ts
var requireCommentAccess = async (user, listId, itemId) => {
	const $t = await getFormatter();
	const list = await client.list.findUnique({
		select: {
			groupId: true,
			ownerId: true,
			allowSelfClaims: true,
			notForMe: true,
			managers: { select: { userId: true } },
			items: {
				select: { itemId: true },
				where: { itemId }
			}
		},
		where: { id: listId }
	});
	if (!list || list.items.length === 0) error(404, $t("errors.item-not-found"));
	const activeMembership = await getActiveMembership(user);
	if (list.groupId !== activeMembership.groupId) error(404, $t("errors.list-not-found"));
	if ((list.ownerId === user.id || list.managers.some(({ userId }) => userId === user.id)) && !(list.allowSelfClaims || list.notForMe)) error(403, $t("errors.not-authorized"));
};

export { requireCommentAccess as r };
//# sourceMappingURL=comments.js-oKjD_500.js.map
