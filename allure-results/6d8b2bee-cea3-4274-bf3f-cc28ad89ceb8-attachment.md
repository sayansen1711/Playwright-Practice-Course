# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: POM\POM_Test.spec.ts >> Demoblaze test >> TC-04: Invalid Login
- Location: tests\POM\POM_Test.spec.ts:53:5

# Error details

```
Error: expect(received).toBeDefined()

Received: undefined
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
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | import { HomePage } from './pages/HomePage.js';
  4  | import { LoginPage } from './pages/LoginPage.js';
  5  | import { SignUpPage } from './pages/SignUpPage.js';
  6  | import { CartPage } from './pages/CartPage.js';
  7  | 
  8  | //Sign Up -> Login -> Add product to cart -> Verify the product in Cart page
  9  | 
  10 | test.describe('Demoblaze test', () => {
  11 |     const baseUrl = 'https://demoblaze.com/index.html';
  12 |     const testProduct = 'Nexus 6';
  13 |     const testPassword = 'password';
  14 |     let signedUpUser: { username: string; password: string } | undefined; //object and username would be generated dynamically
  15 | 
  16 |     test.beforeEach(async ({ page }) => {
  17 |         await page.goto(baseUrl);
  18 |     })
  19 | 
  20 |     test('TC-01: Successful SignUp', async ({ page }) => {
  21 |         const signUpPage = new SignUpPage(page);
  22 |         signedUpUser = {
  23 |             username: `testUser_${Date.now()}`,
  24 |             password: testPassword
  25 |         };
  26 |         const alertMessage = await signUpPage.signUp(signedUpUser.username, signedUpUser.password);
  27 |         expect(alertMessage).toContain('Sign up successful');
  28 |     });
  29 | 
  30 | 
  31 |     test('TC-02: Duplicate SignUp', async ({ page }) => {
  32 |         expect(signedUpUser).toBeDefined();
  33 |         const signUpPage = new SignUpPage(page);
  34 |         const alertMessage = await signUpPage.signUp(signedUpUser!.username, signedUpUser!.password);
  35 |         expect(alertMessage).toContain('This user already exist');
  36 |     });
  37 | 
  38 | 
  39 |     test('TC-03: Successful Login', async ({ page }) => {
  40 |         expect(signedUpUser).toBeDefined(); //Ensures that signedUpUser value is not undefined
  41 |         const loginPage = new LoginPage(page);
  42 |         const homePage = new HomePage(page);
  43 |         const cartPage = new CartPage(page);
  44 | 
  45 |         await loginPage.navigateToLoginIn();
  46 |         await loginPage.login(signedUpUser!.username, signedUpUser!.password);
  47 | 
  48 |         // await page.waitForTimeout(3000);
  49 | 
  50 |         expect(await homePage.getWelcomeUsername()).toBe(`Welcome ${signedUpUser!.username}`);
  51 |     })
  52 | 
  53 |     test('TC-04: Invalid Login', async({page})=>{
> 54 |         expect(signedUpUser).toBeDefined();
     |                              ^ Error: expect(received).toBeDefined()
  55 |         const loginPage = new LoginPage(page);
  56 |         
  57 |         await loginPage.navigateToLoginIn();
  58 |         //invalid password-> Wrong password
  59 |         let dialogPromise=await page.waitForEvent('dialog');
  60 |         await loginPage.login(signedUpUser!.username, 'invalid_password');
  61 |         let alertMessage=dialogPromise.message();
  62 |         expect(alertMessage).toContain('Wrong password');
  63 |         await dialogPromise.accept();
  64 |         
  65 |         //invalid user
  66 |         dialogPromise=await page.waitForEvent('dialog');
  67 |         await loginPage.login(signedUpUser!.username+'InvalidToken', signedUpUser!.password);
  68 |         alertMessage=dialogPromise.message();
  69 |         expect(alertMessage).toContain('User does not exist');
  70 |         await dialogPromise.accept();
  71 |     })
  72 | 
  73 | })
```