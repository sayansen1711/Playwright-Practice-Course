import {test, expect} from '@playwright/test';

test('Handle Pop-ups(New Window)' , async ({browser})=>{
    const context=await browser.newContext({httpCredentials:{username:'admin', password:'admin'}}); //passing credentials with context for pop up login
    // const context=await browser.newContext();
    const page=await context.newPage();
    /*
        Method 1: Passing username and password in URL
        ORG_URL: https://the-internet.herokuapp.com/basic_auth
        New_URL: http://username:password@the-internet.herokuapp.com/basic_auth
    
        Method 2: Passing username and password with Context
    */
    await page.goto('https://the-internet.herokuapp.com/basic_auth');
    // await page.goto('http://admin:admin@the-internet.herokuapp.com/basic_auth');
    const text=await page.locator('.example>p').innerText();
    expect(text).toContain('Congratulations');
    await page.waitForTimeout(3000);
});