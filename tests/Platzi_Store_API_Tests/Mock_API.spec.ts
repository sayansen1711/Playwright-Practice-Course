import { test, expect } from '@playwright/test';

test('Mock API Test', async ({ page }) => {
    //Step 1: Intercept the API call
    await page.route('**/api/v1/fruits', async (route) => {
        const fakeResponse = [
            { name: 'ABC', id: 1 },
            { name: 'XYZ', id: 2 }
        ]
        //Step 2: Fulfill the request with mock data
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(fakeResponse)
        });
    })
    //Step 3: Hit the real API
    await page.goto('https://demo.playwright.dev/api-mocking/');
    await expect(page.getByText('ABC')).toBeVisible();
    await expect(page.getByText('XYZ')).toBeVisible();
})