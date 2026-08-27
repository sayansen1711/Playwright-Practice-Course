import {test, expect, Locator} from '@playwright/test';

test('For Chrome process get value of  CPU load.', async ({page})=>{
    await page.goto('https://practice.expandtesting.com/dynamic-table');
    // await page.locator('#dismiss-button-element').click();

    const table:Locator=page.locator('table.table tbody');
    await table.scrollIntoViewIfNeeded();
    await expect(table).toBeVisible();
    // await page.waitForTimeout(2000);
    const rows:Locator[]=await table.locator('tr').all();
    // console.log(rows.length);
    expect(rows.length).toBe(4);

    let cpuLoad='';
    for(const row of rows){
         const processName:string=await row.locator("td").nth(0).innerText();
        //  console.log(processName);
         if(processName==='Chrome'){
            cpuLoad = await row.locator("td", {hasText:'%'}).innerText();  
            console.log('CPU Load',cpuLoad);
            break;
         }
    }
    const expectedCpuLoadLabel:string=await page.locator('#chrome-cpu').innerText(); 
    expect(expectedCpuLoadLabel).toContain(cpuLoad);
})