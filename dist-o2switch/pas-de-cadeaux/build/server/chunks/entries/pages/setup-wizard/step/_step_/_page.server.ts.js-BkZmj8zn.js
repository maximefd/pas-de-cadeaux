import { g as getConfig } from '../../../../../chunks/config.js-465rpi-p.js';
import { c as client } from '../../../../../chunks/prisma.js-iNNVyVix.js';
import { r as resolve } from '../../../../../chunks/paths.js-BuehRTbY.js';
import { B as redirect } from '../../../../../chunks/utils.js-CAPFIGDr.js';

// src/routes/setup-wizard/step/[step]/+page.server.ts
var load = async ({ params }) => {
	const userCount = await client.user.count();
	const step = Number.parseInt(params.step);
	if (userCount === 0 && step > 1) return redirect(302, resolve("/setup-wizard/step/1"));
	const [config, groups] = await Promise.all([getConfig(), client.group.findMany()]);
	if (userCount === 0 && config.security.disablePasswordLogin) return redirect(302, resolve("/login"));
	if (userCount > 0 && step === 1) return redirect(302, resolve("/setup-wizard/step/2"));
	return {
		config,
		groups
	};
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-BkZmj8zn.js.map
