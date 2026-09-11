import {test, expect, chromium} from '@playwright/test';

test('Browser Context', async()=>{
    const browser=await chromium.launch();
    const context=await browser.newContext();
    const page1=await context.newPage();
    const page2=await context.newPage();

    await page1.goto('https://playwright.dev/');
    await expect(page1).toHaveTitle('Fast and reliable end-to-end testing for modern web apps | Playwright');
    await page2.goto('https://www.selenium.dev/');
    await expect(page2).toHaveTitle('Selenium');

    await page1.waitForTimeout(2000);
    await page1.close();
    await page2.waitForTimeout(2000);
    await page2.close();
    
})

test.only('Browser Context Configuration-Viewport, SSL, Proxy, Cookies', async()=>{
    // const browser=await chromium.launch({headless:true});
    const browser=await chromium.launch({args:['--start-maximized'] ,headless:false}); // run in headed mode and full screen
    const context=await browser.newContext({
        // viewport:{width:1200, height: 800} //setting the window viewport
        viewport: null,
        locale: 'en_US',  //translate the page's content language
        proxy:{server: 'https://myproxyurl.com:5050'}, //set proxy server url. So final URL=https://myproxyurl.com:5050/playwright.dev/
        ignoreHTTPSErrors: true  //Handle SSL certificate errors
    });
    context.addCookies([
        {name:'mycookie', value:'123456', url:'https://cookie-url.com/'}
    ]); //set cookie
    const page1=await context.newPage();
    
    

    await page1.goto('https://playwright.dev/');
    
    console.log(await context.cookies()); //get all cookies->Cookies[]

    context.clearCookies(); //clear all cookies
    
    await page1.waitForTimeout(2000);
    await page1.close(); 
})