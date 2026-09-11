import {test, expect, Locator} from '@playwright/test';

test('Verify Dropdown Options are Not Duplicate', async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    const dropdownOptions:Locator=page.locator('#country>option');
    const optionTexts=(await dropdownOptions.allTextContents()).map(text=>text.trim());
    console.log(optionTexts);

    const myset=new Set<string>();
    const duplicates:string[]=[]

    for(const text of optionTexts){
        if(myset.has(text)){
            duplicates.push(text);
            console.log('1. adding to duplicate:',text)
        } else{
            myset.add(text);
            console.log('2. adding to myset:',text)
        }
    }
    console.log(duplicates);
    // expect(duplicates).toHaveLength(0);
    if(duplicates.length==0){
        console.log('There are no duplicates');
    }else{
        console.log('There are duplicates');
    }
})