import {PageHolder} from "./abstractClasses";
import {Home} from "./page/home.page";
import {ThankYouPage} from "./page/thank-you.page";
import {InAreaType, OutOfAreaType} from "../misc/types";

/**
 * Root application object that exposes the main page objects used by tests.
 *
 * Keeping the pages grouped in one place makes fixtures and test bodies
 * shorter, while still allowing direct access to low-level page actions when a
 * scenario needs custom assertions.
 */
export class Application extends PageHolder {
    /**
     * Home page object representing the multi-step lead form page.
     */
    public home = new Home(this.page);

    /**
     * Thank-you page object displayed after successful in-area submission.
     */
    public thankYou = new ThankYouPage(this.page);
}

/**
 * Collection of reusable user journeys built on top of the page objects.
 *
 * Flow methods intentionally group multiple UI actions into one higher-level
 * business step so spec files can focus on scenario intent instead of
 * low-level browser mechanics.
 */
export class Flows extends Application {

    /**
     * Completes the in-area lead flow until the final submission step.
     *
     * The method enters the ZIP code, navigates through the interest,
     * property, user, and phone steps, and submits the form using the data
     * provided in the payload.
     *
     * @param path Structured test data describing the in-area scenario to run.
     * @returns Resolves when the in-area flow has been submitted.
     */
    async inAreaHappyPath(path: InAreaType) {
        const formNumber: number = path.formNumber;
        await this.home.enterZipCode(formNumber, path.zipCode);
        await this.home.pressNextButton(formNumber);
        await this.home.interestsSelection.selectInterestAndPressNextButton(formNumber, path.interests);
        await this.home.propertySelection.selectPropertyAndPressNextButton(formNumber, path.property);
        await this.home.user.fillUserDataAndPressNextButton(formNumber, path.userName, path.email);
        await this.home.phone.fillPhoneNumberAndPressNextButton(formNumber, path.phoneNumber);
    }

    /**
     * Completes the out-of-area lead flow until the fallback submission.
     *
     * This flow enters the ZIP code, advances to the out-of-area state, fills
     * the email field, and submits the request for future contact.
     *
     * @param path Structured test data describing the out-of-area scenario.
     * @returns Resolves when the out-of-area form has been submitted.
     */
    async outOfAreaHappyPath(path: OutOfAreaType) {
        const formNumber: number = path.formNumber;
        await this.home.enterZipCode(formNumber, path.zipCode)
        await this.home.pressNextButton(formNumber);
        await this.home.outOfArea.fillEmailAndPressSubmitButton(formNumber, path.email);

    }

}
