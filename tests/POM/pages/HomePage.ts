import { Page, Locator } from '@playwright/test';
export class HomePage {
    private readonly page: Page;
    private readonly productLinks: Locator;
    private readonly addToCartButton: Locator;
    private readonly cartLink: Locator;
    private readonly categoryLink: Locator;
    private readonly usernametext: Locator;
    private readonly phoneLink: Locator;
    private readonly laptopLink: Locator;
    private readonly monitorLink: Locator;
    private readonly productTitle: Locator;
    private readonly productPrice: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productLinks = this.page.locator('.card-title>a');
        this.addToCartButton = this.page.locator('.btn.btn-success.btn-lg');
        this.cartLink = this.page.locator('#cartur');
        this.categoryLink = this.page.locator('.list-group>a#itemc');
        this.usernametext = this.page.locator('#nameofuser');
        this.phoneLink = this.page.locator("//a[contains(@onclick, 'phone')]");
        this.laptopLink = this.page.locator("//a[contains(@onclick, 'notebook')]");
        this.monitorLink = this.page.locator("//a[contains(@onclick, 'monitor')]");
        this.productTitle=this.page.locator('h2.name');
        this.productPrice=this.page.locator('h3.price-container');
    }

    async navigateToCart() {
        await this.cartLink.click();
    }
    async addToCart() {
        await this.addToCartButton.click();
    }
    async addProductToCart(name: string) {
        await this.selectProductByName(name);  //clicking on the desired product
        await this.page.waitForTimeout(2000);
        // this.page.once('dialog', async dialog=>{
        //     if(dialog.message().includes('Product added')){
        //         await dialog.accept();
        //     }
        // })
        const dialogPromise = this.page.waitForEvent('dialog'); //capture the dialog box which will be generated after clicking the Add to cart button
        await this.addToCart();
        const dialog = await dialogPromise;
        const message=dialog.message();
        if (message.includes('Product added')) {
            await dialog.accept();
        }
        return message;
    }
    async selectProductByName(name: string) {
        const products = await this.productLinks.all();
        for (let i = 0; i < products.length; i++) {
            if ((await products[i].textContent())?.toLowerCase() === name.toLowerCase()) {
                await products[i].click();
                return;
            }
        }
        throw new Error(`Product ${name} is not found`);
    }
    async selectCategory(categoryName: string) {
        const categories = await this.categoryLink.all();

        for (const category of categories) {
            if ((await category.innerText()).toLowerCase() === categoryName.toLowerCase()) {
                await category.click();
                return;
            }
        }
        throw new Error(`Product Category called ${categoryName} is not available`);
    }

    async isProductAvailable(productName: string) {
        const productElements = await this.productLinks.all();
        for (let product of productElements) {
            const name = await product.textContent();
            if (name?.trim().toLowerCase() === productName.toLowerCase()) {
                return true;
            }
        }
        return false;
    }
    async getWelcomeUsername() {
        return await this.usernametext.textContent();
    }
    async filterProductsByCategory(category: string) {
        // console.log('Starting of method');
        if (category.toLowerCase().trim() === 'phones') {
            // console.log('Clicking on phone link');
            await this.phoneLink.click();
            
        }
        else if (category.toLowerCase().trim() === 'laptops') {
            await this.laptopLink.click();
        }
        else if (category.toLowerCase().trim() === 'monitors') {
            await this.monitorLink.click();
        } else {
            throw new Error(`Category type: ${category} is not listed`);
        }
        await this.page.waitForTimeout(2000);
        const actualProductLocators = await this.productLinks.all();
        const actualProductNames=[];
        for (const items of actualProductLocators) {
            const name = (await items.textContent())?.trim();
            actualProductNames.push(name);
        }
        return actualProductNames;
    }
    async productTitleVisible(){
        return await this.productTitle.textContent();
    }
    async productPriceVisible(){
        return await this.productPrice.isVisible();
    }
}
