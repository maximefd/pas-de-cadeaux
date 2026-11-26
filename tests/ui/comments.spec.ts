import { expect, test } from "../fixtures";
import { ListPage } from "../pageObjects/list.page";
import { ListsPage } from "../pageObjects/lists.page";
import { randomString } from "../util";

// Commentaires signés : tout autre membre peut commenter et les lire, jamais la personne concernée.
test("comments are signed, visible to other members and hidden from the list owner", async ({
    page: ownerPage,
    userData: owner,
    additionalPage: otherPage,
    additionalUserData: other
}) => {
    const ownerLists = new ListsPage(ownerPage);
    await ownerLists.goto();
    const ownerListPage = await ownerLists.openMyList();
    const listId = ownerListPage.getId();

    const itemName = randomString();
    await test.step("owner adds an idea to their own list", async () => {
        await ownerListPage.goto();
        const createPage = await ownerListPage.createItem();
        await createPage.getForm().then((f) => f.fillName(itemName));
        await createPage.create();
    });

    const commentText = `Prendre la taille M ${randomString()}`;
    let itemId = "";

    await test.step("another member opens the idea and comments", async () => {
        const otherListPage = new ListPage(otherPage, { id: listId, name: owner.name });
        await otherListPage.goto();
        await otherPage.getByTestId("items-container").locator("div.card").first().click();
        await expect(otherPage).toHaveURL(/item-id=\d+/);
        itemId = new URL(otherPage.url()).searchParams.get("item-id")!;

        const detail = otherPage.getByTestId("item-detail");
        await detail.getByRole("button", { name: "Add a comment", exact: true }).click();
        await detail.getByPlaceholder("Your comment (size, link, price…)").fill(commentText);
        await detail.getByRole("button", { name: "Post" }).click();

        const comment = detail.getByTestId("comment").filter({ hasText: commentText });
        await expect(comment).toBeVisible();
        await expect(comment).toContainText(`— ${other.name}`);
    });

    await test.step("the comment is still there after a reload", async () => {
        await otherPage.reload();
        const comment = otherPage.getByTestId("item-detail").getByTestId("comment").filter({ hasText: commentText });
        await expect(comment).toBeVisible();
    });

    await test.step("the owner never sees the comment, neither in the page nor through the API", async () => {
        await ownerPage.goto(`/lists/${listId}?item-id=${itemId}`);
        await expect(ownerPage.getByTestId("item-detail")).toBeVisible();
        await expect(ownerPage.getByTestId("comments")).toHaveCount(0);
        await expect(ownerPage.getByText(commentText)).toHaveCount(0);

        const apiUrl = `/pdc/lists/${listId}/items/${itemId}/comments`;
        const getResponse = await ownerPage.request.get(apiUrl);
        expect(getResponse.status()).toBe(403);
        expect(await getResponse.text()).not.toContain(commentText);

        const postResponse = await ownerPage.request.post(apiUrl, { data: { text: "intrus" } });
        expect(postResponse.status()).toBe(403);
    });

    await test.step("another member can remove the comment", async () => {
        const detail = otherPage.getByTestId("item-detail");
        await detail.getByTestId("comment").filter({ hasText: commentText }).getByRole("button").click();
        await expect(detail.getByTestId("comment").filter({ hasText: commentText })).toHaveCount(0);

        const response = await otherPage.request.get(`/pdc/lists/${listId}/items/${itemId}/comments`);
        expect(response.status()).toBe(200);
        expect(await response.json()).toEqual([]);
    });
});
