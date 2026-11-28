import { aj as props_id, ay as attr_class, am as clsx, au as attr, V as derived, ao as escape_html, av as store_get, ax as unsubscribe_stores, ai as spread_props, ap as html, aw as ensure_array_like, ak as attributes, ab as createContext } from './index-server.js-CIVHNbBm.js';
import { i as invalidateAll } from './client.js-CtfT808N.js';
import { M as Markdown } from './Markdown.js-Dm7PA_S2.js';
import { f as getFormatter, k as $locale } from './i18n2.js-1SlG2bAu.js';
import { f as formatPrice } from './price-formatter.js-Cgx1svgQ.js';
import { g as get } from './index-server2.js-DZFYXfYm.js';
import { S as SystemUsersAPI } from './users.js-DwrjtQr5.js';
import { t as toaster } from './toaster.js-DRl3MQi1.js';
import { D as Dialog, M as ModalBackdrop, a as ModalContent, B as BaseModal } from './BaseModal.js-_UDlR-j4.js';
import { C as ConfirmModal } from './ConfirmModal.js-BchEguXy.js';
import { a as ItemAPI } from './items2.js-C4c-wPjk.js';
import { r as resolve } from './paths.js-BuehRTbY.js';
import { p as page } from './state.js-DFeh0alp.js';
import { a as userCanEdit } from './item-util.js-B_1B95Df.js';
import { P as Portal } from './anatomy2.js-Deb7OEEc.js';
import { S as SvelteSet } from './index-server3.js-6tNgzrAG.js';

