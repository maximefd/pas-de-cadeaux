import { expect, test } from "../fixtures";
import { ListPage } from "../pageObjects/list.page";
import { ListsPage } from "../pageObjects/lists.page";
import { randomString } from "../util";

// « Retirer » → « C'est offert » : l'idée quitte la liste et part dans l'historique des cadeaux,
// que la personne concernée ne voit jamais. Depuis l'historique, on peut la remettre dans la liste.
test("an offered idea moves to the gift history, hidden from the owner", async ({
    page: ownerPage,
    userData: owner,
    additionalPage: otherPage,
    baseURL
}) => {
    const itemName = randomString();
    await otherPage.context().addCookies([{ name: "listViewPreference", value: "list", url: baseURL! }]);

    let listId = "";
    await test.step("owner creates an item", async () => {
        const ownerLists = new ListsPage(ownerPage);
        await ownerLists.goto();
        const ownerListPage = await ownerLists.getListAt(0).then((list) => list.click());
        listId = ownerListPage.getId();
        const createItemPage = await ownerListPage.createItem();
        await createItemPage.getForm().then((f) => f.fillName(itemName));
        await createItemPage.create();
    });

    await test.step("owner sees no history link and gets 404 on the page", async () => {
        await ownerPage.goto(`/lists/${listId}`);
        await expect(ownerPage.getByRole("link", { name: "Gift history" })).toHaveCount(0);
        const response = await ownerPage.goto(`/wishlists/${owner.username}/history`);
        expect(response?.status()).toBe(404);
    });

    const otherList = new ListPage(otherPage, { id: listId, name: `${owner.name}'s Wishes` });

    await test.step("another member marks the idea as given", async () => {
        await otherList.goto();
        const updated = otherPage.waitForResponse((r) => r.url().endsWith("/offered") && r.ok());
        await otherPage.getByRole("button", { name: "Remove" }).click();
        await otherPage.getByTestId("remove-offered").click();
        await expect(otherPage.getByTestId("name").filter({ hasText: itemName })).toHaveCount(0);
        await updated;
        await otherPage.reload();
        await expect(otherPage.getByTestId("name").filter({ hasText: itemName })).toHaveCount(0);
    });

    await test.step("the idea shows up in the gift history under the current year", async () => {
        await otherPage.getByRole("link", { name: "Gift history" }).click();
        const history = otherPage.getByTestId("history-items");
        await expect(history.getByText(itemName)).toBeVisible();
        await expect(history.getByText(String(new Date().getFullYear()))).toBeVisible();
    });

    await test.step("the owner still sees the idea and never learns it was given", async () => {
        await ownerPage.goto(`/lists/${listId}`);
        await expect(ownerPage.getByTestId("name").filter({ hasText: itemName })).toBeVisible();
    });

    await test.step("a mistake can be undone from the history", async () => {
        await otherPage.getByRole("button", { name: "Put back on the list" }).click();
        await expect(otherPage.getByTestId("history-items")).toHaveCount(0);
        await otherList.goto();
        await expect(otherPage.getByTestId("name").filter({ hasText: itemName })).toBeVisible();
    });
});

test("marking an idea as given can be undone right away", async ({
    page: ownerPage,
    additionalPage: otherPage,
    baseURL
}) => {
    const itemName = randomString();
    await otherPage.context().addCookies([{ name: "listViewPreference", value: "list", url: baseURL! }]);

    const ownerLists = new ListsPage(ownerPage);
    await ownerLists.goto();
    const ownerListPage = await ownerLists.getListAt(0).then((list) => list.click());
    const listId = ownerListPage.getId();
    const createItemPage = await ownerListPage.createItem();
    await createItemPage.getForm().then((f) => f.fillName(itemName));
    await createItemPage.create();

    const requests: string[] = [];
    otherPage.on("request", (r) => r.url().endsWith("/offered") && requests.push(r.url()));
    await otherPage.goto(`/lists/${listId}`);
    await otherPage.getByRole("button", { name: "Remove" }).click();
    await otherPage.getByTestId("remove-offered").click();
    await expect(otherPage.getByTestId("name").filter({ hasText: itemName })).toHaveCount(0);
    await otherPage
        .locator("[data-scope='toast'][data-part='root']")
        .filter({ hasText: itemName })
        .getByRole("button", { name: "Cancel" })
        .click();
    await expect(otherPage.getByTestId("name").filter({ hasText: itemName })).toBeVisible();
    await otherPage.waitForTimeout(5000);
    expect(requests).toHaveLength(0);
});
