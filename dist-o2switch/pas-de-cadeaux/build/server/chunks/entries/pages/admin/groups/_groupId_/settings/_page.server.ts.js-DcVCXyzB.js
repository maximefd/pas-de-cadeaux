import { g as getConfig, w as writeConfig } from '../../../../../../chunks/config.js-465rpi-p.js';
import { c as client } from '../../../../../../chunks/prisma.js-iNNVyVix.js';
import { s as settingSchema } from '../../../../../../chunks/validations.js-uFn0YlIJ.js';
import { h as requireAdminOrManager } from '../../../../../../chunks/auth.js-C7-cSOnT.js';
import { C as fail } from '../../../../../../chunks/utils.js-CAPFIGDr.js';
import z from 'zod';

// src/routes/admin/groups/[groupId]/settings/+page.server.ts
var load = (async ({ params }) => {
	await requireAdminOrManager(params.groupId);
	const group = await client.group.findUniqueOrThrow({
		where: { id: params.groupId },
		select: { id: true }
	});
	const [membershipCount, listCount, config] = await Promise.all([
		client.userGroupMembership.count({ where: { groupId: group.id } }),
		client.list.count({ where: { groupId: group.id } }),
		getConfig(group.id)
	]);
	return {
		config,
		membershipCount,
		listCount
	};
});
var actions = { default: async ({ request, params }) => {
	await requireAdminOrManager(params.groupId);
	const formData = Object.fromEntries(await request.formData());
	const configData = settingSchema.pick({
		suggestionMethod: true,
		enableSuggestions: true,
		claimsShowName: true,
		claimsShowNameAcrossGroups: true,
		claimsShowForOwner: true,
		claimsShowNamePublic: true,
		claimsRequireEmail: true,
		listMode: true,
		enableDefaultListCreation: true,
		allowPublicLists: true
	}).safeParse(formData);
	if (!configData.success) return fail(400, {
		action: "settings",
		error: z.prettifyError(configData.error)
	});
	const existingConfig = await getConfig(params.groupId);
	const newConfig = {
		suggestions: {
			enable: configData.data.enableSuggestions,
			method: configData.data.suggestionMethod
		},
		claims: {
			showName: configData.data.claimsShowName,
			showNameAcrossGroups: configData.data.claimsShowNameAcrossGroups,
			showForOwner: configData.data.claimsShowForOwner,
			showNamePublic: configData.data.claimsShowNamePublic,
			requireEmail: configData.data.claimsRequireEmail
		},
		listMode: configData.data.listMode,
		enableDefaultListCreation: configData.data.enableDefaultListCreation,
		allowPublicLists: configData.data.allowPublicLists
	};
	let changingToRegistry = false;
	if (existingConfig.listMode !== newConfig.listMode && newConfig.listMode === "registry") {
		changingToRegistry = true;
		const [membershipCount, listCount] = await Promise.all([client.userGroupMembership.count({ where: { groupId: params.groupId } }), client.list.count({ where: { groupId: params.groupId } })]);
	}
	await writeConfig(newConfig, params.groupId);
	if (changingToRegistry) await client.list.updateMany({
		data: { public: true },
		where: { groupId: params.groupId }
	});
	return { success: true };
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-DcVCXyzB.js.map
