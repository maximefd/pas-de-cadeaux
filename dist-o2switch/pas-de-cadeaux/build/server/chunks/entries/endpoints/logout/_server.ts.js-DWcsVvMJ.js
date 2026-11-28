import { e as invalidateSession, d as deleteSessionTokenCookie } from '../../../chunks/auth.js-C7-cSOnT.js';
import '../../../chunks/prisma.js-iNNVyVix.js';
import '../../../chunks/shared-server.js-B6_G0tAr.js';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import '@prisma/adapter-better-sqlite3';
import '../../../chunks/i18n.js-D1Rw55oM.js';
import '../../../chunks/routing.js-DMTqwvGY.js';
import '../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../chunks/index-server.js-CIVHNbBm.js';
import '../../../chunks/utils.js-CAPFIGDr.js';
import '../../../chunks/shared.js-Cb68JbUk.js';
import '../../../chunks/i18n2.js-1SlG2bAu.js';
import '../../../chunks/index-server2.js-DZFYXfYm.js';
import '../../../chunks/schema.js-_174nGak.js';
import '@oslojs/encoding';
import '@oslojs/crypto/sha2';

// src/routes/logout/+server.ts
var POST = async ({ locals, cookies }) => {
	if (!locals.session) return new Response(null, { status: 401 });
	await invalidateSession(locals.session?.id);
	deleteSessionTokenCookie(cookies);
	cookies.set("direct", "1", {
		path: "/",
		httpOnly: true,
		maxAge: 600,
		sameSite: "lax"
	});
	return new Response(null, { status: 201 });
};

export { POST };
//# sourceMappingURL=_server.ts.js-DWcsVvMJ.js.map
