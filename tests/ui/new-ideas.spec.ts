import { expect, test } from "../fixtures";
import { ListPage } from "../pageObjects/list.page";
import { ListsPage } from "../pageObjects/lists.page";
import { randomString } from "../util";

// Un petit point signale les idées ajoutées depuis ta dernière visite sur la liste d'un proche.
test("new ideas are flagged until the list has been visited", async ({
    page: ownerPage,
    userData: owner,
    additionalPage: otherPage
}) => {
    const ownerLists = new ListsPage(ownerPage);
    await ownerLists.goto();
    const ownerListPage = await ownerLists.openMyList();
    const listId = ownerListPage.getId();

    const otherLists = new ListsPage(otherPage);
    const otherListPage = new ListPage(otherPage, { id: listId, name: owner.name });
    const row = () => otherPage.locator("a.paper-person").filter({ hasText: owner.name });

    // Première visite : la liste est vide, rien à signaler.
    await otherListPage.goto();
    await otherLists.goto();
    await expect(row()).toBeVisible();
    await expect(row().getByTestId("new-ideas")).toHaveCount(0);

    const itemName = randomString();
    await test.step("owner adds an idea", async () => {
        await ownerListPage.goto();
        const createPage = await ownerListPage.createItem();
        await createPage.getForm().then((f) => f.fillName(itemName));
        await createPage.create();
        // sur sa propre liste, jamais de point
        await expect(ownerPage.getByTestId("new-idea")).toHaveCount(0);
    });

    await test.step("the other member sees a dot next to the person, then next to the idea", async () => {
        await otherLists.goto();
        await expect(row().getByTestId("new-ideas")).toBeVisible();

        await otherListPage.goto();
        const item = otherPage.getByTestId("items-container").locator("div.card").filter({ hasText: itemName });
        await expect(item.getByTestId("new-idea")).toBeVisible();
    });

    await test.step("once visited, the dots are gone", async () => {
        await otherPage.reload();
        await expect(otherPage.getByTestId("name").filter({ hasText: itemName })).toBeVisible();
        await expect(otherPage.getByTestId("new-idea")).toHaveCount(0);

        await otherLists.goto();
        await expect(row()).toBeVisible();
        await expect(row().getByTestId("new-ideas")).toHaveCount(0);
    });

    await test.step("the owner has no dot anywhere", async () => {
        await ownerLists.goto();
        await expect(ownerPage.getByTestId("new-ideas")).toHaveCount(0);
    });
});
