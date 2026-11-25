import { expect, type Locator } from "@playwright/test";
import { EditItemPage } from "../pageObjects/edit-item.page";
import { Modal } from "./modal";
import { Toast } from "./toast";
import { DeleteItemModal } from "./delete-item-modal";
import { ClaimItemModal } from "./claim-item-modal";

// Look « Papier » : la ligne de la liste montre le nom, la précision, « ajouté par » et la réservation.
// Au clic, le détail se déplie sous la ligne (pas de fenêtre, pas d'image) : prix éventuel,
// quantité quand elle n'est pas 1, commentaires, « Modifier ».
export class ItemCard {
    private readonly card: Locator;
    private readonly name: Locator;
    private readonly notes: Locator;
    private readonly removeButton: Locator;
    private readonly approveButton: Locator;
    private readonly denyButton: Locator;
    private readonly claimButton: Locator;
    private readonly unclaimButton: Locator;
    private readonly joinButton: Locator;
    private readonly myClaim: Locator;
    private readonly drawer: Locator;

    constructor(card: Locator) {
        this.card = card;
        this.name = card.getByTestId("name");
        this.notes = card.getByTestId("notes");
        this.removeButton = card.getByRole("button", { name: "Remove" });
        this.approveButton = card.getByRole("button", { name: "Approve" });
        this.denyButton = card.getByRole("button", { name: "Deny" });
        this.claimButton = card.getByRole("button", { name: "Claim", exact: true });
        this.unclaimButton = card.getByRole("button", { name: "Cancel", exact: true });
        this.joinButton = card.getByTestId("join-claim");
        this.myClaim = card.getByTestId("my-claim");
        this.drawer = card.getByTestId("item-detail");
    }

    async openDrawer() {
        await this.card.click({ position: { x: 4, y: 4 } });
        await expect(this.drawer).toBeVisible();
        return this.drawer;
    }

    async closeDrawer() {
        await this.drawer.getByRole("button", { name: "Close", exact: true }).click();
        await expect(this.drawer).toBeHidden();
    }

    private async inDrawer(check: (drawer: Locator) => Promise<void>) {
        const drawer = await this.openDrawer();
        await check(drawer);
        await this.closeDrawer();
        return this;
    }

    // Jamais d'image ni de carré d'illustration
    async assertNoImage() {
        await expect(this.card.getByTestId("image")).toHaveCount(0);
        return this.inDrawer((d) => expect(d.getByTestId("image")).toHaveCount(0));
    }

    async assertHasLink() {
        await expect(this.name).toHaveRole("link");
        return this;
    }

    async assertNoLink() {
        await expect(this.name).not.toHaveRole("link");
        return this;
    }

    async assertName(name: string) {
        await expect(this.name).toHaveText(name);
        return this;
    }

    async assertPrice(price: string) {
        return this.inDrawer((d) => expect(d.getByTestId("price")).toHaveText(price));
    }

    async assertNoPrice() {
        return this.inDrawer((d) => expect(d.getByTestId("price")).toHaveCount(0));
    }

    async assertNoQuantity() {
        return this.inDrawer((d) => expect(d.getByTestId("quantity-desired")).toHaveText("No limit"));
    }

    // Une quantité de 1 n'est pas affichée (c'est le cas normal)
    async assertDesiredQuantity(quantity: number) {
        return this.inDrawer((d) =>
            quantity === 1
                ? expect(d.getByTestId("quantity-desired")).toHaveCount(0)
                : expect(d.getByTestId("quantity-desired")).toHaveText(`${quantity} desired`)
        );
    }

    // Idée à un seul exemplaire : pas de compteur, on vérifie qu'elle est encore réservable (0) ou plus (1)
    async assertClaimedQuantity(quantity: number) {
        return this.inDrawer(async (d) => {
            const counter = d.getByTestId("quantity-claimed");
            if ((await counter.count()) > 0) {
                await expect(counter).toHaveText(`${quantity} claimed`);
            } else if (quantity === 0) {
                await expect(this.claimButton).toBeVisible();
            } else {
                await expect(this.claimButton).toHaveCount(0);
            }
        });
    }

