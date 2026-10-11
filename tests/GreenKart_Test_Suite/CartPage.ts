import { expect, Locator, Page } from '@playwright/test';
export class CartPage {
    private readonly page: Page;
    private readonly productBillDetails: Locator;
    private readonly codeAppliedText: Locator;
    private readonly discountRate: Locator;
    private readonly totalAmount: Locator;
    private readonly discountedTotal: Locator;
    private readonly promoCodeTextBox: Locator;
    private readonly applyBtn: Locator;
    private readonly placeOrderBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productBillDetails = this.page.locator("#root .products-wrapper div:nth-child(4)");
        this.codeAppliedText = this.page.locator('.promoInfo');
        this.discountRate = this.page.locator('.discountPerc');
        this.totalAmount = this.page.locator('.totAmt');
        this.discountedTotal = this.page.locator('.discountAmt');
        this.promoCodeTextBox = this.page.getByPlaceholder('Enter promo code');
        this.applyBtn = this.page.getByRole("button", { name: 'Apply' });
        this.placeOrderBtn = this.page.getByRole("button", { name: 'Place Order' });
    }

    async applyPromoCode(code: string) {
        await this.promoCodeTextBox.clear();
        await this.promoCodeTextBox.fill(code);
    }

    async submitCode() {
        await this.applyBtn.click();
    }

    async getCodeAppliedText(): Promise<string> {
        return (await this.codeAppliedText.textContent() ?? '').trim();
    }

    async getDiscountRate(): Promise<number> {
        // console.log('Visible % is',await this.discountRate.textContent());
        return parseFloat((await this.discountRate.textContent() ?? '0%').replace('%', '').trim());
    }

    async getTotalAmount(): Promise<number> {
        return parseFloat((await this.totalAmount.textContent() ?? '0').trim());
    }

    async getNumberOfItems(): Promise<number> {
        const prodDetails = (await this.productBillDetails.allInnerTexts())[0] ?? '';
        const start = prodDetails.indexOf(':', prodDetails.indexOf('No. of Items'));
        const end = prodDetails.indexOf('\n', start);
        const count = parseInt(prodDetails.substring(start + 1, end).trim(), 10) || 0;
        return count;
    }

    async getExpectedDiscountedPrice(price: number){
        const rate: number=await this.getDiscountRate();
        return price-((price*rate)/100);
    }

    async getActualDiscountedPrice(){
        return parseFloat((await this.discountedTotal.textContent()??'0').trim());
    }

    getPlaceOrderBtn(): Locator{
        return this.placeOrderBtn;
    }
}