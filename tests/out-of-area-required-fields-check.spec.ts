import {test} from "../src/fixtures";

[
    {
        name: "Out of Area required fields first input",
        formNumber: 1,
        zipCode: '11111',
        wrongZipCode: '111111',
    },
    {
        name: "Out of Area required fields second input",
        formNumber: 2,
        zipCode: '11111',
        wrongZipCode: '111111',
    },
].forEach(({name, formNumber, zipCode, wrongZipCode}) => {
    test(name, {tag: '@smoke'}, async ({app}) => {

        await app.home.pressNextButton(formNumber);
        await app.home.requiredFields.expectThatErrorMessageToHaveText(formNumber, 'Enter your ZIP code.');
        await app.home.enterZipCode(formNumber, wrongZipCode);
        await app.home.pressNextButton(formNumber);
        await app.home.requiredFields.expectThatErrorMessageToHaveText(formNumber, 'Wrong ZIP code.');
        await app.home.enterZipCode(formNumber, zipCode);
        await app.home.pressNextButton(formNumber);

        await app.home.outOfArea.pressOnSubmitButton(formNumber);
        await app.home.requiredFields.expectThatErrorMessageToHaveText(formNumber, 'Enter your email address.');
        await app.home.outOfArea.fillEmailAndPressSubmitButton(formNumber, 'afasdfasdf@asdf')
        await app.home.requiredFields.expectThatErrorMessageToHaveText(formNumber, 'Wrong email.');
    });
});