// src/lib/components/wishlists/ItemCard/components/ItemNameHeader.svelte
function ItemNameHeader($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { id, item } = $$props;
		$$renderer.push(`<header class="card-header line-clamp-1 flex w-full px-4 pt-4 text-lg font-bold md:text-xl print:line-clamp-none">`);
		if (item.url) $$renderer.push(`<!--[0--><a${attr("id", `${id}-name`)} class="anchor text-primary-800-200 line-clamp-1 print:no-underline!" data-testid="name"${attr("href", item.url)} rel="noreferrer" target="_blank">${escape_html(item.name)}</a> <span class="hidden text-xs font-normal print:block">${escape_html(item.url)}</span>`);
		else $$renderer.push(`<!--[-1--><span${attr("id", `${id}-name`)} data-testid="name">${escape_html(item.name)}</span>`);
		$$renderer.push(`<!--]--></header>`);
	});
}
// src/lib/components/wishlists/util.ts
var getClaimedName = ({ claimedBy, publicClaimedBy }) => {
	if (claimedBy) return claimedBy.name;
	if (publicClaimedBy?.name && publicClaimedBy.name !== "ANONYMOUS_NAME") return publicClaimedBy.name;
	const t = getFormatter();
	return get(t)("wishes.anonymous");
};
var shouldShowName = (item, showNameConfig, showNameAcrossGroups, showForOwner, showPublicClaimName, user, claim) => {
	if (!showNameConfig) return false;
	if (claim?.publicClaimedBy && showPublicClaimName) return true;
	if (!user) return false;
	if (item.user.id === user.id && showForOwner) return true;
	if (showNameAcrossGroups) return true;
	if (claim && (claim.publicClaimedBy || !claim.claimedBy?.groups.includes(user.activeGroupId))) return false;
	return true;
};
// src/lib/api/lists.ts
var ListItemAPI = class {
	listId;
	itemId;
	constructor(listId, itemId) {
		this.listId = listId;
		this.itemId = itemId;
	}
	_makeRequest = async (method, path = "/", data) => {
		const options = {
			method,
			headers: {
				"content-type": "application/json",
				accept: "application/json"
			}
		};
		if (data) options.body = JSON.stringify(data);
		const url = `/pdc/lists/${this.listId}/items/${this.itemId}${path}`;
		return await fetch(url, options);
	};
	delete = async () => {
		return await this._makeRequest("DELETE");
	};
	approve = async () => {
		return await this._makeRequest("PATCH", "/", { approved: true });
	};
	deny = async () => {
		return await this._makeRequest("DELETE");
	};
	claim = async (claimedById, quantity) => {
		return await this._makeRequest("PUT", "/claims", {
			claimedById,
			quantity
		});
	};
	claimPublic = async (publicClaimedById, quantity) => {
		return await this._makeRequest("PUT", "/claims", {
			publicClaimedById,
			quantity
		});
	};
};
// src/lib/api/claims.ts
var ClaimAPI = class {
	claimId;
	constructor(claimId) {
		this.claimId = claimId;
	}
	_makeRequest = async (method, data) => {
		const options = {
			method,
			headers: {
				"content-type": "application/json",
				accept: "application/json"
			}
		};
		if (data) options.body = JSON.stringify(data);
		const url = `/pdc/claims/${this.claimId}`;
		return await fetch(url, options);
	};
	purchase = async () => {
		return await this._makeRequest("PATCH", { purchased: true });
	};
	unpurchase = async () => {
		return await this._makeRequest("PATCH", { purchased: false });
	};
	updateQuantity = async (quantity) => {
		return await this._makeRequest("PATCH", { quantity });
	};
	unclaim = async () => {
		return await this._makeRequest("DELETE");
	};
};
// src/lib/components/modals/ClaimItemModal.svelte
function ClaimItemModal($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { item, userId, groupId, claimId, requireClaimEmail, onSuccess, onFailure, trigger: inputTrigger, claimName, alwaysShow = false, $$slots, $$events, ...rest } = $$props;
		const t = getFormatter();
		let open = false;
		const claim = derived(() => item.claims.find((claim) => claim.claimId === claimId));
		let title = derived(() => claim() ? claimName ? store_get($$store_subs ??= {}, "$t", t)("wishes.update-claim-for-name", { values: { name: claimName } }) : store_get($$store_subs ??= {}, "$t", t)("wishes.update-claim") : store_get($$store_subs ??= {}, "$t", t)("wishes.claim-item"));
		let username = void 0;
		let name = void 0;
		let quantity = derived(() => claim()?.quantity || 1);
		let error = void 0;
		async function handleTrigger(e) {
			e.stopPropagation();
			if (!userId || alwaysShow) {
				open = true;
				return;
			}
			if (claim() && item.quantity === 1 && claim().quantity === 1) return onUnclaim();
			if (!claim() && item.remainingQuantity === 1) {
				quantity(1);
				return onFormSubmit();
			}
			open = true;
		}
		async function onUnclaim() {
			quantity(0);
			return onFormSubmit();
		}
		async function onFormSubmit() {
			if (quantity() > item.remainingQuantity + (claim()?.quantity || 0)) {
				error = store_get($$store_subs ??= {}, "$t", t)("errors.could-not-claim-quantity-items", { values: {
					quantity: quantity(),
					availableQuantity: item.remainingQuantity
				} });
				return;
			}
			if (userId) {
				if (claim()) handleUpdateClaim(claim().claimId);
				else handleUserClaim(userId);
			} else handlePublicClaim();
		}
		async function handleUpdateClaim(claimId) {
			const resp = await new ClaimAPI(claimId).updateQuantity(quantity());
			if (resp.ok) {
				let description;
				if (quantity() === 0) description = store_get($$store_subs ??= {}, "$t", t)("wishes.claimed-item", { values: { claimed: false } });
				else description = store_get($$store_subs ??= {}, "$t", t)("wishes.updated-claim");
				closeAndToast(description);
			} else errorAndToast((await resp.json())?.message);
		}
		async function handleUserClaim(userId) {
			const resp = await new ListItemAPI(item.list.id, item.id).claim(userId, quantity());
			if (resp.ok) closeAndToast(store_get($$store_subs ??= {}, "$t", t)("wishes.claimed-item", { values: { claimed: true } }));
			else errorAndToast((await resp.json())?.message);
		}
		async function handlePublicClaim() {
			const userResp = await new SystemUsersAPI(groupId).create(username, name);
			if (!userResp.ok) {
				errorAndToast((await userResp.json())?.message);
				return;
			}
			const { id: publicUserId } = await userResp.json();
			const resp = await new ListItemAPI(item.list.id, item.id).claimPublic(publicUserId, quantity());
			if (resp.ok) closeAndToast(store_get($$store_subs ??= {}, "$t", t)("wishes.claimed-item", { values: { claimed: true } }));
			else errorAndToast((await resp.json())?.message);
		}
		function errorAndToast(message) {
			onFailure?.();
			toaster.error({ description: message || store_get($$store_subs ??= {}, "$t", t)("general.oops") });
		}
		function closeAndToast(description) {
			setTimeout(() => toaster.info({ description }), open ? 275 : 0);
			open = false;
			onSuccess?.();
		}
		function description($$renderer) {
			if (!userId) $$renderer.push(`<!--[0--><span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.before-you-can-claim-the-item-we-just-need-one-thing-from-you"))}</span>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		}
		{
			function trigger($$renderer, props) {
				inputTrigger($$renderer, {
					...props,
					onclick: handleTrigger
				});
				$$renderer.push(`<!---->`);
			}
			function actions($$renderer, { neutralStyle, negativeStyle, positiveStyle }) {
				if (Dialog.CloseTrigger) {
					$$renderer.push("<!--[-->");
					Dialog.CloseTrigger($$renderer, {
						class: neutralStyle,
						type: "button",
						children: ($$renderer) => {
							$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.cancel"))}`);
						},
						$$slots: { default: true }
					});
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
				$$renderer.push(` <div class="flex flex-wrap gap-2">`);
				if (claim()) $$renderer.push(`<!--[0--><button${attr_class(clsx(negativeStyle))} type="button">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.unclaim"))}</button>`);
				else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> <button${attr_class(clsx(positiveStyle))} type="button">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.claim"))}</button></div>`);
			}
			BaseModal($$renderer, spread_props([
				{
					description,
					onOpenChange: (e) => open = e.open,
					open,
					title: title()
				},
				rest,
				{
					trigger,
					actions,
					children: ($$renderer) => {
						if (!userId) {
							$$renderer.push(`<!--[0--><div class="flex flex-col gap-2"><label class="label w-fit"><span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.name-optional"))}</span> <div class="input-group grid-cols-[auto_1fr_auto]"><div class="ig-cell preset-tonal"><iconify-icon class="text-lg" icon="ion:person"></iconify-icon></div> <input class="ig-input" type="text"${attr("value", name)}/></div></label> `);
							if (requireClaimEmail) $$renderer.push(`<!--[0--><label class="label w-fit"><span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("auth.email"))}</span> <div class="input-group grid-cols-[auto_1fr_auto]"><div class="ig-cell preset-tonal"><iconify-icon class="text-lg" icon="ion:person"></iconify-icon></div> <input class="ig-input" required="" type="email"${attr("value", username)}/></div></label>`);
							else $$renderer.push("<!--[-1-->");
							$$renderer.push(`<!--]--></div>`);
						} else $$renderer.push("<!--[-1-->");
						$$renderer.push(`<!--]--> `);
						if (item.remainingQuantity > 1 || claim()) {
							$$renderer.push(`<!--[0--><div class="flex flex-col gap-1"><label class="label w-fit"><span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.enter-the-quantity-to-claim"))}</span> <input${attr_class(clsx(["input", error && "input-invalid"]))} inputmode="numeric"${attr("max", item.remainingQuantity + (claim()?.quantity || 0))}${attr("min", claim() ? 0 : 1)} required="" step="1" type="number"${attr("value", quantity())}/></label> `);
							if (error) $$renderer.push(`<!--[0--><span class="text-invalid">${escape_html(error)}</span>`);
							else $$renderer.push("<!--[-1-->");
							$$renderer.push(`<!--]--> `);
							if (claim()) {
								$$renderer.push(`<!--[0--><span class="subtext">`);
								if (claimName) $$renderer.push(`<!--[0-->${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.claimed-info-text-for-name", { values: {
									claimedQuantity: claim().quantity,
									name: claimName
								} }))}`);
								else $$renderer.push(`<!--[-1-->${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.claimed-info-text", { values: { claimedQuantity: claim().quantity } }))}`);
								$$renderer.push(`<!--]--> `);
								if (item.quantity) $$renderer.push(`<!--[0-->${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.additional-items-requested", { values: { remainingQuantity: item.remainingQuantity } }))}`);
								else $$renderer.push("<!--[-1-->");
								$$renderer.push(`<!--]--></span>`);
							} else $$renderer.push("<!--[-1-->");
							$$renderer.push(`<!--]--></div>`);
						} else $$renderer.push("<!--[-1-->");
						$$renderer.push(`<!--]-->`);
					},
					$$slots: {
						trigger: true,
						actions: true,
						default: true
					}
				}
			]));
		}
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/lib/components/wishlists/ItemCard/components/ItemAttributes.svelte
function ItemAttributes($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const t = getFormatter();
		const { item, onPublicList, user, groupId, showClaimedName, requireClaimEmail, showNameAcrossGroups = false, showClaimForOwner = false, showPublicClaimName = false, showFor, showDetail = false, fullNotes = false } = $$props;
		let expandClaims = false;
		if (item.price || item.itemPrice) $$renderer.push(`<!--[0--><div class="flex items-center gap-x-2"><iconify-icon icon="ion:pricetag"></iconify-icon> <span data-testid="price">${escape_html(formatPrice(item))}</span></div>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="flex items-center gap-2" data-testid="quantity"><iconify-icon icon="ion:gift"></iconify-icon> <div class="flex flex-row flex-wrap items-end gap-x-2"><span data-testid="quantity-desired">`);
		if (item.quantity) $$renderer.push(`<!--[0-->${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.quantity-desired", { values: { quantity: item.quantity } }))}`);
		else $$renderer.push(`<!--[-1-->${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.no-limit"))}`);
		$$renderer.push(`<!--]--></span> `);
		if (user?.id !== item.userId || showClaimForOwner) {
			$$renderer.push(`<!--[0--><span>·</span> <span class="text-secondary-900-100 font-bold" data-testid="quantity-claimed">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.quantity-claimed", { values: { quantity: item.claimedQuantity } }))}</span> `);
			if (showDetail && item.claimedQuantity > 0) $$renderer.push(`<!--[0--><button class="subtext"><span>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.show-claims"))}</span> <iconify-icon class="text-xs"${attr("icon", "ion:chevron-down")}></iconify-icon></button>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div> `);
		if (item.claimedQuantity > 0 && showDetail && expandClaims);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="flex items-center gap-2"><iconify-icon icon="ion:person"></iconify-icon> <span class="text-wrap" data-testid="added-by">`);
		if (showFor) $$renderer.push(`<!--[0-->${html(store_get($$store_subs ??= {}, "$t", t)("wishes.for", { values: {
			name: item.user.name,
			class: "text-secondary-900-100 font-bold"
		} }))}`);
		else if (!onPublicList) $$renderer.push(`<!--[1-->${html(store_get($$store_subs ??= {}, "$t", t)("wishes.added-by", { values: {
			name: item.addedBy.name,
			class: "text-secondary-900-100 font-bold"
		} }))}`);
		else $$renderer.push(`<!--[-1-->${html(item.addedBy.id === item.user.id ? store_get($$store_subs ??= {}, "$t", t)("wishes.added-by", { values: {
			name: item.addedBy.name,
			class: "text-secondary-900-100 font-bold"
		} }) : store_get($$store_subs ??= {}, "$t", t)("wishes.added-by-somebody-else", { values: { class: "text-secondary-900-100 font-bold" } }))}`);
		$$renderer.push(`<!--]--></span></div> `);
		if (item.note) {
			$$renderer.push(`<!--[0--><div class="grid flex-none grid-cols-[auto_1fr] items-center gap-2"><iconify-icon icon="ion:reader"></iconify-icon> <div${attr_class(clsx(["whitespace-pre-wrap print:line-clamp-none", fullNotes ? "" : "line-clamp-2"]))} data-testid="notes">`);
			Markdown($$renderer, { source: item.note });
			$$renderer.push(`<!----></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/lib/components/wishlists/ItemCard/ClaimButtons.svelte
function ClaimButtons($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { item, user, showClaimedName = false, showNameAcrossGroups = false, showClaimForOwner = false, showPublicClaimName = false, onPublicList = false, groupId, requireClaimEmail, isClaimableOrClaimed, isSelfClaimable, showFor = false } = $$props;
		const t = getFormatter();
		let userClaim = derived(() => item.claims.find((claim) => claim.claimedBy && claim.claimedBy.id === user?.id));
		let isClaimOnList = derived(() => userClaim()?.listId === item.list.id);
		let otherClaims = derived(() => item.claims.filter((claim) => claim !== userClaim()));
		let isOwnItem = derived(() => !onPublicList && item.userId === user?.id);
		let canClaim = derived(() => !isOwnItem() || isSelfClaimable);
		let canJoin = derived(() => !!user && canClaim() && !item.isClaimable && otherClaims().length > 0);
		let otherNames = derived(() => {
			const names = otherClaims().filter((claim) => shouldShowName(item, showClaimedName, showNameAcrossGroups, showClaimForOwner, showPublicClaimName, user, claim)).map(getClaimedName);
			if (names.length === 0 || names.length !== otherClaims().length) return null;
			return new Intl.ListFormat(store_get($$store_subs ??= {}, "$locale", $locale) ?? "fr", { type: "conjunction" }).format(names);
		});
		let busy = false;
		if (isOwnItem() && !showClaimForOwner) $$renderer.push(`<!--[0--><div></div>`);
		else if (userClaim()) {
			$$renderer.push("<!--[1-->");
			if (isClaimOnList()) {
				$$renderer.push(`<!--[0--><div class="flex flex-row flex-wrap items-center gap-2" data-testid="my-claim"><span class="text-subtle">`);
				if (otherNames()) $$renderer.push(`<!--[0-->${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.you-claim-with", { values: { names: otherNames() } }))}`);
				else if (otherClaims().length > 0) $$renderer.push(`<!--[1-->${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.you-claim-with-others"))}`);
				else $$renderer.push(`<!--[-1-->${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.you-claim"))}`);
				$$renderer.push(`<!--]--></span> `);
				if (userClaim().quantity === 0 || item.quantity === 1) $$renderer.push(`<!--[0--><button class="btn btn-sm"${attr("disabled", busy, true)}>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.cancel-claim"))}</button>`);
				else {
					$$renderer.push("<!--[-1-->");
					{
						function trigger($$renderer, props) {
							$$renderer.push(`<button${attributes({
								...props,
								class: "btn btn-sm"
							})}>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.update-claim"))}</button>`);
						}
						ClaimItemModal($$renderer, {
							claimId: userClaim()?.claimId,
							groupId,
							item,
							requireClaimEmail,
							userId: user?.id,
							trigger,
							$$slots: { trigger: true }
						});
					}
				}
				$$renderer.push(`<!--]--></div>`);
			} else $$renderer.push(`<!--[-1--><span class="text-subtle line-clamp-2 truncate text-wrap">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.claimed-by-you-on-another-list"))}</span>`);
			$$renderer.push(`<!--]-->`);
		} else if (item.isClaimable && canClaim()) {
			$$renderer.push(`<!--[2--><div class="flex flex-row flex-wrap items-center gap-x-2">`);
			if (otherNames()) $$renderer.push(`<!--[0--><span class="text-subtle">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.claimed-by", { values: { name: otherNames() } }))}</span>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			{
				function trigger($$renderer, props) {
					$$renderer.push(`<button${attributes({
						...props,
						class: "btn btn-sm",
						"data-testid": "claim"
					})}>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.claim"))}</button>`);
				}
				ClaimItemModal($$renderer, {
					groupId,
					item,
					requireClaimEmail,
					userId: user?.id,
					trigger,
					$$slots: { trigger: true }
				});
			}
			$$renderer.push(`<!----></div>`);
		} else if (canJoin()) $$renderer.push(`<!--[3--><div class="flex flex-row flex-wrap items-center gap-x-2"><span class="text-subtle">${escape_html(otherNames() ? store_get($$store_subs ??= {}, "$t", t)("wishes.claimed-by", { values: { name: otherNames() } }) : store_get($$store_subs ??= {}, "$t", t)("wishes.claimed"))}</span> <button class="btn btn-sm" data-testid="join-claim"${attr("disabled", busy, true)}>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.join-claim"))}</button></div>`);
		else if (item.claims.length === 0 || isOwnItem() && item.isClaimable) $$renderer.push(`<!--[4--><div></div>`);
		else if (otherNames()) $$renderer.push(`<!--[5--><span class="text-subtle line-clamp-2 truncate text-wrap">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.claimed-by", { values: { name: otherNames() } }))}</span>`);
		else $$renderer.push(`<!--[-1--><span class="text-subtle line-clamp-2 truncate text-wrap">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.claimed"))}</span>`);
		$$renderer.push(`<!--]-->`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/lib/components/modals/DeleteItemModal.svelte
function DeleteItemModal($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { item, itemNameShort, isOnlyManager, $$slots, $$events, ...props } = $$props;
		const t = getFormatter();
		const itemAPI = derived(() => new ItemAPI(item.id));
		const listItemAPI = derived(() => new ListItemAPI(item.list.id, item.id));
		let description = derived(() => store_get($$store_subs ??= {}, "$t", t)(item.listCount > 1 ? "wishes.are-you-sure-you-wish-to-delete-item-multiple-lists" : "wishes.are-you-sure-you-wish-to-delete-item", { values: { name: itemNameShort } }));
		async function onRemove() {
			if ((await listItemAPI().delete()).ok) {
				invalidateAll();
				toaster.info({ description: store_get($$store_subs ??= {}, "$t", t)("wishes.item-was-removed-from-list", { values: { name: itemNameShort } }) });
			} else toaster.error({ description: store_get($$store_subs ??= {}, "$t", t)("general.oops") });
		}
		async function onDelete() {
			if ((await itemAPI().delete()).ok) {
				invalidateAll();
				toaster.info({ description: store_get($$store_subs ??= {}, "$t", t)("wishes.item-was-deleted", { values: { name: itemNameShort } }) });
			} else toaster.error({ description: store_get($$store_subs ??= {}, "$t", t)("general.oops") });
		}
		{
			function actions($$renderer, { neutralStyle, negativeStyle, positiveStyle }) {
				if (Dialog.CloseTrigger) {
					$$renderer.push("<!--[-->");
					Dialog.CloseTrigger($$renderer, {
						class: neutralStyle,
						children: ($$renderer) => {
							$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.cancel"))}`);
						},
						$$slots: { default: true }
					});
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
				$$renderer.push(` `);
				if (item.listCount > 1) {
					$$renderer.push(`<!--[0--><div class="flex flex-wrap gap-2">`);
					if (!isOnlyManager) {
						$$renderer.push("<!--[0-->");
						if (Dialog.CloseTrigger) {
							$$renderer.push("<!--[-->");
							Dialog.CloseTrigger($$renderer, {
								class: negativeStyle,
								onclick: onDelete,
								children: ($$renderer) => {
									$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.all-lists"))}`);
								},
								$$slots: { default: true }
							});
							$$renderer.push("<!--]-->");
						} else {
							$$renderer.push("<!--[!-->");
							$$renderer.push("<!--]-->");
						}
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--> `);
					if (Dialog.CloseTrigger) {
						$$renderer.push("<!--[-->");
						Dialog.CloseTrigger($$renderer, {
							class: positiveStyle,
							onclick: onRemove,
							children: ($$renderer) => {
								$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.this-list"))}`);
							},
							$$slots: { default: true }
						});
						$$renderer.push("<!--]-->");
					} else {
						$$renderer.push("<!--[!-->");
						$$renderer.push("<!--]-->");
					}
					$$renderer.push(`</div>`);
				} else {
					$$renderer.push("<!--[-1-->");
					if (Dialog.CloseTrigger) {
						$$renderer.push("<!--[-->");
						Dialog.CloseTrigger($$renderer, {
							class: positiveStyle,
							onclick: onDelete,
							children: ($$renderer) => {
								$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.confirm"))}`);
							},
							$$slots: { default: true }
						});
						$$renderer.push("<!--]-->");
					} else {
						$$renderer.push("<!--[!-->");
						$$renderer.push("<!--]-->");
					}
				}
				$$renderer.push(`<!--]-->`);
			}
			BaseModal($$renderer, spread_props([
				{
					description: description(),
					title: store_get($$store_subs ??= {}, "$t", t)("general.please-confirm")
				},
				props,
				{
					actions,
					$$slots: { actions: true }
				}
			]));
		}
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/lib/components/wishlists/ItemCard/ManageButtons.svelte
function ManageButtons($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { item, user, userCanManage, onEdit, hideDelete = false } = $$props;
		const t = getFormatter();
		const listItemAPI = derived(() => new ListItemAPI(item.list.id, item.id));
		let isOnlyManager = derived(() => user?.id !== item.user?.id && user?.id !== item.addedBy?.id && userCanManage || false);
		let itemNameShort = derived(() => item.name.length > 42 ? item.name.substring(0, 42) + "…" : item.name);
		const handleApproval = async (approve) => {
			if ((await (approve ? listItemAPI().approve() : listItemAPI().deny())).ok) toaster.info({ description: store_get($$store_subs ??= {}, "$t", t)("wishes.item-approved", { values: {
				name: itemNameShort(),
				approved: approve
			} }) });
			else toaster.error({ description: store_get($$store_subs ??= {}, "$t", t)("general.oops") });
		};
		function approvalButton($$renderer, approve) {
			{
				function description($$renderer) {
					$$renderer.push(`${html(store_get($$store_subs ??= {}, "$t", t)("wishes.approval-confirmation", { values: {
						name: item.addedBy?.name,
						approve
					} }))}`);
				}
				function trigger($$renderer, props) {
					$$renderer.push(`<button${attributes({
						...props,
						class: clsx(["btn btn-icon btn-icon-sm md:btn-icon-base", approve ? "preset-filled-success-600-400" : "preset-filled-error-500"]),
						"aria-label": approve ? store_get($$store_subs ??= {}, "$t", t)("wishes.approve") : store_get($$store_subs ??= {}, "$t", t)("wishes.deny"),
						title: approve ? store_get($$store_subs ??= {}, "$t", t)("wishes.approve") : store_get($$store_subs ??= {}, "$t", t)("wishes.deny")
					})}><iconify-icon${attr("icon", approve ? "ion:checkmark" : "ion:close")}></iconify-icon></button>`);
				}
				ConfirmModal($$renderer, {
					onConfirm: () => handleApproval(approve),
					description,
					trigger,
					$$slots: {
						description: true,
						trigger: true
					}
				});
			}
		}
		function deleteButton($$renderer) {
			{
				function trigger($$renderer, props) {
					$$renderer.push(`<button${attributes({
						...props,
						class: "preset-filled-error-500 btn btn-icon btn-icon-sm md:btn-icon-base",
						"aria-label": store_get($$store_subs ??= {}, "$t", t)("wishes.delete"),
						title: store_get($$store_subs ??= {}, "$t", t)("wishes.delete")
					})}><iconify-icon icon="ion:trash"></iconify-icon></button>`);
				}
				DeleteItemModal($$renderer, {
					isOnlyManager: isOnlyManager(),
					item,
					itemNameShort: itemNameShort(),
					trigger,
					$$slots: { trigger: true }
				});
			}
		}
		$$renderer.push(`<div class="flex flex-row gap-2">`);
		if (!item.approved) {
			$$renderer.push("<!--[0-->");
			approvalButton($$renderer, true);
			$$renderer.push(`<!----> `);
			approvalButton($$renderer, false);
			$$renderer.push(`<!---->`);
		} else if (userCanEdit(item, user?.id)) {
			$$renderer.push(`<!--[1--><button class="preset-tonal-primary inset-ring-primary-500 btn btn-icon btn-icon-sm md:btn-icon-base inset-ring"${attr("aria-label", store_get($$store_subs ??= {}, "$t", t)("wishes.edit"))}${attr("title", store_get($$store_subs ??= {}, "$t", t)("wishes.edit"))}><iconify-icon icon="ion:edit"></iconify-icon></button> `);
			if (!hideDelete) {
				$$renderer.push("<!--[0-->");
				deleteButton($$renderer);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		} else if (userCanManage && !hideDelete) {
			$$renderer.push("<!--[2-->");
			deleteButton($$renderer);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/lib/stores/pending-removals.svelte.ts
var pendingRemovals = new SvelteSet();
// src/lib/components/wishlists/ItemCard/RemoveButton.svelte
function RemoveButton($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { item, user, userCanManage } = $$props;
		const t = getFormatter();
		const canEdit = derived(() => userCanEdit(item, user?.id) || !!userCanManage);
		const canRemove = derived(() => item.approved && (canEdit() || !!user && page.data.anyoneCanDeleteItems === true));
		const isOnlyManager = derived(() => user?.id !== item.user?.id && user?.id !== item.addedBy?.id && userCanManage || false);
		const nameShort = derived(() => item.name.length > 42 ? item.name.substring(0, 42) + "…" : item.name);
		const canMarkOffered = derived(() => !!user && item.approved && item.userId !== user.id && !item.list.managers.some((m) => m.userId === user.id));
		let askWhy = false;
		if (canMarkOffered()) {
			$$renderer.push(`<!--[0--><button class="btn btn-sm paper-quiet">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.remove"))}</button> `);
			Dialog($$renderer, {
				onOpenChange: (e) => askWhy = e.open,
				open: askWhy,
				children: ($$renderer) => {
					Portal($$renderer, {
						children: ($$renderer) => {
							ModalBackdrop($$renderer, {});
							$$renderer.push(`<!----> `);
							if (Dialog.Positioner) {
								$$renderer.push("<!--[-->");
								Dialog.Positioner($$renderer, {
									class: "fixed inset-0 z-50 mx-4 flex items-center justify-center",
									children: ($$renderer) => {
										ModalContent($$renderer, {
											class: "max-w-md",
											children: ($$renderer) => {
												if (Dialog.Title) {
													$$renderer.push("<!--[-->");
													Dialog.Title($$renderer, {
														class: "text-xl font-bold",
														children: ($$renderer) => {
															$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.remove-why", { values: { name: nameShort() } }))}`);
														},
														$$slots: { default: true }
													});
													$$renderer.push("<!--]-->");
												} else {
													$$renderer.push("<!--[!-->");
													$$renderer.push("<!--]-->");
												}
												$$renderer.push(` <div class="flex flex-col gap-2"><button class="btn preset-tonal-surface inset-ring-surface-500 h-auto flex-col items-start gap-0 py-3 text-left whitespace-normal inset-ring" data-testid="remove-offered"><span class="font-semibold">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.remove-offered"))}</span> <span class="text-sm opacity-80">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.remove-offered-hint", { values: { owner: item.user.name } }))}</span></button> `);
												if (canRemove()) $$renderer.push(`<!--[0--><button class="btn preset-tonal-surface inset-ring-surface-500 h-auto flex-col items-start gap-0 py-3 text-left whitespace-normal inset-ring" data-testid="remove-outdated"><span class="font-semibold">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.remove-outdated"))}</span> <span class="text-sm opacity-80">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.remove-outdated-hint"))}</span></button>`);
												else $$renderer.push("<!--[-1-->");
												$$renderer.push(`<!--]--></div> <div class="flex justify-end">`);
												if (Dialog.CloseTrigger) {
													$$renderer.push("<!--[-->");
													Dialog.CloseTrigger($$renderer, {
														class: "btn btn-sm paper-quiet",
														children: ($$renderer) => {
															$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("general.cancel"))}`);
														},
														$$slots: { default: true }
													});
													$$renderer.push("<!--]-->");
												} else {
													$$renderer.push("<!--[!-->");
													$$renderer.push("<!--]-->");
												}
												$$renderer.push(`</div>`);
											},
											$$slots: { default: true }
										});
									},
									$$slots: { default: true }
								});
								$$renderer.push("<!--]-->");
							} else {
								$$renderer.push("<!--[!-->");
								$$renderer.push("<!--]-->");
							}
						},
						$$slots: { default: true }
					});
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!---->`);
		} else if (canRemove()) {
			$$renderer.push("<!--[1-->");
			if (item.listCount > 1) {
				$$renderer.push("<!--[0-->");
				{
					function trigger($$renderer, props) {
						$$renderer.push(`<button${attributes({
							...props,
							class: "btn btn-sm paper-quiet"
						})}>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.remove"))}</button>`);
					}
					DeleteItemModal($$renderer, {
						isOnlyManager: isOnlyManager(),
						item,
						itemNameShort: nameShort(),
						trigger,
						$$slots: { trigger: true }
					});
				}
			} else $$renderer.push(`<!--[-1--><button class="btn btn-sm paper-quiet">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.remove"))}</button>`);
			$$renderer.push(`<!--]-->`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// node_modules/.pnpm/svelte-dnd-action@0.9.80_svelte@5.57.3_@typescript-eslint+types@8.72.2_/node_modules/svelte-dnd-action/dist/index.mjs
function ownKeys(object, enumerableOnly) {
	var keys = Object.keys(object);
	if (Object.getOwnPropertySymbols) {
		var symbols = Object.getOwnPropertySymbols(object);
		enumerableOnly && (symbols = symbols.filter(function(sym) {
			return Object.getOwnPropertyDescriptor(object, sym).enumerable;
		})), keys.push.apply(keys, symbols);
	}
	return keys;
}
function _objectSpread2(target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = null != arguments[i] ? arguments[i] : {};
		i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
			_defineProperty(target, key, source[key]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
			Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
		});
	}
	return target;
}
function _defineProperty(obj, key, value) {
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
var KEYBOARD_DRAG_TRIGGER_PHRASES = {
	space: "space-bar",
	enter: "enter",
	space_or_enter: "space-bar or enter"
};
_defineProperty({}, Object.freeze({ USE_COMPUTED_STYLE_INSTEAD_OF_BOUNDING_RECT: "USE_COMPUTED_STYLE_INSTEAD_OF_BOUNDING_RECT" }).USE_COMPUTED_STYLE_INSTEAD_OF_BOUNDING_RECT, false);
var _INSTRUCTION_ID_TO_ST;
var INSTRUCTION_IDs$1 = {
	DND_ZONE_ACTIVE: "dnd-zone-active",
	DND_ZONE_DRAG_DISABLED: "dnd-zone-drag-disabled"
};
_INSTRUCTION_ID_TO_ST = {}, _defineProperty(_INSTRUCTION_ID_TO_ST, INSTRUCTION_IDs$1.DND_ZONE_ACTIVE, "zoneActiveInstruction"), _defineProperty(_INSTRUCTION_ID_TO_ST, INSTRUCTION_IDs$1.DND_ZONE_DRAG_DISABLED, "zoneDragDisabledInstruction");
_objectSpread2({}, {
	dragStarted: function dragStarted(_ref) {
		var itemLabel = _ref.itemLabel, zoneLabel = _ref.zoneLabel, canMoveBetweenZones = _ref.canMoveBetweenZones;
		return "Started dragging item ".concat(itemLabel, ". Use the arrow keys to move it within its list ").concat(zoneLabel) + (canMoveBetweenZones ? ", or tab to another list in order to move the item into it" : "");
	},
	movedToPosition: function movedToPosition(_ref2) {
		var itemLabel = _ref2.itemLabel, zoneLabel = _ref2.zoneLabel, position = _ref2.position;
		return "Moved item ".concat(itemLabel, " to position ").concat(position, " in the list ").concat(zoneLabel);
	},
	movedToZoneEnd: function movedToZoneEnd(_ref3) {
		var itemLabel = _ref3.itemLabel, zoneLabel = _ref3.zoneLabel;
		return "Moved item ".concat(itemLabel, " to the end of the list ").concat(zoneLabel);
	},
	movedToZoneStart: function movedToZoneStart(_ref4) {
		var itemLabel = _ref4.itemLabel, zoneLabel = _ref4.zoneLabel;
		return "Moved item ".concat(itemLabel, " to the beginning of the list ").concat(zoneLabel);
	},
	dropped: function dropped(_ref5) {
		var itemLabel = _ref5.itemLabel;
		return "Stopped dragging item ".concat(itemLabel);
	},
	zoneActiveInstruction: function zoneActiveInstruction(_ref6) {
		var keyboardDragTrigger = _ref6.keyboardDragTrigger;
		return "Tab to one the items and press ".concat(KEYBOARD_DRAG_TRIGGER_PHRASES[keyboardDragTrigger], " to start dragging it");
	},
	zoneDragDisabledInstruction: "This is a disabled drag and drop list"
});
// src/lib/stores/list-view-preference.svelte.ts
var [getPreference] = createContext();
var getListViewPreference = () => {
	return getPreference().value;
};
// src/lib/components/wishlists/ItemCard/ReorderButtons.svelte
function ReorderButtons($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { item, onIncreasePriority, onDecreasePriority, onPriorityChange } = $$props;
		const t = getFormatter();
		let messageObj = derived(() => ({ values: { name: item.name } }));
		let isTileView = derived(() => getListViewPreference() === "tile");
		let displayOrder = derived(() => item.displayOrder !== null ? item.displayOrder + 1 : null);
		$$renderer.push(`<div class="flex flex-col"><div${attr_class(clsx(["flex w-max items-center gap-x-2", isTileView() && "md:flex-row-reverse"]))}><button class="btn btn-icon btn-icon-sm md:btn-icon-base preset-outlined-primary-500"${attr("aria-label", store_get($$store_subs ??= {}, "$t", t)("a11y.decrease-priority", messageObj()))}${attr("title", store_get($$store_subs ??= {}, "$t", t)("a11y.decrease-priority", messageObj()))}><iconify-icon${attr_class(clsx([isTileView() && "md:-rotate-90"]))} icon="ion:arrow-down"></iconify-icon></button> <div><label class="sr-only" for="displayOrder">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.display-order"))}</label> <input${attr("id", item.id + "-displayOrder")} class="input w-16 text-center text-sm md:text-base" inputmode="numeric" pattern="/d*"${attr("value", displayOrder())}/></div> <button class="btn btn-icon btn-icon-sm md:btn-icon-base preset-outlined-primary-500"${attr("aria-label", store_get($$store_subs ??= {}, "$t", t)("a11y.increase-priority", messageObj()))}${attr("title", store_get($$store_subs ??= {}, "$t", t)("a11y.increase-priority", messageObj()))}><iconify-icon${attr_class(clsx([isTileView() && "md:-rotate-90"]))} icon="ion:arrow-up"></iconify-icon></button></div> <button class="btn btn-sm w-full"${attr("aria-label", store_get($$store_subs ??= {}, "$t", t)("a11y.drag-handle", messageObj()))}${attr("title", store_get($$store_subs ??= {}, "$t", t)("a11y.drag-handle", messageObj()))}><iconify-icon icon="ion:reorder-two"></iconify-icon></button></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/lib/components/wishlists/ItemCard/components/ItemFooter.svelte
function ItemFooter($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { $$slots, $$events, ...props } = $$props;
		let isClaimButtonVisible = false;
		const asksWhy = derived(() => !!props.user && props.item.approved && props.item.userId !== props.user.id && !props.item.list.managers.some((m) => m.userId === props.user.id));
		$$renderer.push(`<footer${attr_class(clsx([
			"flex items-center gap-2 print:hidden",
			props.noPadding ? "px-0" : "px-4",
			props.reorderActions ? "justify-center pb-0" : "justify-between pb-4",
			isClaimButtonVisible && "flex-wrap"
		]))}>`);
		if (props.reorderActions) {
			$$renderer.push("<!--[0-->");
			ReorderButtons($$renderer, spread_props([props]));
		} else {
			$$renderer.push("<!--[-1-->");
			ClaimButtons($$renderer, spread_props([{ isClaimableOrClaimed: (ans) => isClaimButtonVisible = ans }, props]));
			$$renderer.push(`<!----> <div class="flex flex-row items-center gap-2">`);
			if (asksWhy()) {
				$$renderer.push("<!--[0-->");
				RemoveButton($$renderer, {
					item: props.item,
					user: props.user,
					userCanManage: props.userCanManage
				});
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			ManageButtons($$renderer, spread_props([props, { hideDelete: asksWhy() }]));
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]--></footer>`);
	});
}
// src/lib/components/Image.svelte
function Image($$renderer, $$props) {
	const { children, src, $$slots, $$events, ...rest } = $$props;
	if (!src) {
		$$renderer.push("<!--[0-->");
		children?.($$renderer);
		$$renderer.push(`<!---->`);
	} else $$renderer.push(`<!--[-1--><img${attributes({
		...rest,
		src
	})} onload="this.__e=event" onerror="this.__e=event"/>`);
	$$renderer.push(`<!--]-->`);
}
// src/lib/components/wishlists/ItemCard/components/ItemImage.svelte
function ItemImage($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { item, defaultImage, shrinkBadge = false, badgeClass, $$slots, $$events, ...props } = $$props;
		const t = getFormatter();
		const imageUrl = derived(() => {
			if (item.imageUrl) try {
				new URL(item.imageUrl);
				return item.imageUrl;
			} catch {
				if (item.imageUrl.startsWith("/") || item.imageUrl.endsWith("/")) return;
				return resolve("/pdc/assets/[id]", { id: item.imageUrl });
			}
		});
		$$renderer.push(`<div${attr_class(clsx([props.class, "relative"]), "svelte-iwswve")}>`);
		if (item.mostWanted) $$renderer.push(`<!--[0--><div${attr_class(clsx(["glow preset-filled-primary-500 badge absolute inset-s-1 top-1 print:inset-s-0 print:top-0 print:-ml-3", badgeClass]), "svelte-iwswve")}><iconify-icon icon="ion:star"></iconify-icon> <span${attr_class(clsx([shrinkBadge ? "hidden md:block" : "block", "print:inline"]))}>${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.most-wanted"))}</span></div>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		Image($$renderer, {
			class: props.class,
			alt: item.name,
			"data-testid": "image",
			referrerpolicy: "no-referrer",
			src: imageUrl(),
			children: ($$renderer) => {
				defaultImage($$renderer, store_get($$store_subs ??= {}, "$t", t));
				$$renderer.push(`<!---->`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/lib/components/wishlists/ItemCard/GridItemCard.svelte
function GridItemCard($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { defaultImage: _defaultImage, $$slots, $$events, ...props } = $$props;
		$$renderer.push(`<div class="flex h-full flex-col"><div class="relative h-48 w-full overflow-hidden">`);
		{
			function defaultImage($$renderer, t) {
				_defaultImage($$renderer, t, "rounded-t-[calc(var(--radius-container)-1px)] h-full w-full");
				$$renderer.push(`<!---->`);
			}
			ItemImage($$renderer, {
				class: "h-full w-full rounded-t-[calc(var(--radius-container)-1px)] object-cover",
				item: props.item,
				defaultImage,
				$$slots: { defaultImage: true }
			});
		}
		$$renderer.push(`<!----></div> `);
		ItemNameHeader($$renderer, spread_props([props]));
		$$renderer.push(`<!----> <div class="flex flex-1 flex-col space-y-1 p-4">`);
		ItemAttributes($$renderer, spread_props([props]));
		$$renderer.push(`<!----></div> `);
		ItemFooter($$renderer, spread_props([props]));
		$$renderer.push(`<!----></div>`);
	});
}
// src/lib/components/wishlists/ItemCard/ListItemCard.svelte
function ListItemCard($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { defaultImage: _defaultImage, $$slots, $$events, ...props } = $$props;
		const t = getFormatter();
		const item = derived(() => props.item);
		const expanded = derived(() => page.url.searchParams.get("item-id") === props.item.id.toString());
		const signedByOther = derived(() => item().addedBy && item().addedBy.id !== item().user.id);
		$$renderer.push(`<div class="paper-body"><div class="paper-text"><div class="paper-title">`);
		if (item().url) $$renderer.push(`<!--[0--><a${attr("id", `${props.id}-name`)} data-testid="name"${attr("href", item().url)} rel="noreferrer" target="_blank">${escape_html(item().name)}</a>`);
		else $$renderer.push(`<!--[-1--><span${attr("id", `${props.id}-name`)} data-testid="name">${escape_html(item().name)}</span>`);
		$$renderer.push(`<!--]--> `);
		if (props.isNew) $$renderer.push(`<!--[0--><span class="paper-new-dot" data-testid="new-idea"${attr("title", store_get($$store_subs ??= {}, "$t", t)("wishes.new-idea"))}><span class="sr-only">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.new-idea"))}</span></span>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> `);
		if (item().note) {
			$$renderer.push(`<!--[0--><div${attr_class(clsx(["paper-note whitespace-pre-wrap print:line-clamp-none", !expanded() && "line-clamp-2"]))} data-testid="notes">`);
			Markdown($$renderer, { source: item().note });
			$$renderer.push(`<!----></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (props.showFor) $$renderer.push(`<!--[0--><div class="paper-by" data-testid="added-by">${html(store_get($$store_subs ??= {}, "$t", t)("wishes.for", { values: {
			name: item().user.name,
			class: ""
		} }))}</div>`);
		else if (signedByOther()) {
			$$renderer.push(`<!--[1--><div class="paper-by" data-testid="added-by">`);
			if (props.onPublicList) $$renderer.push(`<!--[0-->${html(store_get($$store_subs ??= {}, "$t", t)("wishes.added-by-somebody-else", { values: { class: "" } }))}`);
			else $$renderer.push(`<!--[-1-->${html(store_get($$store_subs ??= {}, "$t", t)("wishes.added-by", { values: {
				name: item().addedBy.name,
				class: ""
			} }))}`);
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (props.commentCount > 0 && !expanded()) $$renderer.push(`<!--[0--><div class="paper-by" data-testid="comment-count">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.comment-count", { values: { count: props.commentCount } }))}</div>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (!props.reorderActions) {
			$$renderer.push(`<!--[0--><div class="paper-claimed-line print:hidden">`);
			ClaimButtons($$renderer, spread_props([{ isClaimableOrClaimed: () => {} }, props]));
			$$renderer.push(`<!----></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> `);
		if (props.reorderActions) {
			$$renderer.push("<!--[0-->");
			ItemFooter($$renderer, spread_props([props, { noPadding: true }]));
		} else {
			$$renderer.push(`<!--[-1--><div class="paper-actions print:hidden">`);
			if (item().approved) {
				$$renderer.push("<!--[0-->");
				if (userCanEdit(item(), props.user?.id)) $$renderer.push(`<!--[0--><button class="btn paper-quiet" type="button">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.edit"))}</button>`);
				else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				RemoveButton($$renderer, {
					item: item(),
					user: props.user,
					userCanManage: props.userCanManage
				});
				$$renderer.push(`<!---->`);
			} else {
				$$renderer.push("<!--[-1-->");
				ManageButtons($$renderer, spread_props([props]));
			}
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]--></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/lib/components/wishlists/ItemComments.svelte
function ItemComments($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { item, user, isSelfClaimable = false } = $$props;
		const t = getFormatter();
		const canSee = derived(() => !!user && (isSelfClaimable || item.userId !== user.id && !item.list.managers.some((m) => m.userId === user.id)));
		let comments = [];
		if (canSee()) {
			$$renderer.push(`<!--[0--><section class="paper-comments" data-testid="comments"><h3 class="paper-comments-title">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.comment-title"))}${escape_html(comments.length ? ` (${comments.length})` : "")}</h3> `);
			if (comments.length === 0) $$renderer.push(`<!--[0--><p class="paper-detail-fact">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.comment-empty"))}</p>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <!--[-->`);
			const each_array = ensure_array_like(comments);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let comment = each_array[$$index];
				$$renderer.push(`<div class="paper-comment" data-testid="comment"><p class="grow wrap-break-word"><strong class="paper-comment-author">${escape_html(comment.authorName)}</strong> <span class="whitespace-pre-wrap">${escape_html(comment.text)}</span></p> `);
				if (comment.mine) $$renderer.push(`<!--[0--><button class="paper-link paper-comment-delete"${attr("aria-label", store_get($$store_subs ??= {}, "$t", t)("wishes.comment-delete"))} type="button"><iconify-icon icon="ion:close"></iconify-icon></button>`);
				else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div>`);
			}
			$$renderer.push(`<!--]--> `);
			$$renderer.push(`<!--[-1--><button class="paper-link paper-comment-add" type="button">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.comment-add"))}</button>`);
			$$renderer.push(`<!--]--> <p class="paper-detail-fact">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.comment-hidden-hint"))}</p></section>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/lib/components/wishlists/ItemDetail.svelte
function ItemDetail($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const { item, user, isSelfClaimable, showClaimForOwner } = $$props;
		const t = getFormatter();
		const showQuantity = derived(() => (item.quantity ?? 1) > 1);
		const showClaimed = derived(() => user?.id !== item.userId || showClaimForOwner);
		$$renderer.push(`<div class="paper-detail" data-testid="item-detail">`);
		if (item.price || item.itemPrice) $$renderer.push(`<!--[0--><p class="paper-detail-fact" data-testid="price">${escape_html(formatPrice(item))}</p>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (showQuantity() || showClaimed() && item.claimedQuantity > 0) {
			$$renderer.push(`<!--[0--><p class="paper-detail-fact">`);
			if (showQuantity()) $$renderer.push(`<!--[0--><span data-testid="quantity-desired">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.quantity-desired", { values: { quantity: item.quantity } }))}</span>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (showQuantity() && showClaimed() && item.claimedQuantity > 0) $$renderer.push(`<!--[0-->·`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (showClaimed() && item.claimedQuantity > 0) $$renderer.push(`<!--[0--><span data-testid="quantity-claimed">${escape_html(store_get($$store_subs ??= {}, "$t", t)("wishes.quantity-claimed", { values: { quantity: item.claimedQuantity } }))}</span>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		ItemComments($$renderer, {
			isSelfClaimable,
			item,
			user
		});
		$$renderer.push(`<!----></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
// src/lib/components/wishlists/ItemCard/ItemCard.svelte
function defaultImage($$renderer, _t, _sizeClasses) {}
function ItemCard_1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const id = props_id($$renderer);
		const { item, groupId, user = void 0, userCanManage = false, showClaimedName = false, showNameAcrossGroups = false, showClaimForOwner = false, showPublicClaimName = false, requireClaimEmail = true, showFor = false, onPublicList = false, reorderActions = false, onIncreasePriority = void 0, onDecreasePriority = void 0, onPriorityChange, isTileView = false, isSelfClaimable = false, isNew = false, commentCount = 0 } = $$props;
		const open = derived(() => page.url.searchParams.get("item-id") === item.id.toString());
		const ItemCard = derived(() => isTileView ? GridItemCard : ListItemCard);
		if (!pendingRemovals.has(item.id)) {
			$$renderer.push(`<!--[0--><div${attr_class(clsx([
				"card block w-full text-start print:break-inside-avoid print:shadow-none",
				isTileView ? "preset-filled-surface-100-900 border-surface-200-800 h-full border" : ["paper-row", !item.approved && "paper-row-pending"],
				isTileView && !item.approved && "preset-tonal-warning border-warning-500 border",
				isTileView && !reorderActions && "card-hover"
			]))}><div class="paper-row-main"${attr("aria-expanded", reorderActions ? void 0 : open())}${attr("aria-labelledby", `${id}-name`)}${attr("role", reorderActions ? "none" : "button")}${attr("tabindex", reorderActions ? -1 : 0)}>`);
			if (ItemCard()) {
				$$renderer.push("<!--[-->");
				ItemCard()($$renderer, {
					id,
					commentCount,
					defaultImage,
					groupId,
					isNew,
					isSelfClaimable,
					item,
					onDecreasePriority,
					onIncreasePriority,
					onPriorityChange,
					onPublicList,
					reorderActions,
					requireClaimEmail,
					showClaimForOwner,
					showClaimedName,
					showFor,
					showNameAcrossGroups,
					showPublicClaimName,
					user,
					userCanManage
				});
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
			$$renderer.push(`</div> `);
			if (open() && !reorderActions) {
				$$renderer.push("<!--[0-->");
				ItemDetail($$renderer, {
					isSelfClaimable,
					item,
					showClaimForOwner,
					user
				});
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}

export { ItemCard_1 as I };
//# sourceMappingURL=ItemCard.js-Df02Pz2E.js.map
