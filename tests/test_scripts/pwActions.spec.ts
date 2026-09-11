import {test, expect, Locator} from '@playwright/test';

test('Verify PW Radio Actions', async ({page})=>{

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    const radio_1:Locator=page.locator("input.radioButton[value='radio1']");
    const radio_2:Locator=page.locator("input.radioButton[value='radio2']");
    const radio_3:Locator=page.locator("input.radioButton[value='radio3']");
    await radio_1.check();
    expect(await radio_1.isChecked()).toBe(true);
    await expect(radio_1).toBeChecked();
    await radio_2.check();
    await expect(radio_2).toBeChecked();
    await radio_3.check();
    await expect(radio_3).toBeChecked();
    await expect(radio_1).not.toBeChecked();
    await expect(radio_2).not.toBeChecked();
    await page.waitForTimeout(3000);
})

test('Verify PW Checkbox Actions', async ({page})=>{

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    
    const labels:string[]=['checkBoxOption1', 'checkBoxOption2', 'checkBoxOption3'];

    const checkboxes:Locator[]=labels.map(i=>page.locator('#'+i))
    for(const checkbox of checkboxes){
        await checkbox.check();
        await expect(checkbox).toBeChecked();
    }
    for(const checkbox of checkboxes){
        await checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();
    }

    await page.waitForTimeout(3000);
})
