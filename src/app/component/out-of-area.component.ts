import {Component} from "../abstractClasses";
import {step} from "../../misc/step";
import {expect} from "@playwright/test";
import {form} from "./common";

/**
 * Page component for the out-of-area fallback step.
 *
 * This component handles the state shown when a ZIP code falls outside the
 * supported area and the user can leave an email address for future contact.
 */
export class OutOfArea extends Component {

    private emailInput = (formNumber: number) => form(this.page, formNumber).locator('//input[@placeholder="Email Address"]');
    private submitButton = (formNumber: number) => form(this.page, formNumber).getByRole('button', {name: 'Submit'});
    private sorry = this.page.locator('//div[@class="steps step-sorry"]');
    private sorryText = this.page.locator('//div[@class="steps step-sorry"]//div[@class=\'stepTitle__hdr fadeIn\']');

    /**
     * Fills the out-of-area email field and submits the step.
     *
     * @param formNumber Numeric identifier of the target form block.
     * @param email Email address to submit for future contact.
     * @returns Resolves when the form has been submitted.
     */
    @step()
    async fillEmailAndPressSubmitButton(formNumber: number, email: string) {
        await this.emailInput(formNumber).fill(email);
        await this.pressOnSubmitButton(formNumber);
    }

    /**
     * Clicks the out-of-area submit button.
     *
     * @param formNumber Numeric identifier of the target form block.
     * @returns Resolves when the submit button has been clicked.
     */
    @step()
    async pressOnSubmitButton(formNumber: number) {
        await this.submitButton(formNumber).click();
    }

    /**
     * Verifies that the out-of-area confirmation blocks are shown for both
     * duplicated forms on the page.
     *
     * @returns Resolves when both "sorry" states are present and visible.
     */
    @step()
    async expectSorryPage() {
        await expect(this.sorry).toHaveCount(2);

        await expect(this.sorry.first()).toBeVisible();
        await expect(this.sorry.nth(1)).toBeVisible();
    }

    /**
     * Verifies the confirmation copy displayed in the out-of-area state.
     *
     * @returns Resolves when both out-of-area messages contain the expected
     * text.
     */
    @step()
    async expectSorryText() {
        await expect(this.sorryText).toHaveCount(2);
        for (let i = 0; i < 2; i++) {
            await expect(this.sorryText.nth(i))
                .toContainText('Thank you for your interest, we will contact you when our service becomes available in your area!');
        }
    }

    /**
     * Asserts that at least one form container is visible before interacting
     * with the out-of-area step.
     *
     * @returns Resolves when the page is ready for out-of-area assertions.
     */
    @step()
    async expectLoaded() {
        await expect(form(this.page, 1).or(form(this.page, 2))).toBeVisible();
    }
}
