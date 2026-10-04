import {test, expect} from '@playwright/test';

test('Go to GreenKart Page and click add to cart button', async({page})=>{
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');

    const addToCartBtn=page.locator('.product')
    .filter({hasText:'Cucumber - 1 Kg'})
    .getByRole('button',{name:'ADD TO CART'});
    
    await addToCartBtn.click();

    const btnLabelPostClick=page.locator('.product')
    .filter({hasText:'Cucumber - 1 Kg'})
    .getByRole('button');

    expect(await btnLabelPostClick.textContent()).toContain('ADDED');

    await page.waitForTimeout(3000);
    await []
})