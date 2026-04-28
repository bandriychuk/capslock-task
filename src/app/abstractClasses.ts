import type { Page, Locator } from '@playwright/test';
import {step} from "../misc/step";

/**
 * Base holder for the shared Playwright {@link Page} instance.
 *
 * All page objects and reusable components inherit from this class so they can
 * interact with the same browser page without passing the page reference
 * through every method call.
 */
export abstract class PageHolder { 
    /**
     * Creates a new object bound to a Playwright page.
     *
     * @param page Playwright page used to perform browser interactions.
     */
    constructor(protected page: Page) { }
}

/**
 * Base abstraction for reusable UI components rendered inside a page.
 *
 * Components are expected to expose a readiness assertion through
 * {@link expectLoaded}. That contract allows tests and parent page objects to
 * synchronize before interacting with component-specific controls.
 */
export abstract class Component extends PageHolder {

    /**
     * Asserts that the component is visible and ready for interaction.
     *
     * @param message Optional custom assertion message shown on failure.
     * @returns Resolves when the component is confirmed to be ready.
     */
    abstract expectLoaded(message?: string): Promise<void>;

    /**
     * Checks whether the component is currently loaded without failing the test.
     *
     * This helper is useful when the caller needs a boolean answer instead of
     * an assertion error, for example when branching between multiple possible
     * UI states.
     *
     * @returns `true` when {@link expectLoaded} passes, otherwise `false`.
     */
    @step()
    async isLoaded(): Promise<boolean> {
        try { 
            await this.expectLoaded()
            return true
        } catch {
            return false
        }
    }
}

/**
 * Base abstraction for full application pages that can be opened directly.
 */
export abstract class AppPage extends Component {
    /**
     * Path to the page can be relative to the baseUrl defined in playwright.config.ts
     * or absolute (on your own risk)
     */
    public abstract pagePath: string;

    /**
     * Opens the page in the browser and waits until the page-specific readiness
     * assertion passes.
     *
     * @param path Optional override path. When omitted, {@link pagePath} is
     * used.
     * @returns Resolves when navigation completes and the page is ready.
     */
    @step()
    async open(path?: string) {
        await this.page.goto(path ?? this.pagePath);
        await this.expectLoaded();
    }
}
