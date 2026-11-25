import { expect, test } from "../fixtures";
import { GroupSettingsPage } from "../pageObjects/group-settings.page";
import { ListPage } from "../pageObjects/list.page";
import { ListsPage } from "../pageObjects/lists.page";
import { randomString } from "../util";

// La ligne de « Famille & amis » n'affiche plus le nombre d'idées encore disponibles : on vérifie les réservations
// sur la page de la liste (détail de l'idée) et dans « Mes réservations ».

test("claim single", async ({ page: ownerPage, userData: owner, additionalPage: claimerPage }) => {
    const itemName = randomString();
    await test.step("create item", async () => {
        const ownerLists = new ListsPage(ownerPage);
        await ownerLists.goto();
        const ownerListPage = await ownerLists.openMyList();

        const createItemPage = await ownerListPage.createItem();
        await createItemPage.getForm().then((f) => f.fillName(itemName));
        await createItemPage.create();
    });

    const claimerLists = new ListsPage(claimerPage);
    let listPage: ListPage;
    await test.step("user claims item", async () => {
        await claimerLists.goto();
        listPage = await claimerLists.getListByOwner(owner.name).then((card) => card.click());
        await listPage.getItemAt(0).then((item) => item.claimSingle());
    });

    await test.step("item shows as claimed by me, none left to claim", async () => {
        await listPage.goto();
        await listPage.getItemAt(0).then((item) => item.assertMyClaimText("You're getting it"));
        await listPage.getItemAt(0).then((item) => item.assertNoClaimButton());
        await listPage.getItemAt(0).then((item) => item.assertClaimedQuantity(1));
    });

    await test.step("item is in my claims", async () => {
        await claimerPage.goto("/claims");
        await expect(
            claimerPage.getByTestId("claims-container").getByTestId("name").filter({ hasText: itemName })
        ).toBeVisible();
    });
});

test("partial claim", async ({ page: ownerPage, userData: owner, additionalPage: claimerPage }) => {
    const quantity = 4;

    await test.step("create item", async () => {
        const ownerLists = new ListsPage(ownerPage);
        await ownerLists.goto();
        const ownerListPage = await ownerLists.openMyList();

        const createItemPage = await ownerListPage.createItem();
        await createItemPage
            .getForm()
            .then((f) => f.fillName(randomString()))
            .then((f) => f.fillQuantity(quantity));
        await createItemPage.create();
    });

    const claimerLists = new ListsPage(claimerPage);
    let listPage: ListPage;
    await test.step("user claims half items", async () => {
        await claimerLists.goto();
        listPage = await claimerLists.getListByOwner(owner.name).then((card) => card.click());
        await listPage.getItemAt(0).then((item) => item.claimAmount(quantity / 2));
    });

    await test.step("half of the items are claimed", async () => {
        await listPage.goto();
        await listPage.getItemAt(0).then((item) => item.assertClaimedQuantity(quantity / 2));
        await listPage.getItemAt(0).then((item) => item.assertDesiredQuantity(quantity));
    });
});

test("claim unlimited item", async ({ page: ownerPage, userData: owner, additionalPage: claimerPage }) => {
    await test.step("create item", async () => {
        const ownerLists = new ListsPage(ownerPage);
        await ownerLists.goto();
        const ownerListPage = await ownerLists.openMyList();

        const createItemPage = await ownerListPage.createItem();
        await createItemPage
            .getForm()
            .then((f) => f.fillName(randomString()))
            .then((f) => f.checkNoLimit());
        await createItemPage.create();
    });

    const claimerLists = new ListsPage(claimerPage);
    let listPage: ListPage;
    await test.step("user claims many items", async () => {
        await claimerLists.goto();
        listPage = await claimerLists.getListByOwner(owner.name).then((card) => card.click());
        await listPage.getItemAt(0).then((item) => item.claimAmount(100));
    });

    await test.step("an unlimited item stays claimable", async () => {
        await listPage.goto();
        await listPage.getItemAt(0).then((item) => item.assertClaimedQuantity(100));
        await listPage.getItemAt(0).then((item) => item.assertNoQuantity());
    });
});

test("claim item on own list", async ({ page: ownerPage, userData: owner, additionalPage: claimerPage }) => {
    await test.step("create item", async () => {
        const ownerLists = new ListsPage(ownerPage);
        await ownerLists.goto();
        const ownerListPage = await ownerLists.openMyList();

        const createItemPage = await ownerListPage.createItem();
        await createItemPage.getForm().then((f) => f.fillName(randomString()));
        await createItemPage.create();
    });

    const listPage = new ListPage(ownerPage, { name: "My wishes" });
    await test.step("validate claim button is missing", async () => {
        await listPage.getItemAt(0).then((item) => item.assertNoClaimButton());
    });

    await test.step("mark list as 'not for me'", async () => {
        await listPage
            .manage()
            .then((mp) => mp.setNotForMe(true))
            .then((mp) => mp.save());
    });

    await test.step("validate owner can claim", async () => {
        await listPage.getItemAt(0).then((item) => item.assertClaimedQuantity(0));
        await listPage.getItemAt(0).then((item) => item.claimSingle());
        await listPage.getItemAt(0).then((item) => item.assertClaimedQuantity(1));
    });

    await test.step("validate owner can unclaim", async () => {
        await listPage.getItemAt(0).then((item) => item.unclaimSingle());
        await listPage.getItemAt(0).then((item) => item.assertClaimedQuantity(0));
    });

    await test.step("allow owner to claim items on group settings", async () => {
        const groupSettingsPage = new GroupSettingsPage(ownerPage, owner.groups[0]);
        await groupSettingsPage.goto();
        await groupSettingsPage.setShowForListOwner(true);
    });

    await test.step("allow owner to claim items", async () => {
        await listPage.goto({ skipAssert: true });
        const manageListPage = await listPage.manage();
        await manageListPage.getForm().then((form) => form.assertAllowOwnerClaimsDisabled());
        await manageListPage
            .setNotForMe(false)
            .then((mp) => mp.setAllowOwnerClaims(true))
            .then((mp) => mp.save());
    });

    await test.step("validate owner can claim", async () => {
        await listPage.getItemAt(0).then((item) => item.assertClaimedQuantity(0));
        await listPage.getItemAt(0).then((item) => item.claimSingle());
        await listPage.getItemAt(0).then((item) => item.assertClaimedQuantity(1));
    });

    await test.step("validate owner can unclaim", async () => {
        await listPage.getItemAt(0).then((item) => item.unclaimSingle());
        await listPage.getItemAt(0).then((item) => item.assertClaimedQuantity(0));
    });

    await test.step("another user can still claim item", async () => {
        const claimerLists = new ListsPage(claimerPage);
        await claimerLists.goto();
        await claimerLists
            .getListByOwner(owner.name)
            .then((card) => card.click())
            .then((listPage) => listPage.getItemAt(0))
            .then((item) => item.claimSingle());
    });
});
