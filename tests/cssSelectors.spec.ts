import {test , expect, Locator} from '@playwright/test';

test('Verify CSS Selectors', async ({page})=>{
    await page.goto('https://eventhub.rahulshettyacademy.com/register');
    //1. tag + id css selector
    const email_input1:Locator=page.locator('input#register-email'); //with tag + id
    //2. tag + class name
    const form:Locator=page.locator('form.space-y-4'); ////with tag + partial class name
    //3. tag + attribute
    const email_input2:Locator=page.locator('input[type=email]'); //tag + attribute
    //4. tag + class name + attribute
    const email_input3:Locator=page.locator('input.w-full[type=email]'); //tag + class + attribute
    
    await expect(form).toBeVisible();
    await expect(email_input1).toBeVisible();
    await expect(email_input2).toBeVisible();
    await expect(email_input3).toBeVisible();
    await email_input3.fill('email@example.com'); 
    await page.waitForTimeout(3000);
    //Password1! email2@practice.com
})