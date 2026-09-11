import {test, expect, Locator} from '@playwright/test';

test('Testing Bootstrap Hidden Dropdown', async ({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole("button", {name:/login/i}).click();
    await page.waitForTimeout(3000);

    const sidePanelMenu=page.locator('.oxd-main-menu-item');
    const count=await sidePanelMenu.count();
    for(let i=0;i<count;i++){
        if(await sidePanelMenu.nth(i).textContent()==='PIM'){
            await sidePanelMenu.nth(i).click();
            break;
        }
    }
    
    const dropDownMenus=page.locator('.oxd-select-wrapper');
    await dropDownMenus.nth(2).click();
    await page.waitForTimeout(3000);
    const dropDownOptions=page.locator('.oxd-select-option');
    const numberOfOptions=await dropDownOptions.count();
    for(let i=0;i<numberOfOptions;i++){
        const text = (await dropDownOptions.nth(i).textContent())?.trim();
        if(text==="Automaton Tester"){
           await dropDownOptions.nth(i).click();
           break;
        }
    }
    const inputValues=page.locator('.oxd-select-text-input');
    expect(await inputValues.nth(2).textContent()).toBe('Automaton Tester');
    await page.waitForTimeout(3000);
})