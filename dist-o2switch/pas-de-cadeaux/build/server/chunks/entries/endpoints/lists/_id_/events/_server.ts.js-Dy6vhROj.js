import { i as itemEmitter } from '../../../../../chunks/emitters.js-oJjSRpbk.js';
import { l as logger } from '../../../../../chunks/logger.js-LYoWHWpz.js';
import { g as getConfig } from '../../../../../chunks/config.js-465rpi-p.js';
import { g as getFormatter } from '../../../../../chunks/i18n.js-D1Rw55oM.js';
import { b as getById } from '../../../../../chunks/list.js-B0L9113F.js';
import { g as getActiveMembership } from '../../../../../chunks/group-membership.js-CDZ-5kqi.js';
import { a as ItemUpdateHandler, b as ItemCreateHandler, c as ItemDeleteHandler, d as ItemsUpdateHandler } from '../../../../../chunks/events.js-DQSXhMm7.js';
import { x as error } from '../../../../../chunks/utils.js-CAPFIGDr.js';
import 'node:events';
import '../../../../../chunks/shared-server.js-B6_G0tAr.js';
import 'pino';
import '../../../../../chunks/prisma.js-iNNVyVix.js';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import '@prisma/adapter-better-sqlite3';
import '../../../../../chunks/routing.js-DMTqwvGY.js';
import '../../../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../../../chunks/index-server.js-CIVHNbBm.js';
import '../../../../../chunks/shared.js-Cb68JbUk.js';
import '../../../../../chunks/i18n2.js-1SlG2bAu.js';
import '../../../../../chunks/index-server2.js-DZFYXfYm.js';
import '../../../../../chunks/sort-filter-util.js-B1LxSaRF.js';
import '../../../../../chunks/item-mapper.js-DUyKoq81.js';
import '../../../../../chunks/items.js-C_2ihKyH.js';
import '../../../../../chunks/comparators.js-DkswRRoE.js';
import '@paralleldrive/cuid2';

// src/lib/server/events/sse.ts
function createSSE(retry = 0) {
	const { readable, writable } = new TransformStream({
		start(ctr) {
			if (retry > 0) ctr.enqueue(`retry: ${retry}\n\n`);
		},
		transform({ event, data }, ctr) {
			let msg = data?.id ? `id: ${String(data.id)}\n` : ": hi\n\n";
			if (event) msg += `event: ${event}\n`;
			if (typeof data === "string") msg += "data: " + data.trim().replace(/\n+/gm, "\ndata: ") + "\n\n";
			else msg += `data: ${JSON.stringify(data)}\n\n`;
			ctr.enqueue(msg);
		}
	});
	const writer = writable.getWriter();
	return {
		readable,
		async subscribeToEvent(emitter, handler) {
			function listener(data) {
				if (handler.predicate(data)) writer.write({
					event: handler.getEventId(),
					data: handler.handle(data)
				});
			}
			emitter.on(handler.getEventId(), listener);
			await writer.closed.catch((err) => {
				if (err) logger.error({ err });
			});
			emitter.off(handler.getEventId(), listener);
		}
	};
}
// src/routes/lists/[id]/events/+server.ts
var GET = (async ({ locals, params }) => {
	const $t = await getFormatter();
	const list = await getById(params.id);
	const config = await getConfig(list?.groupId);
	if (!locals.user) {
		if (!list || !list.public) return new Response();
	} else {
		const activeMembership = await getActiveMembership(locals.user);
		if (!list || !list.public && list.groupId !== activeMembership.groupId) error(404, $t("errors.list-not-found"));
	}
	if (config.suggestions.enable && config.suggestions.method === "surprise" && locals.user && (list.owner.id === locals.user.id || list.managers.find(({ userId }) => userId === locals.user.id)) && !(list.allowSelfClaims || list.notForMe)) return new Response();
	const hideOffered = !!locals.user && (list.owner.id === locals.user.id || list.managers.some(({ userId }) => userId === locals.user.id)) && !(list.allowSelfClaims || list.notForMe || config.claims.showForOwner);
	const { readable, subscribeToEvent } = createSSE();
	subscribeToEvent(itemEmitter, new ItemUpdateHandler(params.id, hideOffered));
	subscribeToEvent(itemEmitter, new ItemCreateHandler(params.id, hideOffered));
	subscribeToEvent(itemEmitter, new ItemDeleteHandler(params.id));
	subscribeToEvent(itemEmitter, new ItemsUpdateHandler(params.id));
	return new Response(readable, { headers: {
		"Cache-Control": "no-cache",
		"Content-Type": "text/event-stream",
		"X-Accel-Buffering": "no"
	} });
});

export { GET };
//# sourceMappingURL=_server.ts.js-Dy6vhROj.js.map
