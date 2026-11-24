import { expect, test } from "../fixtures";
import { ListsPage } from "../pageObjects/lists.page";
import { randomString } from "../util";

// Look « Papier » : liste textuelle, suppression différée avec « Annuler »
test.describe("papier", () => {
    test.beforeEach(async ({ page, baseURL }) => {
        // Mode liste (par défaut) : on retire le cookie posé par les fixtures
        await page.context().clearCookies({ name: "listViewPreference" });
        await page.context().addCookies([{ name: "listViewPreference", value: "list", url: baseURL! }]);
    });

    const createItem = async (page: import("@playwright/test").Page, name: string) => {
        const listsPage = new ListsPage(page);
        await listsPage.goto();
        const listPage = await (await listsPage.getListAt(0)).click();
        const createItemPage = await listPage.createItem();
        await createItemPage.getForm().then((f) => f.fillName(name));
        await createItemPage.create();
        await listPage.waitForNavigate();
        return listPage;
    };

    test("removing an idea can be undone and sends nothing", async ({ page }) => {
        const name = randomString();
        await createItem(page, name);
        const deletes: string[] = [];
        page.on("request", (r) => r.method() === "DELETE" && deletes.push(r.url()));

        await page.getByRole("button", { name: "Remove" }).click();
        await expect(page.getByTestId("name").filter({ hasText: name })).toHaveCount(0);
        await page
            .locator("[data-scope='toast'][data-part='root']")
            .filter({ hasText: name })
            .getByRole("button", { name: "Cancel" })
            .click();
        await expect(page.getByTestId("name").filter({ hasText: name })).toBeVisible();

        await page.waitForTimeout(5000);
        expect(deletes).toHaveLength(0);
        await expect(page.getByTestId("name").filter({ hasText: name })).toBeVisible();
    });

    test("removing an idea deletes it once the undo delay has elapsed", async ({ page }) => {
        const name = randomString();
        await createItem(page, name);

        const deleted = page.waitForResponse((r) => r.request().method() === "DELETE" && r.ok());
        await page.getByRole("button", { name: "Remove" }).click();
        await expect(page.getByTestId("name").filter({ hasText: name })).toHaveCount(0);
        await deleted;

        await page.reload();
        await expect(page.getByTestId("name").filter({ hasText: name })).toHaveCount(0);
    });
});
