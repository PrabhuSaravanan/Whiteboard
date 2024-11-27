import { Page } from "playwright";
import { expect } from "playwright/test";
import { config } from "../config/config";

export class LoginPage {

    constructor(private page:Page){}

    public logo = this.page.locator("img[@alt='Whiteboard']");
    public signInMessage = this.page.locator('[data-localization-key="signIn.start.title"]');
    public welcomeMessage = this.page.locator('[data-localization-key="signIn.start.subtitle"]');

    public userNameLabel = this.page.locator('label[for="identifier-field"]');
    public alternativeUsePhoneLabel = this.page.locator('[data-localization-key="signIn.start.actionLink__use_phone"]');

    public usernameInputField = this.page.locator('#identifier-field');
    public passwordInputField = this.page.locator('#password-field');
    public phoneNumberInputField = this.page.locator('input#identifier-field');
    public continueButton = this.page.locator('[data-localization-key="formButtonPrimary"]');

    public dontHaveAccountText = this.page.locator('[data-localization-key="signIn.start.actionText"]');
    public signUpLink = this.page.locator('[data-localization-key="signIn.start.actionLink"]');

    public securedByText = this.page.locator('p.cl-internal-wf8x4b');
    public clerkText = this.page.locator('a.cl-internal-1fcj7sw');

    async navigateTo(){
        await this.page.goto(config.loginPageUrl);
    }

    async verifyPageElements(){
        await expect(this.logo).toBeVisible();
        await expect(this.signInMessage).toBeVisible();
        await expect(this.welcomeMessage).toBeVisible();

        await expect(this.userNameLabel).toBeVisible();
        await expect(this.alternativeUsePhoneLabel).toBeVisible();

        await expect(this.dontHaveAccountText).toBeVisible();
        await expect(this.securedByText).toBeVisible();
        await expect(this.clerkText).toBeVisible();
    }

    async loginWithRightUsernameAndPassword(username:string, password){
        await this.usernameInputField.fill('username');
        await this.continueButton.click();

        await this.passwordInputField.fill('password');
        await this.continueButton.click();
    }

    async loginWithMobileNumberAndPassword(mobileNumber:number, password:string){
        await this.phoneNumberInputField.fill('mobileNumber')
        await this.continueButton.click();

        await this.passwordInputField.fill('password');
        await this.continueButton.click();
    }

}