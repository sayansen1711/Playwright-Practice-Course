import { test, expect } from '@playwright/test';

const testdata: string[][] = [['laura.taylor1234@example.com', 'test123', 'valid'],
['invaliduser@example.com', 'test321', 'invalid'],
['validuser@example.com', 'testxyz', 'invalid'],
['', '', 'invalid']];

for (const [email, password, validityCheck] of testdata) {
    test.describe('Login Test credentials from testdata 2D array', async () => {
        test(`Login using ${email} and ${password}`, async ({ page }) => {
            await page.goto('https://demowebshop.tricentis.com/');
            await page.locator('.ico-login').click();
            await page.locator('#Email').fill(email);
            await page.locator('#Password').fill(password);
            await page.locator('.button-1.login-button').click(); //click on login button

            if (validityCheck.toLowerCase() === 'valid') {
                //validate if log out link is visible or not
                const logoutLink = page.locator('.ico-logout');
                expect(logoutLink).toBeVisible({ timeout: 40000 });
            } else {
                //Assert error message is visible or not
                const errorMessage = page.locator('.validation-summary-errors');
                await expect(errorMessage).toBeVisible();
                await expect(page).toHaveURL('https://demowebshop.tricentis.com/login');
            }
        })
    })
}

