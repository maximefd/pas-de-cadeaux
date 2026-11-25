import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { ListCard } from "../modules/list-card";
import { CreateListPage } from "./create-list.page";
import { ListPage } from "./list.page";

// « Famille & amis » : une ligne par liste des AUTRES personnes du cercle (jamais les siennes).
export class ListsPage extends BasePage {
    private readonly header: Locator;
    private readonly listContainer: Locator;
    private readonly listItems: Locator;

    constructor(page: Page) {
        super(page, "/lists");
        this.header = page.getByRole("heading", { name: "Family & friends" });
        this.listContainer = page.getByTestId("list-container");
        this.listItems = this.listContainer.locator("a.paper-person");
    }

    async at() {
        await expect(this.header).toBeVisible();
        return this;
    }

    // Les listes personnelles s'ouvrent par l'onglet « Mes envies » (/wishlists/me)
    async openMyList() {
        await this.page.goto("/wishlists/me");
        await this.page.waitForURL(/\/lists\/(?!create)[^/]+$/);
        const listPage = new ListPage(this.page, { name: "My wishes" });
        await listPage.at();
        return listPage;
    }

    // Le formulaire de création n'est plus proposé dans l'interface : on y va par l'URL
    async create() {
        const createListPage = new CreateListPage(this.page);
        await createListPage.goto();
        return createListPage;
    }

    async expectListCount(count: number) {
        await expect(this.listItems).toHaveCount(count);
    }

    async getListCount() {
        return this.listItems.count();
    }

    async getListAt(index: number) {
        const list = this.listItems.nth(index);
        await expect(list).toBeVisible();
        return new ListCard(list);
    }

    // Liste portant un nom personnalisé
    async getListByName(name: string) {
        const list = this.listItems.filter({ has: this.page.getByTestId("list-name").filter({ hasText: name }) });
        await expect(list).toBeVisible();
        return new ListCard(list);
    }

    // Liste « par défaut » (sans nom personnalisé) d'une personne
    async getListByOwner(ownerName: string) {
        const list = this.listItems
            .filter({ has: this.page.getByTestId("list-owner").filter({ hasText: ownerName }) })
            .filter({ hasNot: this.page.getByTestId("list-name") });
        await expect(list).toBeVisible();
        return new ListCard(list);
    }
}
