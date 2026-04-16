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

  // Verify successful login by checking Home dashboard
  async verifyHomeDashboard() {
    await expect(this.page.locator("text=Home")).toBeVisible();
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