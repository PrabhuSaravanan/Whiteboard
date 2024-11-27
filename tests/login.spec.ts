
import { test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';


test.describe('Login Functionality', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateTo();
    });

    test('Login with valid username and password', async () => {
        const validUsername = 'PrabhuSaravanan';
        const validPassword = 'Testing@Whiteboard';

        await loginPage.loginWithRightUsernameAndPassword(validUsername, validPassword);

    });

    test('Login with valid mobile number and password', async () => {
        const validMobileNumber = 7373833328;
        const validPassword = 'Testing@Whiteboard';

        await loginPage.loginWithMobileNumberAndPassword(validMobileNumber, validPassword);
    });

});




