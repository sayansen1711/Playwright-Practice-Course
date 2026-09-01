import { Locator, Page } from "@playwright/test";

export class CartPage {
    private readonly page: Page;
    private readonly productRows: Locator;
    private readonly productNameCells: Locator;
    private readonly productPriceCells: Locator;
    private readonly placeOrderButton: Locator;
    private readonly totalPrice: Locator;
    private readonly deleteButtons: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productRows = this.page.locator('.success');
        this.productNameCells = this.page.locator('.success>td:nth-child(2)');
        this.productPriceCells = this.page.locator('.success>td:nth-child(3)');
        this.placeOrderButton = this.page.locator('.btn.btn-success');
        this.totalPrice = this.page.locator('#totalp');
        this.deleteButtons = this.page.locator('.success>td:nth-child(4)>a');
    }

    async isProductInCart(productName: string) {
        const productList = await this.productNameCells.all();
        for (const product of productList) {
            if ((await product.textContent())?.trim().toLowerCase() === productName) {
                return true;
            }
        }
        return false;
    }
    async getProductNames() {
        const productList = await this.productNameCells.all();
        const names: string[] = [];

        for (const product of productList) {
            names.push((await product.textContent())?.trim() || '');
        }
        return names;
    }
    async getProductPrices() {
        const priceElements = await this.productPriceCells.all();
        const prices: number[] = [];

        for (const price of priceElements) {
            const floatValue = (await price.textContent())?.trim() || '0';
            prices.push(parseFloat(floatValue));
        }
        return prices;
    }

    async removeProductFromCart(productName: string){
        const rows=await this.productRows.all();
        const matchingRows=[] as Array<{row: Locator; deleteButton: Locator}>;

        for(const row of rows){
            const nameCell=row.locator('.success>td:nth-child(2)');
            const name = await nameCell.textContent();
            if(name?.trim().toLowerCase()===productName){
                matchingRows.push({row, deleteButton: row.locator('.success>td a')});
            }
        }
        if(matchingRows.length===0){
            throw new Error(`Product ${productName} was not listed`);
        }
        for(const {deleteButton} of matchingRows){
            await deleteButton.click({force: true});
            await this.page.waitForTimeout(500);
        }
    }

    async clearCart() {
        const deleteButtons = await this.deleteButtons.all();

        for (const button of deleteButtons) {
            await button.click();
            await this.page.waitForTimeout(300);
        }
    }

    async proceedToCheckout() {
        await this.placeOrderButton.click();
    }

    async getTotalCartValue(){
        const priceText=(await this.totalPrice.textContent())?.trim() || '0';
        return parseFloat(priceText);
    }

    async getProductCount(productName: string){
        const names=await this.getProductNames();
        return names.filter(x=>x===productName).length;
    }
}