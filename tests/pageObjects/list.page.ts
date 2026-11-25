import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { ManageListPage } from "./manage-list.page";
import { CreateItemPage } from "./create-item.page";
import { ItemCard } from "../modules/item-card";

interface Props {
    id?: string;
    name: string;
}

export class ListPage extends BasePage {
    private readonly id: string;
    private readonly name: string;
    private readonly header: Locator;
    private readonly createItemButton: Locator;
    private readonly approvalsContainer: Locator;
    private readonly itemsContainer: Locator;
    private readonly noItemsText: Locator;

    constructor(page: Page, props: Props) {
        const id = props.id ?? new URL(page.url()).pathname.split("/").at(-1);
        super(page, `/lists/${id}`);
        this.id = id!;
        this.name = props.name;
        this.header = page.getByRole("heading", { level: 1, name: props.name });
        this.createItemButton = page.getByRole("button", { name: "add item" });
        this.noItemsText = page.getByTestId("list-empty");
        this.approvalsContainer = page.getByTestId("approvals-container");
        this.itemsContainer = page.getByTestId("items-container");
    }

    async at() {
        await expect(this.header).toBeVisible();
        return this;
    }

    getUrl() {
        return `/lists/${this.id}`;
    }

    getId() {
        return this.id;
    }

    async waitForNavigate() {
        await this.page.waitForURL(this.getUrl(), { waitUntil: "load" });
        return this;
    }

    // Le bouton « Gérer » n'est plus proposé sur la page : la page de gestion reste accessible par son URL
    async manage() {
        const manageListPage = new ManageListPage(this.page, { id: this.id });
        await manageListPage.goto();
        return manageListPage;
    }

    async assertNoItems() {
        await expect(this.noItemsText).toBeVisible();
        await expect(this.itemsContainer).not.toBeVisible();
    }

    async createItem() {
        await this.createItemButton.click();
        await this.page.waitForURL(/\/create-item/);
        return new CreateItemPage(this.page, { listId: this.id });
    }

    async assertCreateItemNotAvailable() {
        await expect(this.createItemButton).not.toBeVisible();
    }

    async getItemAt(index: number) {
        return new ItemCard(this.itemsContainer.locator("div.card").nth(index));
    }

    async getItemForApprovalAt(index: number) {
        return new ItemCard(this.approvalsContainer.locator("div.card").nth(index));
    }
}
