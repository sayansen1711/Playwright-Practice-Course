import { test, expect, Locator } from '@playwright/test';

test('Screenshot Demo', async ({ page }) => {

    await page.goto('https://demowebshop.tricentis.com/');

    const timestamp=Date.now();
    
    // await page.screenshot({path: 'screenshots/'+'page-'+timestamp+'.png'}); //screenshot of visible page

    // await page.screenshot({path: 'screenshots/fullpage'+timestamp+'.png', fullPage:true}); //full page screenshot

    //screenshot of an element: locator.screenshot({path})
    // const cardLogo=page.locator("img[alt='Picture of $25 Virtual Gift Card']");
    // await cardLogo.screenshot({path:'screenshots/card-logo'+timestamp+'.jpg'});

    
    await page.locator('.product-grid.home-page-product-grid').screenshot({path:'screenshots/products'+timestamp+'.jpg'});
});