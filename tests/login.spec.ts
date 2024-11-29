import { test } from "@playwright/test";
import { LoginPage } from "../pages/login-page";

test.describe('Login Functionality', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goToLoginPage();
    });

    test('Login with Valid Username & Password', async ({ page }) => {
      
        await loginPage.enterUsername('PrabhuSaravanan');
        await loginPage.clickContinue();

        await loginPage.enterPassword('Testing@Whiteboard');
        await loginPage.clickContinue();
    });

    test('Login with Valid Phone Number', async ({ page }) => {

        await loginPage.enterPhoneNumber('7373833328');
        await loginPage.clickContinue();

        await loginPage.enterPassword('Testing@Whiteboard');
        await loginPage.clickContinue();
    });

    test('Login with Invalid Username', async ({ page }) => {

        await loginPage.enterUsername('Prabhu');
        await loginPage.clickContinue();

        await loginPage.enterPassword('Testing@Whiteboard');
        await loginPage.clickContinue();
    });
});