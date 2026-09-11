import {test, expect, Locator} from '@playwright/test';

test('Verify PW Single Dropdown Options', async ({page})=>{

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    const dropdown:Locator=page.locator('#dropdown-class-example');
    await dropdown.selectOption('Option1'); //visible text
    // await page.waitForTimeout(2000);
    await dropdown.selectOption({value:'option2'}); //using value attribute
    // await page.waitForTimeout(2000);
    await dropdown.selectOption({label:'Select'}); //using label attribute
    // await page.waitForTimeout(2000);
    await dropdown.selectOption({index:3}); //using 0 based index 
    // await page.waitForTimeout(2000);

    const dropdownOptions:string[]=await page.locator('#dropdown-class-example>option').allTextContents();
    console.log(dropdownOptions);
    expect(dropdownOptions).toHaveLength(4);
    expect(dropdownOptions).toContain('Option2');
})


test.only('Verify PW Multiple Dropdown Options', async ({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/');

    const dropdown:Locator=page.locator('#colors');
    await dropdown.scrollIntoViewIfNeeded();
    await dropdown.selectOption(['Red', 'Green', 'Yellow']); //visible text
    await page.waitForTimeout(2000);
    await dropdown.selectOption(['red', 'green', 'yellow']); //value attribute
    await page.waitForTimeout(2000);
    await dropdown.selectOption([{index:1},{index:3},{index:5}]); //value attribute
    await page.waitForTimeout(2000);
    
})