import { expect, Locator, Page } from '@playwright/test';

export class HomePage_Locator {
    private readonly page: Page;
    private readonly prodItem: Locator;
    private readonly pageLogo: Locator;
    private readonly searchBoxInput: Locator;
    private readonly noResultHeaderText: Locator;
    private readonly noResultLineText: Locator;
    private readonly addToCartBtn: Locator;

    constructor(page: Page) {
        this.page=page;
        this.prodItem = this.page.locator('.product:visible');
        this.pageLogo = this.page.locator('.brand.greenLogo');
        this.searchBoxInput = this.page.locator('input.search-keyword');
        this.noResultHeaderText = this.page.locator('.no-results>h2');
        this.noResultLineText = this.page.locator('.no-results>p');
        this.addToCartBtn = this.page.locator('.product-action>button');
    }

    async waitForCatalogueToLoad(expectedCount: number): Promise<void> {
        await expect(this.prodItem).toHaveCount(expectedCount);
    }

    async returnProdCount() {
        return (await this.prodItem.all()).length;
    }

    async returnPageLogo() {
        return (await this.pageLogo.textContent() ?? '').trim();
    }
    async returnProdCards(): Promise<Locator[]> {
        return this.prodItem.all();
    }

    private getNameLocator(card: Locator): Locator {
        return card.locator('.product-name');
    }

    private getPriceLocator(card: Locator): Locator {
        return card.locator('.product-price');
    }
    private getQuantityLocator(card: Locator): Locator {
        return card.locator('.quantity');
    }

    private getActionBtnLocator(card: Locator): Locator {
        return card.locator('.product-action>button');
    }

    async getCardName(card: Locator): Promise<string> {
        return ((await this.getNameLocator(card).textContent()) ?? '').trim();
    }
    async getCardPrice(card: Locator): Promise<number> {
        const priceText = ((await this.getPriceLocator(card).textContent()) ?? '').trim();
        const cleaned = priceText.replace(/[^0-9.]/g, '');
        return parseFloat(cleaned);
    }

    async getCardQuantity(card: Locator): Promise<number> {
        const quantityText = await this.getQuantityLocator(card).getAttribute('value');
        // console.log('quantity:', quantityText);
        // const cleaned=quantityText.replace(/[0-9.]/g,'');
        return parseInt(quantityText ?? '0');
    }

    async getActionBtnText(card: Locator) {
        const btnText = ((await this.getActionBtnLocator(card).textContent()) ?? '').trim();
        return btnText;
    }

    async typeKeywordInSearchBox(text: string) {
        await this.searchBoxInput.clear();
        await this.searchBoxInput.fill(text);
    }

    async clearSearchBox() {
        await this.searchBoxInput.clear();
    }

    async returnNoResultFoundTexts(): Promise<string[]> {
        return [await this.noResultHeaderText.textContent() ?? '', await this.noResultLineText.textContent() ?? ''];
    }

    async checkAddToCartBtn(): Promise<Locator[]> {
        return this.addToCartBtn.all();
    }

    async returnCard(name: string): Promise<Locator> {
        return this.prodItem.filter({ hasText: name });
    }

    async clickStepperUpBtn(card: Locator) {
        await card.locator('.increment').click();
    }

    async clickStepperDownBtn(card: Locator) {
        await card.locator('.decrement').click();
    }
}