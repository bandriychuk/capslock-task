import {Component} from "../abstractClasses";
import {step} from "../../misc/step";
import {expect} from "@playwright/test";
import {form, formWithButtonStep} from "./common";

/**
 * Page component for the interests selection step.
 *
 * It encapsulates choosing one or more interest options and moving the form to
 * the next step.
 */
export class InterestsSelection extends Component {

    private nextButton = (formNumber: number) => formWithButtonStep(this.page, formNumber,"2");

    /**
     * Selects the provided interests and advances to the next form step.
     *
     * @param formNumber Numeric identifier of the target form block.
     * @param interests List of interest labels to click before submission.
     * @returns Resolves when the interests are selected and the step is
     * submitted.
     */
    @step()
    async selectInterestAndPressNextButton(formNumber: number, interests: string[]) {
        await this.selectInterest(formNumber, interests);
        await this.nextButton(formNumber).click();
    }

    /**
     * Clicks the step-next button without changing the current selections.
     *
     * @param formNumber Numeric identifier of the target form block.
     * @returns Resolves when the next button has been clicked.
     */
    @step()
    async pressNextButton(formNumber: number) {
        await this.nextButton(formNumber).click();
    }

    /**
     * Selects one or more interest options in the current step.
     *
     * When the `interests` array is empty, the method exits early so tests can
     * intentionally verify required-field validation without creating special
     * branching logic in the spec.
     *
     * @param formNumber Numeric identifier of the target form block.
     * @param interests List of visible interest labels to select.
     * @returns Resolves when all requested options have been clicked.
     */
    @step()
    async selectInterest(formNumber: number, interests: string[]) {
        if (interests.length === 0) return;
        for (const interest of interests) {
            await form(this.page, formNumber).getByText(interest).click();
        }
    }

    /**
     * Asserts that the interests step is visible in either supported form.
     *
     * @returns Resolves when at least one interests-step next button is
     * visible.
     */
    @step()
    async expectLoaded() {
        await expect(this.nextButton(1).or(this.nextButton(2))).toBeVisible();
    }
}
