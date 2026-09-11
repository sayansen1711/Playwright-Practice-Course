import {test, expect, Locator} from '@playwright/test';

test('Shop Test - Xpath Verification', async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    //login using email and password
    await page.locator('#userEmail').fill('email2@practice.com');
    await page.locator('#userPassword').fill('Password1!');
    await page.locator('#login').click();
    await expect(page).toHaveURL('https://rahulshettyacademy.com/client/#/dashboard/dash');

    const elements:Locator=page.locator("//div[@class='card-body']/h5");
    console.log(elements.count());
    console.log(await elements.first().textContent());
    console.log(await elements.last().textContent());
    console.log(await elements.nth(1).textContent());

    const product_names:string[]=await elements.allTextContents();
    for(let i of product_names){
        console.log('Products:',i)
    }
})