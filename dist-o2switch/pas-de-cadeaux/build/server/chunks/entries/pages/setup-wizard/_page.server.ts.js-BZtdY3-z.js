import { g as getConfig } from '../../../chunks/config.js-465rpi-p.js';
import { c as client } from '../../../chunks/prisma.js-iNNVyVix.js';
import { B as redirect } from '../../../chunks/utils.js-CAPFIGDr.js';

// src/routes/setup-wizard/+page.server.ts
var load = async ({ url }) => {
	if (await client.user.count() > 0) return redirect(302, url.searchParams.get("redirectTo") ?? "/");
	if ((await getConfig()).security.disablePasswordLogin) return redirect(302, "/login");
	return {};
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-BZtdY3-z.js.map