    async assertClaimedQuantityHidden() {
        return this.inDrawer((d) => expect(d.getByTestId("quantity-claimed")).toHaveCount(0));
    }

    // « Ajouté par X » est sur la ligne, seulement quand l'idée a été ajoutée par quelqu'un d'autre
    async assertAddedBy(addedBy: string) {
        await expect(this.card.getByTestId("added-by")).toHaveText(`Added by ${addedBy}`);
        return this;
    }

    async assertNotSignedByOther() {
        await expect(this.card.getByTestId("added-by")).toHaveCount(0);
        return this;
    }

    async assertNotes(notes: string) {
        await expect(this.notes).toHaveText(notes);
        return this;
    }

    async assertNoNotes() {
        await expect(this.notes).toHaveCount(0);
        return this;
    }

    async assertNoClaimButton() {
        await expect(this.claimButton).not.toBeVisible();
    }

    async claimSingle() {
        await this.claimButton.click();
        await new Toast(this.card.page()).waitForToastWithText("Claimed item");
    }

    async unclaimSingle() {
        await this.unclaimButton.click();
        await new Toast(this.card.page()).waitForToastWithText("Unclaimed item");
    }

    async join() {
        await this.joinButton.click();
        await new Toast(this.card.page()).waitForToastWithText("Claimed item");
        return this;
    }

    async assertMyClaimText(text: string) {
        await expect(this.myClaim).toContainText(text);
        return this;
    }

    async assertClaimText(text: string) {
        await expect(this.card).toContainText(text);
        return this;
    }

    async assertNoClaimText(text: string) {
        await expect(this.card).not.toContainText(text);
        return this;
    }

    async claimAmount(quantity: number) {
        await this.claimButton.click();
        const modal = new ClaimItemModal(this.card.page());
        await modal
            .visible()
            .then((m) => m.setQuantity(quantity))
            .then((m) => m.submit());
        await new Toast(this.card.page()).waitForToastWithText("Claimed item");
        return this;
    }

    // Modifier : bouton du pied du tiroir de détail
    async edit() {
        const drawer = await this.openDrawer();
        await drawer.getByRole("button", { name: "Edit" }).click();
        await this.card.page().waitForURL(/\/items\/\d+\/edit/);
        return new EditItemPage(this.card.page());
    }

    // Supprimer : bouton « Retirer » de la ligne. Sur une idée présente sur plusieurs listes, on choisit la liste ;
    // sinon l'idée disparaît tout de suite et la suppression part après le délai d'annulation.
    async delete(multipleLists = false, type: "this" | "all" = "all") {
        if (!multipleLists) {
            const deleted = this.card.page().waitForResponse((r) => r.request().method() === "DELETE" && r.ok());
            await this.removeButton.click();
            await deleted;
            return;
        }
        const modal = await this.deleteNoConfirm();
        if (type === "this") {
            await modal.thisList();
        } else {
            await modal.allLists();
        }
    }

    async deleteNoConfirm() {
        await this.removeButton.click();
        return new DeleteItemModal(this.card.page());
    }

    // Une personne sans droit de suppression ne se voit proposer que « C'est offert », jamais « Plus d'actualité »
    async assertCannotDelete() {
        await this.removeButton.click();
        const page = this.card.page();
        await expect(page.locator("[data-testid=remove-offered]:visible")).toBeVisible();
        await expect(page.locator("[data-testid=remove-outdated]:visible")).toHaveCount(0);
        await page.getByRole("dialog").getByRole("button", { name: "Cancel" }).click();
        await expect(page.getByRole("dialog")).toBeHidden();
        return this;
    }

    async approve() {
        const name = await this.name.textContent();
        await this.approveButton.click();
        const modal = new Modal(this.card.page(), { modalName: "Please Confirm", submitButtonText: "Confirm" });
        await modal.submit();
        new Toast(this.card.page()).waitForToastWithText(`${name} was approved`);
        return this;
    }

    async deny() {
        const name = await this.name.textContent();
        await this.denyButton.click();
        const modal = new Modal(this.card.page(), { modalName: "Please Confirm", submitButtonText: "Confirm" });
        await modal.submit();
        new Toast(this.card.page()).waitForToastWithText(`${name} was denied`);
        return this;
    }
}
