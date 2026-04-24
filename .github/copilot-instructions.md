# YoSuite Auto AI Instructions

- Focus on the Playwright automation flow in `tests/` and `pages/`. The main test runner is configured in `playwright.config.js` with `testDir: './tests'` and a single `chromium` project.
- Local development does not rely on `npm run` scripts because `package.json` has no scripts. Use:
  - `npm ci`
  - `npx playwright install --with-deps`
  - `npx playwright test`
- GitHub Actions are configured in `.github/workflows/playwright.yml` and run the same commands on `ubuntu-latest`.

## Code structure

- `tests/test.spec.js` is the active test example. It uses CommonJS and the `{ page }` Playwright fixture.
- `pages/signInPage.js` and `pages/financePage.js` are page-object classes. They are imported with `require('../pages/...')` and expose methods like `login()` and `navigateToFinance()`.
- `tests/signup.spec.js` and `pages/signUpPage.js` are currently commented out and not part of the active test suite.
- `e2e/example.spec.js` uses ESM imports, but it is not in `playwright.config.js` testDir and therefore not part of the default CI path.

## Patterns to preserve

- Keep page behavior in page object classes, not in test files. Example: `SignInPage.login(email, password)` performs navigation, field entry, submit, and dashboard verification.
- Reuse existing locators and flows when available. `financePage.navigateToFinance()` uses direct page navigation to `https://roxsxsnor.yosuite.net/page/modules/loans/loan/list` and then verifies `Employee Loan Records`.
- Prefer `{ page }` fixture for simple end-to-end flows, matching the existing `test.spec.js` pattern.

## Environment and configuration

- Tests load `.env` using `require('dotenv').config()` in `tests/test.spec.js` and `tests/signup.spec.js`.
- Current `.env` contains `TEST_PASSWORD`, `TESTMAIL_API_KEY`, and `TESTMAIL_NAMESPACE`. Do not assume additional environment variables unless they are added to `.env` or the repository.
- `playwright.config.js` uses:
  - `headless: false`
  - `slowMo: 500`
  - `workers: 1`
  - `reporter: 'html'`
  - `screenshot: 'on'`
  - `video: 'retain-on-failure'`
  - `trace: 'on-first-retry'`

## What to avoid

- Do not add test files to `e2e/` unless the config is updated and CI is adjusted to include that folder.
- Do not rely on non-existent `npm` scripts in `package.json`.
- Do not edit or add hidden secrets directly in the repository; use environment variables and `.env` for local runs.

## Immediate priorities for edits

- Update active page objects in `pages/` rather than duplicating locator logic in tests.
- Keep the test suite aligned with the GitHub workflow commands.
- If adding a new test path, ensure it is discoverable by the existing `playwright.config.js` test directory.
