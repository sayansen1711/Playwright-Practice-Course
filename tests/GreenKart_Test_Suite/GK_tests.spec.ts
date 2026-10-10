import { test, expect } from '@playwright/test';
import { HomePage_Locator } from './HomePage.js';

const baseURL = 'https://rahulshettyacademy.com/seleniumPractise/#/';
const prodCount = 30;
const groupMatchCount = 3; // products matching the partial keyword 'ber'
const singleMatchCount = 1; // products matching 'TOMATO'
const noMatchCount = 0;
const noMatchKeyword = "zzz";
const groupKeywordText = 'ber';
const keywordText = "TOMATO";
const expectedProdText = "Tomato - 1 Kg";
const expectedProducts = ['Cucumber - 1 Kg', 'Raspberry - 1/4 Kg', 'Strawberry - 1/4 Kg'];
const expectedNoResultText = ['Sorry, no products matched your search!', 'Enter a different keyword and try.'];

let homePage_Locator: HomePage_Locator;

test.describe('GreenKart Home Page Tests', async () => {

    test.beforeEach('Launch the Greenkart website', async ({ page }) => {
        homePage_Locator = new HomePage_Locator(page);
        await page.goto(baseURL);
    })

    test('TC-01: Product Catalouge Loads Completely on Landing', { tag: ['@smoke', '@positive'] }, async ({ page }) => {

        await homePage_Locator.waitForCatalogueToLoad(prodCount);
        const pageLogoText = await homePage_Locator.returnPageLogo();
        expect.soft(pageLogoText, 'The Page Logo is not matching').toBe('GREENKART');
        const prodItemCount = await homePage_Locator.returnProdCount();
        expect(prodItemCount).toBe(prodCount);
        const prodCards = await homePage_Locator.returnProdCards();

        let index = 0;

        for (const card of prodCards) {
            index++;
            const prodName = await homePage_Locator.getCardName(card);
            const prodPrice = await homePage_Locator.getCardPrice(card);
            const prodQuantity = await homePage_Locator.getCardQuantity(card);
            const btnText = await homePage_Locator.getActionBtnText(card);

            expect.soft(prodName, `Card #${index} has an empty product name`).not.toBe('');
            expect.soft(prodPrice, `Card #${index}'s price is not a number > 0 (got ${prodPrice})`).toBeGreaterThan(0);
            expect.soft(prodQuantity, `Card #${index}'s default quantity is not 1`).toBe(1);
            expect.soft(btnText, `Card #${index}'s action button text is not 'ADD TO CART'`).toBe('ADD TO CART');
        }
    })

    test('TC-02: Search filters the grid by partial, case-insensitive keyword', { tag: ['@functional', '@positive'] }, async ({ page }) => {

        //type partial keyword to test searchbox result
        await homePage_Locator.typeKeywordInSearchBox(groupKeywordText);
        await homePage_Locator.waitForCatalogueToLoad(groupMatchCount);

        let visibleProdCards = await homePage_Locator.returnProdCards();

        const prodNames: string[] = [];
        for (let card of visibleProdCards) {
            const prodName = await homePage_Locator.getCardName(card);
            prodNames.push(prodName);
        }
        expect.soft(prodNames.sort(), 'The product names do not match').toEqual(expectedProducts.sort());
        //restore all the product cards
        await homePage_Locator.clearSearchBox();
        await homePage_Locator.waitForCatalogueToLoad(prodCount);
        visibleProdCards = await homePage_Locator.returnProdCards();
        expect.soft(visibleProdCards.length, 'The product count does not match').toBe(prodCount);

        //type "TOMATO" to see search box results
        await homePage_Locator.typeKeywordInSearchBox(keywordText);
        await homePage_Locator.waitForCatalogueToLoad(singleMatchCount);
        visibleProdCards = await homePage_Locator.returnProdCards();
        expect.soft(visibleProdCards.length, `The ${expectedProdText} card is not present`).toBe(singleMatchCount);
        const prodName = await homePage_Locator.getCardName(visibleProdCards[0]);
        expect.soft(prodName, `The $(expected ProdText} card's name does not match`).toBe(expectedProdText);
    })

    test('TC-03: Search with no match shows the empty-state message', { tag: ['@negative'] }, async ({ page }) => {

        await homePage_Locator.waitForCatalogueToLoad(prodCount);
        await homePage_Locator.typeKeywordInSearchBox(noMatchKeyword);
        await homePage_Locator.waitForCatalogueToLoad(noMatchCount);
        const noResultText = await homePage_Locator.returnNoResultFoundTexts();
        expect.soft(noResultText, 'The No Result text content do not match as expected').toEqual(expectedNoResultText)
        //No Add to Cart Btn should be present
        const addToCartBtnList = await homePage_Locator.checkAddToCartBtn();
        expect(addToCartBtnList.length).toBe(0);
    })

    test('TC-04: Quantity stepper increments and clamps at a minimum of 1', { tag: ['@functional'] }, async ({ page }) => {
        await homePage_Locator.waitForCatalogueToLoad(prodCount);
        const productName = 'Brocolli - 1 Kg';
        const card = await homePage_Locator.returnCard(productName);
        let quantity = await homePage_Locator.getCardQuantity(card);
        expect(quantity, 'Initial product quantity is not equal to 1').toBe(1); //original product quantity should be 1
        //click the add quantity button twice
        let i = 1;
        for (; i <= 2; i++) {
            await homePage_Locator.clickStepperUpBtn(card);
        }
        quantity = await homePage_Locator.getCardQuantity(card);
        expect.soft(quantity, `The product quantity for ${productName} should be equal to ${i}`).toBe(i);
        //after 3 clicks the quantity should not go below 1
        for (i = 1; i <= 3; i++) {
            await homePage_Locator.clickStepperDownBtn(card);
        }
        quantity = await homePage_Locator.getCardQuantity(card);
        expect(quantity, `The product quantity for ${productName} is less than 1`).not.toBeLessThan(1);
    })

    test('TC-05: Add a single product and verify the cart summary', { tag: ['@smoke', '@positive'] }, async ({ page }) => {
        await homePage_Locator.waitForCatalogueToLoad(prodCount); //page loading check
        await homePage_Locator.checkCartDetails(0, 0);
        const productName = 'Brocolli - 1 Kg';
        const card = await homePage_Locator.returnCard(productName);
        let i = 1;
        for (; i <= 2; i++) {
            await homePage_Locator.clickStepperUpBtn(card);
        }
        await homePage_Locator.clickAddToCartBtn(card);
        const price = await homePage_Locator.returnPrice(card);
        await homePage_Locator.checkCartDetails(1, price * i);
    })

    test('TC-06: Add multiple products and verify the aggregated total', { tag: ['@functional', '@positive'] }, async ({ page }) => {
        await homePage_Locator.waitForCatalogueToLoad(prodCount); //page loading check
        await homePage_Locator.checkCartDetails(0, 0);
        const productNames = ['Brocolli - 1 Kg', 'Cauliflower - 1 Kg', 'Cucumber - 1 Kg'];
        let totalPrice = 0;
        for (let product of productNames) {
            const card = await homePage_Locator.returnCard(product);
            await homePage_Locator.clickAddToCartBtn(card);
            totalPrice = totalPrice + (await homePage_Locator.returnPrice(card));
        }
        await homePage_Locator.checkCartDetails(productNames.length, totalPrice); //assertion of sum of total prices and product count
        await homePage_Locator.openCartList();
        expect(await homePage_Locator.returnCartItemNames(), 'The cart does not contain the expected items').toEqual(productNames); //assertion of product names in the cart list
        const quantities = await homePage_Locator.returnProdQuanties();
        for (let quantity of quantities) {
            expect(quantity).toBe("1 No."); //assertion for quantity check in the cart
        }
        await expect(homePage_Locator.returnProceedToCheckoutBtn(), 'Proceed to Checkout button is not present in the UI').toBeVisible(); //assertion for Proceed to Checkout Btn visibility
    })

    test('TC-07: Remove a product from cart preview', { tag: ['@functional', '@positive'] }, async ({ page }) => {
        await homePage_Locator.waitForCatalogueToLoad(prodCount); //page loading check
        await homePage_Locator.checkCartDetails(0, 0);
        const productNames = ['Brocolli - 1 Kg', 'Cauliflower - 1 Kg', 'Cucumber - 1 Kg'];
        let totalPrice = 0;
        for (let product of productNames) {
            const card = await homePage_Locator.returnCard(product);
            await homePage_Locator.clickAddToCartBtn(card);
            totalPrice = totalPrice + (await homePage_Locator.returnPrice(card));
        }

        await homePage_Locator.checkCartDetails(productNames.length, totalPrice);
        await homePage_Locator.openCartList();
        await homePage_Locator.removeCartItem('Brocolli - 1 Kg');
        expect(await homePage_Locator.returnCartItemNames()).not.toContain('Brocolli 1 Kg');
        totalPrice = totalPrice - (await homePage_Locator.returnPrice(await homePage_Locator.returnCard('Brocolli - 1 Kg')));
        await homePage_Locator.checkCartDetails(productNames.length - 1, totalPrice);
    })

    test('TC-08: Apply a valid promo code at checkout', async ({ page }) => {
        await homePage_Locator.waitForCatalogueToLoad(prodCount); //page loading check
        await homePage_Locator.checkCartDetails(0, 0);
        const productNames = ['Brocolli - 1 Kg', 'Cauliflower - 1 Kg', 'Cucumber - 1 Kg'];
        let totalPrice = 0;
        for (let product of productNames) {
            const card = await homePage_Locator.returnCard(product);
            await homePage_Locator.clickAddToCartBtn(card);
            totalPrice = totalPrice + (await homePage_Locator.returnPrice(card));
        }
        await homePage_Locator.checkCartDetails(productNames.length, totalPrice);
    })
})