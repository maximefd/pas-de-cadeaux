import { Role } from "$lib/schema";
import { getConfig } from "$lib/server/config";
import { client } from "$lib/server/prisma";
import type { Actions, PageServerLoad } from "./$types";
import { requireAdminOrManager } from "$lib/server/auth";
import generateToken, { hashToken, isTokenTimeValid, tokenExpiresAt } from "$lib/server/token";

const findActiveInvite = async (groupId: string) => {
    const invite = await client.signupToken.findFirst({
        where: { groupId, reusable: true },
        orderBy: { createdAt: "desc" }
    });
    if (!invite || !invite.token) return null;
    return {
        token: invite.token,
        expiresAt: tokenExpiresAt(invite.createdAt).toISOString(),
        expired: !isTokenTimeValid(invite.createdAt)
    };
};

export const load = (async ({ params }) => {
    await requireAdminOrManager(params.groupId);

    const group = await client.group
        .findUniqueOrThrow({
            where: {
                id: params.groupId
            },
            select: {
                id: true,
                name: true,
                UserGroupMembership: {
                    select: {
                        user: {
                            select: {
                                id: true,
                                username: true,
                                name: true,
                                email: true,
                                role: {
                                    select: {
                                        id: true
                                    }
                                }
                            }
                        },
                        roleId: true
                    }
                }
            }
        })
        .then((group) => ({
            id: group?.id,
            name: group?.name,
            users: group?.UserGroupMembership.map((membership) => ({
                ...membership.user,
                isGroupManager: membership.roleId === Role.GROUP_MANAGER
            }))
        }));

    const config = await getConfig(group.id);

    return {
        group,
        config,
        invite: await findActiveInvite(group.id)
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    // Crée un lien de groupe (ou en génère un nouveau : l'ancien est désactivé).
    createLink: async ({ params }) => {
        await requireAdminOrManager(params.groupId);
        const token = await generateToken();
        await client.$transaction([
            client.signupToken.deleteMany({ where: { groupId: params.groupId, reusable: true } }),
            client.signupToken.create({
                data: { hashedToken: hashToken(token), token, reusable: true, groupId: params.groupId }
            })
        ]);
        return { success: true };
    },
    // Désactive le lien : il ne marche plus du tout.
    revokeLink: async ({ params }) => {
        await requireAdminOrManager(params.groupId);
        await client.signupToken.deleteMany({ where: { groupId: params.groupId, reusable: true } });
        return { success: true };
    }
};
