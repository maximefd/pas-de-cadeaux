import { R as Role } from '../../../../../../chunks/schema.js-_174nGak.js';
import { g as getConfig } from '../../../../../../chunks/config.js-465rpi-p.js';
import { c as client } from '../../../../../../chunks/prisma.js-iNNVyVix.js';
import { h as requireAdminOrManager } from '../../../../../../chunks/auth.js-C7-cSOnT.js';
import { g as generateToken, h as hashToken, i as isTokenTimeValid, t as tokenExpiresAt } from '../../../../../../chunks/token.js-NERTAbbQ.js';

// src/routes/admin/groups/[groupId]/members/+page.server.ts
var findActiveInvite = async (groupId) => {
	const invite = await client.signupToken.findFirst({
		where: {
			groupId,
			reusable: true
		},
		orderBy: { createdAt: "desc" }
	});
	if (!invite || !invite.token) return null;
	return {
		token: invite.token,
		expiresAt: tokenExpiresAt(invite.createdAt).toISOString(),
		expired: !isTokenTimeValid(invite.createdAt)
	};
};
var load = (async ({ params }) => {
	await requireAdminOrManager(params.groupId);
	const group = await client.group.findUniqueOrThrow({
		where: { id: params.groupId },
		select: {
			id: true,
			name: true,
			UserGroupMembership: { select: {
				user: { select: {
					id: true,
					username: true,
					name: true,
					email: true,
					role: { select: { id: true } }
				} },
				roleId: true
			} }
		}
	}).then((group) => ({
		id: group?.id,
		name: group?.name,
		users: group?.UserGroupMembership.map((membership) => ({
			...membership.user,
			isGroupManager: membership.roleId === Role.GROUP_MANAGER
		}))
	}));
	return {
		group,
		config: await getConfig(group.id),
		invite: await findActiveInvite(group.id)
	};
});
var actions = {
	createLink: async ({ params }) => {
		await requireAdminOrManager(params.groupId);
		const token = await generateToken();
		await client.$transaction([client.signupToken.deleteMany({ where: {
			groupId: params.groupId,
			reusable: true
		} }), client.signupToken.create({ data: {
			hashedToken: hashToken(token),
			token,
			reusable: true,
			groupId: params.groupId
		} })]);
		return { success: true };
	},
	revokeLink: async ({ params }) => {
		await requireAdminOrManager(params.groupId);
		await client.signupToken.deleteMany({ where: {
			groupId: params.groupId,
			reusable: true
		} });
		return { success: true };
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-DYf8g7r8.js.map
