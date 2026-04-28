import {expect} from "@playwright/test";
import {AppPage} from "../abstractClasses";
import {step} from "../../misc/step";

/**
 * Page object for the thank-you page displayed after a successful in-area
 * submission.
 */
export class ThankYouPage extends AppPage {
    /**
     * Relative path of the thank-you page.
     */
    public pagePath = '/thankyou';

    private thankYouText = this.page.locator('//div[@class="heroThankYou text-center"]//h1');

    private text: string = '//div[@class="heroThankYou text-center"]//p[@class="heroThankYou__txt"]';

    private textInfo = this.page.locator(`${this.text}[1]`);
    private disclaimer = this.page.locator(`${this.text}[2]`);

    /**
     * Asserts that the thank-you page headline is visible.
     *
     * @param message Optional custom assertion message.
     * @returns Resolves when the page is confirmed to be open.
     */
    @step()
    async expectLoaded(message = 'Expected Thank You page to be opened') {
        await expect(this.thankYouText, message).toBeVisible()
    }

    /**
     * Verifies the main copy rendered on the thank-you page.
     *
     * The method asserts the headline, descriptive text, and disclaimer to
     * catch unexpected content regressions after successful form submission.
     *
     * @returns Resolves when all expected thank-you texts are present.
     */
    async verifyTextOnThankYouPage() {
        await expect(this.thankYouText)
            .toContainText('Thank you!');

        await expect(this.textInfo)
            .toContainText('We will be calling within the next 10 minutes to confirm your estimate and ensure you get the best price!');

        await expect(this.disclaimer)
            .toContainText('This is not a sales call – we simply have to ask a couple of quick questions.');
    }
}
