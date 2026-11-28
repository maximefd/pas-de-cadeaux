import { i as init, m as meterLabel } from './zxcvbn.js-ByAwPR8u.js';
import { g as getConfig } from './config.js-465rpi-p.js';
import { g as getFormatter, a as getLocale } from './i18n.js-D1Rw55oM.js';
import { z } from 'zod';

// src/lib/server/validations.ts
var loadLocale = async (locale_) => {
	try {
		const { default: locale } = await import(
			/* @vite-ignore */
			`zod/v4/locales/${locale_}.js`
);
		z.config(locale());
	} catch {}
};
var passwordZxcvbn = async (minScore) => {
	const $t = await getFormatter();
	if (minScore < 0) return z.string().min(1, $t("errors.password-must-not-be-blank"));
	const zxcvbn = await init(getLocale());
	const message = $t("errors.password-min-strength", { values: { minStrength: $t(meterLabel[minScore]) } });
	return z.string().min(1, $t("errors.password-must-not-be-blank")).refine((pass) => zxcvbn.check(pass).score >= minScore, { message });
};
var getLoginSchema = async () => {
	const $t = await getFormatter();
	return z.object({
		username: z.string().trim().min(1, $t("errors.username-must-not-be-blank")),
		password: z.string().min(1, $t("errors.password-must-not-be-blank"))
	});
};
var getResetPasswordSchema = async () => {
	const { security } = await getConfig();
	return z.object({
		oldPassword: z.string().min(1),
		newPassword: await passwordZxcvbn(security.passwordStrength),
		invalidateSessions: z.coerce.boolean().default(false)
	});
};
var getSignupSchema = async () => {
	const $t = await getFormatter();
	const { security } = await getConfig();
	return z.object({
		name: z.string().trim().min(1, $t("errors.name-must-not-be-blank")),
		username: z.string().trim().min(1, $t("errors.username-must-not-be-blank")),
		email: z.email(),
		password: await passwordZxcvbn(security.passwordStrength),
		tokenId: z.string().optional()
	});
};
var settingSchema = z.object({
	enableSignup: z.coerce.boolean().default(false),
	enableSuggestions: z.coerce.boolean().default(false),
	suggestionMethod: z.enum([
		"surprise",
		"auto-approval",
		"approval"
	]).default("approval"),
	enableSMTP: z.coerce.boolean().default(false),
	smtpHost: z.string().optional(),
	smtpPort: z.coerce.number().optional(),
	smtpUser: z.string().optional(),
	smtpPass: z.string().optional(),
	smtpFrom: z.string().optional(),
	smtpFromName: z.string().optional(),
	smtpUseTls: z.coerce.boolean().default(false),
	smtpIgnoreCertCheck: z.coerce.boolean().default(false),
	claimsShowName: z.coerce.boolean().default(false),
	claimsShowNameAcrossGroups: z.coerce.boolean().default(false),
	claimsShowForOwner: z.coerce.boolean().default(false),
	claimsShowNamePublic: z.coerce.boolean().default(false),
	claimsRequireEmail: z.coerce.boolean().default(false),
	listMode: z.enum(["standard", "registry"]).default("standard"),
	passwordStrength: z.coerce.number().min(-1).max(5).default(2),
	disablePasswordLogin: z.coerce.boolean().default(false),
	defaultGroup: z.string().optional(),
	enableDefaultListCreation: z.coerce.boolean().default(false),
	allowPublicLists: z.coerce.boolean().default(false),
	anyoneCanDeleteItems: z.coerce.boolean().default(false),
	enableOIDC: z.coerce.boolean().default(false),
	oidcDiscoveryUrl: z.string().optional(),
	oidcClientId: z.string().optional(),
	oidcClientSecret: z.string().optional(),
	oidcProviderName: z.string().optional(),
	oidcAutoRedirect: z.coerce.boolean().default(false),
	oidcAutoRegister: z.coerce.boolean().default(false),
	oidcEnableSync: z.coerce.boolean().default(false),
	oidcDisableEmailVerification: z.coerce.boolean().default(false),
	oidcNameClaim: z.string().optional(),
	oidcUsernameClaim: z.string().optional(),
	oidcGroupsClaim: z.string().optional(),
	oidcAdminGroup: z.string().optional()
});
var publicListCreateSchema = z.object({ public: z.boolean().optional() });
var getListPropertiesSchema = () => {
	return z.object({
		name: z.string().trim().nullable(),
		icon: z.string().trim().nullable(),
		iconColor: z.string().trim().nullable(),
		public: z.coerce.boolean().default(false),
		hideOwner: z.coerce.boolean().default(false),
		allowSelfClaims: z.coerce.boolean().default(false),
		notForMe: z.coerce.boolean().default(false),
		description: z.string().max(1e4).nullable(),
		managers: z.string().array().nullable().default([])
	});
};
var listItemsUpdateSchema = z.object({
	itemId: z.number(),
	displayOrder: z.number().nullish()
});
var listItemUpdateSchema = z.object({ approved: z.boolean().nullish() });
var listItemClaimSchema = z.object({
	quantity: z.number().int().min(0),
	claimedById: z.string().nullish(),
	publicClaimedById: z.string().nullish()
});
var listItemClaimUpdateSchema = z.object({
	purchased: z.boolean().nullish(),
	quantity: z.number().int().min(0).optional()
});
var getItemCreateSchema = async () => {
	const $t = await getFormatter();
	return z.object({
		url: z.url().optional(),
		name: z.string(),
		price: z.string().optional(),
		currency: z.string().optional(),
		quantity: z.coerce.number().max(999).optional().transform((v) => v === void 0 ? null : v),
		imageUrl: z.string().optional(),
		image: z.instanceof(File).optional(),
		mostWanted: z.coerce.boolean().default(false),
		note: z.string().optional(),
		lists: z.union([z.string(), z.tuple([z.string()], z.string())], { error: $t("errors.an-item-must-be-added-to-at-least-one-list") }).transform((v) => typeof v === "string" ? [v] : v)
	});
};
var getItemUpdateSchema = async () => {
	return getItemCreateSchema().then((itemCreateSchema) => itemCreateSchema.extend(z.object({
		url: z.string().nullish().default(null),
		imageUrl: z.string().nullish().default(null),
		note: z.string().nullish().default(null),
		lists: z.optional(itemCreateSchema.shape.lists)
	}).shape));
};
var extractFormData = (formData) => {
	return [...formData.entries().filter(([_k, v]) => v.toString())].reduce((data, [key, value]) => ({
		...data,
		[key]: key in data ? Array.isArray(data[key]) ? [...data[key], value] : [data[key], value] : value
	}), {});
};
var createPublicUserSchema = z.object({
	groupId: z.string(),
	username: z.email().optional(),
	name: z.string().min(1).optional()
});

export { getItemUpdateSchema as a, getItemCreateSchema as b, getListPropertiesSchema as c, getLoginSchema as d, extractFormData as e, getSignupSchema as f, getResetPasswordSchema as g, listItemClaimUpdateSchema as h, listItemsUpdateSchema as i, listItemUpdateSchema as j, listItemClaimSchema as k, loadLocale as l, createPublicUserSchema as m, publicListCreateSchema as p, settingSchema as s };
//# sourceMappingURL=validations.js-uFn0YlIJ.js.map
