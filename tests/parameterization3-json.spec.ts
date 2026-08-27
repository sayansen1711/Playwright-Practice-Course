import { test, expect } from '@playwright/test';
import fs from 'fs';

const jsonPath = 'tests/testdata/data.json';
const loginData: any = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

test.describe('Login Test credentials from JSON testdata', async () => {
    for (const {email, password, validity} of loginData) {

        test(`Login using ${email} and ${password}`, async ({ page }) => {
            await page.goto('https://demowebshop.tricentis.com/');
            await page.locator('.ico-login').click();
            await page.locator('#Email').fill(email);
            await page.locator('#Password').fill(password);
            await page.locator('.button-1.login-button').click(); //click on login button

            if (validity.toLowerCase() === 'valid') {
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
    }
})