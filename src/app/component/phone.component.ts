import {Component} from "../abstractClasses";
import {step} from "../../misc/step";
import {expect} from "@playwright/test";
import {form, formWithButtonStep} from "./common";

/**
 * Page component for the phone-number step of the lead form.
 */
export class Phone extends Component {

    private nextButton = (formNumber: number) => formWithButtonStep(this.page, formNumber,"5");
    private phoneInput = (formNumber: number) => form(this.page, formNumber).getByPlaceholder('(XXX)XXX-XXXX');

    /**
     * Fills the phone field and submits the step.
     *
     * @param formNumber Numeric identifier of the target form block.
     * @param phone Phone number to submit.
     * @returns Resolves when the number has been entered and the next button
     * has been clicked.
     */
    @step()
    async fillPhoneNumberAndPressNextButton(formNumber: number, phone: string) {
        await this.phoneInput(formNumber).fill(phone);
        await this.nextButton(formNumber).click();
    }

    /**
     * Clicks the next button on the phone step without editing the field.
     *
     * @param formNumber Numeric identifier of the target form block.
     * @returns Resolves when the button has been clicked.
     */
    @step()
    async pressNextButton(formNumber: number) {
        await this.nextButton(formNumber).click();
    }

    /**
     * Asserts that at least one form container is visible before phone-step
     * interactions begin.
     *
     * @returns Resolves when the component can be interacted with.
     */
    @step()
    async expectLoaded() {
        await expect(form(this.page, 1).or(form(this.page, 2))).toBeVisible();
    }

}
