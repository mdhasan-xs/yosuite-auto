const { expect } = require('@playwright/test');

class SignInPage {

  constructor(page) {
    this.page = page;

    // Locators for sign-in page elements
    this.emailInput = page.locator("#email");
    this.passwordInput = page.locator("#password");
    this.submitButton = page.locator("[type='submit']");
  }

  // Navigate to the sign-in page
  async navigateToSignIn() {
    await this.page.goto("https://roxsxsnor.yosuite.net/signin");
    await expect(this.page).toHaveTitle("Sign In");
  }

  // Fill email field
  async fillEmail(email) {
    await this.emailInput.fill(email);
  }

  // Fill password field
  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  // Click submit button
  async clickSubmit() {
    await this.submitButton.click();
  }

  // Verify successful login by waiting for URL change
  async verifyHomeDashboard() {
    // Wait for URL to change away from signin
    await this.page.waitForURL(/.*roxsxsnor\.yosuite\.net(?!.*signin).*/, { timeout: 30000 });
    // Wait for page to load
    await this.page.waitForLoadState('domcontentloaded', { timeout: 30000 });
    // Extra buffer for the dashboard to render
    await this.page.waitForTimeout(2000);
  }

  // Complete login flow
  async login(email, password) {
    await this.navigateToSignIn();
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickSubmit();
    await this.verifyHomeDashboard();
  }
}

module.exports = SignInPage;