import { expect, test } from "../fixtures";
import { ListPage } from "../pageObjects/list.page";
import { ListsPage } from "../pageObjects/lists.page";
import { randomString } from "../util";

// Réservation à plusieurs : une idée déjà réservée peut être rejointe (« Je participe »),
// et la personne concernée ne reçoit jamais la moindre information sur les réservations.
test("shared claim stays hidden from the owner", async ({
    page: ownerPage,
    userData: owner,
    additionalPage: firstPage,
    additionalUserData: first,
    userFactory
}) => {
    const { page: secondPage, user: second } = await userFactory.createUserPage({ group: owner.groups[0] });
    const itemName = randomString();

    let listId = "";
    await test.step("owner creates an item", async () => {
        const ownerLists = new ListsPage(ownerPage);
        await ownerLists.goto();
        const ownerListPage = await ownerLists.openMyList();
        listId = ownerListPage.getId();
        const createItemPage = await ownerListPage.createItem();
        await createItemPage.getForm().then((f) => f.fillName(itemName));
        await createItemPage.create();
    });

    const firstList = new ListPage(firstPage, { id: listId, name: owner.name });
    const secondList = new ListPage(secondPage, { id: listId, name: owner.name });

    await test.step("first user claims the item", async () => {
        await firstList.goto();
        await firstList.getItemAt(0).then((item) => item.claimSingle());
        await firstList.getItemAt(0).then((item) => item.assertMyClaimText("You're getting it"));
    });

    await test.step("second user joins the claim", async () => {
        await secondList.goto();
        const item = await secondList.getItemAt(0);
        await item.assertNoClaimButton();
        await item.assertClaimText(`Claimed by ${first.name}`);
        await item.join();
        await secondList.goto();
        await secondList.getItemAt(0).then((it) => it.assertMyClaimText(`with ${first.name}`));
    });

    await test.step("first user sees who chips in", async () => {
        await firstList.goto();
        await firstList.getItemAt(0).then((item) => item.assertMyClaimText(`with ${second.name}`));
    });

    await test.step("owner never receives the claims", async () => {
        const response = await ownerPage.request.get(`/lists/${listId}/__data.json`);
        expect(response.ok()).toBeTruthy();
        const body = await response.text();
        expect(body).toContain(itemName);
        expect(body).not.toContain(first.name);
        expect(body).not.toContain(second.name);
    });

    await test.step("when the first user cancels, the second one takes over", async () => {
        await firstList.goto();
        await firstList.getItemAt(0).then((item) => item.unclaimSingle());
        await firstList.goto();
        await firstList.getItemAt(0).then((item) => item.assertClaimText(`Claimed by ${second.name}`));

        await secondList.goto();
        await secondList.getItemAt(0).then((item) => item.assertMyClaimText("You're getting it"));
    });
});
