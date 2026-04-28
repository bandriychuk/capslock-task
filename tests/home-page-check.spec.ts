import {test} from "../src/fixtures";

test("Show more/less check", {tag: '@smoke'}, async ({app}) => {
    await app.home.showMore();
    await app.home.verifyThatShowMoreOpenAllFeedbacks();
});