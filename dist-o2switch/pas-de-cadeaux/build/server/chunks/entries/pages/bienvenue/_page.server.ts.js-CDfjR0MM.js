import { b as requireLogin } from '../../../chunks/auth.js-C7-cSOnT.js';
import { c as client } from '../../../chunks/prisma.js-iNNVyVix.js';
import { B as redirect } from '../../../chunks/utils.js-CAPFIGDr.js';

// src/routes/bienvenue/+page.server.ts
var load = (async () => {
	if (requireLogin().onboardedAt) redirect(302, "/lists");
	return {};
});
var actions = { start: async () => {
	const user = requireLogin();
	await client.user.update({
		where: { id: user.id },
		data: { onboardedAt: /* @__PURE__ */ new Date() }
	});
	redirect(303, "/wishlists/me");
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-CDfjR0MM.js.map
