import {
  prisma
} from "./chunk-7XXVSZUH.mjs";

// prisma/seed.ts
var roles = async () => {
  await prisma.role.upsert({
    where: {
      id: 1
    },
    create: {
      id: 1,
      name: "USER"
    },
    update: {}
  });
  await prisma.role.upsert({
    where: {
      id: 2
    },
    create: {
      id: 2,
      name: "ADMIN"
    },
    update: {}
  });
  await prisma.role.upsert({
    where: {
      id: 3
    },
    create: {
      id: 3,
      name: "GROUP_MANAGER"
    },
    update: {}
  });
  console.log("roles are synced");
};
var groups = async () => {
  const groupCount = await prisma.group.count();
  if (groupCount === 0) {
    const defaultGroup = await prisma.group.create({
      data: {
        name: "Family"
      }
    });
    const allUsers = await prisma.user.findMany();
    for (const user of allUsers) {
      await prisma.userGroupMembership.create({
        data: {
          active: true,
          user: {
            connect: {
              id: user.id
            }
          },
          group: {
            connect: {
              id: defaultGroup.id
            }
          }
        }
      });
    }
    if (process.env.SEED_DEFAULT_GROUP !== "false") {
      await prisma.systemConfig.upsert({
        where: { key_groupId: { key: "defaultGroup", groupId: "global" } },
        create: { key: "defaultGroup", groupId: "global", value: defaultGroup.id },
        update: { value: defaultGroup.id }
      });
    }
    console.log("created default group");
  } else {
    console.log("skipping default group creation");
  }
};
var main = async () => {
  await roles();
  await groups();
};
main().then(async () => {
  await prisma.$disconnect();
}).catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
