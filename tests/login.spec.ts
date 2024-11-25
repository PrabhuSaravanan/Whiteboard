import { test, expect } from 'playwright/test';
import { config } from '../config'

test.describe('Verify Login Page', () => {

    test('Should navigate to the login page successfully', async ({ page }) => {
        await page.goto(config.loginPageUrl);
        await expect(page).toHaveTitle('Whiteboard | Elevate your academic experience');

        const logo = page.locator('a img[alt="Whiteboard"]');
        await expect(logo).toBeVisible();
        await logo.click();
        await expect(page).toHaveURL(config.loginPageUrl);

        const signInMessage = page.locator('[data-localization-key="signIn.start.title"]');
        await expect(signInMessage).toBeVisible();
        await expect(signInMessage).toHaveText('Sign in to Whiteboard');

        const welcomeMessage = page.locator('[data-localization-key="signIn.start.subtitle"]');
        await expect(welcomeMessage).toBeVisible();
        await expect(welcomeMessage).toHaveText('Welcome back! Please sign in to continue');

        const userNameLabel = page.locator('label[for="identifier-field"]');
        await expect(userNameLabel).toBeVisible();
        await expect(userNameLabel).toHaveText('Email address or username');

        const alternativeUsePhoneLabel = page.locator('[data-localization-key="signIn.start.actionLink__use_phone"]');
        await expect(alternativeUsePhoneLabel).toBeVisible();
        await expect(alternativeUsePhoneLabel).toHaveText('Use phone');

        const usernameInputField = page.locator('#identifier-field');
        await expect(usernameInputField).toBeVisible();

        const continueButton = page.locator('[data-localization-key="formButtonPrimary"]');
        await expect(continueButton).toBeVisible();
        await expect(continueButton).toHaveText('Continue')

        const dontHaveAccountText = page.locator('[data-localization-key="signIn.start.actionText"]');
        await expect(dontHaveAccountText).toBeVisible();
        await expect(dontHaveAccountText).toContainText("have an account?");

        const signUpLink = page.locator('[data-localization-key="signIn.start.actionLink"]');
        await expect(signUpLink).toHaveAttribute('href');
        await expect(signUpLink).toBeVisible();
        await expect(signUpLink).toHaveText('Sign up');


        await signUpLink.click();
        await expect(page).toHaveURL(config.signUpUrl);

        const securedByText = page.locator('p.cl-internal-wf8x4b');
        await expect(securedByText).toBeVisible();
        await expect(securedByText).toHaveText('Secured by');

        const clerkText = page.locator('a.cl-internal-1fcj7sw');
        await expect(clerkText).toHaveAttribute(
            'href',
            'https://www.clerk.com?utm_source=clerk&utm_medium=components'
        );
        await expect(clerkText).toHaveAttribute('target', '_blank');

        const developmentModeText = page.locator('p.cl-internal-16vtwdp');
        await expect(developmentModeText).toBeVisible()
        await expect(developmentModeText).toHaveText('Development mode')
    })
})

test.describe('Login Validation with  Right Credentials & Logout Functionality', () => {

    test('Should log in successfully', async ({ page }) => {
        await page.goto(config.loginPageUrl);
        await expect(page).toHaveTitle('Whiteboard | Elevate your academic experience');

        const logo = page.locator('a img[alt="Whiteboard"]');
        await expect(logo).toBeVisible();
        await logo.click();
        await expect(page).toHaveURL(config.loginPageUrl);

        const signInMessage = page.locator('[data-localization-key="signIn.start.title"]');
        await expect(signInMessage).toBeVisible();
        await expect(signInMessage).toHaveText('Sign in to Whiteboard');

        const welcomeMessage = page.locator('[data-localization-key="signIn.start.subtitle"]');
        await expect(welcomeMessage).toBeVisible();
        await expect(welcomeMessage).toHaveText('Welcome back! Please sign in to continue');

        const usernameInputField = page.locator('#identifier-field');
        await expect(usernameInputField).toBeVisible();
        await usernameInputField.fill('PrabhuSaravanan');

        const continueButton = page.locator('[data-localization-key="formButtonPrimary"]');
        await expect(continueButton).toBeVisible();
        await continueButton.click();

        const passwordInputField = page.locator('#password-field');
        await expect(passwordInputField).toBeVisible();
        await passwordInputField.fill('Testing@WhiteBoard');

        const signInButton = page.locator('[data-localization-key="formButtonPrimary"]');
        await expect(signInButton).toBeVisible();
        await signInButton.click();

        await expect(page).toHaveURL(config.mainFeedUrl);

        const logoutButton = page.locator('div.flex.cursor-pointer.items-center.gap-1.text-gray-700');
        await expect(logoutButton).toBeVisible();
        await expect(logoutButton).toHaveText('Logout')

        await logoutButton.click();
    });

});

