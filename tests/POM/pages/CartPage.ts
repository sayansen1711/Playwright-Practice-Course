import { Locator, Page } from "@playwright/test";

export class CartPage {
    private readonly page: Page;
    private readonly productRows: Locator;
    private readonly productNameCells: Locator;
    private readonly productPriceCells: Locator;
    private readonly placeOrderButton: Locator;
    private readonly totalPrice: Locator;
    private readonly deleteButtons: Locator;
    //form fields
    private readonly name: Locator;
    private readonly country: Locator;
    private readonly city: Locator;
    private readonly creditcard: Locator;
    private readonly month: Locator;
    private readonly year: Locator;
    private readonly purchaseBtn: Locator;
    private readonly purchaseConfirmMsg: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productRows = this.page.locator('.success');
        this.productNameCells = this.page.locator('.success>td:nth-child(2)');
        this.productPriceCells = this.page.locator('.success>td:nth-child(3)');
        this.placeOrderButton = this.page.locator('.btn.btn-success');
        this.totalPrice = this.page.locator('#totalp');
        this.deleteButtons = this.page.locator('.success>td:nth-child(4)>a');
        //form fields
        this.name = this.page.locator('#name');
        this.country = this.page.locator('#country');
        this.city = this.page.locator('#city');
        this.creditcard = this.page.locator('#card');
        this.month = this.page.locator('#month');
        this.year = this.page.locator('#year');
        this.purchaseBtn = this.page.locator("//button[text()='Purchase']");
        this.purchaseConfirmMsg=this.page.locator('.sweet-alert.showSweetAlert.visible h2');
    }

    async isProductInCart(productName: string) {
        const productList = await this.productNameCells.all();
        for (const product of productList) {
            if ((await product.textContent())?.trim().toLowerCase() === productName.toLowerCase()) {
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

    async getProductPrice(product: string) {
        let price;
        const rows = await this.productRows.all();
        for (const row of rows) {
            const name = await row.locator('td:nth-child(2)').textContent();
            if (name?.trim().toLowerCase() === product.trim().toLowerCase()) {
                price = await row.locator('td:nth-child(3)').textContent() || '0';
                return parseFloat(price);
            }
        }
        throw new Error(`Product ${product} is not found`);

    }

    async removeProductFromCart(productName: string) {
        const rows = await this.productRows.all();
        const matchingRows = [] as Array<{ row: Locator; deleteButton: Locator }>;
        for (const row of rows) {
            const name = await row.locator('td:nth-child(2)').textContent();
            if (name?.trim().toLowerCase() === productName.toLowerCase()) {
                matchingRows.push({ row, deleteButton: row.locator('td a') });
            }
        }
        if (matchingRows.length === 0) {
            throw new Error(`Product ${productName} was not listed`);
        }
        for (const { deleteButton } of matchingRows) {
            await deleteButton.click({ force: true });
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
        await this.page.waitForTimeout(2000);
    }

    async fillFormDetails(name: string, country: string, city: string, creditcard: string){
        await this.name.fill(name);
        await this.country.fill(country);
        await this.city.fill(city);
        await this.creditcard.fill(creditcard);
        const now=new Date();
        await this.month.fill(now.getMonth().toString());
        await this.year.fill(now.getFullYear().toString());
    }
    async clickPurchaseBtn(){
        await this.purchaseBtn.click();
    }

    async getPurchaseConfirmMessage(){
        return await this.purchaseConfirmMsg.textContent();
    }

    async getTotalCartValue() {
        const priceText = (await this.totalPrice.textContent())?.trim() || '0';
        return parseFloat(priceText);
    }

    async getProductCount(productName: string) {
        const names = await this.getProductNames();
        return names.filter(x => x === productName).length;
    }
}