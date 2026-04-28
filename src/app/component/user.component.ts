import {Component} from "../abstractClasses";
import {step} from "../../misc/step";
import {expect} from "@playwright/test";
import {form} from "./common";

/**
 * Page component for the user-information step.
 *
 * This step captures the visitor's name and email before the form advances to
 * phone-number collection.
 */
export class User extends Component {

    private formContainer = (formNumber: number) => form(this.page,formNumber).locator('//div[@class="steps step-4"]');
    private nextButton = (formNumber: number) => this.formContainer(formNumber).locator('//button[@data-tracking="btn-step-4"]');
    private nameInput = (formNumber: number) => this.formContainer(formNumber).getByPlaceholder('Enter Your Name');
    private emailInput = (formNumber: number) => this.formContainer(formNumber).getByPlaceholder('Enter Your Email');

    /**
     * Fills the user name and email fields and advances to the next step.
     *
     * @param formNumber Numeric identifier of the target form block.
     * @param name User name to enter.
     * @param email Email address to enter.
     * @returns Resolves when both fields are filled and the step is submitted.
     */
    @step()
    async fillUserDataAndPressNextButton(formNumber: number, name: string, email: string) {
        await this.fillNameInput(formNumber, name);
        await this.fillEmailInput(formNumber, email);
        await this.nextButton(formNumber).click();
    }

    /**
     * Clicks the next button on the user-information step.
     *
     * @param formNumber Numeric identifier of the target form block.
     * @returns Resolves when the button has been clicked.
     */
    @step()
    async pressNextButton(formNumber: number) {
        await this.nextButton(formNumber).click();
    }

    /**
     * Asserts that the user-information step is visible in at least one form.
     *
     * @returns Resolves when the component is ready for interaction.
     */
    @step()
    async expectLoaded() {
        await expect(this.formContainer(1).or(this.formContainer(2))).toBeVisible();
    }

    /**
     * Fills the user name field.
     *
     * @param formNumber Numeric identifier of the target form block.
     * @param name User name to enter.
     * @returns Resolves when the field has been filled.
     */
    private async fillNameInput(formNumber: number, name: string) {
        await this.nameInput(formNumber).fill(name);
    }

    /**
     * Fills the email field in the user-information step.
     *
     * @param formNumber Numeric identifier of the target form block.
     * @param email Email address to enter.
     * @returns Resolves when the field has been filled.
     */
    private async fillEmailInput(formNumber: number, email: string) {
        await this.emailInput(formNumber).fill(email);
    }
}
