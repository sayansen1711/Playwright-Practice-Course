import { Locator, Page } from "@playwright/test";

export class SignUpPage {

    private readonly page: Page;
    private readonly signuplink: Locator;
    private readonly usernametext: Locator;
    private readonly passwordtext: Locator;
    private readonly signupbutton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signuplink = this.page.locator('#signin2');
        this.usernametext = this.page.locator('#sign-username');
        this.passwordtext = this.page.locator('#sign-password');
        this.signupbutton = this.page.locator("//button[text()='Sign up']");
    }

    //user-actions
    async navigateToSignUp() {
        await this.signuplink.click();
    }
    async fillUsername(username: string) {
        await this.usernametext.clear();
        await this.usernametext.fill(username);
    }
    async fillPassword(password: string) {
        await this.passwordtext.clear();
        await this.passwordtext.fill(password);
    }
    async submitSignUp() {
        await this.signupbutton.click();
    }
    async signUp(username: string, password: string): Promise<string> {
        await this.navigateToSignUp();
        await this.fillUsername(username);
        await this.fillPassword(password);

        // await Promise.all([this.page.waitForEvent('popup'), this.clickSignUpButton()]);
        const dialogPromise = this.page.waitForEvent('dialog');
        await this.submitSignUp();
        const dialog = await dialogPromise;
        const message = dialog.message();
        await dialog.accept();
        return message;
    }
}