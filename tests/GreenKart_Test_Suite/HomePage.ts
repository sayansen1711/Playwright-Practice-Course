import { expect, Locator, Page } from '@playwright/test';

export class HomePage_Locator {
    private readonly page: Page;
    private readonly prodItem: Locator;
    private readonly pageLogo: Locator;
    private readonly searchBoxInput: Locator;
    private readonly noResultHeaderText: Locator;
    private readonly noResultLineText: Locator;
    private readonly addToCartBtn: Locator;
    private readonly cartTable: Locator;
    private readonly cartIcon: Locator;
    private readonly itemLists: Locator;

    constructor(page: Page) {
        this.page = page;
        this.prodItem = this.page.locator('.product:visible');
        this.pageLogo = this.page.locator('.brand.greenLogo');
        this.searchBoxInput = this.page.locator('input.search-keyword');
        this.noResultHeaderText = this.page.locator('.no-results>h2');
        this.noResultLineText = this.page.locator('.no-results>p');
        this.addToCartBtn = this.page.locator('.product-action>button');
        this.cartTable = this.page.locator('.cart>.cart-info');
        this.cartIcon = this.page.locator('a.cart-icon');
        this.itemLists = this.page.locator('div.cart-preview ul.cart-items>li.cart-item');
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

    async checkCartDetails(count: number, totalPrice: number) {
        const cartDetails = await this.cartTable.locator('table>tbody>tr').allTextContents();
        expect(cartDetails, `The item count should be ${count} and the total price should be ${totalPrice}, but it is ${cartDetails}`).toEqual([`Items:${count}`, `Price:${totalPrice}`]);
    }

    async clickAddToCartBtn(card: Locator) {
        await card.locator('.product-action>button').click();
    }

    async returnPrice(card: Locator): Promise<number> {
        const price = await card.locator('.product-price').textContent() ?? '0';
        return parseFloat(price);
    }

    async openCartList() {
        this.cartIcon.click();
        await expect(this.page.locator('div.cart-preview')).toHaveClass(/active/);
    }

    async removeCartItem(productName: string) {
        const countBefore = await this.itemLists.count();
        const items = await this.itemLists.all();
        for (let item of items) {
            const name = (await item.locator('div.product-info>p.product-name').innerText() ?? '').trim();
            if (name === productName) {
                await item.locator('a.product-remove').click();
                break;
            }
        }
        await expect(this.itemLists).toHaveCount(countBefore - 1);
    }

    async returnCartItemNames(): Promise<string[]> {
        const items = await this.itemLists.all();
        const itemNames = [];
        for (let item of items) {
            const name = (await item.locator('div.product-info>p.product-name').innerText() ?? '').trim();
            itemNames.push(name);
        }
        return itemNames;
    }

    async returnProdQuanties(): Promise<string[]> {
        const items = await this.itemLists.all();
        const quantities = [];
        for (let item of items) {
            const quantity = (await item.locator('.product-total>p.quantity').innerText() ?? '').trim();
            quantities.push(quantity);
        }
        return quantities;
    }

    returnProceedToCheckoutBtn():Locator{
        return this.page.getByRole("button", { name: 'PROCEED TO CHECKOUT' });
    }
}
