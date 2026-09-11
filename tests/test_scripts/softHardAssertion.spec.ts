import { test, expect, Locator } from '@playwright/test';

test('Soft and Hard Assertions', async ({ page }) => {

    await page.goto('https://demowebshop.tricentis.com/');
    await expect(page).toHaveTitle('Demo Web Shop'); //hard assert
    //soft assert
    expect.soft(await page.locator('.topic-html-content-header').textContent()).toContain('Welcome to our store');

    await page.locator('#small-searchterms').fill('Laptop');
    await page.locator('.button-1.search-box-button').click();
    await page.waitForTimeout(2000);
});