const { expect } = require('@playwright/test');

class FinancePage {

  constructor(page) {
    this.page = page;
    this.employeeLoanRecords = page.locator("text=Employee Loan Records");
  }

  async goToFinance() {
    // Wait 3 seconds on Home
    await this.page.waitForTimeout(3000);
    // Navigate directly to Finance URL instead of clicking collapsed sidebar icon
    await this.page.goto("https://roxsxsnor.yosuite.net/page/modules/loans/loan/list");
    await this.page.waitForLoadState('networkidle');
  }

  async verifyFinancePage() {
    await expect(this.page).toHaveURL(/.*loans\/loan\/list/, { timeout: 15000 });
    await expect(this.employeeLoanRecords).toBeVisible({ timeout: 15000 });
  }

  async navigateToFinance() {
    await this.goToFinance();
    await this.verifyFinancePage();
  }
}

module.exports = FinancePage;