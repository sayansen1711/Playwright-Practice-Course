import {test, expect} from '@playwright/test';

test('Verify URL of the page', async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page).toHaveURL(/AutomationPractice/);
})