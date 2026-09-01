import {Page, Locator} from '@playwright/test';

export class HomePage{
    private readonly page: Page;
    private readonly productLinks: Locator;
    private readonly addToCartButton: Locator;
    private readonly cartLink: Locator;
    private readonly categoryLink: Locator;
    private readonly usernametext: Locator;

    constructor(page: Page){
        this.page=page;
        this.productLinks=this.page.locator('.card-title>a');
        this.addToCartButton=this.page.locator('.btn.btn-success.btn-lg');
        this.cartLink=this.page.locator('#cartur');
        this.categoryLink=this.page.locator('.list-group>a#itemc');
        this.usernametext=this.page.locator('#nameofuser');
    }

    async navigateToCart(){
        await this.cartLink.click();
    }
    async addToCart(){
        await this.addToCartButton.click();
    }
    async addProductToCart(name: string){
        await this.selectProductByName(name);
        // this.page.once('dialog', async dialog=>{
        //     if(dialog.message().includes('Product added')){
        //         await dialog.accept();
        //     }
        // })
        const dialogPromise=this.page.waitForEvent('dialog'); //capture the dialog box which will be generated after clicking the Add to cart button
        await this.addToCartButton.click(); 
        const dialog=await dialogPromise;
        if(dialog.message().includes('Product added')){
            await dialog.accept();
        }
    }
    async selectProductByName(name: string){
        const products=await this.productLinks.all();

        for(let i=0;i<products.length;i++){
            if((await products[i].innerText()).toLowerCase()===name.toLowerCase()){
                await products[i].click();
                return; //end of method operation
            }
        }
        throw new Error(`Product ${name} is not found`);
    }
    async selectCategory(categoryName: string){
        const categories=await this.categoryLink.all();

        for(const category of categories){
            if((await category.innerText()).toLowerCase()===categoryName.toLowerCase()){
                await category.click();
                return;
            }
        }
        throw new Error(`Product Category called ${categoryName} is not available`);
    }

    async isProductAvailable(productName:string){
        const productElements=await this.productLinks.all();
        for(let product of productElements){
            const name=await product.textContent();
            if(name?.trim().toLowerCase()===productName.toLowerCase()){
                return true;
            }
        }
        return false;
    }
    async getWelcomeUsername(){
        return await this.usernametext.textContent();
    }
}
