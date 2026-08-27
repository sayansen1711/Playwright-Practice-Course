import { test, expect } from '@playwright/test';
import fs from 'fs';
import {parse} from 'csv-parse/sync';

interface TestData {
    email: string;
    password: string;
    validity: string;
}

const csvPath = 'tests/testdata/data.csv';
const fileContent=fs.readFileSync(csvPath, 'utf-8');
const records=parse(fileContent,{columns:true, skip_empty_lines: true}) as TestData[];

test.describe('Login Test credentials from CSV testdata', async () => {
    for (const data of records) {

        test(`Login using ${data.email} and ${data.password}`, async ({ page }) => {
            await page.goto('https://demowebshop.tricentis.com/');
            await page.locator('.ico-login').click();
            await page.locator('#Email').fill(data.email);
            await page.locator('#Password').fill(data.password);
            await page.locator('.button-1.login-button').click(); //click on login button

            if (data.validity.toLowerCase() === 'valid') {
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