import {Component} from "../abstractClasses";
import {step} from "../../misc/step";
import {expect} from "@playwright/test";
import {form} from "./common";

/**
 * Helper component for shared validation-message assertions.
 */
export class RequiredFields extends Component {

    /**
     * Asserts that at least one form container is visible before validation
     * checks are performed.
     *
     * @returns Resolves when the component can be used safely.
     */
    @step()
    async expectLoaded() {
        await expect(form(this.page,1).or(form(this.page,2))).toBeVisible();
    }

    /**
     * Verifies the generic validation message shown in the selected form.
     *
     * @param formNumber Numeric identifier of the target form block.
     * @param message Expected validation message text.
     * @returns Resolves when the validation message matches exactly.
     */
    @step()
    async expectThatErrorMessageToHaveText(formNumber: number, message: string) {
        await expect(form(this.page, formNumber).locator("//div[@class='helpBlock']//div"))
            .toHaveText(message);
    }
}
