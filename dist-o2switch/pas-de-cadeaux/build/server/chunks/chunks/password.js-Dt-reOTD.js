import { decodeHex, encodeHexLowerCase } from '@oslojs/encoding';
import { scryptAsync } from '@noble/hashes/scrypt.js';
import { constantTimeEqual } from '@oslojs/crypto/subtle';

// src/lib/server/password.ts
var generateScryptKey = async (data, salt, blockSize = 16) => {
	const encodedData = new TextEncoder().encode(data);
	const encodedSalt = new TextEncoder().encode(salt);
	const keyUint8Array = await scryptAsync(encodedData, encodedSalt, {
		N: 16384,
		r: blockSize,
		p: 1,
		dkLen: 64
	});
	return new Uint8Array(keyUint8Array);
};
var hashPassword = async (password) => {
	const salt = encodeHexLowerCase(crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(16)));
	const key = await generateScryptKey(password.normalize("NFKC"), salt);
	return `s2:${salt}:${encodeHexLowerCase(key)}`;
};
var verifyPasswordHash = async (hash, password) => {
	const parts = hash.split(":");
	if (parts.length === 2) {
		const [salt, key] = parts;
		const targetKey = await generateScryptKey(password.normalize("NFKC"), salt, 8);
		return constantTimeEqual(targetKey, decodeHex(key));
	}
	if (parts.length !== 3) return false;
	const [version, salt, key] = parts;
	if (version === "s2") {
		const targetKey = await generateScryptKey(password.normalize("NFKC"), salt);
		return constantTimeEqual(targetKey, decodeHex(key));
	}
	return false;
};

export { hashPassword as h, verifyPasswordHash as v };
//# sourceMappingURL=password.js-Dt-reOTD.js.map
