import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
    //private variables
    private readonly page: Page;
    private readonly loginLink: Locator;
    private readonly usernametext: Locator;
    private readonly passwordtext: Locator;
    private readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginLink = this.page.locator('#login2');
        this.usernametext = this.page.locator('#loginusername');
        this.passwordtext = this.page.locator('#loginpassword');
        this.loginButton = this.page.locator("//button[contains(text(), 'Log in')]");
    }

    async navigateToLoginIn() {
        await this.loginLink.click();
    }
    // async verifyLoginLinkVisible(){
    //     await expect(this.loginLink).toBeVisible();
    // }
    // async verifyLoginButtonEnabled(){
    //     await expect(this.loginButton).toBeEnabled();
    // }
    async fillUsername(username: string) {
        await this.usernametext.click();
        await this.usernametext.fill(username);
    }
    async fillPassword(password: string) {
        await this.passwordtext.click();
        await this.passwordtext.fill(password);
    }
    async submitLoginIn() {
        await this.loginButton.click();
    }
    async logIn(username: string, password: string) {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.submitLoginIn();
    }
    async getUserNameValue(): Promise<string> {
        return this.usernametext.inputValue();
    }
    async getPasswordValue(): Promise<string> {
        return this.passwordtext.inputValue();
    }
}