require('dotenv').config();

const { test } = require('@playwright/test');
const SignInPage = require('../pages/SignInPage');
const FinancePage = require('../pages/FinancePage');

// Generate dynamic loan data
function generateLoanData() {
  const random      = Math.floor(Math.random() * 900) + 100;
  const today       = new Date().toISOString().split('T')[0];
  const nextMonth   = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  const repaymentDate        = nextMonth.toISOString().split('T')[0];
  const loanAmount           = Math.floor(Math.random() * 4500) + 500;
  const interestRate         = 10;
  const totalPayable         = Math.round(loanAmount * 1.1);
  const numberOfInstallments = 5;
  const installmentPeriod    = 1;

  return {
    employee:             "Mehedi",
    code:                 `LN-${random}`,
    dateOfApproval:       today,
    dateOfDisbursement:   today,
    repaymentStarts:      repaymentDate,
    currency:             "United States Dollar",
    loanAmount:           String(loanAmount),
    interestRate:         String(interestRate),
    totalPayable:         String(totalPayable),
    numberOfInstallments: String(numberOfInstallments),
    amountPerInstallment: String(Math.round(totalPayable / numberOfInstallments)),
    installmentPeriod:    String(installmentPeriod),
    status:               "Open",
  };
}

// Updated data for edit
const updatedData = {
  loanAmount:           "2000",
  interestRate:         "12",
  numberOfInstallments: "6",
};

test("Finance - Add New then Edit Loan Record", async ({ page }) => {

  const signInPage  = new SignInPage(page);
  const financePage = new FinancePage(page);
  const loanData    = generateLoanData();

  console.log("Generated Loan Data:", loanData);

  // ── LOGIN ONCE ──────────────────────────────────────────────────────────
  await signInPage.login("kemonec347@lawior.com", "Mehedi@1234");

  // ── NAVIGATE TO FINANCE ─────────────────────────────────────────────────
  await financePage.navigateToFinance();

  // ── ADD NEW LOAN ────────────────────────────────────────────────────────

  // Step 1: Click Add New
  await financePage.clickAddNew();

  // Step 2: Fill form with dynamic data
  await financePage.fillLoanForm(loanData);

  // Step 3: Assert form fields before saving
  await financePage.assertFormFields(loanData);

  // Step 4: Save the new loan
  await financePage.saveLoanForm();

  // Step 5: Verify new record appears in table
  await financePage.verifySavedInTable(loanData);

  // Wait to see result
  await page.waitForTimeout(3000);

  // ── EDIT LOAN (no login needed — same session) ──────────────────────────

  // Case 1: Click 3 dot action menu on first row
  await financePage.clickFirstRowActionMenu();

  // Case 2: Click Edit
  await financePage.clickEdit();

  // Case 3: Update fields and assert
  await financePage.updateLoanFields(updatedData);
  await financePage.assertUpdatedFields(updatedData);

  // Case 4: Assert Employee Installments table is visible
  await financePage.assertInstallmentsTableVisible();

  // Case 5: Save and verify updated data back in table
  await financePage.saveAndVerifyInTable(updatedData);

  // Wait 5 seconds before browser closes
  await page.waitForTimeout(5000);

});