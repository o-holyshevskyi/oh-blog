import { createContext } from '../context/context';
import { e2eTest } from '../fixture/fixture';
import HomePage from '../pages/home/home-page';
import PostPage from '../pages/post/post-page';
import * as testData from '../test-data/test-data.json';

const testContext = createContext<{
    homePage: HomePage;
    postPage: PostPage;
}>();

e2eTest.describe('Reactions tests', () => {
    e2eTest.beforeEach(async ({ homePage }) => {
        testContext.homePage = homePage;
        await testContext.homePage.goto();
    });

    e2eTest('Verify the reactions are present on the post page', async () => {
        testContext.postPage = await testContext.homePage.gotoPost();
        await testContext.postPage.verifyReactionsCount(testData.postPage.reactionsCount);
    });
});