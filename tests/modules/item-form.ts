import { expect, type Locator, type Page } from "@playwright/test";
import { randomString } from "../util";

// Le formulaire d'idée n'affiche que le nom et la précision. L'URL, le prix, la quantité, l'image, « le plus
// souhaité » et les listes sont dans un bloc masqué, mais toujours envoyés : on les pilote directement dans le DOM.
export class ItemForm {
    private readonly page: Page;
    private readonly nameField: Locator;
    private readonly notesField: Locator;
    private readonly hangTightBackdrop: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameField = page.locator("#name");
        this.notesField = page.locator("#note");
        this.hangTightBackdrop = page.getByText("Hang tight, gathering product data");
    }

    private async setHiddenValue(selector: string, value: string, ...events: string[]) {
        await this.page.locator(selector).evaluate(
            (el, { value, events }) => {
                (el as HTMLInputElement).value = value;
                for (const name of events) el.dispatchEvent(new Event(name, { bubbles: true }));
            },
            { value, events }
        );
    }

    private async setHiddenChecked(selector: string, checked: boolean) {
        await this.page.locator(selector).evaluate((el, checked) => {
            const input = el as HTMLInputElement;
            if (input.checked !== checked) input.click();
        }, checked);
    }

    // L'import depuis une URL passe par le paramètre `productUrl` (même chemin que l'import de produit)
    async fillViaUrl(url: string) {
        const current = new URL(this.page.url());
        current.searchParams.set("productUrl", url);
        await this.page.goto(current.pathname + current.search);
        await expect(this.nameField).toBeVisible();
        await expect(this.hangTightBackdrop).not.toBeVisible({ timeout: 15000 });
        if (!(await this.nameField.inputValue())) {
            await this.fillName(randomString());
        }
        return this;
    }

    async fillName(name: string) {
        await this.nameField.fill(name);
        return this;
    }

    async fillPrice(price: number | string) {
        await this.setHiddenValue("#formatted-price", price.toString(), "input", "blur");
        return this;
    }

    async fillQuantity(quantity: number) {
        await this.setHiddenValue("#quantity", quantity.toString(), "input", "change");
        return this;
    }

    async checkNoLimit() {
        await this.setHiddenChecked("#unlimited", true);
        return this;
    }

    async uncheckNoLimit() {
        await this.setHiddenChecked("#unlimited", false);
        return this;
    }

    async checkMostWanted() {
        await this.setHiddenChecked("#mostWanted", true);
        return this;
    }

    async uncheckMostWanted() {
        await this.setHiddenChecked("#mostWanted", false);
        return this;
    }

    // Image envoyée comme fichier (champ masqué) : pas besoin d'accès réseau externe
    async uploadImage(filePath: string) {
        await this.page.locator("input[type=file][name=image]").setInputFiles(filePath);
        return this;
    }

    async fillImageUrl(url: string) {
        await this.setHiddenValue("#imageUrl", url, "input");
        return this;
    }

    async fillNote(text: string) {
        const addNote = this.page.locator("#add-note");
        if (await addNote.isVisible()) {
            await addNote.click();
        }
        await this.notesField.fill(text);
        return this;
    }

    // Les cases des listes sont masquées : on les coche dans le DOM, par nom de liste
    async selectList(...lists: string[]) {
        for (const list of lists) {
            await this.listCheckbox(list).evaluate((el) => {
                const input = el as HTMLInputElement;
                if (!input.checked) input.click();
            });
        }
        return this;
    }

    async assertListsSelected(...lists: string[]) {
        for (const list of lists) {
            await expect(this.listCheckbox(list)).toBeChecked();
        }
        return this;
    }

    private listCheckbox(list: string) {
        return this.page.locator("label", { hasText: list }).locator("input[name='lists']");
    }
}
