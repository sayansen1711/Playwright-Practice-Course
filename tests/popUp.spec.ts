import {test, expect} from '@playwright/test';

test('Handle Pop-ups(New Window)' , async ({browser})=>{
    const context=await browser.newContext();
    const parentPage=await context.newPage();

    // await parentPage.goto('https://rahulshettyacademy.com/practice');
    //h3[contains(text(),'AutomationPractice Portal')]/parent::div/parent::div/button
    // expect(parentPage).toHaveTitle('Rahul Shetty Academy | QA Automation, Playwright, AI Testing & QA Online Training');
    await parentPage.goto('https://rahulshettyacademy.com/AutomationPractice/');
    // const [childPages]=await Promise.all([context.waitForEvent('page'),await parentPage.locator("//h3[contains(text(),'AutomationPractice Portal')]/parent::div/parent::div/button").click()]);
    // expect(childPages).toHaveTitle('Practice Page');
    await Promise.all([parentPage.waitForEvent('popup'), await parentPage.getByText('Open Window').click()]);

    const popUpWindows=context.pages();
    
    console.log('Number of contexts:',popUpWindows.length);
    console.log(await popUpWindows[1].title());
    console.log('URL of Page 1:',popUpWindows[0].url());
    console.log('URL of Page 2:',popUpWindows[1].url());
    
    // expect.any(pages[1]).toHaveTitle('QAClick Academy - A Testing Academy to Learn, Earn and Shine');

    //use for loop to access each window and perform actions on each
})