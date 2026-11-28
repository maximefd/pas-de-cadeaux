import { g as getActiveMembership } from '../../../../../chunks/group-membership.js-CDZ-5kqi.js';
import { c as client } from '../../../../../chunks/prisma.js-iNNVyVix.js';
import { g as getFormatter } from '../../../../../chunks/i18n.js-D1Rw55oM.js';
import { c as getListPropertiesSchema } from '../../../../../chunks/validations.js-uFn0YlIJ.js';
import { t as trimToNull } from '../../../../../chunks/util.js-DnrKSOpr.js';
import { d as deleteList, e as adjustListManagers } from '../../../../../chunks/list.js-B0L9113F.js';
import { g as getConfig } from '../../../../../chunks/config.js-465rpi-p.js';
import { b as requireLogin } from '../../../../../chunks/auth.js-C7-cSOnT.js';
import { l as logger } from '../../../../../chunks/logger.js-LYoWHWpz.js';
import { r as resolve } from '../../../../../chunks/paths.js-BuehRTbY.js';
import { x as error, C as fail, B as redirect } from '../../../../../chunks/utils.js-CAPFIGDr.js';
import z from 'zod';

// src/routes/lists/[id]/manage/+page.server.ts
var load = async ({ params }) => {
	const user = requireLogin();
	const $t = await getFormatter();
	const activeMembership = await getActiveMembership(user);
	const config = await getConfig(activeMembership.groupId);
	const list = await client.list.findUnique({
		where: { id: params.id },
		select: {
			id: true,
			name: true,
			icon: true,
			iconColor: true,
			public: true,
			hideOwner: true,
			allowSelfClaims: true,
			notForMe: true,
			owner: { select: {
				id: true,
				name: true,
				username: true,
				picture: true
			} },
			managers: { select: { user: { select: {
				id: true,
				name: true,
				username: true
			} } } },
			groupId: true,
			description: true
		}
	}).then((list) => list ?? error(404, $t("errors.list-not-found")));
	if (list.owner.id !== user.id && !list.managers.find(({ user: manager }) => manager.id === user.id)) error(401, $t("errors.not-authorized"));
	if (list.groupId !== activeMembership.groupId) error(401, $t("errors.user-must-be-in-the-correct-group"));
	return {
		list: {
			...list,
			managers: list.managers.map(({ user }) => ({ ...user }))
		},
		listMode: config.listMode,
		allowsPublicLists: config.allowPublicLists,
		claimsVisibleToOwner: config.claims.showForOwner,
		groupId: activeMembership.groupId
	};
};
var actions = {
	persist: async ({ request, params }) => {
		const user = requireLogin();
		const $t = await getFormatter();
		const activeMembership = await getActiveMembership(user);
		const config = await getConfig(activeMembership.groupId);
		await canManage(params.id, user, activeMembership.groupId);
		const form = await request.formData();
		const listProperties = getListPropertiesSchema().safeParse({
			name: form.get("name"),
			icon: form.get("icon"),
			iconColor: form.get("iconColor"),
			public: form.get("public"),
			hideOwner: form.get("hideOwner"),
			description: form.get("description"),
			managers: form.getAll("managers"),
			allowSelfClaims: form.get("allowSelfClaims"),
			notForMe: form.get("notForMe")
		});
		if (listProperties.error) return fail(422, {
			success: false,
			errors: z.flattenError(listProperties.error).fieldErrors
		});
		if (listProperties.data.public && !config.allowPublicLists) return fail(400, {
			action: "persist",
			success: false,
			message: $t("errors.public-lists-not-allowed")
		});
		if (!listProperties.data.public && config.listMode === "registry") listProperties.data.public = true;
		if (listProperties.data.allowSelfClaims && !config.claims.showForOwner) return fail(400, {
			action: "persist",
			success: false,
			message: $t("errors.self-claims-not-available")
		});
		try {
			await client.list.update({
				data: {
					name: trimToNull(listProperties.data.name),
					icon: trimToNull(listProperties.data.icon),
					iconColor: trimToNull(listProperties.data.iconColor),
					public: listProperties.data.public,
					hideOwner: listProperties.data.hideOwner,
					allowSelfClaims: listProperties.data.allowSelfClaims,
					notForMe: listProperties.data.notForMe,
					description: trimToNull(listProperties.data.description)
				},
				where: { id: params.id }
			});
			await adjustListManagers(params.id, listProperties.data.managers);
		} catch (err) {
			logger.error({ err }, "Unable to update list settings");
			return fail(500, {
				action: "persist",
				success: false,
				message: $t("errors.unable-to-update-list-settings")
			});
		}
		return redirect(302, resolve("/lists/[id]", { id: params.id }));
	},
	delete: async ({ params }) => {
		const user = requireLogin();
		const $t = await getFormatter();
		const activeMembership = await getActiveMembership(user);
		const listOwner = await client.list.findUnique({
			select: { ownerId: true },
			where: {
				id: params.id,
				groupId: activeMembership.groupId
			}
		});
		if (user.id !== listOwner?.ownerId) error(401, $t("errors.not-authorized"));
		try {
			deleteList(params.id);
		} catch (err) {
			logger.error({ err }, "Unable to delete list");
			return fail(500, {
				action: "delete",
				success: false,
				message: $t("errors.unable-to-delete-list")
			});
		}
		return redirect(302, resolve("/lists"));
	}
};
async function canManage(id, user, groupId) {
	const $t = await getFormatter();
	const list = await client.list.findUnique({
		select: {
			ownerId: true,
			managers: { select: { userId: true } }
		},
		where: {
			id,
			groupId
		}
	});
	if (!list) error(404, $t("errors.list-not-found"));
	if (user.id !== list.ownerId && !list.managers.find(({ userId }) => userId === user.id)) error(401, $t("errors.not-authorized"));
}

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-DLYzloF1.js.map
