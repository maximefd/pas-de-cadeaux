import { test, expect } from "../fixtures";

test("welcome screen is shown once and leads to the user's list", async ({ page }) => {
    await page.goto("/bienvenue");

    await expect(page.getByRole("heading", { name: "Welcome." })).toBeVisible();
    await page.getByRole("button", { name: "Let’s go" }).click();
    await expect(page).not.toHaveURL(/bienvenue/);

    await page.goto("/bienvenue");
    await expect(page).not.toHaveURL(/bienvenue/);
});
