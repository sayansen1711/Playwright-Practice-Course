import {test, expect, Locator, Page} from '@playwright/test';

let page: Page;

test.beforeAll('Launch browser', async ({browser})=>{
    let context=await browser.newContext();
    page=await context.newPage();
    await page.goto('https://www.demoblaze.com/index.html');
    await expect(page).toHaveTitle('STORE');
})
test.afterAll('Close browser', async ()=>{
    await page.close();
})
test.beforeEach('Perform Login', async ()=>{
    const username='user_Demo_123';
    const password='password';
    await page.locator('#login2').click();
    await page.locator('#loginusername').fill(username);
    await page.locator('#loginpassword').fill(password);
    await page.locator("//button[text()='Log in']").click();
    // expect(await page.locator('#nameofuser').innerText()).toContain(username);
})
test.afterEach('Logout from website', async()=>{
    await page.locator('#logout2').click(); //clicking on logout button
})
test('Fetching the Product Names', async()=>{
    const products:Locator[]=await page.locator('.card-title>a').all();
    for(let i=0;i<products.length;i++){
        console.log(`Product #${i+1}: ${await products[i].innerText()}`);
    }
})
test('Add Product to Cart and Verify Cart', async()=>{
    const productName='Nexus 6';
    const products:Locator[]=await page.locator('.card-title>a').all();

    for(let i=0;i<products.length;i++){
        // console.log(await products[i].innerText());
        if(await products[i].innerText()===productName){
            await products[i].click(); //click on the Nexus 6 product
            break;
        }
    }
    page.once('dialog', async dialog=>{
        expect(dialog.message()).toBe('Product added.'); //handle dialog (pop-up)
        await dialog.accept();
    })
    await page.locator('.btn.btn-success.btn-lg').click(); //click on Add to Cart
    //verify cart
    await page.locator('#cartur').click(); //Click on Go to Cart link
    // await page.waitForTimeout(3000); 
    await expect(page.locator('.success').first()).toBeVisible({timeout:60000}); //wait for the item to load
    const productTitle=await page.locator('#tbodyid>tr>td').nth(1).textContent(); //fetch the product title
    expect(productTitle).toBe(productName);
})
