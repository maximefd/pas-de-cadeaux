import { R as Role } from '../../../../../../../chunks/schema.js-_174nGak.js';
import { c as client } from '../../../../../../../chunks/prisma.js-iNNVyVix.js';
import { r as requireAccessToGroup } from '../../../../../../../chunks/auth2.js-B5r9tiLU.js';
import { h as deleteLists, f as create } from '../../../../../../../chunks/list.js-B0L9113F.js';
import { g as getConfig } from '../../../../../../../chunks/config.js-465rpi-p.js';
import { x as error } from '../../../../../../../chunks/utils.js-CAPFIGDr.js';
import '../../../../../../../chunks/shared-server.js-B6_G0tAr.js';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import '@prisma/adapter-better-sqlite3';
import '../../../../../../../chunks/auth.js-C7-cSOnT.js';
import '../../../../../../../chunks/i18n.js-D1Rw55oM.js';
import '../../../../../../../chunks/routing.js-DMTqwvGY.js';
import '../../../../../../../chunks/internal2.js-CM4IiAcJ.js';
import '../../../../../../../chunks/index-server.js-CIVHNbBm.js';
import '../../../../../../../chunks/shared.js-Cb68JbUk.js';
import '../../../../../../../chunks/i18n2.js-1SlG2bAu.js';
import '../../../../../../../chunks/index-server2.js-DZFYXfYm.js';
import '@oslojs/encoding';
import '@oslojs/crypto/sha2';
import '../../../../../../../chunks/sort-filter-util.js-B1LxSaRF.js';
import '../../../../../../../chunks/item-mapper.js-DUyKoq81.js';
import '../../../../../../../chunks/items.js-C_2ihKyH.js';
import '../../../../../../../chunks/comparators.js-DkswRRoE.js';
import '@paralleldrive/cuid2';

// src/routes/pdc/groups/[groupId]/users/[userId]/+server.ts
var GET = async ({ params }) => {
	const { authenticated, user } = await requireAccessToGroup(params.groupId);
	if (!authenticated && user.id !== params.userId) error(401, "User is not authorized to view this membership");
	const group = await client.group.findUniqueOrThrow({ where: { id: params.groupId } });
	if (!group) error(404, "group not found");
	const membership = await client.userGroupMembership.findFirst({ where: {
		userId: params.userId,
		groupId: group.id
	} });
	if (!membership) error(400, "user is not a member of the group");
	return new Response(JSON.stringify({ membership }), { status: 200 });
};
var PUT = async ({ request, params }) => {
	const { authenticated } = await requireAccessToGroup(params.groupId);
	if (!authenticated) error(401, "User is not authorized to add a member to this group");
	const group = await client.group.findUniqueOrThrow({ where: { id: params.groupId } });
	if (!group) error(404, "group not found");
	const config = await getConfig(group.id);
	const data = await request.json();
	if (await client.userGroupMembership.findFirst({ where: {
		userId: params.userId,
		groupId: group.id
	} })) error(400, "user is already member of the group");
	const createList = config.enableDefaultListCreation ? create(params.userId, group.id) : Promise.resolve();
	const [newMembership] = await Promise.all([client.userGroupMembership.create({ data: {
		userId: params.userId,
		groupId: group.id,
		roleId: data.manager ? Role.GROUP_MANAGER : void 0
	} }), createList]);
	return new Response(JSON.stringify({ newMembership }), { status: 201 });
};
var DELETE = async ({ params }) => {
	const { authenticated } = await requireAccessToGroup(params.groupId);
	if (!authenticated) error(401, "User is not authorized to add a member to this group");
	const group = await client.group.findUniqueOrThrow({ where: { id: params.groupId } });
	if (!group) error(404, "group not found");
	let membership = await client.userGroupMembership.findFirstOrThrow({ where: {
		userId: params.userId,
		groupId: group.id
	} });
	if (!membership) error(400, "user is not a member of the group");
	membership = await client.userGroupMembership.delete({ where: { id: membership.id } });
	deleteLists(params.userId, group.id);
	return new Response(JSON.stringify({ membership }), { status: 200 });
};
var PATCH = async ({ params, request }) => {
	const { authenticated } = await requireAccessToGroup(params.groupId);
	if (!authenticated) error(401, "User is not authorized to add a member to this group");
	const group = await client.group.findUniqueOrThrow({ where: { id: params.groupId } });
	if (!group) error(404, "group not found");
	let membership = await client.userGroupMembership.findFirstOrThrow({ where: {
		userId: params.userId,
		groupId: group.id
	} });
	if (!membership) error(400, "user is not a member of the group");
	const body = await request.json();
	const data = {};
	if (Object.keys(body).includes("manager") && typeof body.manager === "boolean") data.roleId = body.manager ? Role.GROUP_MANAGER : Role.USER;
	membership = await client.userGroupMembership.update({
		where: { id: membership.id },
		data
	});
	return new Response(JSON.stringify({ membership }), { status: 200 });
};

export { DELETE, GET, PATCH, PUT };
//# sourceMappingURL=_server.ts.js-B-sN9LXp.js.map
