import { expect, type Locator } from "@playwright/test";
import { ListPage } from "../pageObjects/list.page";

export class ListCard {
    private readonly card: Locator;
    private readonly name: Locator;
    private readonly owner: Locator;
    private readonly itemCount: Locator;

    constructor(card: Locator) {
        this.card = card;
        this.name = card.getByTestId("list-name");
        this.owner = card.getByTestId("list-owner");
        this.itemCount = card.getByTestId("item-count");
    }

    async assertName(name: string) {
        await expect(this.name).toHaveText(name);
        return this;
    }

    async assertNoName() {
        await expect(this.name).toHaveCount(0);
        return this;
    }

    async assertOwner(name: string) {
        await expect(this.owner).toHaveText(name);
        return this;
    }

    async assertItemCount(count: number) {
        await expect(this.itemCount).toHaveText(count === 0 ? /Nothing yet/ : new RegExp(`^\\s*${count} ideas?\\b`));
        return this;
    }

    async click() {
        const owner = (await this.owner.textContent())!;
        const name = await this.name.textContent({ timeout: 500 }).catch(() => null);
        await this.card.click();
        await this.card.page().waitForURL(/\/lists\/.*/);
        // Titre : le nom de la liste s'il est personnalisé, sinon le prénom du propriétaire
        return new ListPage(this.card.page(), { name: name ?? owner });
    }
}
