import {test, expect, Locator} from '@playwright/test';

test('Shadow Dom Testing', async ({page})=>{
    await page.goto('https://shop.polymer-project.org/');

    await page.locator("a[aria-label=\"Men's Outerwear Shop Now\"]").click();

    await page.waitForTimeout(2000);
    const products=await page.locator('div.title').all();
    console.log(products.length);
    expect(products.length).toBe(16);
    for(let i=0;i<products.length;i++){
        console.log(await products[i].innerText());
    }
})