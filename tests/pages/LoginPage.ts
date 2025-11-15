import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly forgotPasswordLink: Locator;
  readonly rememberMeCheckbox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"], input[type="email"], input[id*="username"], input[id*="email"]').first();
    this.passwordInput = page.locator('input[name="password"], input[type="password"], input[id*="password"]').first();
    this.loginButton = page.locator('button[type="submit"], button:has-text("Log in"), button:has-text("Sign in"), button:has-text("Login")').first();
    this.errorMessage = page.locator('.error, .alert-danger, [role="alert"], .message-error').first();
    this.forgotPasswordLink = page.locator('a:has-text("Forgot"), a:has-text("forgot password")').first();
    this.rememberMeCheckbox = page.locator('input[type="checkbox"][name*="remember"], input[type="checkbox"][id*="remember"]').first();
  }

  /**
   * Navigate to the login page
   */
  async goto(): Promise<void> {
    await this.page.goto('/login');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Fill in username
   */
  async fillUsername(username: string): Promise<void> {
    await this.usernameInput.waitFor({ state: 'visible' });
    await this.usernameInput.fill(username);
  }

  /**
   * Fill in password
   */
  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.waitFor({ state: 'visible' });
    await this.passwordInput.fill(password);
  }

  /**
   * Click the login button
   */
  async clickLogin(): Promise<void> {
    await this.loginButton.waitFor({ state: 'visible' });
    await this.loginButton.click();
  }

  /**
   * Perform complete login flow
   */
  async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  /**
   * Login with remember me option
   */
  async loginWithRememberMe(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    if (await this.rememberMeCheckbox.isVisible()) {
      await this.rememberMeCheckbox.check();
    }
    await this.clickLogin();
  }

  /**
   * Verify error message is displayed
   */
  async verifyErrorMessage(expectedError: string): Promise<void> {
    await this.errorMessage.waitFor({ state: 'visible' });
    await expect(this.errorMessage).toContainText(expectedError);
  }

  /**
   * Verify user is on login page
   */
  async verifyOnLoginPage(): Promise<void> {
    await expect(this.page).toHaveURL(/.*login/);
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  /**
   * Verify login form is visible
   */
  async verifyLoginFormVisible(): Promise<void> {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  /**
   * Clear login form
   */
  async clearForm(): Promise<void> {
    await this.usernameInput.clear();
    await this.passwordInput.clear();
  }
}

