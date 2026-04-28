import {AppPage} from "../abstractClasses";
import {step} from "../../misc/step";
import {expect} from "@playwright/test";
import {InterestsSelection} from "../component/interests.component";
import {PropertySelection} from "../component/property.component";
import {User} from "../component/user.component";
import {Phone} from "../component/phone.component";
import {OutOfArea} from "../component/out-of-area.component";
import {RequiredFields} from "../component/required-fields.component";

/**
 * Page object for the application home page.
 *
 * This page contains ZIP code entry forms that drive the first step of the
 * user flow. Each form is addressed by its numeric container identifier,
 * which allows the same actions to be reused for both the first and second
 * form blocks without duplicating selectors in tests.
 *
 */
export class Home extends AppPage {
    /**
     * Relative path of the home page.
     */
    public pagePath = '/';

    /**
     * Component representing the interests step.
     */
    public interestsSelection = new InterestsSelection(this.page);

    /**
     * Component representing the property-selection step.
     */
    public propertySelection = new PropertySelection(this.page);

    /**
     * Component representing the user-information step.
     */
    public user = new User(this.page);

    /**
     * Component representing the phone-number step.
     */
    public phone = new Phone(this.page);

    /**
     * Component representing the out-of-area fallback step.
     */
    public outOfArea = new OutOfArea(this.page);

    /**
     * Helper component for shared validation assertions.
     */
    public requiredFields = new RequiredFields(this.page);

    private form = (formNumber: number) => this.page.locator(`#form-container-${formNumber}`);
    private zipCodeInput = (formNumber: number) => this.form(formNumber).getByRole('textbox', {name: 'Enter ZIP Code'});
    private nextButton = (formNumber: number) => this.form(formNumber).locator('//button[@data-tracking="btn-step-1"]');
    private showMoreButton = this.page.getByText('Show more');
    private showLessButton = this.page.getByText('Show less');

    /**
     * Fills the ZIP code field in the selected form container.
     *
     * Use this method when the test already knows which ZIP code form should
     * be targeted. The method does not submit the form; it only updates the
     * text field value.
     *
     * @param formNumber Numeric identifier of the form container on the home
     * page. In the current UI this is typically `1` or `2`.
     * @param zipCode ZIP code value that should be entered into the form.
     * @returns Resolves when the input has been filled.
     */
    @step()
    async enterZipCode(formNumber: number, zipCode: string) {
        await this.zipCodeInput(formNumber).fill(zipCode);
    }

    /**
     * Clicks the Next button for the selected form container.
     *
     * This method is usually called after {@link enterZipCode} when the test
     * wants to continue the user journey with the currently selected form.
     *
     * @param formNumber Numeric identifier of the form whose submit action
     * should be triggered.
     * @returns Resolves when the click action has been performed.
     */
    @step()
    async pressNextButton(formNumber: number) {
        await this.nextButton(formNumber).click();
    }

    /**
     * Verifies that the home page is visible and ready for interaction.
     *
     * Readiness is determined by the visibility of the ZIP code input in the
     * first form. This gives tests a stable synchronization point before they
     * start typing, clicking, or asserting follow-up behavior.
     *
     * @param message Optional custom assertion message used when the page does
     * not become visible.
     * @returns Resolves when the page is confirmed to be ready.
     */
    @step()
    async expectLoaded(message = 'Expected Home page to be opened') {
        await expect(this.zipCodeInput(1), message).toBeVisible();
    }

    /**
     * Selects one or more interests through the dedicated interests component.
     *
     * This convenience wrapper keeps simple tests on the home page API while
     * still delegating the real selection logic to the step component.
     *
     * @param formNumber Numeric identifier of the target form block.
     * @param interests Visible labels to select.
     * @returns Resolves when all requested interests have been clicked.
     */
    @step()
    async selectInterest(formNumber: number, interests: string[]) {
        await this.interestsSelection.selectInterest(formNumber, interests);
    }

    /**
     * Expands the feedback section by clicking the "Show more" control.
     *
     * @returns Resolves when the toggle has been clicked.
     */
    @step()
    async showMore() {
        await this.showMoreButton.click();
    }

    /**
     * Verifies that all feedback cards become visible after expansion.
     *
     * @returns Resolves when the expected number of feedback entries is shown.
     */
    async verifyThatShowMoreOpenAllFeedbacks(){
        await expect(this.page.getByText('Review by')).toHaveCount(6);
    }
}
