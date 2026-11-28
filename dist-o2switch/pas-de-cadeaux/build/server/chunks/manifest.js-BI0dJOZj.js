const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["android-chrome-192x192.png","android-chrome-512x512.png","apple-touch-icon.png","favicon-16x16.png","favicon-32x32.png","favicon.ico","fonts/Lato-Black.woff","fonts/Lato-Black.woff2","fonts/Lato-BlackItalic.woff","fonts/Lato-BlackItalic.woff2","fonts/Lato-Bold.woff","fonts/Lato-Bold.woff2","fonts/Lato-BoldItalic.woff","fonts/Lato-BoldItalic.woff2","fonts/Lato-Hairline.woff","fonts/Lato-Hairline.woff2","fonts/Lato-HairlineItalic.woff","fonts/Lato-HairlineItalic.woff2","fonts/Lato-Italic.woff","fonts/Lato-Italic.woff2","fonts/Lato-Light.woff","fonts/Lato-Light.woff2","fonts/Lato-LightItalic.woff","fonts/Lato-LightItalic.woff2","fonts/Lato-Regular.woff","fonts/Lato-Regular.woff2","fonts/TitanOne-OFL.txt","fonts/TitanOne-Regular.woff2","logo.webp","maskable-512x512.png","mstile-150x150.png"]),
	mimeTypes: {".png":"image/png",".woff":"font/woff",".woff2":"font/woff2",".txt":"text/plain",".webp":"image/webp"},
	_: {
		client: {start:"_app/immutable/entry/start.BArqfj0R.js",app:"_app/immutable/entry/app.C6I9YdZ7.js",imports:["_app/immutable/entry/start.BArqfj0R.js","_app/immutable/chunks/BfIDnZLD.js","_app/immutable/chunks/DiA0gTYY.js","_app/immutable/chunks/C3RqfL3Y.js","_app/immutable/entry/app.C6I9YdZ7.js","_app/immutable/chunks/DiA0gTYY.js","_app/immutable/chunks/CMISW0EB.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:true},
		nodes: [
			__memo(() => import('./nodes/0.js-CRB79RDj.js')),
			__memo(() => import('./nodes/1.js-D7AcRnae.js')),
			__memo(() => import('./nodes/2.js-DpwFOfDt.js')),
			__memo(() => import('./nodes/3.js-CoUXNv8i.js')),
			__memo(() => import('./nodes/4.js-Bv3qQYRk.js')),
			__memo(() => import('./nodes/5.js-CitiShiw.js')),
			__memo(() => import('./nodes/6.js-CIYD27aI.js')),
			__memo(() => import('./nodes/7.js-BfmxV-WE.js')),
			__memo(() => import('./nodes/8.js-BQwYOGbh.js')),
			__memo(() => import('./nodes/9.js-DfduEfi7.js')),
			__memo(() => import('./nodes/10.js-BJkxOUsw.js')),
			__memo(() => import('./nodes/11.js-DADIXE15.js')),
			__memo(() => import('./nodes/12.js-DpNKzJio.js')),
			__memo(() => import('./nodes/13.js-DqlLjwWn.js')),
			__memo(() => import('./nodes/14.js-COjbPv5d.js')),
			__memo(() => import('./nodes/15.js-CqgbZ1PI.js')),
			__memo(() => import('./nodes/16.js-BfdNYjz5.js')),
			__memo(() => import('./nodes/17.js-CEtKujqL.js')),
			__memo(() => import('./nodes/18.js-HwyjJoR7.js')),
			__memo(() => import('./nodes/19.js-C_wVLjWA.js')),
			__memo(() => import('./nodes/20.js-ZdWxKWwQ.js')),
			__memo(() => import('./nodes/21.js-4H-KuAyZ.js')),
			__memo(() => import('./nodes/22.js-Cisgng_u.js')),
			__memo(() => import('./nodes/23.js-DrRmH0T7.js')),
			__memo(() => import('./nodes/24.js-Bhd7HIGi.js')),
			__memo(() => import('./nodes/25.js-VXSv6saB.js')),
			__memo(() => import('./nodes/26.js-D4cbzx97.js')),
			__memo(() => import('./nodes/27.js-BV3zevUp.js')),
			__memo(() => import('./nodes/28.js-DrQNWWik.js')),
			__memo(() => import('./nodes/29.js-CWdryWGT.js')),
			__memo(() => import('./nodes/30.js-COaJ90cM.js')),
			__memo(() => import('./nodes/31.js-DvnglMYe.js')),
			__memo(() => import('./nodes/32.js-BESVtw9i.js')),
			__memo(() => import('./nodes/33.js-SIorEh64.js')),
			__memo(() => import('./nodes/34.js-Q-vAyM2T.js')),
			__memo(() => import('./nodes/35.js-vjpao7hk.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/account",
				pattern: /^\/account\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/admin",
				pattern: /^\/admin\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/admin/about",
				pattern: /^\/admin\/about\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/admin/actions",
				pattern: /^\/admin\/actions\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/admin/groups",
				pattern: /^\/admin\/groups\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/admin/groups/[groupId]",
				pattern: /^\/admin\/groups\/([^/]+?)\/?$/,
				params: [{"name":"groupId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/admin/groups/[groupId]/members",
				pattern: /^\/admin\/groups\/([^/]+?)\/members\/?$/,
				params: [{"name":"groupId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/admin/groups/[groupId]/settings",
				pattern: /^\/admin\/groups\/([^/]+?)\/settings\/?$/,
				params: [{"name":"groupId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/admin/settings",
				pattern: /^\/admin\/settings\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/admin/users",
				pattern: /^\/admin\/users\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/admin/users/[id]",
				pattern: /^\/admin\/users\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/aide",
				pattern: /^\/aide\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/bienvenue",
				pattern: /^\/bienvenue\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/claims",
				pattern: /^\/claims\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/forgot-password",
				pattern: /^\/forgot-password\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/group-error",
				pattern: /^\/group-error\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/items/import",
				pattern: /^\/items\/import\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 22 },
				endpoint: null
			},
			{
				id: "/items/[itemId]/edit",
				pattern: /^\/items\/([^/]+?)\/edit\/?$/,
				params: [{"name":"itemId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/lists",
				pattern: /^\/lists\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 23 },
				endpoint: null
			},
			{
				id: "/lists/create",
				pattern: /^\/lists\/create\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 27 },
				endpoint: null
			},
			{
				id: "/lists/[id]",
				pattern: /^\/lists\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 24 },
				endpoint: null
			},
			{
				id: "/lists/[id]/create-item",
				pattern: /^\/lists\/([^/]+?)\/create-item\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 25 },
				endpoint: null
			},
			{
				id: "/lists/[id]/events",
				pattern: /^\/lists\/([^/]+?)\/events\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/lists/_id_/events/_server.ts.js-Dy6vhROj.js'))
			},
			{
				id: "/lists/[id]/manage",
				pattern: /^\/lists\/([^/]+?)\/manage\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 26 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 28 },
				endpoint: null
			},
			{
				id: "/login/oidc",
				pattern: /^\/login\/oidc\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/login/oidc/_server.ts.js-DllQj8sR.js'))
			},
			{
				id: "/login/oidc/callback",
				pattern: /^\/login\/oidc\/callback\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/login/oidc/callback/_server.ts.js-Dypqmsqf.js'))
			},
			{
				id: "/logout",
				pattern: /^\/logout\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/logout/_server.ts.js-DWcsVvMJ.js'))
			},
			{
				id: "/pdc/assets/[id]",
				pattern: /^\/pdc\/assets\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/pdc/assets/_id_/_server.ts.js-BYNYYvfF.js'))
			},
			{
				id: "/pdc/claims/[claimId]",
				pattern: /^\/pdc\/claims\/([^/]+?)\/?$/,
				params: [{"name":"claimId","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/pdc/claims/_claimId_/_server.ts.js-BkoTFpFT.js'))
			},
			{
				id: "/pdc/groups",
				pattern: /^\/pdc\/groups\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/pdc/groups/_server.ts.js-B5tp6Ac4.js'))
			},
			{
				id: "/pdc/groups/[groupId]",
				pattern: /^\/pdc\/groups\/([^/]+?)\/?$/,
				params: [{"name":"groupId","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/pdc/groups/_groupId_/_server.ts.js-DuQSscCD.js'))
			},
			{
				id: "/pdc/groups/[groupId]/users/[userId]",
				pattern: /^\/pdc\/groups\/([^/]+?)\/users\/([^/]+?)\/?$/,
				params: [{"name":"groupId","optional":false,"rest":false,"chained":false},{"name":"userId","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/pdc/groups/_groupId_/users/_userId_/_server.ts.js-B-sN9LXp.js'))
			},
			{
				id: "/pdc/items",
				pattern: /^\/pdc\/items\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/pdc/items/_server.ts.js-RxvpPV71.js'))
			},
			{
				id: "/pdc/items/[itemId]",
				pattern: /^\/pdc\/items\/([^/]+?)\/?$/,
				params: [{"name":"itemId","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/pdc/items/_itemId_/_server.ts.js-LfctBBrw.js'))
			},
			{
				id: "/pdc/lists/[listId]",
				pattern: /^\/pdc\/lists\/([^/]+?)\/?$/,
				params: [{"name":"listId","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/pdc/lists/_listId_/_server.ts.js-CxFn2ybb.js'))
			},
			{
				id: "/pdc/lists/[listId]/items",
				pattern: /^\/pdc\/lists\/([^/]+?)\/items\/?$/,
				params: [{"name":"listId","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/pdc/lists/_listId_/items/_server.ts.js-CVamTYeX.js'))
			},
			{
				id: "/pdc/lists/[listId]/items/[itemId]",
				pattern: /^\/pdc\/lists\/([^/]+?)\/items\/([^/]+?)\/?$/,
				params: [{"name":"listId","optional":false,"rest":false,"chained":false},{"name":"itemId","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/pdc/lists/_listId_/items/_itemId_/_server.ts.js-DQ8Vsu4m.js'))
			},
			{
				id: "/pdc/lists/[listId]/items/[itemId]/claims",
				pattern: /^\/pdc\/lists\/([^/]+?)\/items\/([^/]+?)\/claims\/?$/,
				params: [{"name":"listId","optional":false,"rest":false,"chained":false},{"name":"itemId","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/pdc/lists/_listId_/items/_itemId_/claims/_server.ts.js-C0zeMHUQ.js'))
			},
			{
				id: "/pdc/lists/[listId]/items/[itemId]/comments",
				pattern: /^\/pdc\/lists\/([^/]+?)\/items\/([^/]+?)\/comments\/?$/,
				params: [{"name":"listId","optional":false,"rest":false,"chained":false},{"name":"itemId","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/pdc/lists/_listId_/items/_itemId_/comments/_server.ts.js-Dohx7EO7.js'))
			},
			{
				id: "/pdc/lists/[listId]/items/[itemId]/comments/[commentId]",
				pattern: /^\/pdc\/lists\/([^/]+?)\/items\/([^/]+?)\/comments\/([^/]+?)\/?$/,
				params: [{"name":"listId","optional":false,"rest":false,"chained":false},{"name":"itemId","optional":false,"rest":false,"chained":false},{"name":"commentId","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/pdc/lists/_listId_/items/_itemId_/comments/_commentId_/_server.ts.js-BfKSZfSe.js'))
			},
			{
				id: "/pdc/lists/[listId]/items/[itemId]/offered",
				pattern: /^\/pdc\/lists\/([^/]+?)\/items\/([^/]+?)\/offered\/?$/,
				params: [{"name":"listId","optional":false,"rest":false,"chained":false},{"name":"itemId","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/pdc/lists/_listId_/items/_itemId_/offered/_server.ts.js-TTRd8Dbv.js'))
			},
			{
				id: "/pdc/product",
				pattern: /^\/pdc\/product\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/pdc/product/_server.ts.js-BMIl29r1.js'))
			},
			{
				id: "/pdc/users",
				pattern: /^\/pdc\/users\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/pdc/users/_server.ts.js-8xTw5Trd.js'))
			},
			{
				id: "/pdc/users/invite",
				pattern: /^\/pdc\/users\/invite\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/pdc/users/invite/_server.ts.js-BMLbL-8T.js'))
			},
			{
				id: "/pdc/users/public",
				pattern: /^\/pdc\/users\/public\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/pdc/users/public/_server.ts.js-CDgkgHh3.js'))
			},
			{
				id: "/pdc/users/[userId]",
				pattern: /^\/pdc\/users\/([^/]+?)\/?$/,
				params: [{"name":"userId","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/pdc/users/_userId_/_server.ts.js-CU9oaKOs.js'))
			},
			{
				id: "/pdc/users/[userId]/groups/[groupId]",
				pattern: /^\/pdc\/users\/([^/]+?)\/groups\/([^/]+?)\/?$/,
				params: [{"name":"userId","optional":false,"rest":false,"chained":false},{"name":"groupId","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/pdc/users/_userId_/groups/_groupId_/_server.ts.js-Dwxd-WpG.js'))
			},
			{
				id: "/reset-password",
				pattern: /^\/reset-password\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 29 },
				endpoint: null
			},
			{
				id: "/setup-wizard",
				pattern: /^\/setup-wizard\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 30 },
				endpoint: null
			},
			{
				id: "/setup-wizard/step/[step]",
				pattern: /^\/setup-wizard\/step\/([^/]+?)\/?$/,
				params: [{"name":"step","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 31 },
				endpoint: null
			},
			{
				id: "/signup",
				pattern: /^\/signup\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 32 },
				endpoint: null
			},
			{
				id: "/wishlists/me",
				pattern: /^\/wishlists\/me\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 35 },
				endpoint: null
			},
			{
				id: "/wishlists/[username]",
				pattern: /^\/wishlists\/([^/]+?)\/?$/,
				params: [{"name":"username","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 33 },
				endpoint: null
			},
			{
				id: "/wishlists/[username]/history",
				pattern: /^\/wishlists\/([^/]+?)\/history\/?$/,
				params: [{"name":"username","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 34 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

export { manifest as m };
//# sourceMappingURL=manifest.js-BI0dJOZj.js.map
