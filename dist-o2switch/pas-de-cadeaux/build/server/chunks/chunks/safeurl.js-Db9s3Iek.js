import { l as logger$1 } from './logger.js-LYoWHWpz.js';
import { b as private_env } from './shared-server.js-B6_G0tAr.js';
import { lookup } from 'dns/promises';
import ipaddr from 'ipaddr.js';

// src/lib/server/safeurl.ts
var logger = logger$1.child({}, { msgPrefix: "[SAFEURL] " });
var allowedProtocols = /* @__PURE__ */ new Set(["https:", "http:"]);
var allowedIps = parseAllowableIps();
async function getSafeUrl(url) {
	let parsedUrl;
	try {
		parsedUrl = new URL(url);
	} catch {
		logger.debug({ url }, "Not a valid url");
		return null;
	}
	logger.debug({ parsedUrl }, "Parsed url");
	if (!allowedProtocols.has(parsedUrl.protocol)) {
		logger.debug({ url }, "Url does not have http: or https: protocol");
		return null;
	}
	let ip;
	if (!ipaddr.isValid(parsedUrl.hostname)) ip = (await lookup(parsedUrl.hostname)).address;
	else ip = parsedUrl.hostname;
	try {
		const processedIp = ipaddr.process(ip);
		logger.debug({
			ip: processedIp.toString(),
			type: processedIp.kind(),
			range: processedIp.range()
		}, "Resolved IP address");
		const normalizedUrl = new URL(parsedUrl.protocol + "//" + parsedUrl.host + parsedUrl.pathname + parsedUrl.search + parsedUrl.hash);
		if (processedIp.range() !== "unicast") {
			if (ipaddr.subnetMatch(processedIp, allowedIps) === "allowList") {
				logger.debug({
					url,
					ip: processedIp.toString()
				}, "Url resolves to a IP address within the allow list");
				try {
					return normalizedUrl;
				} catch {
					return null;
				}
			}
			logger.debug({
				url,
				ip: processedIp.toString()
			}, "Url resolves to an IP address that is not in the public ranges");
			return null;
		}
		return normalizedUrl;
	} catch (err) {
		logger.error({ err }, "Error while checking IP against private ranges");
	}
	return null;
}
function parseAllowableIps() {
	return { allowList: (private_env.ALLOWED_IPS?.split(",") || []).map((ip) => {
		if (ipaddr.isValid(ip)) return [ipaddr.parse(ip), 32];
		else if (ipaddr.isValidCIDR(ip)) return ipaddr.parseCIDR(ip);
		else {
			logger.warn({ ip }, "IP address specified in ALLOWED_IPS is not a valid IPv4 or IPv6 address or CIDR");
			return null;
		}
	}).filter((ip) => ip !== null) };
}

export { getSafeUrl as g };
//# sourceMappingURL=safeurl.js-Db9s3Iek.js.map
