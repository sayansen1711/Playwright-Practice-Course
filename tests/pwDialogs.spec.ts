import {test, expect, Locator} from '@playwright/test';

test('Simple Dialog box validation', async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');

    page.on('dialog', (dialog)=>{
        console.log('Dialog Type:',dialog.type());
        console.log('Dialog Message:',dialog.message());
        dialog.accept();
    });

    await page.locator('#alertBtn').click();

    await page.waitForTimeout(3000);
})

test.only('Confirmation Dialog box validation', async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');

    page.on('dialog', (dialog)=>{
        console.log('Dialog Type:',dialog.type());
        console.log('Dialog Message:',dialog.message());
        dialog.accept();
        // dialog.dismiss();
    });

    await page.locator('#confirmBtn').click();
    const text:string=await page.locator('#demo').innerText();
    console.log('Text:',text);
    
    await expect(page.locator('#demo')).toHaveText('You pressed OK!');
    // await expect(page.locator('#demo')).toHaveText('You pressed Cancel!');
    await page.waitForTimeout(3000);
})