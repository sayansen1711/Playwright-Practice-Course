import {test, expect, Locator} from '@playwright/test';

test('Autowaiting', async ({page})=>{

    test.setTimeout(40000); //set timeout on test level - 40 secs
    // test.slow(); //Timout for test -> 90 secs ->rarely used
    await page.goto('https://demowebshop.tricentis.com/');
    await expect(page).toHaveTitle('Demo Web Shop', {timeout:10000});
    await expect(await page.locator('.topic-html-content-header').textContent()).toContain('Welcome to our store');

    await page.locator('#small-searchterms').fill('Laptop', {force:true});
    await page.locator('.button-1.search-box-button').click({force:true});
    // await page.waitForTimeout(2000);
});