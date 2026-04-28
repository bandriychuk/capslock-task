import {test} from "../src/fixtures";
import {InAreaType} from "../src/misc/types";

const zipCode = '68901';

[
    {
        name: "Select all interests in the second form",
        formNumber: 2,
        zipCode: zipCode,
        interests: ["Independence", "Safety", "Therapy", "Other"],
        property: "Mobile Home",
        userName: "User Two",
        email: "test-qa@gmail.com",
        phoneNumber: "12345678901",
    },
    {
        name: "Select |'Independence', 'Safety', 'Therapy'| interests | Property type: Mobile Home | in the second forms",
        formNumber: 2,
        zipCode: zipCode,
        interests: ["Independence", "Safety", "Therapy"],
        property: "Mobile Home",
        userName: "User Two",
        email: "test-qa@gmail.com",
        phoneNumber: "12345678901",
    },
    {
        name: "Select |'Independence', 'Safety'| interests and Property type: Rental in the second forms",
        formNumber: 2,
        zipCode: zipCode,
        interests: ["Independence", "Safety"],
        property: "Rental Property",
        userName: "User Two",
        email: "test-qa@gmail.com",
        phoneNumber: "12345678901",
    },
    {
        name: "Select |'Independence'| interests and | Property type: Owned House / Condo | in the second forms",
        formNumber: 2,
        zipCode: zipCode,
        interests: ["Independence"],
        property: "Owned House / Condo",
        userName: "User Two",
        email: "test-qa@gmail.com",
        phoneNumber: "12345678901",
    },
].forEach(({formNumber, name, interests, property, userName, email, phoneNumber}) => {
    test(name, {tag: '@smoke'}, async ({app, flows}) => {
        const happyPathData: InAreaType = {
            zipCode: zipCode,
            formNumber: formNumber,
            interests: interests,
            property: property,
            userName: userName,
            email: email,
            phoneNumber: phoneNumber
        };
        await flows.inAreaHappyPath(happyPathData);
        await app.thankYou.expectLoaded();
        await app.thankYou.verifyTextOnThankYouPage();
    });
});