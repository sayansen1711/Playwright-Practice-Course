import { test, expect } from '@playwright/test';
import { HomePage } from './HomePage.js';
import { CartPage } from './CartPage.js';

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
const promoCode = 'rahulshettyacademy';

let homePage: HomePage;
let cartPage: CartPage;

test.describe('GreenKart Home Page Tests', async () => {

    test.beforeEach('Launch the Greenkart website', async ({ page }) => {
        homePage = new HomePage(page);
        cartPage = new CartPage(page);
        await page.goto(baseURL);
    })

    test('TC-01: Product Catalouge Loads Completely on Landing', { tag: ['@smoke', '@positive'] }, async ({ page }) => {

        await homePage.waitForCatalogueToLoad(prodCount);
        const pageLogoText = await homePage.getPageLogo();
        expect.soft(pageLogoText, 'The Page Logo is not matching').toBe('GREENKART');
        const prodItemCount = await homePage.getProdCount();
        expect(prodItemCount).toBe(prodCount);
        const prodCards = await homePage.getProdCards();

        let index = 0;

        for (const card of prodCards) {
            index++;
            const prodName = await homePage.getCardName(card);
            const prodPrice = await homePage.getCardPrice(card);
            const prodQuantity = await homePage.getCardQuantity(card);
            const btnText = await homePage.getActionBtnText(card);

            expect.soft(prodName, `Card #${index} has an empty product name`).not.toBe('');
            expect.soft(prodPrice, `Card #${index}'s price is not a number > 0 (got ${prodPrice})`).toBeGreaterThan(0);
            expect.soft(prodQuantity, `Card #${index}'s default quantity is not 1`).toBe(1);
            expect.soft(btnText, `Card #${index}'s action button text is not 'ADD TO CART'`).toBe('ADD TO CART');
        }
    })

    test('TC-02: Search filters the grid by partial, case-insensitive keyword', { tag: ['@functional', '@positive'] }, async ({ page }) => {

        //type partial keyword to test searchbox result
        await homePage.typeKeywordInSearchBox(groupKeywordText);
        await homePage.waitForCatalogueToLoad(groupMatchCount);

        let visibleProdCards = await homePage.getProdCards();

        const prodNames: string[] = [];
        for (let card of visibleProdCards) {
            const prodName = await homePage.getCardName(card);
            prodNames.push(prodName);
        }
        expect.soft(prodNames.sort(), 'The product names do not match').toEqual(expectedProducts.sort());
        //restore all the product cards
        await homePage.clearSearchBox();
        await homePage.waitForCatalogueToLoad(prodCount);
        visibleProdCards = await homePage.getProdCards();
        expect.soft(visibleProdCards.length, 'The product count does not match').toBe(prodCount);

        //type "TOMATO" to see search box results
        await homePage.typeKeywordInSearchBox(keywordText);
        await homePage.waitForCatalogueToLoad(singleMatchCount);
        visibleProdCards = await homePage.getProdCards();
        expect.soft(visibleProdCards.length, `The ${expectedProdText} card is not present`).toBe(singleMatchCount);
        const prodName = await homePage.getCardName(visibleProdCards[0]);
        expect.soft(prodName, `The $(expected ProdText} card's name does not match`).toBe(expectedProdText);
    })

    test('TC-03: Search with no match shows the empty-state message', { tag: ['@negative'] }, async ({ page }) => {

        await homePage.waitForCatalogueToLoad(prodCount);
        await homePage.typeKeywordInSearchBox(noMatchKeyword);
        await homePage.waitForCatalogueToLoad(noMatchCount);
        const noResultText = await homePage.getNoResultFoundTexts();
        expect.soft(noResultText, 'The No Result text content do not match as expected').toEqual(expectedNoResultText)
        //No Add to Cart Btn should be present
        const addToCartBtnList = await homePage.checkAddToCartBtn();
        expect(addToCartBtnList.length).toBe(0);
    })

    test('TC-04: Quantity stepper increments and clamps at a minimum of 1', { tag: ['@functional'] }, async ({ page }) => {
        await homePage.waitForCatalogueToLoad(prodCount);
        const productName = 'Brocolli - 1 Kg';
        const card = await homePage.getCard(productName);
        let quantity = await homePage.getCardQuantity(card);
        expect(quantity, 'Initial product quantity is not equal to 1').toBe(1); //original product quantity should be 1
        //click the add quantity button twice
        let i = 1;
        for (; i <= 2; i++) {
            await homePage.clickStepperUpBtn(card);
        }
        quantity = await homePage.getCardQuantity(card);
        expect.soft(quantity, `The product quantity for ${productName} should be equal to ${i}`).toBe(i);
        //after 3 clicks the quantity should not go below 1
        for (i = 1; i <= 3; i++) {
            await homePage.clickStepperDownBtn(card);
        }
        quantity = await homePage.getCardQuantity(card);
        expect(quantity, `The product quantity for ${productName} is less than 1`).not.toBeLessThan(1);
    })

    test('TC-05: Add a single product and verify the cart summary', { tag: ['@smoke', '@positive'] }, async ({ page }) => {
        await homePage.waitForCatalogueToLoad(prodCount); //page loading check
        await homePage.checkCartDetails(0, 0);
        const productName = 'Brocolli - 1 Kg';
        const card = await homePage.getCard(productName);
        let i = 1;
        for (; i <= 2; i++) {
            await homePage.clickStepperUpBtn(card);
        }
        await homePage.clickAddToCartBtn(card);
        const price = await homePage.getPrice(card);
        await homePage.checkCartDetails(1, price * i);
    })

    test('TC-06: Add multiple products and verify the aggregated total', { tag: ['@functional', '@positive'] }, async ({ page }) => {
        await homePage.waitForCatalogueToLoad(prodCount); //page loading check
        await homePage.checkCartDetails(0, 0);
        const productNames = ['Brocolli - 1 Kg', 'Cauliflower - 1 Kg', 'Cucumber - 1 Kg'];
        let totalPrice = 0;
        for (let product of productNames) {
            const card = await homePage.getCard(product);
            await homePage.clickAddToCartBtn(card);
            totalPrice = totalPrice + (await homePage.getPrice(card));
        }
        await homePage.checkCartDetails(productNames.length, totalPrice); //assertion of sum of total prices and product count
        await homePage.openCartList();
        expect(await homePage.getCartItemNames(), 'The cart does not contain the expected items').toEqual(productNames); //assertion of product names in the cart list
        const quantities = await homePage.getProdQuanties();
        for (let quantity of quantities) {
            expect(quantity).toBe("1 No."); //assertion for quantity check in the cart
        }
        await expect(homePage.getProceedToCheckoutBtn(), 'Proceed to Checkout button is not present in the UI').toBeVisible(); //assertion for Proceed to Checkout Btn visibility
    })

    test('TC-07: Remove a product from cart preview', { tag: ['@functional', '@positive'] }, async ({ page }) => {
        await homePage.waitForCatalogueToLoad(prodCount); //page loading check
        await homePage.checkCartDetails(0, 0);
        const productNames = ['Brocolli - 1 Kg', 'Cauliflower - 1 Kg', 'Cucumber - 1 Kg'];
        let totalPrice = 0;
        for (let product of productNames) {
            const card = await homePage.getCard(product);
            await homePage.clickAddToCartBtn(card);
            totalPrice = totalPrice + (await homePage.getPrice(card));
        }

        await homePage.checkCartDetails(productNames.length, totalPrice);
        await homePage.openCartList();
        await homePage.removeCartItem('Brocolli - 1 Kg');
        expect(await homePage.getCartItemNames()).not.toContain('Brocolli 1 Kg');
        totalPrice = totalPrice - (await homePage.getPrice(await homePage.getCard('Brocolli - 1 Kg')));
        await homePage.checkCartDetails(productNames.length - 1, totalPrice);
    })
    
    test('TC-08: Apply a valid promo code at checkout', async ({ page }) => {
        await homePage.waitForCatalogueToLoad(prodCount); //page loading check
        await homePage.checkCartDetails(0, 0);
        const productNames = ['Cauliflower - 1 Kg', 'Cucumber - 1 Kg'];
        let totalPrice = 0;
        for (let product of productNames) {
            const card = await homePage.getCard(product);
            await homePage.clickAddToCartBtn(card);
            totalPrice = totalPrice + (await homePage.getPrice(card));
        }
        await homePage.openCartList();
        await homePage.getProceedToCheckoutBtn().click(); //click on Proceed to Checkout btn

        let totalAmt = await cartPage.getTotalAmount();
        let discRate = await cartPage.getDiscountRate();

        expect(await cartPage.getNumberOfItems()).toBe(productNames.length); //assertion of product's count
        expect(totalAmt).toBe(totalPrice); //assertion of item total
        expect(discRate).toBe(0); //discount rate before promo code = 0

        await cartPage.applyPromoCode(promoCode); //applying promo code
        await cartPage.submitCode(); //click apply btn

        expect(await cartPage.getCodeAppliedText(), 'Code applied text is not present').toBe('Code applied ..!');
        
        const expectedTotal = await cartPage.getExpectedDiscountedPrice(totalAmt);
        totalAmt = await cartPage.getActualDiscountedPrice();
        discRate = await cartPage.getDiscountRate();
        

        expect(discRate, `Discount rate ${discRate} is not as expected`).toBe(10);
        expect(totalAmt, `Expected total amount is ${expectedTotal} but it is ${totalAmt}`).toBe(expectedTotal);
        expect(cartPage.getPlaceOrderBtn(), 'Place Order button is not available in the UI').toBeVisible();
    })
})