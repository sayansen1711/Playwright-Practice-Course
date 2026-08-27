import { test, expect, Locator } from '@playwright/test';

test('Read all data from all table pages', async ({ page }) => {
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");
    let morePages: boolean = true;

    while (morePages) {
        const rows: Locator[] = await page.locator('#example tbody tr').all();
        for (let row of rows) {
            console.log(await row.innerText());
        }
        const nextButton: Locator = page.locator("button[aria-label='Next']");
        const isDisabled: string | null = await nextButton.getAttribute('class');
        if (isDisabled?.includes('disabled')) {
            morePages = false;
        } else {
            await nextButton.click();
        }
    }
})

test('Change Pagination Value', async ({ page }) => {
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    await page.locator('.dt-length select').selectOption('25');
    const rows: Locator[] = await page.locator('#example tbody tr').all();
    await expect(rows.length).toBe(25);
})

test.only('Search for specific data', async ({ page }) => {
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    const searchBox = page.locator('#dt-search-0');
    const name='Olivia Liang'; //Olivia Liang
    await searchBox.fill(name);
    const rows = await page.locator('#example tbody tr').all();
    await page.waitForTimeout(3000);
    if (rows.length >= 1) {
        let matchFound = false;
        for(let row of rows){
            const text=await row.innerText();
            if(text.includes(name)){
                matchFound=true;
                console.log('Record found.\nDetails:',await row.innerText());
                break;
            }
        }
        expect(matchFound).toBeTruthy();
    } else {
        console.log("Record doesn't exist");
    }
    
})