import { c as client } from '../../../../../../../../../chunks/prisma.js-iNNVyVix.js';
import { g as getFormatter } from '../../../../../../../../../chunks/i18n.js-D1Rw55oM.js';
import { r as requireLoginOrError } from '../../../../../../../../../chunks/auth.js-C7-cSOnT.js';
import { r as requireCommentAccess } from '../../../../../../../../../chunks/comments.js-oKjD_500.js';
import { x as error } from '../../../../../../../../../chunks/utils.js-CAPFIGDr.js';
import '../../../../../../../../../chunks/shared-server.js-B6_G0tAr.js';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import '@prisma/adapter-better-sqlite3';
import '../../../../../../../../../chunks/routing.js-DMTqwvGY.js';
import '../../../../../../../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../../../../../../../chunks/index-server.js-CIVHNbBm.js';
import '../../../../../../../../../chunks/shared.js-Cb68JbUk.js';
import '../../../../../../../../../chunks/i18n2.js-1SlG2bAu.js';
import '../../../../../../../../../chunks/index-server2.js-DZFYXfYm.js';
import '../../../../../../../../../chunks/schema.js-_174nGak.js';
import '@oslojs/encoding';
import '@oslojs/crypto/sha2';
import '../../../../../../../../../chunks/group-membership.js-CDZ-5kqi.js';

// src/routes/pdc/lists/[listId]/items/[itemId]/comments/[commentId]/+server.ts
var DELETE = async ({ params }) => {
	const user = await requireLoginOrError();
	const $t = await getFormatter();
	const itemId = parseInt(params.itemId);
	if (isNaN(itemId)) error(400, $t("errors.item-id-must-be-a-number"));
	await requireCommentAccess(user, params.listId, itemId);
	const { count } = await client.itemComment.deleteMany({ where: {
		id: params.commentId,
		itemId,
		authorId: user.id
	} });
	if (count === 0) error(404, $t("errors.item-not-found"));
	return new Response();
};

export { DELETE };
//# sourceMappingURL=_server.ts.js-BfKSZfSe.js.map
