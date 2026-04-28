# CapsLock Task

End-to-end UI test automation project for the CapsLock lead form flow, built with Playwright and TypeScript.

The suite validates both form variants available on the home page, including:

- in-area happy paths
- out-of-area happy paths
- required field validation
- smoke coverage for key user journeys
- thank-you page assertions
- "Show more / Show less" behavior on the home page

## Tech Stack

- Playwright
- TypeScript
- pnpm
- GitHub Actions
- GitHub Pages for publishing the HTML test report

## Target Environment

- Base URL: `https://test-qa.capslock.global`
- Browser project: `capslock`
- Local execution mode: headed
- Trace collection: enabled
- Video recording: enabled

The project is configured in [playwright.config.ts](/Users/borys/development/capslock-task/playwright.config.ts:1).

## Project Structure

```text
.
├── .github/workflows/playwright.yml
├── package.json
├── pnpm-lock.yaml
├── playwright.config.ts
├── src
│   ├── app
│   │   ├── abstractClasses.ts
│   │   ├── component
│   │   ├── index.ts
│   │   └── page
│   ├── fixtures
│   │   └── index.ts
│   └── misc
│       ├── step.ts
│       └── types.ts
└── tests
    ├── home-page-check.spec.ts
    ├── in-area-first-form.spec.ts
    ├── in-area-required-fields-check.spec.ts
    ├── in-area-second-form.spec.ts
    ├── out-of-area-first-form.spec.ts
    └── out-of-area-required-fields-check.spec.ts
```

## Test Coverage

### Happy path scenarios

- First in-area form
- Second in-area form
- Out-of-area flow

### Validation scenarios

- ZIP code is required
- Invalid ZIP code is rejected
- Property selection is required
- Phone number is required
- Invalid phone number is rejected
- Email is required for out-of-area flow
- Invalid email is rejected

### UI behavior checks

- Expanding feedback cards with "Show more"

## Prerequisites

- Node.js 18 or newer
- pnpm `10.27.0`

The project already declares the package manager in [package.json](/Users/borys/development/capslock-task/package.json:1):

```json
"packageManager": "pnpm@10.27.0"
```

## Installation

Install dependencies:

```bash
pnpm install
```

Install Playwright browsers:

```bash
pnpm exec playwright install --with-deps
```

## Running Tests

Run the full suite:

```bash
pnpm test
```

Run only smoke tests:

```bash
pnpm exec playwright test --grep @smoke
```

Run a single spec file:

```bash
pnpm exec playwright test tests/in-area-second-form.spec.ts
```

Run tests by name:

```bash
pnpm exec playwright test -g "Show more/less check"
```

List discovered tests without running them:

```bash
pnpm exec playwright test --list
```

Open the latest HTML report:

```bash
pnpm exec playwright show-report
```

## Test Architecture

The suite follows a Page Object Model approach with a thin application layer and reusable business flows.

### 1. Fixtures

Defined in [src/fixtures/index.ts](/Users/borys/development/capslock-task/src/fixtures/index.ts:1).

Available fixtures:

- `app`: provides the `Application` object and opens the home page before each test
- `flows`: provides the `Flows` object with higher-level business actions

Example:

```ts
import { test } from "../src/fixtures";

test("example", async ({ app, flows }) => {
  // use page objects via app
  // use reusable business flow methods via flows
});
```

### 2. Application layer

Defined in [src/app/index.ts](/Users/borys/development/capslock-task/src/app/index.ts:1).

- `Application` exposes the main page objects
- `Flows` extends `Application` and groups reusable end-to-end user journeys

Current reusable flows:

- `inAreaHappyPath(path)`
- `outOfAreaHappyPath(path)`

### 3. Pages and components

The main entry page object is [src/app/page/home.page.ts](/Users/borys/development/capslock-task/src/app/page/home.page.ts:1).

It aggregates reusable UI components:

- `interestsSelection`
- `propertySelection`
- `user`
- `phone`
- `outOfArea`
- `requiredFields`

This keeps selectors and low-level UI interactions out of the spec files.

### 4. Step decorator

