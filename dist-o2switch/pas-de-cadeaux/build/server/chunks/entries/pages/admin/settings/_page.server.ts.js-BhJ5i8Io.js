import { R as Role } from '../../../../chunks/schema.js-_174nGak.js';
import { c as client } from '../../../../chunks/prisma.js-iNNVyVix.js';
import { w as writeConfig, a as getEnvManagedKeys, g as getConfig } from '../../../../chunks/config.js-465rpi-p.js';
import { s as sendTest } from '../../../../chunks/email.js-CjpRgx6W.js';
import { s as settingSchema } from '../../../../chunks/validations.js-uFn0YlIJ.js';
import { f as requireRole } from '../../../../chunks/auth.js-C7-cSOnT.js';
import { C as fail } from '../../../../chunks/utils.js-CAPFIGDr.js';
import { z } from 'zod';

// src/routes/admin/settings/+page.server.ts
var load = async () => {
	await requireRole(Role.ADMIN);
	return {
		config: await getConfig(void 0, true),
		groups: await client.group.findMany({ select: {
			id: true,
			name: true
		} }),
		envManagedKeys: getEnvManagedKeys()
	};
};
var saveSettings = async ({ request }) => {
	await requireRole(Role.ADMIN);
	const formData = Object.fromEntries(await request.formData());
	const configData = settingSchema.safeParse(formData);
	if (!configData.success) return fail(400, {
		action: "settings",
		error: z.prettifyError(configData.error)
	});
	const newConfig = generateConfig(configData.data);
	await writeConfig(newConfig);
	return {
		action: "settings",
		success: true
	};
};
var actions = {
	"send-test": async (event) => {
		const user = await requireRole(Role.ADMIN);
		await saveSettings(event);
		return {
			action: "send-test",
			...await sendTest(user.email)
		};
	},
	settings: saveSettings
};
var generateConfig = (configData) => {
	const smtpConfig = configData.enableSMTP ? {
		enable: true,
		host: configData.smtpHost,
		port: configData.smtpPort,
		user: configData.smtpUser,
		pass: configData.smtpPass,
		from: configData.smtpFrom,
		fromName: configData.smtpFromName,
		useTls: configData.smtpUseTls,
		ignoreCertCheck: configData.smtpIgnoreCertCheck
	} : {
		enable: false,
		host: configData.smtpHost,
		port: configData.smtpPort,
		user: configData.smtpUser,
		pass: configData.smtpPass,
		from: configData.smtpFrom,
		fromName: configData.smtpFromName,
		useTls: configData.smtpUseTls,
		ignoreCertCheck: configData.smtpIgnoreCertCheck
	};
	const oidcConfig = configData.enableOIDC ? {
		enable: true,
		discoveryUrl: configData.oidcDiscoveryUrl,
		clientId: configData.oidcClientId,
		clientSecret: configData.oidcClientSecret,
		providerName: configData.oidcProviderName,
		autoRedirect: configData.oidcAutoRedirect,
		autoRegister: configData.oidcAutoRegister,
		enableSync: configData.oidcEnableSync,
		disableEmailVerification: configData.oidcDisableEmailVerification,
		nameClaim: configData.oidcNameClaim,
		usernameClaim: configData.oidcUsernameClaim,
		groupsClaim: configData.oidcGroupsClaim,
		adminGroup: configData.oidcAdminGroup
	} : {
		enable: false,
		discoveryUrl: configData.oidcDiscoveryUrl,
		clientId: configData.oidcClientId,
		clientSecret: configData.oidcClientSecret,
		providerName: configData.oidcProviderName,
		autoRedirect: configData.oidcAutoRedirect,
		autoRegister: configData.oidcAutoRegister,
		enableSync: configData.oidcEnableSync,
		disableEmailVerification: configData.oidcDisableEmailVerification,
		nameClaim: configData.oidcNameClaim,
		usernameClaim: configData.oidcUsernameClaim,
		groupsClaim: configData.oidcGroupsClaim,
		adminGroup: configData.oidcAdminGroup
	};
	return {
		enableSignup: configData.enableSignup,
		suggestions: {
			enable: configData.enableSuggestions,
			method: configData.suggestionMethod
		},
		smtp: smtpConfig,
		claims: {
			showName: configData.claimsShowName,
			showNameAcrossGroups: configData.claimsShowNameAcrossGroups,
			showForOwner: configData.claimsShowForOwner,
			showNamePublic: configData.claimsShowNamePublic,
			requireEmail: configData.claimsRequireEmail
		},
		listMode: "standard",
		security: {
			passwordStrength: configData.passwordStrength,
			disablePasswordLogin: configData.disablePasswordLogin
		},
		defaultGroup: configData.defaultGroup,
		enableDefaultListCreation: configData.enableDefaultListCreation,
		allowPublicLists: configData.allowPublicLists,
		anyoneCanDeleteItems: configData.anyoneCanDeleteItems,
		oidc: oidcConfig
	};
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-BhJ5i8Io.js.map
