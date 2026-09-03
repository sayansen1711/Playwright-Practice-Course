# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: POM\POM_Test.spec.ts >> Demoblaze test: Catalog Navigation >> TC-06: Product Details View
- Location: tests\POM\POM_Test.spec.ts:97:5

# Error details

```
Error: Product Nexus 6 is not found
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - text:             
  - navigation [ref=e2]:
    - link "PRODUCT STORE" [ref=e3] [cursor=pointer]:
      - /url: index.html
      - img [ref=e4]
      - text: PRODUCT STORE
    - list [ref=e6]:
      - listitem [ref=e7]:
        - link "Home (current)" [ref=e8] [cursor=pointer]:
          - /url: index.html
          - text: Home
          - generic [ref=e9]: (current)
      - listitem [ref=e10]:
        - link "Contact" [ref=e11] [cursor=pointer]:
          - /url: "#"
      - listitem [ref=e12]:
        - link "About us" [ref=e13] [cursor=pointer]:
          - /url: "#"
      - listitem [ref=e14]:
        - link "Cart" [ref=e15] [cursor=pointer]:
          - /url: cart.html
      - listitem [ref=e16]:
        - link "Log in" [ref=e17] [cursor=pointer]:
          - /url: "#"
      - listitem
      - listitem
      - listitem [ref=e18]:
        - link "Sign up" [ref=e19] [cursor=pointer]:
          - /url: "#"
    - generic [ref=e21]:
      - list [ref=e22]:
        - listitem [ref=e23] [cursor=pointer]
        - listitem [ref=e24] [cursor=pointer]
        - listitem [ref=e25] [cursor=pointer]
      - img "First slide" [ref=e28]
      - button "Previous" [ref=e29] [cursor=pointer]:
        - generic [ref=e31]: Previous
      - button "Next" [ref=e32] [cursor=pointer]:
        - generic [ref=e34]: Next
  - generic [ref=e36]:
    - generic [ref=e38]:
      - link "CATEGORIES" [ref=e39] [cursor=pointer]:
        - /url: ""
      - link "Phones" [ref=e40] [cursor=pointer]:
        - /url: "#"
      - link "Laptops" [ref=e41] [cursor=pointer]:
        - /url: "#"
      - link "Monitors" [ref=e42] [cursor=pointer]:
        - /url: "#"
    - list [ref=e45]:
      - listitem [ref=e46]:
        - button "Previous" [ref=e47]
      - listitem [ref=e48]:
        - button "Next" [ref=e49] [cursor=pointer]
  - generic [ref=e51]:
    - generic [ref=e54]:
      - heading "About Us" [level=4] [ref=e55]
      - paragraph [ref=e56]: We believe performance needs to be validated at every stage of the software development cycle and our open source compatible, massively scalable platform makes that a reality.
    - generic [ref=e59]:
      - heading "Get in Touch" [level=4] [ref=e60]
      - paragraph [ref=e61]: "Address: 2390 El Camino Real"
      - paragraph [ref=e62]: "Phone: +440 123456"
      - paragraph [ref=e63]: "Email: demo@blazemeter.com"
    - heading "PRODUCT STORE" [level=4] [ref=e67]:
      - img [ref=e68]
      - text: PRODUCT STORE
  - contentinfo [ref=e69]:
    - paragraph [ref=e70]: Copyright © Product Store
```

# Test source

