import {test, expect, Locator} from '@playwright/test';

test('Verify Autosuggest Dropdown', async ({page})=>{
    await page.goto('https://www.flipkart.com/');
    await page.locator("//span[@role='button']").click(); //close modal
    const searchbox=page.locator("(//input[@name='q' and @type='text'])[1]");
    await searchbox.fill('Smart');
    await page.waitForTimeout(2000);

    const options:Locator=page.locator('ul>li');
    // console.log(await options.allTextContents());
    const count=await options.count();
    console.log('3rd option is:',await options.nth(3).innerText());
    for(let i=0;i<count;i++){
        if(await options.nth(i).innerText()==="smart tv"){
            await options.nth(i).click();
            break;
        }
    }
    await page.waitForTimeout(3000);
    console.log(await page.title());
})