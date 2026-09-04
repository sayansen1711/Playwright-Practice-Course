# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: POM\POM_Test.spec.ts >> Demoblaze test: Cart Management >> TC-09: Remove Item from Cart
- Location: tests\POM\POM_Test.spec.ts:140:5

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

Expected: 0
Received: 650
```

```
Error: locator.textContent: Target page, context or browser has been closed
Call log:
  - waiting for locator('.success').first().locator('.success>td:nth-child(2)')

```

# Test source

```ts
  1  | import { Locator, Page } from "@playwright/test";
  2  | 
  3  | export class CartPage {
  4  |     private readonly page: Page;
  5  |     private readonly productRows: Locator;
  6  |     private readonly productNameCells: Locator;
  7  |     private readonly productPriceCells: Locator;
  8  |     private readonly placeOrderButton: Locator;
  9  |     private readonly totalPrice: Locator;
  10 |     private readonly deleteButtons: Locator;
  11 | 
  12 |     constructor(page: Page) {
  13 |         this.page = page;
  14 |         this.productRows = this.page.locator('.success');
  15 |         this.productNameCells = this.page.locator('.success>td:nth-child(2)');
  16 |         this.productPriceCells = this.page.locator('.success>td:nth-child(3)');
  17 |         this.placeOrderButton = this.page.locator('.btn.btn-success');
  18 |         this.totalPrice = this.page.locator('#totalp');
  19 |         this.deleteButtons = this.page.locator('.success>td:nth-child(4)>a');
  20 |     }
  21 | 
  22 |     async isProductInCart(productName: string) {
  23 |         const productList = await this.productNameCells.all();
  24 |         for (const product of productList) {
  25 |             if ((await product.textContent())?.trim().toLowerCase() === productName.toLowerCase()) {
  26 |                 return true;
  27 |             }
  28 |         }
  29 |         return false;
  30 |     }
  31 |     async getProductNames() {
  32 |         const productList = await this.productNameCells.all();
  33 |         const names: string[] = [];
  34 | 
  35 |         for (const product of productList) {
  36 |             names.push((await product.textContent())?.trim() || '');
  37 |         }
  38 |         return names;
  39 |     }
  40 |     async getProductPrices() {
  41 |         const priceElements = await this.productPriceCells.all();
  42 |         const prices: number[] = [];
  43 | 
  44 |         for (const price of priceElements) {
  45 |             const floatValue = (await price.textContent())?.trim() || '0';
  46 |             prices.push(parseFloat(floatValue));
  47 |         }
  48 |         return prices;
  49 |     }
  50 | 
  51 |     async removeProductFromCart(productName: string){
  52 |         const rows=await this.productRows.all();
  53 |         const matchingRows=[] as Array<{row: Locator; deleteButton: Locator}>;
  54 |         console.log('starting of method');
  55 |         for(const row of rows){
  56 |             const nameCell=row.locator('.success>td:nth-child(2)');
> 57 |             const name = await nameCell.textContent();
     |                                         ^ Error: locator.textContent: Target page, context or browser has been closed
  58 |             console.log('name:',name);
  59 |             if(name?.trim().toLowerCase()===productName.toLowerCase()){
  60 |                 matchingRows.push({row, deleteButton: row.locator('.success>td a')});
  61 |             }
  62 |         }
  63 |         if(matchingRows.length===0){
  64 |             throw new Error(`Product ${productName} was not listed`);
  65 |         }
  66 |         for(const {deleteButton} of matchingRows){
  67 |             await deleteButton.click({force: true});
  68 |             await this.page.waitForTimeout(500);
  69 |         }
  70 |     }
  71 | 
  72 |     async clearCart() {
  73 |         const deleteButtons = await this.deleteButtons.all();
  74 | 
  75 |         for (const button of deleteButtons) {
  76 |             await button.click();
  77 |             await this.page.waitForTimeout(300);
  78 |         }
  79 |     }
  80 | 
  81 |     async proceedToCheckout() {
  82 |         await this.placeOrderButton.click();
  83 |     }
  84 | 
  85 |     async getTotalCartValue(){
  86 |         const priceText=(await this.totalPrice.textContent())?.trim() || '0';
  87 |         return parseFloat(priceText);
  88 |     }
  89 | 
  90 |     async getProductCount(productName: string){
  91 |         const names=await this.getProductNames();
  92 |         return names.filter(x=>x===productName).length;
  93 |     }
  94 | }
```