import { i as initial_base, b as base } from './internal.js-B0ORXlkz.js';
import { i as resolve_route, c as add_data_suffix } from './routing.js-DMTqwvGY.js';
import './internal2.js-CM4IiAcJ.js';
import { z as try_get_request_store } from './utils.js-CAPFIGDr.js';

// node_modules/.pnpm/@sveltejs+kit@2.70.3_@sveltejs+vite-plugin-svelte@7.3.1_svelte@5.57.3_@typescript-eslin_d0283edb8bfb3521ad55437f1ba719ce/node_modules/@sveltejs/kit/src/runtime/app/paths/server.js
/** @type {import('./client.js').resolve} */
function resolve(id, params) {
	if (!id.startsWith("/")) throw new Error(`Cannot use \`resolve(...)\` with a non-absolute pathname or route ID (got "${id}"). \`resolve\` is only for internal pathnames and route IDs; external URLs should be used directly.`);
	const resolved = resolve_route(id, params);
	{
		const store = try_get_request_store();
		if (store && !store.state.prerendering?.fallback) return ((store.event.isDataRequest ? add_data_suffix(store.event.url.pathname) : store.event.url.pathname).slice(initial_base.length).split("/").slice(2).map(() => "..").join("/") || ".") + resolved;
	}
	return base + resolved;
}

export { resolve as r };
//# sourceMappingURL=paths.js-BuehRTbY.js.map
