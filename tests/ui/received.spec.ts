import { expect, test } from "../fixtures";
import { ListsPage } from "../pageObjects/lists.page";

// "Reçus" history: other members can read it, the recipient never can.
test("received tab is hidden from the list owner", async ({
    page: ownerPage,
    userData: owner,
    additionalPage: otherPage
}) => {
    const ownerLists = new ListsPage(ownerPage);
    await ownerLists.goto();
    const ownerListPage = await ownerLists.getListAt(0).then((list) => list.click());
    const listUrl = ownerListPage.getId();

    await test.step("owner sees no Received link and gets 404 on the page", async () => {
        await expect(ownerPage.getByRole("link", { name: "Received" })).toHaveCount(0);
        const response = await ownerPage.goto(`/wishlists/${owner.username}/received`);
        expect(response?.status()).toBe(404);
    });

    await test.step("another member sees the Received link and can open it", async () => {
        await otherPage.goto(`/lists/${listUrl}`);
        await expect(otherPage.getByRole("link", { name: "Received" })).toBeVisible();
        const response = await otherPage.goto(`/wishlists/${owner.username}/received`);
        expect(response?.status()).toBe(200);
    });
});
