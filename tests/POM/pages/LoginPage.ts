import { Locator, Page } from '@playwright/test';

export class LoginPage {
    //private variables
    private readonly page: Page;
    private readonly loginLink: Locator;

    constructor(page: Page){
        this.page=page;
        this.loginLink=this.page.locator('#login2');
    }

    async clickLoginLink(){
        await this.loginLink.click();
    }
}