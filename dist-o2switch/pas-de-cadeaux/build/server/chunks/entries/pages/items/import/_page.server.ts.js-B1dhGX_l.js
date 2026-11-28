import { r as requireLoginOrError, b as requireLogin } from '../../../../chunks/auth.js-C7-cSOnT.js';
import { c as client } from '../../../../chunks/prisma.js-iNNVyVix.js';
import { s as setActiveMembership } from '../../../../chunks/group-membership.js-CDZ-5kqi.js';
import { r as resolve } from '../../../../chunks/paths.js-BuehRTbY.js';
import { C as fail, B as redirect } from '../../../../chunks/utils.js-CAPFIGDr.js';
import z from 'zod';

// src/routes/items/import/+page.server.ts
var load = async ({ url }) => {
	const user = requireLogin();
	const productUrl = url.searchParams.get("url");
	const productText = url.searchParams.get("text");
	const productTitle = url.searchParams.get("title");
	const groups = await client.userGroupMembership.findMany({
		include: { group: { select: { name: true } } },
		where: { userId: user.id }
	});
	const lists = await client.list.findMany({
		select: {
			id: true,
			name: true,
			icon: true,
			groupId: true,
			owner: { select: { name: true } }
		},
		where: { ownerId: user.id }
	});
	return {
		groups: groups.map(({ group, ...membership }) => ({
			...group,
			id: membership.groupId,
			active: membership.active
		})),
		lists,
		url: productUrl || extractUrl(productText) || extractUrl(productTitle)
	};
};
var actions = { default: async ({ request }) => {
	const user = await requireLoginOrError();
	const schema = z.object({
		group: z.string(),
		list: z.string(),
		url: z.string()
	});
	const result = await request.formData().then(Object.fromEntries).then(schema.safeParseAsync);
	if (result.error) return fail(422, z.flattenError(result.error).fieldErrors);
	await setActiveMembership(user.id, result.data.group);
	const createItemRoute = resolve("/lists/[id]/create-item", { id: result.data.list });
	return redirect(303, createItemRoute + "?" + new URLSearchParams({
		productUrl: result.data.url,
		redirectTo: "/lists"
	}));
} };
function extractUrl(url) {
	if (!url) return null;
	const matches = url.match(/(https?):\/\/[^\s/$.?#].[^\s]*/);
	if (matches) return matches[0];
	return null;
}

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-B1dhGX_l.js.map
