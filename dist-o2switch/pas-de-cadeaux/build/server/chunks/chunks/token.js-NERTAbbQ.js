import { b as private_env } from './shared-server.js-B6_G0tAr.js';

// src/lib/server/token.ts
var { randomBytes, createHash } = await import('node:crypto');
var generateToken = () => {
	return new Promise((resolve, reject) => randomBytes(48, (err, buffer) => {
		if (err) reject(err.message);
		else resolve(buffer.toString("hex"));
	}));
};
var hashToken = (token) => {
	return createHash("sha3-256").update(token).digest("hex");
};
var tokenExpiresAt = (tokenDate) => {
	const expiresIn = (private_env.TOKEN_TIME ? Number.parseInt(private_env.TOKEN_TIME) : 72) * 36e5;
	return new Date(tokenDate.getTime() + expiresIn);
};
var isTokenTimeValid = (tokenDate) => {
	return Date.now() < tokenExpiresAt(tokenDate).getTime();
};

export { generateToken as g, hashToken as h, isTokenTimeValid as i, tokenExpiresAt as t };
//# sourceMappingURL=token.js-NERTAbbQ.js.map