```ts
  1   | import { Page, Locator } from '@playwright/test';
  2   | export class HomePage {
  3   |     private readonly page: Page;
  4   |     private readonly productLinks: Locator;
  5   |     private readonly addToCartButton: Locator;
  6   |     private readonly cartLink: Locator;
  7   |     private readonly categoryLink: Locator;
  8   |     private readonly usernametext: Locator;
  9   |     private readonly phoneLink: Locator;
  10  |     private readonly laptopLink: Locator;
  11  |     private readonly monitorLink: Locator;
  12  |     private readonly listedItems: Locator;
  13  |     private readonly productTitle: Locator;
  14  |     private readonly productPrice: Locator;
  15  | 
  16  |     constructor(page: Page) {
  17  |         this.page = page;
  18  |         this.productLinks = this.page.locator('.card-title>a');
  19  |         this.addToCartButton = this.page.locator('.btn.btn-success.btn-lg');
  20  |         this.cartLink = this.page.locator('#cartur');
  21  |         this.categoryLink = this.page.locator('.list-group>a#itemc');
  22  |         this.usernametext = this.page.locator('#nameofuser');
  23  |         this.phoneLink = this.page.locator("//a[contains(@onclick, 'phone')]");
  24  |         this.laptopLink = this.page.locator("//a[contains(@onclick, 'notebook')]");
  25  |         this.monitorLink = this.page.locator("//a[contains(@onclick, 'monitor')]");
  26  |         this.listedItems = this.page.locator('.hrefch');
  27  |         this.productTitle=this.page.locator('h2.name');
  28  |         this.productPrice=this.page.locator('h3.price-container');
  29  |     }
  30  | 
  31  |     async navigateToCart() {
  32  |         await this.cartLink.click();
  33  |     }
  34  |     async addToCart() {
  35  |         await this.addToCartButton.click();
  36  |     }
  37  |     async addProductToCart(name: string) {
  38  |         await this.selectProductByName(name);
  39  |         // this.page.once('dialog', async dialog=>{
  40  |         //     if(dialog.message().includes('Product added')){
  41  |         //         await dialog.accept();
  42  |         //     }
  43  |         // })
  44  |         const dialogPromise = this.page.waitForEvent('dialog'); //capture the dialog box which will be generated after clicking the Add to cart button
  45  |         await this.addToCartButton.click();
  46  |         const dialog = await dialogPromise;
  47  |         if (dialog.message().includes('Product added')) {
  48  |             await dialog.accept();
  49  |         }
  50  |     }
  51  |     async selectProductByName(name: string) {
  52  |         const products = await this.productLinks.all();
  53  |         for (let i = 0; i < products.length; i++) {
  54  |             if ((await products[i].innerText()).toLowerCase() === name.toLowerCase()) {
  55  |                 await products[i].click();
  56  |                 return;
  57  |             }
  58  |         }
> 59  |         throw new Error(`Product ${name} is not found`);
      |               ^ Error: Product Nexus 6 is not found
  60  |     }
  61  |     async selectCategory(categoryName: string) {
  62  |         const categories = await this.categoryLink.all();
  63  | 
  64  |         for (const category of categories) {
  65  |             if ((await category.innerText()).toLowerCase() === categoryName.toLowerCase()) {
  66  |                 await category.click();
  67  |                 return;
  68  |             }
  69  |         }
  70  |         throw new Error(`Product Category called ${categoryName} is not available`);
  71  |     }
  72  | 
  73  |     async isProductAvailable(productName: string) {
  74  |         const productElements = await this.productLinks.all();
  75  |         for (let product of productElements) {
  76  |             const name = await product.textContent();
  77  |             if (name?.trim().toLowerCase() === productName.toLowerCase()) {
  78  |                 return true;
  79  |             }
  80  |         }
  81  |         return false;
  82  |     }
  83  |     async getWelcomeUsername() {
  84  |         return await this.usernametext.textContent();
  85  |     }
  86  |     async filterProductsByCategory(category: string) {
  87  |         // console.log('Starting of method');
  88  |         if (category.toLowerCase().trim() === 'phones') {
  89  |             // console.log('Clicking on phone link');
  90  |             await this.phoneLink.click();
  91  |             
  92  |         }
  93  |         else if (category.toLowerCase().trim() === 'laptops') {
  94  |             await this.laptopLink.click();
  95  |         }
  96  |         else if (category.toLowerCase().trim() === 'monitors') {
  97  |             await this.monitorLink.click();
  98  |         } else {
  99  |             throw new Error(`Category type: ${category} is not listed`);
  100 |         }
  101 |         await this.page.waitForTimeout(2000);
  102 |         const actualProductLocators = await this.listedItems.all();
  103 |         const actualProductNames=[];
  104 |         for (const items of actualProductLocators) {
  105 |             const name = (await items.textContent())?.trim();
  106 |             actualProductNames.push(name);
  107 |         }
  108 |         return actualProductNames;
  109 |     }
  110 |     async productTitleVisible(){
  111 |         return await this.productTitle.textContent();
  112 |     }
  113 |     async productPriceVisible(){
  114 |         return await this.productPrice.isVisible();
  115 |     }
  116 | }
  117 | 
```