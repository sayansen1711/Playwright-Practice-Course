import { test, expect } from '@playwright/test';

test('Mock Data as API response', async ({ page }) => {
    //Step 1: Intercept the API call
    await page.route('**/api/v1/fruits', async (route) => { //Intercept the request
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
test('Mock Live API Response', async ({ page }) => {
    await page.route('**/api/v1/fruits', async (route) => { //Intercept the request
        const response = await route.fetch(); //Perform the API request and get the actual response
        const json = await response.json();

        //modify the json data
        json.push({ name: 'ABC', id: 2 });

        //fulfill the request with actual response and modified JSON response
        await route.fulfill({ response, json });
    });
    await page.goto('https://demo.playwright.dev/api-mocking/');
    await page.getByText('ABC').scrollIntoViewIfNeeded();
    await page.waitForTimeout(3000);
    await expect(page.getByText('ABC')).toBeVisible();
})

test.only('Blocking of images using network interception', async ({ page }) => {

    //block the images .jpg .png .jpeg gif svg webp
    //https://demoblaze.com/Samsung1.jpg
    //https://demoblaze.com/iphone1.jpg
    //https://demoblaze.com/imgs/front.jpg
    //https://demoblaze.com/blazemeter-favicon-512x512.png
    //https://demoblaze.com/blazemeter-favicon-32x32.png
    await page.route('**/*.{jpg, png, jpeg, gif, svg, webp}', async (route) => {
        console.log(route.request().url());
        await route.abort() //block the request
    })

    await page.goto('https://demoblaze.com/');
    await page.waitForTimeout(3000);
    await page.reload();
})