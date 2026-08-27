import { test, expect } from '@playwright/test';

test('Test Infinite Scrolling Page', async ({ page }) => {
    await page.goto('https://www.booksbykilo.in/new-books');
    expect(page).toHaveTitle('New Books : Books By Kilo | Online bookstore to buy best quality used books by weight.');

    //scroll till the bottom of the page
    let prevHeight = 0;
    while (true) {
        page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight) });  //same as Selenium' JavascriptExecutor

        await page.waitForTimeout(2000); //wait for new elements to load
        const currentHeight=await page.evaluate(()=>{return document.body.scrollHeight}); //return the current height

        console.log('Previous Height:',prevHeight);
        console.log('Current Height:',currentHeight);

        if(prevHeight==currentHeight){
            break;
        }
        prevHeight=currentHeight;
    }
});