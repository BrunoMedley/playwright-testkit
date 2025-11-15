import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import * as dotenv from 'dotenv';
import * as path from 'path';

const env = process.env.NODE_ENV || 'dev';
const envFile = path.resolve(__dirname, `../../env/.env.${env}`);
dotenv.config({ path: envFile });

type AuthenticatedUserFixtures = {
  authenticatedPage: Page;
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
};

/**
 * Custom fixture that provides an authenticated user session
 * Usage: test('my test', async ({ authenticatedPage, dashboardPage }) => { ... })
 */
export const test = base.extend<AuthenticatedUserFixtures>({
  authenticatedPage: async ({ page, baseURL }, use) => {
    const loginPage = new LoginPage(page);
    const username = process.env.USERNAME || 'testuser@example.com';
    const password = process.env.PASSWORD || 'TestPassword123!';

    // Navigate to login page and authenticate
    await loginPage.goto();
    await loginPage.login(username, password);

    // Wait for successful login (redirect to dashboard or home)
    await page.waitForURL(/.*dashboard|.*home/, { timeout: 10000 });

    // Use the authenticated page
    await use(page);

    // Cleanup: logout if needed
    // You can add logout logic here if required
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
});

export { expect } from '@playwright/test';

