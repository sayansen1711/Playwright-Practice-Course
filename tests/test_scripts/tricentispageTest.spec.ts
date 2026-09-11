import {test, expect} from '@playwright/test';

test.describe('demowebshop Home Page Tests', async()=>{

    test('Homepage logo test',{tag:['@P2', '@Regression']} ,async({page})=>{
        await page.goto('https://demowebshop.tricentis.com/');
        const logo=page.getByAltText('Tricentis Demo Web Shop');
        await expect(logo).toBeVisible();
    })
    test('Homepage title test', {tag:['@P2', '@Regression']}, async({page})=>{
        await page.goto('https://demowebshop.tricentis.com/');
        expect(await page.title()).toContain('Demo Web Shop');
    })
})

test.describe('demowebshop User Login test', async()=>{

    test('Login test with in-valid credentials', {tag:['@P1','@Sanity']}, async({page})=>{

        console.log('This test is expected to fail due to invalid credentials');
        await test.step('Open Login Page', async()=>{
            await page.goto('https://demowebshop.tricentis.com/login');
        })
        await test.step('Enter login credentials', async()=>{
            await page.fill('#Email', 'invaliduser@example.com');
            await page.fill('#Password','test321');
        })
        await test.step('Click login button', async()=>{
            await page.locator('.button-1.login-button').click();
        })
        await test.step('Verify unsuccessful login', async()=>{
            await expect(page.url()).toBe('https://demowebshop.tricentis.com/login');
        })
    })

    test('Login test with valid credentials', {tag:['@P1','@Sanity']}, async({page})=>{
        
        await test.step('Open Login Page', async()=>{
            await page.goto('https://demowebshop.tricentis.com/login');
        })
        await test.step('Enter login credentials', async()=>{
            await page.fill('#Email', 'laura.taylor1234@example.com');
            await page.fill('#Password','test123');
        })
        await test.step('Click login button', async()=>{
            await page.locator('.button-1.login-button').click();
        })
        await test.step('Verify unsuccessful login', async()=>{
            await expect(page.locator('.ico-logout')).toBeVisible({timeout:5000});  
        })
    })

    test.skip('demowebshop search test', {tag:['@P2', '@Regression']}, async({page})=>{
        await page.goto('https://demowebshop.tricentis.com/login');
        await page.locator('.search-box-text.ui-autocomplete-input').fill('laptop');
        await page.locator('.button-1.search-box-button').click();
        await expect.soft(page.locator('h2>a').nth(0)).toContainText('laptop',{ignoreCase: true});
    })
    //Failing test
    test('demoblaze Login test', {tag:['@P1', '@Sanity']}, async({page})=>{
        await page.goto('https://www.demoblaze.com/index.html');
        await page.locator('#login2').click();
        await page.fill('#loginusername','pavanol'); //invalid credentials
        await page.fill('#loginpassword','test@123X'); //invalid credentials
        await page.getByRole('button', {name:'Log in'}).click();
        await expect(page.locator('#logout2')).toBeVisible();
        await expect(page.locator('#nameofuser')).toContainText('Welcome pavanol');
        // user_Demo_12345 user_Demo_1234
    })
})

