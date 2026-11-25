import { expect, test } from "../fixtures";
import { ListPage } from "../pageObjects/list.page";
import { ListsPage } from "../pageObjects/lists.page";
import { randomString } from "../util";

// « Famille & amis » ne liste que les listes des autres : on vérifie donc le résultat depuis le point de vue
// d'une autre personne du cercle (`additionalPage`).

test("create list with default values", async ({ page, userData, additionalPage: otherPage }) => {
    const otherListsPage = new ListsPage(otherPage);
    await otherListsPage.goto();
    await otherListsPage.expectListCount(1);

    const listsPage = new ListsPage(page);
    await listsPage.goto();
    const createListPage = await listsPage.create();
    await createListPage.at();
    await createListPage.createDefault();

    await otherListsPage.goto();
    await otherListsPage.expectListCount(2);

    // Sans nom personnalisé, seule la personne est affichée
    for (const index of [0, 1]) {
        const card = await otherListsPage.getListAt(index);
        await card.assertOwner(userData.name);
        await card.assertNoName();
    }
});

test("create list with name", async ({ page, userData, additionalPage: otherPage }) => {
    const otherListsPage = new ListsPage(otherPage);
    await otherListsPage.goto();
    await otherListsPage.expectListCount(1);

    const listsPage = new ListsPage(page);
    await listsPage.goto();
    const listName = randomString();
    const createListPage = await listsPage.create();
    await createListPage.at();
    await createListPage.create(listName);

    await otherListsPage.goto();
    await otherListsPage.expectListCount(2);
    const newList = await otherListsPage.getListByName(listName);
    await newList.assertName(listName);
    await newList.assertOwner(userData.name);
});

test("change list name", async ({ page, userData, additionalPage: otherPage }) => {
    const listsPage = new ListsPage(page);
    await listsPage.goto();

    const otherListsPage = new ListsPage(otherPage);
    await otherListsPage.goto();
    await otherListsPage.expectListCount(1);
    await otherListsPage.getListAt(0).then((card) => card.assertNoName());

    const manageListPage = await listsPage.openMyList().then((list) => list.manage());
    await manageListPage.at();
    const newListName = randomString();
    await manageListPage.setName(newListName).then((p) => p.save());

    await otherListsPage.goto();
    await otherListsPage.expectListCount(1);
    const card = await otherListsPage.getListAt(0);
    await card.assertName(newListName);
    await card.assertOwner(userData.name);
});

test("delete list", async ({ page, additionalPage: otherPage }) => {
    const listsPage = new ListsPage(page);
    await listsPage.goto();
    const otherListsPage = new ListsPage(otherPage);

    const listName = randomString();
    const createListPage = await listsPage.create();
    await createListPage.at();
    await createListPage.create(listName);
    const newList = new ListPage(page, { name: listName });

    await otherListsPage.goto();
    await otherListsPage.expectListCount(2);

    const manageListPage = await newList.manage();
    await manageListPage.delete();

    await listsPage.at();
    await otherListsPage.goto();
    await otherListsPage.expectListCount(1);
});

test("lists page shows only the lists of other people", async ({
    page: user1Page,
    userData,
    additionalPage: user2Page,
    additionalUserData: user2
}) => {
    const user1ListsPage = new ListsPage(user1Page);
    await user1ListsPage.goto();

    const user2ListsPage = new ListsPage(user2Page);
    await user2ListsPage.goto();

    // Chacun ne voit que la liste de l'autre, jamais la sienne
    await user1ListsPage.expectListCount(1);
    await user2ListsPage.expectListCount(1);
    await user1ListsPage.getListAt(0).then((list) => list.assertOwner(user2.name));
    await user2ListsPage.getListAt(0).then((list) => list.assertOwner(userData.name));
    await expect(user1Page.getByTestId("list-owner").filter({ hasText: userData.name })).toHaveCount(0);
});
