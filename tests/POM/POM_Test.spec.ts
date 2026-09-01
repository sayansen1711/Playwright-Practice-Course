import { test, expect } from '@playwright/test';

import { HomePage } from './pages/HomePage.js';
import { LoginPage } from './pages/LoginPage.js';
import { SignUpPage } from './pages/SignUpPage.js';
import { CartPage } from './pages/CartPage.js';

//Sign Up -> Login -> Add product to cart -> Verify the product in Cart page
test.describe.configure({mode: 'serial'});

test.describe('Demoblaze test: User Authentication', () => {
    const baseUrl = 'https://demoblaze.com/index.html';
    const testProduct = 'Nexus 6';
    const testPassword = 'password';
    let signedUpUser: { username: string; password: string } | undefined; //object and username would be generated dynamically

    test.beforeEach(async ({ page }) => {
        await page.goto(baseUrl);
    })

    test('TC-01: Successful SignUp', async ({ page }) => {
        const signUpPage = new SignUpPage(page);
        signedUpUser = {
            username: `testUser_${Date.now()}`,
            password: testPassword
        };
        const alertMessage = await signUpPage.signUp(signedUpUser.username, signedUpUser.password);
        expect(alertMessage).toContain('Sign up successful');
    });


    test('TC-02: Duplicate SignUp', async ({ page }) => {
        expect(signedUpUser).toBeDefined();
        const signUpPage = new SignUpPage(page);
        const alertMessage = await signUpPage.signUp(signedUpUser!.username, signedUpUser!.password);
        expect(alertMessage).toContain('This user already exist');
    });


    test('TC-03: Successful Login', async ({ page }) => {
        expect(signedUpUser).toBeDefined(); //Ensures that signedUpUser value is not undefined
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        const cartPage = new CartPage(page);

        await loginPage.navigateToLoginIn();
        await loginPage.login(signedUpUser!.username, signedUpUser!.password);

        await page.waitForTimeout(3000);

        expect(await homePage.getWelcomeUsername()).toBe(`Welcome ${signedUpUser!.username}`);
    })


    test('TC-04: Invalid Login', async({page})=>{
        expect(signedUpUser).toBeDefined();
        const loginPage = new LoginPage(page);
        
        await loginPage.navigateToLoginIn();
        //invalid password-> Wrong password
        let dialogPromise=page.waitForEvent('dialog');
        await loginPage.login(signedUpUser!.username, 'invalid_password');
        let alert=dialogPromise;
        expect((await alert).message()).toContain('Wrong password');
        (await alert).accept();
        
        //invalid user
        dialogPromise=page.waitForEvent('dialog');
        await loginPage.login(signedUpUser!.username+'InvalidToken', signedUpUser!.password);
        alert=dialogPromise;
        expect((await alert).message()).toContain('User does not exist');
        (await alert).accept();
    })

})