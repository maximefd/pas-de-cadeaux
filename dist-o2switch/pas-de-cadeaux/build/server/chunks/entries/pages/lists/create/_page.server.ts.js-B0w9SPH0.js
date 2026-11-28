import { g as getConfig } from '../../../../chunks/config.js-465rpi-p.js';
import { g as getActiveMembership } from '../../../../chunks/group-membership.js-CDZ-5kqi.js';
import { g as getFormatter } from '../../../../chunks/i18n.js-D1Rw55oM.js';
import { t as trimToNull } from '../../../../chunks/util.js-DnrKSOpr.js';
import { c as getListPropertiesSchema } from '../../../../chunks/validations.js-uFn0YlIJ.js';
import { f as create, e as adjustListManagers } from '../../../../chunks/list.js-B0L9113F.js';
import { c as client } from '../../../../chunks/prisma.js-iNNVyVix.js';
import { b as requireLogin } from '../../../../chunks/auth.js-C7-cSOnT.js';
import { l as logger } from '../../../../chunks/logger.js-LYoWHWpz.js';
import { r as resolve } from '../../../../chunks/paths.js-BuehRTbY.js';
import { C as fail, B as redirect } from '../../../../chunks/utils.js-CAPFIGDr.js';
import z from 'zod';

// src/routes/lists/create/+page.server.ts
var load = (async () => {
	const user = requireLogin();
	const activeMembership = await getActiveMembership(user);
	const config = await getConfig(activeMembership.groupId);
	if (config.listMode === "registry") {
		if (await client.list.count({ where: {
			ownerId: user.id,
			groupId: activeMembership.groupId
		} }) === 1) redirect(302, "/wishlists/me");
	}
	return {
		list: {
			name: null,
			icon: null,
			owner: {
				id: user.id,
				name: user.name,
				username: user.username,
				picture: user.picture || null
			},
			description: null,
			hideOwner: false,
			managers: []
		},
		listMode: config.listMode,
		allowsPublicLists: config.allowPublicLists,
		claimsVisibleToOwner: config.claims.showForOwner,
		groupId: activeMembership.groupId
	};
});
var actions = { persist: async ({ request }) => {
	const user = requireLogin();
	const $t = await getFormatter();
	const activeMembership = await getActiveMembership(user);
	const config = await getConfig(activeMembership.groupId);
	if (config.listMode === "registry") {
		if (await client.list.count({ where: {
			ownerId: user.id,
			groupId: activeMembership.groupId
		} }) === 1) return fail(400, {
			success: false,
			error: $t("errors.in-registry-mode-you-can-only-have-one-list")
		});
	}
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
		formErrors: z.flattenError(listProperties.error).fieldErrors
	});
	if (listProperties.data.public && !config.allowPublicLists) return fail(400, {
		action: "create",
		success: false,
		message: $t("errors.public-lists-not-allowed")
	});
	if (!listProperties.data.public && config.listMode === "registry") listProperties.data.public = true;
	if (listProperties.data.allowSelfClaims && !config.claims.showForOwner) return fail(400, {
		action: "create",
		success: false,
		message: $t("errors.self-claims-not-available")
	});
	let list;
	try {
		const data = {
			name: trimToNull(listProperties.data.name),
			icon: trimToNull(listProperties.data.icon),
			iconColor: trimToNull(listProperties.data.iconColor),
			public: listProperties.data.public,
			hideOwner: listProperties.data.hideOwner,
			allowSelfClaims: listProperties.data.allowSelfClaims,
			notForMe: listProperties.data.notForMe,
			description: trimToNull(listProperties.data.description)
		};
		list = await create(user.id, activeMembership.groupId, data);
		await adjustListManagers(list.id, listProperties.data.managers);
	} catch (err) {
		logger.error({ err }, "Unable to create list");
		return fail(500, {
			success: false,
			error: $t("errors.unable-to-create-list")
		});
	}
	return redirect(302, resolve("/lists/[id]", { id: list.id }));
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-B0w9SPH0.js.map
