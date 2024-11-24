import { test, expect } from 'playwright/test';
import { config } from '../config'
import exp from 'constants';

test.describe('Login Functionality', ()=>{
    
    //Step-1 : Open Browser and go to Sign-in Page
    test('Should navigate to the login page successfully', async({page})=> {
        await page.goto(config.loginPageUrl)
        await expect(page).toHaveURL(config.loginPageUrl)

        // Checks the 'Sign in to Whiteboard' visible or not
        const signInToWhiteboardTextLocator = await page.locator('.cl-headerTitle:has-text("Sign in to Whiteboard")');
        await expect(signInToWhiteboardTextLocator).toBeVisible();

        //Checks the Login Welcome Message
        const welcomeLoginMessage = await page.locator('text=Welcome back! Please sign in to continue')
        await expect(welcomeLoginMessage).toBeVisible();

        //Checks the Form
        const formLocator = await page.locator('form')
        await expect(formLocator).toBeVisible();

        //Checks the Label for Username 
        const usernameOrEmailLabel = await page.locator('label:has-text("Email address or username")')
        await expect(usernameOrEmailLabel).toHaveText('Email address or username')

        //Checks Use Phone anchor tag available'
        const usePhoneLabel = await page.locator('label:has-text("Use phone")')
        await expect(usePhoneLabel).toHaveText('Use phone')

        //Checks the input is available for the user to enter the username
        const inputField = await page.locator('input#identifier-field')
        await expect(inputField).toBeVisible()
    }) 

})
