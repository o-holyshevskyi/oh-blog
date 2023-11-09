import { createContext } from '../context/context';
import { e2eTest } from '../fixture/fixture';
import HomePage from '../pages/home/home-page';
import PostPage from '../pages/post/post-page';
import * as testData from '../test-data/test-data.json';

const testContext = createContext<{
    homePage: HomePage;
    postPage: PostPage;
}>();

e2eTest.describe('Comments tests', () => {
    e2eTest.beforeEach(async ({ homePage }) => {
        testContext.homePage = homePage;
        await testContext.homePage.goto();
    });

    e2eTest('Verify the Submit button is disabled when the textarea has no any text', async () => {
        testContext.postPage = await testContext.homePage.gotoPost();
        await testContext.postPage.verifySubmitButtonDisabled();
    });

    e2eTest('Verify the Submit button is NOT disabled when the textarea has any text', async () => {
        testContext.postPage = await testContext.homePage.gotoPost();
        await testContext.postPage.insertComment(testData.postPage.commentText);
        await testContext.postPage.verifySubmitButtonNotDisabled();
    });

    e2eTest('Verify the Submit button is disabled when the textarea has more than 250 characters', async () => {
        testContext.postPage = await testContext.homePage.gotoPost();
        await testContext.postPage.insertComment(testData.postPage['252commentText']);
        await testContext.postPage.verifySubmitButtonDisabled();
        await testContext.postPage.verifySubmitButtonDisabled();
    });
});