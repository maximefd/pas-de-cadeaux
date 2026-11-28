import { R as Role } from '../../../../../chunks/schema.js-_174nGak.js';
import { c as client } from '../../../../../chunks/prisma.js-iNNVyVix.js';
import { g as generateToken, h as hashToken } from '../../../../../chunks/token.js-NERTAbbQ.js';
import { g as getFormatter } from '../../../../../chunks/i18n.js-D1Rw55oM.js';
import { f as requireRole, i as invalidateUserSessions } from '../../../../../chunks/auth.js-C7-cSOnT.js';
import { u as unlinkOauth, a as updatePicture, b as updateProfile } from '../../../../../chunks/profile.js-D-1NKONn.js';
import { g as getOIDCConfig } from '../../../../../chunks/openid.js-Bz_Tsj8l.js';
import { x as error, C as fail, B as redirect } from '../../../../../chunks/utils.js-CAPFIGDr.js';

// src/routes/admin/users/[id]/+page.server.ts
var load = async ({ params, fetch }) => {
	const user = await requireRole(Role.ADMIN);
	const $t = await getFormatter();
	if (user.username === params.id) redirect(303, "/account");
	const editingUser = await client.user.findUnique({
		where: { id: params.id },
		select: {
			username: true,
			email: true,
			name: true,
			id: true,
			picture: true,
			oauthId: true,
			role: { select: { name: true } }
		}
	});
	if (!editingUser) error(404, $t("errors.user-not-found"));
	return {
		editingUser: { ...editingUser },
		oidcConfig: await getOIDCConfig(fetch),
		user
	};
};
var actions = {
	profile: async ({ params, request }) => {
		await requireRole(Role.ADMIN);
		const user = await client.user.findUnique({
			where: { id: params.id },
			select: { id: true }
		});
		if (!user) return fail(404, "User not found");
		return request.formData().then((fd) => updateProfile(user.id, fd));
	},
	profilePicture: async ({ params, request }) => {
		await requireRole(Role.ADMIN);
		const user = await client.user.findUnique({
			where: { id: params.id },
			select: {
				id: true,
				username: true
			}
		});
		if (!user) return fail(404, "User not found");
		return request.formData().then((fd) => updatePicture(user.id, user.username, fd));
	},
	unlinkoauth: async ({ params }) => {
		await requireRole(Role.ADMIN);
		const user = await client.user.findUnique({
			where: { id: params.id },
			select: {
				id: true,
				username: true
			}
		});
		if (!user) return fail(404, "User not found");
		await unlinkOauth(user.id);
	},
	"reset-password": async ({ params, url }) => {
		await requireRole(Role.ADMIN);
		const $t = await getFormatter();
		const user = await client.user.findUnique({
			where: { id: params.id },
			select: { id: true }
		});
		if (user) {
			const token = await generateToken();
			await client.passwordReset.create({ data: {
				userId: user.id,
				hashedToken: hashToken(token)
			} });
			return {
				success: true,
				url: new URL(`/reset-password?token=${token}`, url).href
			};
		} else error(422, $t("errors.user-not-found"));
	},
	"make-admin": async ({ params }) => {
		await requireRole(Role.ADMIN);
		await client.user.update({
			where: { id: params.id },
			data: { roleId: Role.ADMIN }
		});
		return {
			success: true,
			url: null
		};
	},
	"remove-admin": async ({ params }) => {
		await requireRole(Role.ADMIN);
		await client.user.update({
			where: { id: params.id },
			data: { roleId: Role.USER }
		});
		return {
			success: true,
			url: null
		};
	},
	"clear-sessions": async ({ params }) => {
		await requireRole(Role.ADMIN);
		await invalidateUserSessions(params.id);
		return {
			success: true,
			url: null
		};
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-CWofBMZj.js.map
