import {test, expect} from "@playwright/test";

// Syntax: test("title of the test", async ()=>{})
// fixture - global variable=> {page}, {browser}
test('Verify Page Title', async ({page})=>{
    // Syntax: page.goto('url')
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/'); //retuns a promise (resolve or reject)->use await
    let pageTitle:string=await page.title();
    console.log('Page Title',pageTitle);
    await expect(page).toHaveTitle('Practice Page'); //assertion for page title
}) 