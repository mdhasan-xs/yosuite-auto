const { expect } = require('@playwright/test');

class FinancePage {

  constructor(page) {
    this.page = page;
    this.employeeLoanRecords = page.locator("text=Employee Loan Records");
  }

  async goToFinance() {
    // Wait 3 seconds on Home
    await this.page.waitForTimeout(3000);
    // Navigate directly to Finance URL
    await this.page.goto("https://roxsxsnor.yosuite.net/page/modules/loans/loan/list");
    await this.page.waitForLoadState('domcontentloaded', { timeout: 30000 });
    await this.page.waitForTimeout(2000);
  }

  async verifyFinancePage() {
    await expect(this.employeeLoanRecords).toBeVisible({ timeout: 15000 });
  }

  async navigateToFinance() {
    await this.goToFinance();
    await this.verifyFinancePage();
  }
}

module.exports = FinancePage;