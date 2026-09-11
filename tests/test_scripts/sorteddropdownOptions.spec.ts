import {test, expect, Locator} from '@playwright/test';

test('Verify Dropdown Options are Sorted', async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    const dropdownOptions:Locator=page.locator('#country>option');
    const optionTexts=(await dropdownOptions.allTextContents()).map(text=>text.trim());
    // console.log(optionTexts);

    const original_list:string[]=[...optionTexts];
    console.log('Original List:',original_list);
    const sorted_list:string[]=[...optionTexts].sort();
    console.log('Sorted List:',sorted_list);
    expect(original_list).toEqual(sorted_list);

})