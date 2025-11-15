import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { loadTestData, getValidUser, getInvalidUser } from '../utils/testData';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.goto();
  });

  test('should successfully login with valid credentials', async ({ page }) => {
    const user = getValidUser(0);
    
    await loginPage.login(user.username, user.password);
    
    // Wait for successful login redirect
    await page.waitForURL(/.*dashboard|.*home/, { timeout: 10000 });
    await dashboardPage.verifyOnDashboard();
  });

  test('should display error message with invalid credentials', async () => {
    const invalidUser = getInvalidUser(0);
    
    await loginPage.login(invalidUser.username, invalidUser.password);
    
    // Verify error message is displayed
    if (invalidUser.expectedError) {
      await loginPage.verifyErrorMessage(invalidUser.expectedError);
    } else {
      await expect(loginPage.errorMessage).toBeVisible({ timeout: 5000 });
    }
  });

  test('should not login with empty username', async () => {
    const invalidUser = getInvalidUser(1); // Empty username
    
    await loginPage.fillPassword(invalidUser.password);
    await loginPage.clickLogin();
    
    // Verify error message or validation
    await expect(loginPage.errorMessage).toBeVisible({ timeout: 5000 });
  });

  test('should not login with empty password', async () => {
    const invalidUser = getInvalidUser(2); // Empty password
    
    await loginPage.fillUsername(invalidUser.username);
    await loginPage.clickLogin();
    
    // Verify error message or validation
    await expect(loginPage.errorMessage).toBeVisible({ timeout: 5000 });
  });

  test('should login with remember me checkbox', async ({ page }) => {
    const user = getValidUser(0);
    
    await loginPage.loginWithRememberMe(user.username, user.password);
    
    // Wait for successful login
    await page.waitForURL(/.*dashboard|.*home/, { timeout: 10000 });
    await dashboardPage.verifyOnDashboard();
  });

  test('should persist login session after page reload', async ({ page, context }) => {
    const user = getValidUser(0);
    
    await loginPage.login(user.username, user.password);
    await page.waitForURL(/.*dashboard|.*home/, { timeout: 10000 });
    
    // Reload page
    await page.reload();
    await dashboardPage.verifyOnDashboard();
  });

  test.describe('Data-driven login tests', () => {
    const testData = loadTestData();

    for (const user of testData.validUsers) {
      test(`should login successfully with ${user.username}`, async ({ page }) => {
        await loginPage.login(user.username, user.password);
        await page.waitForURL(/.*dashboard|.*home/, { timeout: 10000 });
        await dashboardPage.verifyOnDashboard();
      });
    }

    for (const user of testData.invalidUsers) {
      test(`should fail login with invalid user: ${user.username || 'empty'}`, async () => {
        await loginPage.login(user.username, user.password);
        await expect(loginPage.errorMessage).toBeVisible({ timeout: 5000 });
      });
    }
  });

  test('should navigate to forgot password page', async ({ page }) => {
    await loginPage.forgotPasswordLink.click();
    // Verify navigation to forgot password page
    await expect(page).toHaveURL(/.*forgot|.*reset/);
  });
});

