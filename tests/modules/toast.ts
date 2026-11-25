import { expect, type Locator, type Page } from "@playwright/test";

export class Toast {
    private readonly page: Page;
    private readonly toast: Locator;
    private readonly dismissToastButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.toast = page.locator("[data-scope='toast'][data-part='root']");
        this.dismissToastButton = this.toast.getByRole("button", { name: "close" });
    }

    async waitForToastWithText(text: string) {
        // Un message précédent identique peut encore être en train de se fermer : on vise celui qui est ouvert
        await expect(
            this.toast.and(this.page.locator("[data-state='open']")).filter({ hasText: new RegExp(text) })
        ).toBeVisible();
        return this;
    }

    async dismissToast() {
        await this.dismissToastButton.click();
    }
}
