import { Page } from "@playwright/test";

/**
 * Returns the root locator for one of the duplicated lead form containers on
 * the home page.
 *
 * @param page Playwright page containing the form UI.
 * @param formNumber Numeric identifier of the target form block.
 * @returns Locator scoped to the selected form container.
 */
export const form = (page: Page, formNumber: number) =>
    page.locator(`#form-container-${formNumber}`);

/**
 * Returns a step button locator inside a specific form container.
 *
 * The application tracks navigation buttons by the current step number, so
 * this helper centralizes the selector construction and keeps component
 * classes consistent.
 *
 * @param page Playwright page containing the form UI.
 * @param formNumber Numeric identifier of the target form block.
 * @param step Step number used in the `data-tracking` attribute.
 * @returns Locator for the requested step button.
 */
export const formWithButtonStep = (page: Page, formNumber: number, step: string) =>
    form(page, formNumber).locator(`//button[@data-tracking="btn-step-${step}"]`);
