import { Locator, Page } from "playwright";

export class LoginPage {
    readonly page: Page;

    readonly logo: Locator;
    readonly signInTitle: Locator;
    readonly signInSubtitle: Locator;
    readonly dontHaveAnAccountText: Locator;
    readonly securedByText: Locator;
    readonly enterYourPasswordText: Locator;
    readonly enterThePasswordGuideMessage: Locator;

    readonly wrongUsernameErrorMessage: Locator;
    readonly wrongPasswordErrorMessage: Locator;
    

    readonly signUpLink: Locator;
    readonly clerkLink: Locator;
    readonly forgotPasswordLink: Locator;
    readonly useAnotherMethodLink: Locator;

    readonly usePhoneLabel: Locator;
    readonly emailOrUsernameLabel : Locator;
    readonly passwordLabel: Locator;
    
    readonly emailOrUsernameInputField : Locator;
    readonly usePhoneInputField: Locator;
    readonly passwordInputField: Locator;
    readonly continueButton: Locator;


    constructor(page: Page) {
        this.page = page;

        this.logo = page.locator('img[alt="Whiteboard"].cl-logoImage');
        this.signInTitle = page.locator('h1[data-localization-key="signIn.start.title"]')
        this.signInSubtitle = page.locator('h1[data-localization-key="signIn.start.subtitle"]')
        this.dontHaveAnAccountText = page.locator('[data-localization-key="signIn.start.actionText"]')
        this.securedByText = page.locator('p.cl-internal-wf8x4b')
        this.useAnotherMethodLink = page.locator('a[data-localization-key="signIn.password.actionLink"]')
        this.signUpLink = page.locator('a[data-localization-key="signIn.start.actionLink"]');
        this.clerkLink = page.locator('a[aria-label="Clerk logo"]');

        this.emailOrUsernameLabel = page.locator('label[data-localization-key="formFieldLabel__emailAddress_username"]')
        this.usePhoneLabel = page.locator('a[data-localization-key="signIn.start.actionLink__use_phone"]')
        this.passwordLabel = page.locator('label[data-localization-key="formFieldLabel__password"]')

        this.emailOrUsernameInputField = page.locator('#identifier-field')
        this.passwordInputField = page.locator('#password-field')

        this.continueButton = page.locator('button[data-localization-key="formButtonPrimary"]')

        this.wrongUsernameErrorMessage = page.locator('#error-identifier')
        this.wrongPasswordErrorMessage = page.locator('#error-password')
     }
}