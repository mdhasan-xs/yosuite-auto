require('dotenv').config();

const { test } = require('@playwright/test');
const SignInPage = require('../pages/SignInPage');
const FinancePage = require('../pages/FinancePage');

test("Finance - Loan Records Page", async ({ page }) => {

  const signInPage = new SignInPage(page);
  const financePage = new FinancePage(page);

  const email = "kemonec347@lawior.com";
  const password = "Mehedi@1234";

  // Step 1: Login first
  await signInPage.login(email, password);

  // Step 2: Navigate to Finance
  await financePage.navigateToFinance();

  // Step 3: Wait 5 seconds before browser closes
  await page.waitForTimeout(5000);

});