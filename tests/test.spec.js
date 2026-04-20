require('dotenv').config();

const { test } = require('@playwright/test');
const SignInPage = require('../pages/SignInPage');
const FinancePage = require('../pages/FinancePage');

// Use {page} fixture instead of {browser} to prevent context from closing early
test("User Sign In and Navigate to Finance", async ({ page }) => {

  const signInPage = new SignInPage(page);
  const financePage = new FinancePage(page);

  // Credentials
  const email = "kemonec347@lawior.com";
  const password = "Mehedi@1234";

  //  Login and verify Home dashboard
  await signInPage.login(email, password);

  //  Wait 3 seconds then navigate to Finance
  await financePage.navigateToFinance();
  await page.waitForTimeout(5000);

});