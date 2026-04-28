import {test} from "../src/fixtures";
import {InAreaType} from "../src/misc/types";

[
    {
        name: "In area required fields first input",
        formNumber: 1,
    },
    {
        name: "In area required fields second input",
        formNumber: 2,
    },
].forEach(({name, formNumber}) => {
    test(name, {tag: '@smoke'}, async ({app}) => {

        const happyPathData: InAreaType = {
            formNumber: formNumber,
            zipCode: '68901',
            interests: [],
            property: "Mobile Home",
            userName: "User One",
            email: "test-qa@gmail.com",
            phoneNumber: "12345678901"
        };

        await app.home.enterZipCode(formNumber, happyPathData.zipCode);
        await app.home.pressNextButton(formNumber);
        await app.home.interestsSelection.selectInterestAndPressNextButton(formNumber, happyPathData.interests);
        await app.home.propertySelection.pressNextButton(formNumber);
        await app.home.propertySelection.checkThatErrorMessageHaveText(formNumber, 'Choose one of the variants.');
        await app.home.propertySelection.selectPropertyAndPressNextButton(formNumber, happyPathData.property);
        await app.home.user.fillUserDataAndPressNextButton(formNumber, happyPathData.userName, happyPathData.email);
        await app.home.phone.pressNextButton(formNumber);
        await app.home.requiredFields.expectThatErrorMessageToHaveText(formNumber, 'Enter your phone number.');
        await app.home.phone.fillPhoneNumberAndPressNextButton(formNumber, '23231234');
        await app.home.requiredFields.expectThatErrorMessageToHaveText(formNumber, 'Wrong phone number.');

    });
});