test.describe('Login Validation with Wrong Username', () => {

    test('Should display "couldn\'t find your account" for invalid username', async ({ page }) => {

        await page.goto(config.loginPageUrl);
        await expect(page).toHaveTitle('Whiteboard | Elevate your academic experience');

        const logo = page.locator('a img[alt="Whiteboard"]');
        await expect(logo).toBeVisible();
        await logo.click();
        await expect(page).toHaveURL(config.loginPageUrl);

        const signInMessage = page.locator('[data-localization-key="signIn.start.title"]');
        await expect(signInMessage).toBeVisible();
        await expect(signInMessage).toHaveText('Sign in to Whiteboard');

        const welcomeMessage = page.locator('[data-localization-key="signIn.start.subtitle"]');
        await expect(welcomeMessage).toBeVisible();
        await expect(welcomeMessage).toHaveText('Welcome back! Please sign in to continue');

        const usernameInputField = page.locator('#identifier-field');
        await expect(usernameInputField).toBeVisible();
        await usernameInputField.fill('hellboyprabhu');

        const continueButton = page.locator('[data-localization-key="formButtonPrimary"]');
        await expect(continueButton).toBeVisible();
        await continueButton.click();

        const errorMessage = page.locator('p#error-identifier');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('Couldn\'t find your account.');

        const errorMessageColor = await errorMessage.evaluate((errorMessageColor) => {
            return window.getComputedStyle(errorMessageColor).color;
        });
        expect(errorMessageColor).toBe('rgb(239, 68, 68)');
    });
})

test.describe('Login Validation, If the Username contains any invalid characters', () => {

    test('Should display "Identifier is invalid" for invalid username', async ({ page }) => {

        await page.goto(config.loginPageUrl);
        await expect(page).toHaveTitle('Whiteboard | Elevate your academic experience');

        const logo = page.locator('a img[alt="Whiteboard"]');
        await expect(logo).toBeVisible();
        await logo.click();
        await expect(page).toHaveURL(config.loginPageUrl);

        const signInMessage = page.locator('[data-localization-key="signIn.start.title"]');
        await expect(signInMessage).toBeVisible();
        await expect(signInMessage).toHaveText('Sign in to Whiteboard');

        const welcomeMessage = page.locator('[data-localization-key="signIn.start.subtitle"]');
        await expect(welcomeMessage).toBeVisible();
        await expect(welcomeMessage).toHaveText('Welcome back! Please sign in to continue');

        const usernameInputField = page.locator('#identifier-field');
        await expect(usernameInputField).toBeVisible();
        await usernameInputField.fill('hellboyprabhu$');

        const continueButton = page.locator('[data-localization-key="formButtonPrimary"]');
        await expect(continueButton).toBeVisible();
        await continueButton.click();

        const errorMessage = page.locator('p#error-identifier');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('Identifier is invalid.');
        const errorMessageColor = await errorMessage.evaluate((errorMessageColor) => {
            return window.getComputedStyle(errorMessageColor).color;
        });
        expect(errorMessageColor).toBe('rgb(239, 68, 68)');
    });
})

