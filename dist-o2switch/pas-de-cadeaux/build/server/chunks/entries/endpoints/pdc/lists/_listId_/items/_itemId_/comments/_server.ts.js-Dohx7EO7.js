import { c as client } from '../../../../../../../../chunks/prisma.js-iNNVyVix.js';
import { g as getFormatter } from '../../../../../../../../chunks/i18n.js-D1Rw55oM.js';
import { r as requireLoginOrError } from '../../../../../../../../chunks/auth.js-C7-cSOnT.js';
import { r as requireCommentAccess } from '../../../../../../../../chunks/comments.js-oKjD_500.js';
import { j as json, x as error } from '../../../../../../../../chunks/utils.js-CAPFIGDr.js';
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
import '../../../../../../../../chunks/group-membership.js-CDZ-5kqi.js';

// src/routes/pdc/lists/[listId]/items/[itemId]/comments/+server.ts
var commentSchema = z.object({ text: z.string().trim().min(1).max(300) });
var parseItemId = async (raw) => {
	const itemId = parseInt(raw);
	if (isNaN(itemId)) {
		const $t = await getFormatter();
		error(400, $t("errors.item-id-must-be-a-number"));
	}
	return itemId;
};
var GET = async ({ params }) => {
	const user = await requireLoginOrError();
	const itemId = await parseItemId(params.itemId);
	await requireCommentAccess(user, params.listId, itemId);
	const comments = await client.itemComment.findMany({
		where: { itemId },
		orderBy: { createdAt: "asc" },
		select: {
			id: true,
			text: true,
			createdAt: true,
			author: { select: {
				id: true,
				name: true
			} }
		}
	});
	return json(comments.map(({ id, text, createdAt, author }) => ({
		id,
		text,
		createdAt,
		authorName: author.name,
		mine: author.id === user.id
	})));
};
var POST = async ({ request, params }) => {
	const user = await requireLoginOrError();
	const itemId = await parseItemId(params.itemId);
	await requireCommentAccess(user, params.listId, itemId);
	const body = commentSchema.safeParse(await request.json().catch(() => null));
	if (!body.success) error(422, JSON.stringify(z.flattenError(body.error).fieldErrors));
	const created = await client.itemComment.create({
		data: {
			itemId,
			authorId: user.id,
			text: body.data.text
		},
		select: {
			id: true,
			text: true,
			createdAt: true
		}
	});
	return json({
		...created,
		authorName: user.name,
		mine: true
	}, { status: 201 });
};

export { GET, POST };
//# sourceMappingURL=_server.ts.js-Dohx7EO7.js.map
