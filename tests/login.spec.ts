import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Page Functionality', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({page}) => {
        await page.goto('/sign-in');
        loginPage = new LoginPage(page);
    })

    test('Should navigate to the sign in page and verify the title', async ({ page }) => {
        await expect(page).toHaveTitle('Whiteboard | Elevate your academic experience')
    })

    test('Verify page elements', async()=>{
        await loginPage.logo.waitFor({state: 'visible'})
        const isLogoVisible = await loginPage.logo.isVisible();
        await expect(isLogoVisible).toBe(true);

        await loginPage.signInTitle.waitFor({state:'visible'});
        const isSignInTitleVisible = await loginPage.signInTitle.isVisible();
        await expect(isSignInTitleVisible).toBeTruthy();

        await loginPage.signInSubtitle.waitFor({state:'visible'});
        const isSignInSubtitleVisible = await loginPage.signInSubtitle.isVisible();
        await expect(isSignInSubtitleVisible).toBeTruthy();

        await loginPage.emailOrUsernameLabel.waitFor({state:'visible'});
        const isEmailOrUsernameLabelVisible = await loginPage.emailOrUsernameLabel.isVisible();
        await expect(isEmailOrUsernameLabelVisible).toBeTruthy();

        await loginPage.usePhoneLabel.waitFor({state:'visible'});
        const isUsePhoneLabelVisible = await loginPage.emailOrUsernameLabel.isVisible();
        await expect(isUsePhoneLabelVisible).toBeTruthy();

        await loginPage.continueButton.waitFor({state:'visible'});
        const isContinueButtonVisible = await loginPage.continueButton.isVisible();
        await expect(isContinueButtonVisible).toBeTruthy();

        await loginPage.dontHaveAnAccountText.waitFor({state: 'visible'});
        const isDontHaveAccountTextVisible = await loginPage.dontHaveAnAccountText.isVisible();
        await expect(isDontHaveAccountTextVisible).toBeTruthy();

        await loginPage.signUpLink.waitFor({state: 'visible'});
        const isSignUpLinkVisible = await loginPage.signUpLink.isVisible();
        await expect(isSignUpLinkVisible).toBeTruthy();

        await loginPage.securedByText.waitFor({state: 'visible'});
        const isSecuredByTextVisible = await loginPage.securedByText.isVisible();
        await expect(isSecuredByTextVisible).toBeTruthy();

        await loginPage.clerkLink.waitFor({state: 'visible'});
        const isClerkLinkVisible = await loginPage.clerkLink.isVisible();
        await expect(isClerkLinkVisible).toBeTruthy();
    })

    test('Should login successful with right credentials', async({page})=>{
        await loginPage.emailOrUsernameInputField.fill('PrabhuSaravanan');
        await loginPage.continueButton.click();

        await loginPage.passwordInputField.fill('Testing@WhiteBoard');
        await loginPage.continueButton.click();

        await expect(page).toHaveURL('/feed')
    })

    test('Should throw error message for wrong username when wrong username entered', async({page})=>{
        await loginPage.emailOrUsernameInputField.fill('PrabhuSaravanan!');
        await loginPage.continueButton.click();

        const errorMessage = await loginPage.wrongUsernameErrorMessage.innerText();
        await expect(errorMessage).toBe("Identifier is invalid.");
    })

    test('Should throw error message when right username entered followed by wrong password', async({page})=>{
        await loginPage.emailOrUsernameInputField.fill('PrabhuSaravanan');
        await loginPage.continueButton.click();
        
        await loginPage.passwordInputField.fill('Testing@Whiteboard');
        await loginPage.continueButton.click();
        
        const isErrorMessageVisible = await loginPage.wrongPasswordErrorMessage
        await expect(isErrorMessageVisible).toBeVisible();
        await expect(isErrorMessageVisible).toBeTruthy();

        const errorMessage = await loginPage.wrongPasswordErrorMessage.innerText();
        await expect(errorMessage).toBe("Password is incorrect. Try again, or use another method.");
    })

    test('Use another method to signin', async({page})=>{
        await loginPage.emailOrUsernameInputField.fill('PrabhuSaravanan');
        await loginPage.continueButton.click();

        const isUseAnotherMethodLinkVisible = await loginPage.useAnotherMethodLink;
        await expect(isUseAnotherMethodLinkVisible).toBeVisible()
        await expect(isUseAnotherMethodLinkVisible).toBeTruthy();

        
    })




})