test.describe('Login Validation using Right Mobile Number & Password', () => {

    test('Login using right mobile number and password', async ({ page }) => {

        await page.goto(config.loginPageUrl);
        await expect(page).toHaveTitle('Whiteboard | Elevate your academic experience');

        const logo = page.locator('a img[alt="Whiteboard"]');
        await expect(logo).toBeVisible();
        await logo.click();
        await expect(page).toHaveURL(config.loginPageUrl);

        const signInMessage = page.locator('[data-localization-key="signIn.start.title"]');
        await expect(signInMessage).toBeVisible();
        await expect(signInMessage).toHaveText('Sign in to Whiteboard');

        const welcomeMessage = page.locator('[data-localization-key="signIn.start.subtitle"]');
        await expect(welcomeMessage).toBeVisible();
        await expect(welcomeMessage).toHaveText('Welcome back! Please sign in to continue');

        const usePhoneLabel = page.locator('[data-localization-key="signIn.start.actionLink__use_phone"]');
        await expect(usePhoneLabel).toHaveText('Use phone');
        await usePhoneLabel.click();

        const phoneNumberAsPrimaryLabel = page.locator('[data-localization-key="formFieldLabel__phoneNumber"]');
        await expect(phoneNumberAsPrimaryLabel).toHaveText('Phone number');
        await expect(phoneNumberAsPrimaryLabel).toBeVisible();

        const useEmailOrUsernameAsSecondaryLabel = page.locator('[data-localization-key="signIn.start.actionLink__use_email_username"]');
        await expect(useEmailOrUsernameAsSecondaryLabel).toHaveText('Use email or username');
        await expect(useEmailOrUsernameAsSecondaryLabel).toBeVisible();

        const phoneNumberInputField = page.locator('input#identifier-field');
        await expect(phoneNumberInputField).toBeVisible();
        await phoneNumberInputField.fill('7373833328');

        const continueButton = page.locator('[data-localization-key="formButtonPrimary"]');
        await expect(continueButton).toBeVisible();
        await continueButton.click();

        const enterYourPasswordPrimaryTitle = page.locator('[data-localization-key="signIn.password.title"]');
        await expect(enterYourPasswordPrimaryTitle).toHaveText('Enter your password');
        await expect(enterYourPasswordPrimaryTitle).toBeVisible();

        const enterYourPasswordSecondaryTitle = page.locator('[data-localization-key="signIn.password.subtitle"]');
        await expect(enterYourPasswordSecondaryTitle).toHaveText('Enter the password associated with your account');
        await expect(enterYourPasswordSecondaryTitle).toBeVisible();

        const passwordLabel = page.locator('[data-localization-key="formFieldLabel__password"]');
        await expect(passwordLabel).toHaveText('Password');
        await expect(passwordLabel).toBeVisible();

        const forgotPasswordText = page.locator('a[data-localization-key="formFieldAction__forgotPassword"]');
        await expect(forgotPasswordText).toHaveText('Forgot password?');
        await expect(forgotPasswordText).toBeVisible();

        const useAnotherMethodText = page.locator('a[data-localization-key="signIn.password.actionLink"]');
        await expect(useAnotherMethodText).toHaveText('Use another method');
        await expect(useAnotherMethodText).toBeVisible()

        const passwordInputField = page.locator('input#password-field');
        await expect(passwordInputField).toBeVisible();
        await passwordInputField.fill('Testing@WhiteBoard');

        const continueButtonForLogin = page.locator('[data-localization-key="formButtonPrimary"]');
        await expect(continueButtonForLogin).toBeVisible();
        await continueButtonForLogin.click();

        await expect(page).toHaveURL(config.mainFeedUrl);

        const logoutButton = page.locator('div.flex.cursor-pointer.items-center.gap-1.text-gray-700');
        await expect(logoutButton).toBeVisible();
        await expect(logoutButton).toHaveText('Logout')
        await logoutButton.click();
    })
})


