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

test.describe('Login Validation with  Right Credentials', () => {

    test('Should log in successfully', async ({ page }) => {
        await page.goto(config.loginPageUrl);
        await expect(page).toHaveTitle('Whiteboard | Elevate your academic experience');

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
    });

});
