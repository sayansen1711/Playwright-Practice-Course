# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: POM\POM_Test.spec.ts >> Demoblaze test: Catalog Navigation >> TC-05: Category Filtering
- Location: tests\POM\POM_Test.spec.ts:81:5

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 1

  Array [
    "Sony vaio i5",
-   "Sony vaio i7
- ",
+   "Sony vaio i7",
    "MacBook air",
    "Dell i7 8gb",
    "2017 Dell 15.6 Inch",
    "MacBook Pro",
  ]
```

# Page snapshot

```yaml
- generic [ref=e1]:
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
      - img "Second slide" [ref=e28]
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
      - link "Laptops" [active] [ref=e41] [cursor=pointer]:
        - /url: "#"
      - link "Monitors" [ref=e42] [cursor=pointer]:
        - /url: "#"
    - generic [ref=e43]:
      - generic [ref=e44]:
        - generic [ref=e46]:
          - link [ref=e47] [cursor=pointer]:
            - /url: prod.html?idp_=8
          - generic [ref=e48]:
            - heading "Sony vaio i5" [level=4] [ref=e49]:
              - link "Sony vaio i5" [ref=e50] [cursor=pointer]:
                - /url: prod.html?idp_=8
            - heading "$790" [level=5] [ref=e51]
            - paragraph [ref=e52]: Sony is so confident that the VAIO S is a superior ultraportable laptop that the company proudly compares the notebook to Apple's 13-inch MacBook Pro. And in a lot of ways this notebook is better, thanks to a lighter weight.
        - generic [ref=e54]:
          - link [ref=e55] [cursor=pointer]:
            - /url: prod.html?idp_=9
          - generic [ref=e56]:
            - heading "Sony vaio i7" [level=4] [ref=e57]:
              - link "Sony vaio i7" [ref=e58] [cursor=pointer]:
                - /url: prod.html?idp_=9
            - heading "$790" [level=5] [ref=e59]
            - paragraph [ref=e60]: REVIEW Sony is so confident that the VAIO S is a superior ultraportable laptop that the company proudly compares the notebook to Apple's 13-inch MacBook Pro. And in a lot of ways this notebook is better, thanks to a lighter weight, higher-resolution display, more storage space, and a Blu-ray drive.
        - generic [ref=e62]:
          - link [ref=e63] [cursor=pointer]:
            - /url: prod.html?idp_=11
          - generic [ref=e64]:
            - heading "MacBook air" [level=4] [ref=e65]:
              - link "MacBook air" [ref=e66] [cursor=pointer]:
                - /url: prod.html?idp_=11
            - heading "$700" [level=5] [ref=e67]
            - paragraph [ref=e68]: 1.6GHz dual-core Intel Core i5 (Turbo Boost up to 2.7GHz) with 3MB shared L3 cache Configurable to 2.2GHz dual-core Intel Core i7 (Turbo Boost up to 3.2GHz) with 4MB shared L3 cache.
        - generic [ref=e70]:
          - link [ref=e71] [cursor=pointer]:
            - /url: prod.html?idp_=12
          - generic [ref=e72]:
            - heading "Dell i7 8gb" [level=4] [ref=e73]:
              - link "Dell i7 8gb" [ref=e74] [cursor=pointer]:
                - /url: prod.html?idp_=12
            - heading "$700" [level=5] [ref=e75]
            - paragraph [ref=e76]: 6th Generation Intel Core i7-6500U Dual-Core Processor 2.5 GHz (max boost speed up to 3.1GHz) 4MB L3 Cache, 8GB DDR4 1600 MHz, 1TB 5400 RPM HDD15.6 in Full HD LED-backlit touchscreen with Truelife (1920 x 1080), 10-finger multi-touch support, Intel HD Graphics 520 with shared graphics memory
        - generic [ref=e78]:
          - link [ref=e79] [cursor=pointer]:
            - /url: prod.html?idp_=13
          - generic [ref=e80]:
            - heading "2017 Dell 15.6 Inch" [level=4] [ref=e81]:
              - link "2017 Dell 15.6 Inch" [ref=e82] [cursor=pointer]:
                - /url: prod.html?idp_=13
            - heading "$700" [level=5] [ref=e83]
            - paragraph [ref=e84]: 7th Gen Intel Core i7-7500U mobile processor 2.70 GHz with Turbo Boost Technology up to 3.50 GHz, Intel HD Graphics 62015.6 inch Full HD IPS TrueLife LED-backlit touchscreen (1920 x 1080), 10-finger multi-touch support, 360° flip-and-fold design,8GB DDR4 2400 MHz Memory, 1TB 5400 RPM HDD, No optical drive, 3 in 1 card reader (SD SDHC SDXC)
        - generic [ref=e86]:
          - link [ref=e87] [cursor=pointer]:
            - /url: prod.html?idp_=15
          - generic [ref=e88]:
            - heading "MacBook Pro" [level=4] [ref=e89]:
              - link "MacBook Pro" [ref=e90] [cursor=pointer]:
                - /url: prod.html?idp_=15
            - heading "$1100" [level=5] [ref=e91]
            - paragraph [ref=e92]: Apple has introduced three new versions of its MacBook Pro line, including a 13-inch and 15-inch model with the Touch Bar, a thin, multi-touch strip display that sits above the MacBook Pro's keyboard.
      - list [ref=e94]:
        - listitem [ref=e95]:
          - button "Previous" [ref=e96]
        - listitem [ref=e97]:
          - button "Next" [ref=e98] [cursor=pointer]
  - generic [ref=e100]:
    - generic [ref=e103]:
      - heading "About Us" [level=4] [ref=e104]
      - paragraph [ref=e105]: We believe performance needs to be validated at every stage of the software development cycle and our open source compatible, massively scalable platform makes that a reality.
    - generic [ref=e108]:
      - heading "Get in Touch" [level=4] [ref=e109]
      - paragraph [ref=e110]: "Address: 2390 El Camino Real"
      - paragraph [ref=e111]: "Phone: +440 123456"
      - paragraph [ref=e112]: "Email: demo@blazemeter.com"
    - heading "PRODUCT STORE" [level=4] [ref=e116]:
      - img [ref=e117]
      - text: PRODUCT STORE
  - contentinfo [ref=e118]:
    - paragraph [ref=e119]: Copyright © Product Store
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | import { HomePage } from './pages/HomePage.js';
  4  | import { LoginPage } from './pages/LoginPage.js';
  5  | import { SignUpPage } from './pages/SignUpPage.js';
  6  | import { CartPage } from './pages/CartPage.js';
  7  | import { CommonUtility } from './CommonUtility.js';
  8  | const baseUrl = 'https://demoblaze.com/index.html';
  9  | const testProduct = 'Nexus 6';
  10 | const testPassword = 'password';
  11 | let signedUpUser: { username: string; password: string } | undefined; //object and username would be generated dynamically
  12 | //Sign Up -> Login -> Add product to cart -> Verify the product in Cart page
  13 | test.describe.configure({ mode: 'serial' });
  14 | 
  15 | test.describe('Demoblaze test: User Authentication', () => {
  16 | 
  17 |     test.beforeEach(async ({ page }) => {
  18 |         await page.goto(baseUrl);
  19 |     })
  20 | 
  21 |     test('TC-01: Successful SignUp', async ({ page }) => {
  22 |         const signUpPage = new SignUpPage(page);
  23 |         signedUpUser = {
  24 |             username: `testUser_${Date.now()}`,
  25 |             password: testPassword
  26 |         };
  27 |         const alertMessage = await signUpPage.signUp(signedUpUser.username, signedUpUser.password);
  28 |         expect(alertMessage).toContain('Sign up successful');
  29 |     });
  30 | 
  31 | 
  32 |     test('TC-02: Duplicate SignUp', async ({ page }) => {
  33 |         expect(signedUpUser).toBeDefined();
  34 |         const signUpPage = new SignUpPage(page);
  35 |         const alertMessage = await signUpPage.signUp(signedUpUser!.username, signedUpUser!.password);
  36 |         expect(alertMessage).toContain('This user already exist');
  37 |     });
  38 | 
  39 | 
  40 |     test('TC-03: Successful Login', async ({ page }) => {
  41 |         expect(signedUpUser).toBeDefined(); //Ensures that signedUpUser value is not undefined
  42 |         const loginPage = new LoginPage(page);
  43 |         const homePage = new HomePage(page);
  44 |         const cartPage = new CartPage(page);
  45 | 
  46 |         await loginPage.navigateToLoginIn();
  47 |         await loginPage.login(signedUpUser!.username, signedUpUser!.password);
  48 | 
  49 |         await page.waitForTimeout(3000);
  50 | 
  51 |         expect(await homePage.getWelcomeUsername()).toBe(`Welcome ${signedUpUser!.username}`);
  52 |     })
  53 | 
  54 | 
  55 |     test('TC-04: Invalid Login', async ({ page }) => {
  56 |         expect(signedUpUser).toBeDefined();
  57 |         const loginPage = new LoginPage(page);
  58 | 
  59 |         await loginPage.navigateToLoginIn();
  60 |         //invalid password-> Wrong password
  61 |         let dialogPromise = page.waitForEvent('dialog');
  62 |         await loginPage.login(signedUpUser!.username, 'invalid_password');
  63 |         let alert = dialogPromise;
  64 |         expect((await alert).message()).toContain('Wrong password');
  65 |         (await alert).accept();
  66 | 
  67 |         //invalid user
  68 |         dialogPromise = page.waitForEvent('dialog');
  69 |         await loginPage.login(signedUpUser!.username + 'InvalidToken', signedUpUser!.password);
  70 |         alert = dialogPromise;
  71 |         expect((await alert).message()).toContain('User does not exist');
  72 |         (await alert).accept();
  73 |     })
  74 | 
  75 | })
  76 | 
  77 | test.describe('Demoblaze test: Catalog Navigation', async () => {
  78 |     test.beforeEach(async ({ page }) => {
  79 |         await page.goto(baseUrl);
  80 |     })
  81 |     test('TC-05: Category Filtering', async({page})=>{
  82 |         const homePage = new HomePage(page);
  83 |         //Grid displays only products from the active category.
  84 |         const commonUtility = new CommonUtility();
  85 |         const categories=['phones', 'monitors', 'laptops'];
  86 |         for(const item of categories){
  87 |             const expectedProductList=commonUtility.readData(item);
  88 |             // console.log('expected:',expectedProductList);
  89 |             const actualProductList=await homePage.filterProductsByCategory(item);
  90 |             console.log('actual:',actualProductList);
> 91 |             expect(expectedProductList).toEqual(actualProductList);
     |                                         ^ Error: expect(received).toEqual(expected) // deep equality
  92 |         }
  93 |     })
  94 | })
```