import { test, expect } from '@playwright/test';

//testdata
const searchItems: string[] = ['laptop', 'gift card', 'smartphone', 'computer']
// for loop
for (const item of searchItems) {
    test(`Search listed item ${item} from the array`, {tag:'@sanity'}, async ({ page }) => {
        await page.goto('https://demowebshop.tricentis.com/');
        await page.locator('.search-box-text.ui-autocomplete-input').fill(item);
        await page.locator('.button-1.search-box-button').click();
        await expect.soft(page.locator('h2>a').nth(0)).toContainText(item, { ignoreCase: true });
    })
}

// for each loop
test.describe('Search for items', async () => {
    searchItems.forEach((item) => {
        test(`Search listed item ${item}`, { tag: '@sanity' }, async ({ page }) => {
            await page.goto('https://demowebshop.tricentis.com/');
            await page.locator('.search-box-text.ui-autocomplete-input').fill(item);
            await page.locator('.button-1.search-box-button').click();
            await expect.soft(page.locator('h2>a').nth(0)).toContainText(item, { ignoreCase: true });
        })
    })
})