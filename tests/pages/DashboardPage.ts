import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly welcomeMessage: Locator;
  readonly userMenu: Locator;
  readonly logoutButton: Locator;
  readonly dashboardTitle: Locator;
  readonly navigationMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.welcomeMessage = page.locator('h1, h2, .welcome, [class*="welcome"]').first();
    this.userMenu = page.locator('[data-testid="user-menu"], .user-menu, [class*="user-menu"], button:has-text("User")').first();
    this.logoutButton = page.locator('button:has-text("Logout"), button:has-text("Sign out"), a:has-text("Logout")').first();
    this.dashboardTitle = page.locator('h1:has-text("Dashboard"), h1:has-text("Home"), [data-testid="dashboard-title"]').first();
    this.navigationMenu = page.locator('nav, [role="navigation"], .navigation, [class*="nav"]').first();
  }

  /**
   * Navigate to dashboard
   */
  async goto(): Promise<void> {
    await this.page.goto('/dashboard');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verify user is on dashboard page
   */
  async verifyOnDashboard(): Promise<void> {
    await expect(this.page).toHaveURL(/.*dashboard|.*home/);
    // Wait for page to be fully loaded
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verify welcome message contains username
   */
  async verifyWelcomeMessage(username: string): Promise<void> {
    await this.welcomeMessage.waitFor({ state: 'visible' });
    const text = await this.welcomeMessage.textContent();
    expect(text).toContain(username);
  }

  /**
   * Logout from the application
   */
  async logout(): Promise<void> {
    if (await this.userMenu.isVisible()) {
      await this.userMenu.click();
      await this.logoutButton.waitFor({ state: 'visible' });
    }
    await this.logoutButton.click();
    // Wait for redirect to login page
    await this.page.waitForURL(/.*login/, { timeout: 5000 });
  }

  /**
   * Verify dashboard title is visible
   */
  async verifyDashboardTitle(): Promise<void> {
    await expect(this.dashboardTitle).toBeVisible();
  }

  /**
   * Verify navigation menu is visible
   */
  async verifyNavigationMenu(): Promise<void> {
    await expect(this.navigationMenu).toBeVisible();
  }

  /**
   * Get current page URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }
}

