import { b as private_env } from './shared-server.js-B6_G0tAr.js';
import { c as client } from './prisma.js-iNNVyVix.js';

// src/lib/server/config.ts
var GLOBAL = "global";
var ConfigKey = /* @__PURE__ */ function(ConfigKey) {
	ConfigKey["SIGNUP_ENABLE"] = "enableSignup";
	ConfigKey["SUGGESTIONS_ENABLE"] = "suggestions.enable";
	ConfigKey["SUGGESTIONS_METHOD"] = "suggestions.method";
	ConfigKey["SMTP_ENABLE"] = "smtp.enable";
	ConfigKey["SMTP_HOST"] = "smtp.host";
	ConfigKey["SMTP_PORT"] = "smtp.port";
	ConfigKey["SMTP_USER"] = "smtp.user";
	ConfigKey["SMTP_PASS"] = "smtp.pass";
	ConfigKey["SMTP_FROM"] = "smtp.from";
	ConfigKey["SMTP_FROM_NAME"] = "smtp.fromName";
	ConfigKey["SMTP_USE_TLS"] = "smtp.useTls";
	ConfigKey["SMTP_IGNORE_CERT_CHECK"] = "smtp.ignoreCertCheck";
	ConfigKey["CLAIMS_SHOW_NAME"] = "claims.showName";
	ConfigKey["ClAIMS_SHOW_NAME_ACROSS_GROUPS"] = "claims.showNameAcrossGroups";
	ConfigKey["CLAIMS_SHOW_FOR_OWNER"] = "claims.showForOwner";
	ConfigKey["CLAIMS_SHOW_NAME_PUBLIC"] = "claims.showNamePublic";
	ConfigKey["CLAIMS_REQUIRE_EMAIL"] = "claims.requireEmail";
	ConfigKey["LIST_MODE"] = "listMode";
	ConfigKey["SECURITY_PASSWORD_STRENGTH"] = "security.passwordStrength";
	ConfigKey["SECURITY_DISABLE_PASSWORD_LOGIN"] = "security.disablePasswordLogin";
	ConfigKey["DEFAULT_GROUP"] = "defaultGroup";
	ConfigKey["ENABLE_DEFAULT_LIST_CREATION"] = "enableDefaultListCreation";
	ConfigKey["ALLOW_PUBLIC_LISTS"] = "allowPublicLists";
	ConfigKey["ANYONE_CAN_DELETE_ITEMS"] = "anyoneCanDeleteItems";
	ConfigKey["OIDC_ENABLE"] = "oidc.enable";
	ConfigKey["OIDC_DISCOVERY_URL"] = "oidc.discoveryUrl";
	ConfigKey["OIDC_CLIENT_ID"] = "oidc.clientId";
	ConfigKey["OIDC_CLIENT_SECRET"] = "oidc.clientSecret";
	ConfigKey["OIDC_PROVIDER_NAME"] = "oidc.providerName";
	ConfigKey["OIDC_AUTO_REDIRECT"] = "oidc.autoRedirect";
	ConfigKey["OIDC_AUTO_REGISTER"] = "oidc.autoRegister";
	ConfigKey["OIDC_ENABLE_SYNC"] = "oidc.enableSync";
	ConfigKey["OIDC_DISABLE_EMAIL_VERIFICATION"] = "oidc.disableEmailVerification";
	ConfigKey["OIDC_NAME_CLAIM"] = "oidc.nameClaim";
	ConfigKey["OIDC_USERNAME_CLAIM"] = "oidc.usernameClaim";
	ConfigKey["OIDC_GROUPS_CLAIM"] = "oidc.groupsClaim";
	ConfigKey["OIDC_ADMIN_GROUP"] = "oidc.adminGroup";
	return ConfigKey;
}(ConfigKey || {});
var ENV_CONFIG_KEYS = [
	ConfigKey.SIGNUP_ENABLE,
	ConfigKey.SECURITY_DISABLE_PASSWORD_LOGIN,
	ConfigKey.OIDC_ENABLE,
	ConfigKey.OIDC_DISCOVERY_URL,
	ConfigKey.OIDC_CLIENT_ID,
	ConfigKey.OIDC_CLIENT_SECRET,
	ConfigKey.OIDC_PROVIDER_NAME,
	ConfigKey.OIDC_AUTO_REDIRECT,
	ConfigKey.OIDC_AUTO_REGISTER,
	ConfigKey.OIDC_ENABLE_SYNC,
	ConfigKey.OIDC_DISABLE_EMAIL_VERIFICATION,
	ConfigKey.OIDC_NAME_CLAIM,
	ConfigKey.OIDC_USERNAME_CLAIM,
	ConfigKey.OIDC_GROUPS_CLAIM,
	ConfigKey.OIDC_ADMIN_GROUP
];
var toEnvName = (key) => key.replace(/([a-z0-9])([A-Z])/g, "$1_$2").replace(/\./g, "_").toUpperCase();
var isDefined = (val) => val !== null && val !== void 0;
var booleanTransformer = (val) => val === "true" ? true : val === "false" ? false : void 0;
var stringTransformer = (val) => val ?? void 0;
var maskableStringTransformer = (val, shouldMask = false) => isDefined(val) ? maskable(val, shouldMask) : void 0;
var numberTransformer = (val) => isDefined(val) ? Number(val) : void 0;
var transformers = {
	enableSignup: booleanTransformer,
	"suggestions.enable": booleanTransformer,
	"suggestions.method": stringTransformer,
	"smtp.enable": booleanTransformer,
	"smtp.host": stringTransformer,
	"smtp.port": numberTransformer,
	"smtp.user": stringTransformer,
	"smtp.pass": maskableStringTransformer,
	"smtp.from": stringTransformer,
	"smtp.fromName": stringTransformer,
	"smtp.useTls": booleanTransformer,
	"smtp.ignoreCertCheck": booleanTransformer,
	"claims.showName": booleanTransformer,
	"claims.showNameAcrossGroups": booleanTransformer,
	"claims.showForOwner": booleanTransformer,
	"claims.showNamePublic": booleanTransformer,
	"claims.requireEmail": booleanTransformer,
	listMode: stringTransformer,
	"security.passwordStrength": numberTransformer,
	"security.disablePasswordLogin": booleanTransformer,
	defaultGroup: stringTransformer,
	enableDefaultListCreation: booleanTransformer,
	allowPublicLists: booleanTransformer,
	anyoneCanDeleteItems: booleanTransformer,
	"oidc.enable": booleanTransformer,
	"oidc.clientId": stringTransformer,
	"oidc.clientSecret": maskableStringTransformer,
	"oidc.discoveryUrl": stringTransformer,
	"oidc.providerName": stringTransformer,
	"oidc.autoRedirect": booleanTransformer,
	"oidc.autoRegister": booleanTransformer,
	"oidc.enableSync": booleanTransformer,
	"oidc.disableEmailVerification": booleanTransformer,
	"oidc.nameClaim": stringTransformer,
	"oidc.usernameClaim": stringTransformer,
	"oidc.groupsClaim": stringTransformer,
	"oidc.adminGroup": stringTransformer
};
var getDefaultConfig = () => ({
	enableSignup: true,
	suggestions: {
		enable: true,
		method: "surprise"
	},
	smtp: {
		enable: false,
		useTls: false,
		ignoreCertCheck: false
	},
	claims: {
		showName: true,
		showNameAcrossGroups: false,
		showForOwner: false,
		showNamePublic: false,
		requireEmail: false
	},
	listMode: "standard",
	security: {
		passwordStrength: -1,
		disablePasswordLogin: false
	},
	enableDefaultListCreation: true,
	allowPublicLists: false,
	anyoneCanDeleteItems: false,
	oidc: { enable: false }
});
function buildConfig(configMap, includeSensitive = false) {
	const config = {};
	for (const [key, value] of Object.entries(configMap)) if (key in transformers) {
		const transformer = transformers[key];
		setDeep(config, key.split("."), transformer(value, !includeSensitive));
	}
	return deepMerge(getDefaultConfig(), config);
}
function setDeep(obj, path, value) {
	let current = obj;
	for (let i = 0; i < path.length - 1; i++) {
		if (!(path[i] in current)) current[path[i]] = {};
		current = current[path[i]];
	}
	current[path[path.length - 1]] = value;
}
function deepMerge(target, source) {
	for (const key in source) if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
		if (!target[key]) target[key] = {};
		deepMerge(target[key], source[key]);
	} else target[key] = source[key];
	return target;
}
function flatten(obj, prefix = "", result = {}) {
	for (const [key, value] of Object.entries(obj)) {
		const fullKey = prefix ? `${prefix}.${key}` : key;
		if (value === null || value === void 0) result[fullKey] = value;
		else if (typeof value === "object" && !Array.isArray(value)) flatten(value, fullKey, result);
		else if (typeof value === "number" || typeof value === "boolean") result[fullKey] = value.toString();
		else result[fullKey] = value;
	}
	return result;
}
var getEnvConfigMap = () => {
	const configMap = {};
	for (const key of ENV_CONFIG_KEYS) {
		const value = private_env[toEnvName(key)];
		if (value !== void 0 && value !== "") configMap[key] = value;
	}
	return configMap;
};
var getEnvManagedKeys = () => Object.keys(getEnvConfigMap());
var getConfig = async (groupId, includeSensitive = false) => {
	const configItems = await client.systemConfig.findMany({ where: { groupId: "global" } });
	let configMap = {};
	for (const { key, value } of configItems) configMap[key] = value;
	let groupConfigMap = {};
	if (groupId) groupConfigMap = await getGroupConfig(groupId);
	configMap = {
		...configMap,
		...groupConfigMap,
		...getEnvConfigMap()
	};
	return buildConfig(configMap, includeSensitive);
};
var getGroupConfig = async (groupId) => {
	const configItems = await client.systemConfig.findMany({ where: { groupId } });
	const configMap = {};
	for (const { key, value } of configItems) configMap[key] = value;
	return configMap;
};
var writeConfig = async (config, groupId = GLOBAL) => {
	const configMap = flatten(config);
	const envManagedKeys = getEnvManagedKeys();
	await client.$transaction(Object.entries(configMap).filter(([key]) => !envManagedKeys.includes(key)).map(([key, value]) => client.systemConfig.upsert({
		where: { key_groupId: {
			key,
			groupId
		} },
		create: {
			key,
			groupId,
			value
		},
		update: { value }
	})));
};
var maskable = (value, mask) => {
	return mask ? "*****" : value;
};

export { getEnvManagedKeys as a, getConfig as g, writeConfig as w };
//# sourceMappingURL=config.js-465rpi-p.js.map
