import {test, expect, chromium} from '@playwright/test';

test('Handle tabs', async ()=>{
    const browser=await chromium.launch();
    const context=await browser.newContext();
    const parentPage=await context.newPage();

    await parentPage.goto('https://rahulshettyacademy.com/AutomationPractice/');

    expect(parentPage).toHaveTitle('Practice Page');
    //run these two statements in Parallel execution
    const [childPages]=await Promise.all([context.waitForEvent('page'),parentPage.getByText('Open Tab').click()]); 
    
    //Approach 1: Using Context Array to access parent and child page (use when count of context>2)
    const pagesArray=context.pages();

    console.log(`Number of pages created: ${pagesArray.length}`);
    console.log('Approach 1:\nTitle of Parent page:',await pagesArray[0].title());
    console.log('Title of Child page:',await pagesArray[1].title());

    //Approach 2: child page array (use when count of context=2)
    console.log('\nApproach 2:\nTitle of Parent page:',await parentPage.title());
    console.log('Title of Child page:',await childPages.title());
});