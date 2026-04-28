import {test} from "../src/fixtures";
import {OutOfAreaType} from "../src/misc/types";

const zipCode = '11111';

[
    {
        name: "Out of area fill first from",
        formNumber: 1,
        zipCode: zipCode,
        email: "test-qa@gmail.com",
    },
    {
        name: "Out of area fill second from",
        formNumber: 2,
        zipCode: zipCode,
        email: "test-qa@gmail.com",
    },
].forEach(({name, formNumber, zipCode, email}) => {
    test(name, {tag: '@smoke'}, async ({app, flows}) => {
        const happyPathData: OutOfAreaType = {
            zipCode: zipCode,
            formNumber: formNumber,
            email: email,
        };
        await flows.outOfAreaHappyPath(happyPathData);
        await app.home.outOfArea.expectSorryPage();
        await app.home.outOfArea.expectSorryText();
    });
});