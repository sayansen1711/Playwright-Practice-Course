import {test, expect, Locator} from '@playwright/test';

test('Verify Playwright Locators', async ({page})=>{
    // await page.goto('https://eventhub.rahulshettyacademy.com/login');
    //Built in locator functions
    //1. getByAltText()
    // const logo:Locator=page.getByAltText('EventHub app preview');
    // await expect(logo).toBeVisible();

    // //2. getByText()
    // await expect(page.getByText('The #1 QA Practice Hub')).toBeVisible();

    //3. getByRole() --> check ARIA Role
    // await page.getByRole('link', {name:'Register'}).click(); //for //a tag with text Register
    // await expect(page.getByRole('heading', {name:'Create your account'})).toBeVisible();

    //4. getByLabel()
    // await page.getByLabel('Email').fill('abc@email.com');
    // await page.getByLabel('Password').fill('password');

    //5. getByPlaceholder()
    // await page.getByPlaceholder('you@email.com').fill('abc@email.com');

    //6. getByTitle()
    //7. getByTestId()
    await page.goto('https://eventhub.rahulshettyacademy.com/register');
    await page.getByTestId('register-email').fill('email@example.com');
})