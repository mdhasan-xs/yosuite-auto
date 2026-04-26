require('dotenv').config();

const { test } = require('@playwright/test');
const SignInPage = require('../pages/SignInPage');
const FinancePage = require('../pages/FinancePage');

// dynamic test data
function generateLoanData() {

  // Generate a random 3 digit number for unique code — stays under 8 chars
  const random = Math.floor(Math.random() * 900) + 100;

  // Get today's date in YYYY-MM-DD format for approval and disbursement
  const today = new Date().toISOString().split('T')[0];

  // Get next month's date for repayment start
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  const repaymentDate = nextMonth.toISOString().split('T')[0];

  // Random loan amount between 500 and 5000
  const loanAmount = Math.floor(Math.random() * 4500) + 500;

  // Fixed interest rate
  const interestRate = 10;

  // Total payable = loan + 10% interest
  const totalPayable = Math.round(loanAmount * 1.1);

  // Fixed installments
  const numberOfInstallments = 5;

  // Installment period in months
  const installmentPeriod = 1;

  return {
    employee:             "Mehedi",
    code:                 `LN-${random}`,         // e.g. LN-342 — always under 8 chars
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

test("Finance - Add New Loan Record", async ({ page }) => {

  const signInPage = new SignInPage(page);
  const financePage = new FinancePage(page);

  // Generate fresh data for this test run
  const loanData = generateLoanData();

  // Log generated data so you can see it in the terminal
  console.log("Generated Loan Data:", loanData);

  // Login
  await signInPage.login("kemonec347@lawior.com", "Mehedi@1234");

  // Navigate to Finance
  await financePage.navigateToFinance();

  // Click Add New
  await financePage.clickAddNew();

  // Fill form with dynamic data
  await financePage.fillLoanForm(loanData);

  // Assert fields
  await financePage.assertFormFields(loanData);

  // Save
  await financePage.saveLoanForm();

  //Verify in table
  await financePage.verifySavedInTable(loanData);

  //Wait 5 seconds
  await page.waitForTimeout(5000);

});