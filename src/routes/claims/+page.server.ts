import type { PageServerLoad } from "./$types";
import { client } from "$lib/server/prisma";
import { getActiveMembership } from "$lib/server/group-membership";
import { toItemOnListDTO } from "$lib/dtos/item-mapper";
import { requireLogin } from "$lib/server/auth";
import { decodeMultiValueFilter } from "$lib/server/sort-filter-util";
import { getConfig } from "$lib/server/config";

export const load: PageServerLoad = async ({ url, cookies, depends }) => {
    const user = requireLogin();

    const activeMembership = await getActiveMembership(user);
    const config = await getConfig(activeMembership.groupId);

    // Read view preference from cookie (for SSR to prevent flicker)
    const viewPreference = cookies.get("listViewPreference") as "list" | "tile" | undefined;

    const userIdFilter = decodeMultiValueFilter(url.searchParams.get("users"));
    const items = await client.item.findMany({
        where: {
            claims: {
                some: {
                    claimedById: user.id,
                    list: {
                        groupId: activeMembership.groupId
                    }
                }
            },
            lists: {
                some: {
                    list: {
                        groupId: activeMembership.groupId
                    }
                }
            },
            userId: {
                in: userIdFilter.length > 0 ? userIdFilter : undefined
            }
        },
        include: {
            lists: {
                select: {
                    listId: true,
                    list: {
                        select: {
                            id: true,
                            ownerId: true,
                            managers: {
                                select: {
                                    userId: true
                                }
                            }
                        }
                    },
                    approved: true,
                    displayOrder: true,
                    addedBy: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                },
                where: {
                    list: {
                        groupId: activeMembership.groupId
                    }
                }
            },
            claims: {
                select: {
                    id: true,
                    listId: true,
                    purchased: true,
                    quantity: true,
                    claimedBy: {
                        select: {
                            id: true,
                            name: true,
                            UserGroupMembership: {
                                select: {
                                    groupId: true
                                }
                            }
                        }
                    },
                    publicClaimedBy: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                },
                // toutes les réservations de l'idée, pour savoir avec qui on la réserve
                where: {
                    list: {
                        groupId: activeMembership.groupId
                    }
                }
            },
            user: {
                select: {
                    id: true,
                    name: true
                }
            },
            itemPrice: true,
            _count: {
                select: {
                    lists: true
                }
            }
        }
    });

    depends("data:items");

    const itemDTOs = items
        // une idée offerte quitte la liste : elle n'a plus rien à faire dans les réservations
        // (sauf sur ses propres idées, où l'on ne doit jamais savoir qu'elle a été offerte)
        .filter((item) => !item.offered || item.userId === user.id)
        .map((item) => {
            const claim = item.claims.find((c) => c.claimedBy?.id === user.id)!;
            // sur ses propres idées, on ne voit que sa propre réservation (jamais celles des autres)
            const visible = item.userId === user.id ? { ...item, offered: false, offeredAt: null, claims: [claim] } : item;
            return toItemOnListDTO(visible, claim.listId);
        });

    return {
        user: {
            ...user,
            activeGroupId: activeMembership.groupId
        },
        items: itemDTOs,
        initialViewPreference: viewPreference || "list",
        config,
        anyoneCanDeleteItems: config.anyoneCanDeleteItems
    };
};
