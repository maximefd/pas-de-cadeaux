import { c as client } from './prisma.js-iNNVyVix.js';
import { g as getConfig } from './config.js-465rpi-p.js';
import { f as create } from './list.js-B0L9113F.js';
import { h as hashPassword } from './password.js-Dt-reOTD.js';

// src/lib/server/user.ts
var createUser = async (user, role, password, signupTokenId) => {
	const config = await getConfig();
	const userCount = await client.user.count();
	let groupId = config.defaultGroup;
	if (signupTokenId) groupId = await client.signupToken.findUnique({
		where: { id: signupTokenId },
		select: { groupId: true }
	}).then((data) => data?.groupId);
	else if (userCount === 0 && !groupId) groupId = (await client.group.findFirst({ select: { id: true } }))?.id;
	const hashedPassword = await hashPassword(password);
	const newUser = await client.user.create({
		select: { id: true },
		data: {
			username: user.username,
			name: user.name,
			email: user.email,
			roleId: role,
			hashedPassword,
			oauthId: user.oauthId
		}
	});
	if (groupId) {
		const createList = (await getConfig(groupId)).enableDefaultListCreation ? create(newUser.id, groupId) : Promise.resolve();
		await Promise.all([client.userGroupMembership.create({ data: {
			groupId,
			userId: newUser.id,
			active: true
		} }), createList]);
	}
	if (signupTokenId) await client.signupToken.updateMany({
		where: {
			id: signupTokenId,
			reusable: false
		},
		data: { redeemed: true }
	});
	return newUser;
};

export { createUser as c };
//# sourceMappingURL=user.js-DOVQkMm-.js.map
