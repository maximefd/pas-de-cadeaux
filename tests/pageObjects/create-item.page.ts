import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { ItemForm } from "../modules/item-form";
import { Toast } from "../modules/toast";

interface Props {
    listId?: string;
}

export class CreateItemPage extends BasePage {
    private readonly nameField: Locator;
    private readonly itemForm: ItemForm;
    private readonly createButton: Locator;

    constructor(page: Page, props?: Props) {
        const listId = props?.listId ?? new URL(page.url()).pathname.split("/").at(-2);
        super(page, `/lists/${listId}/create-item`);
        this.nameField = page.locator("#name");
        this.itemForm = new ItemForm(page);
        this.createButton = page.locator("#submit");
    }

    async at() {
        await expect(this.nameField).toBeVisible();
        return this;
    }

    async getForm() {
        return this.itemForm;
    }

    async create() {
        await this.createButton.click();
        await new Toast(this.page).waitForToastWithText("Item created");
        // On quitte le formulaire (retour à la liste) avant de rendre la main
        await this.page.waitForURL((url) => !url.pathname.endsWith("/create-item"));
    }
}