The helper in [src/misc/step.ts](/Users/borys/development/capslock-task/src/misc/step.ts:1) wraps page object methods in `test.step(...)`, which makes the Playwright report easier to read and debug.

### 5. Typed test data

Input models are defined in [src/misc/types.ts](/Users/borys/development/capslock-task/src/misc/types.ts:1):

- `InAreaType`
- `OutOfAreaType`

These types make the reusable flows easier to call safely.

## Current Test Files

### [tests/home-page-check.spec.ts](/Users/borys/development/capslock-task/tests/home-page-check.spec.ts:1)

Checks the "Show more / Show less" behavior for home page feedback cards.

### [tests/in-area-first-form.spec.ts](/Users/borys/development/capslock-task/tests/in-area-first-form.spec.ts:1)

Covers several in-area combinations for the first lead form.

### [tests/in-area-second-form.spec.ts](/Users/borys/development/capslock-task/tests/in-area-second-form.spec.ts:1)

Covers several in-area combinations for the second lead form and validates the thank-you page text.

### [tests/in-area-required-fields-check.spec.ts](/Users/borys/development/capslock-task/tests/in-area-required-fields-check.spec.ts:1)

Checks required field errors for in-area flow.

### [tests/out-of-area-first-form.spec.ts](/Users/borys/development/capslock-task/tests/out-of-area-first-form.spec.ts:1)

Covers the out-of-area flow for both form variants.

### [tests/out-of-area-required-fields-check.spec.ts](/Users/borys/development/capslock-task/tests/out-of-area-required-fields-check.spec.ts:1)

Checks validation errors for ZIP code and email in the out-of-area flow.

## Writing a New Test

Recommended approach:

1. Start from `src/fixtures` and reuse `test`.
2. Use `flows` when a scenario already exists as a reusable business journey.
3. Use `app` when the case needs direct UI assertions or a partial flow.
4. Keep raw selectors inside page objects or components, not in spec files.
5. Add `@smoke` only for the most valuable and stable scenarios.

Example:

```ts
import { test } from "../src/fixtures";
import { InAreaType } from "../src/misc/types";

test("In-area form can be submitted", async ({ app, flows }) => {
  const data: InAreaType = {
    zipCode: "68901",
    formNumber: 1,
    interests: ["Independence"],
    property: "Owned House / Condo",
    userName: "Test User",
    email: "test@example.com",
    phoneNumber: "12345678901",
  };

  await flows.inAreaHappyPath(data);
  await app.thankYou.expectLoaded();
});
```

## Reporting and Debugging

The suite is configured to keep diagnostics enabled:

- HTML reporter is generated for every run
- trace is enabled
- video is enabled
- local runs are headed by default

Useful commands:

```bash
pnpm exec playwright show-report
pnpm exec playwright test --trace on
pnpm exec playwright test --debug
```

Generated artifacts usually appear in:

- `playwright-report/`
- `test-results/`

## CI

The GitHub Actions workflow is defined in [playwright.yml](/Users/borys/development/capslock-task/.github/workflows/playwright.yml:1).

It does the following:

- checks out the repository
- sets up Node.js
- sets up pnpm
- installs Playwright browsers
- runs the full test suite
- uploads the HTML report as an artifact
- publishes the report to GitHub Pages for non-PR runs

Workflow triggers:

- push to `main`
- push to `master`
- pull requests targeting `main`
- pull requests targeting `master`
- manual dispatch

## Notes and Caveats

- The suite runs against a live remote environment, so availability and data changes on `https://test-qa.capslock.global` can affect stability.
- Local runs open a real browser window because `headless` is currently set to `false`.
- In CI, tests run with `workers: 1` and `retries: 2`.
- Some tests use static email values. If the product later enforces uniqueness, those test data values may need to become dynamic.

## Suggested Next Improvements

- Add a dedicated `test:smoke` script to `package.json`
- Add environment-based switching for `baseURL`
- Add linting and formatting scripts
- Add separate CI jobs for smoke and full regression
- Move repeated test data into shared factories or fixtures

## Issue 
- Phone number input does not accept number starter from 1 (It's critical for USA market)
- Property carousel selection: if the user doesn’t choose any property type, an error message is shown; even after selecting a property type, the error message still remains visible.