import { test as base } from '@playwright/test';
import { Application, Flows } from '../app';

/**
 * Shared Playwright test fixture used across the project.
 *
 * The fixture exposes a low-level application API through `app` and reusable
 * higher-level business journeys through `flows`.
 */
export const test = base.extend<{
    /**
     * Root application object with direct access to pages and components.
     */
    app: Application;

    /**
     * Collection of reusable business flows for common scenarios.
     */
    flows: Flows;
}>({
    /**
     * Creates the application object and opens the home page before each test.
     *
     * @param page Shared Playwright page for the current test.
     * @param use Playwright callback used to expose the fixture value.
     * @returns Resolves after the application object has been provided.
     */
    app: async ({ page }, use) => {
        const app = new Application(page);

        await app.home.open();
        await use(app);
    },

    /**
     * Creates the reusable flows object for the current test.
     *
     * @param page Shared Playwright page for the current test.
     * @param use Playwright callback used to expose the fixture value.
     * @returns Resolves after the flows object has been provided.
     */
    flows: async ({ page }, use) => {
        await use(new Flows(page));
    },
});

/**
 * Re-export of Playwright's `expect` bound to the project's custom fixture
 * module so tests can import both `test` and `expect` from one place.
 */
export { expect } from '@playwright/test';
