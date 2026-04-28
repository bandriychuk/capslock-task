import {Component} from "../abstractClasses";
import {step} from "../../misc/step";
import {expect} from "@playwright/test";
import {form, formWithButtonStep} from "./common";

/**
 * Page component for the property-selection step.
 */
export class PropertySelection extends Component {

    private formContainer = (formNumber: number) => form(this.page, formNumber);
    private form = (formNumber: number) => formWithButtonStep(this.page, formNumber,"3");
    private nextButton = (formNumber: number) => this.form(formNumber);

    /**
     * Selects the requested property type and advances to the next step.
     *
     * @param formNumber Numeric identifier of the target form block.
     * @param property Visible property label to choose.
     * @returns Resolves when the property is selected and the step is
     * submitted.
     */
    @step()
    async selectPropertyAndPressNextButton(formNumber: number, property: string) {
        await this.selectProperty(formNumber, property);
        await this.nextButton(formNumber).click();
    }

    /**
     * Clicks the next button on the property step.
     *
     * @param formNumber Numeric identifier of the target form block.
     * @returns Resolves when the next button has been clicked.
     */
    @step()
    async pressNextButton(formNumber: number) {
        await this.nextButton(formNumber).click();
    }

    /**
     * Selects a property option without advancing the flow.
     *
     * @param formNumber Numeric identifier of the target form block.
     * @param property Visible property label to choose.
     * @returns Resolves when the requested property option has been clicked.
     */
    @step()
    async selectProperty(formNumber: number, property: string) {
        await this.formContainer(formNumber).getByText(property).click();
    }


    /**
     * Asserts that the property-selection step is visible in at least one
     * supported form.
     *
     * @returns Resolves when the property step is ready for interaction.
     */
    @step()
    async expectLoaded() {
        await expect(this.form(1).or(this.form(2))).toBeVisible();
    }

    /**
     * Verifies that the property step is visible for a specific form instance.
     *
     * @param formNumber Numeric identifier of the target form block.
     * @param message Optional custom assertion message.
     * @returns Resolves when the requested property step is visible.
     */
    @step()
    async expectStepLoaded(formNumber: number, message = `Expected property step ${formNumber} to be visible`) {
        await expect(this.form(formNumber), message).toBeVisible();
    }

    /**
     * Verifies the validation message shown inside the property step.
     *
     * @param formNumber Numeric identifier of the target form block.
     * @param text Expected validation message text.
     * @returns Resolves when the validation message matches exactly.
     */
    @step()
    async checkThatErrorMessageHaveText(formNumber: number, text: string) {
        await expect(form(this.page, formNumber).locator('//div[@class=\'helpBlock helpBlock_lg text-center mt-0 mt-sm-2\']//div'))
            .toHaveText(text);
    }
}
