import { b as private_env } from './shared-server.js-B6_G0tAr.js';
import pino from 'pino';

// src/lib/server/logger.ts
async function resolveStream() {}
var stream = await resolveStream();
var options = {
	level: private_env.LOG_LEVEL ?? "info",
	formatters: { level(label) {
		return { level: label.toUpperCase() };
	} },
	base: void 0,
	timestamp: pino.stdTimeFunctions.isoTime
};
var logger = pino(options, stream);
var oidcLogger = logger.child({}, { msgPrefix: "[OIDC] " });

export { logger as l, oidcLogger as o };
//# sourceMappingURL=logger.js-LYoWHWpz.js.map
