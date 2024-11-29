import { Page } from "@playwright/test";
import { config } from "../config/config";

export class LoginPage {
    private page: Page;

    private usernameField = () => this.page.locator('#identifier-field');
    private passwordField = () => this.page.locator('#password-field');
    private phoneNumberField = () => this.page.locator('input#identifier-field');
    private continueButton = () => this.page.locator('[data-localization-key="formButtonPrimary"]');

    constructor(page: Page) {
        this.page = page;
    }

    async goToLoginPage() {
        await this.page.goto(config.loginPageUrl);
    }

    async enterUsername(username: string) {
        await this.usernameField().fill(username);
    }

    async enterPassword(password: string) {
        await this.passwordField().fill(password);
    }

    async enterPhoneNumber(phoneNumber: string) {
        await this.phoneNumberField().fill(phoneNumber);
    }

    async clickContinue() {
        await this.continueButton().click();
    }
}