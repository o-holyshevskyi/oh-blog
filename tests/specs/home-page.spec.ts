import { e2eTest, expect } from '../fixture/fixture';
import { createContext } from '../context/context';
import HomePage from '../pages/home/home-page';
import * as testData from '../test-data/test-data.json';

const testContext = createContext<{
    homePage: HomePage;
}>();

e2eTest.describe('Home page tests', () => {
    e2eTest.beforeEach(async ({ homePage }) => {
        testContext.homePage = homePage;
        await testContext.homePage.goto();
    });

    e2eTest('Verify the header text', async () => {
        await expect(testContext.homePage.headerText).toHaveText(testData.homePage.headerText);
    });

    e2eTest('Verify the about text', async () => {
        await expect(testContext.homePage.aboutText).toHaveText(testData.homePage.aboutText);
    });

    e2eTest('Verify recent posts count', async () => {
        await expect(testContext.homePage.recentPosts).toHaveCount(testData.homePage.recentPostsCount);
    });

    e2eTest('Verify more posts button is visible', async () => {
        await expect(testContext.homePage.morePostsButton).toBeVisible();
    });

    e2eTest('Verify min read count', async () => {
        await expect(testContext.homePage.minRead).toHaveCount(testData.homePage.minReadCount);
    });

    e2eTest('Verify time', async () => {
        await expect(testContext.homePage.time).toHaveCount(testData.homePage.timeCount);
    });

    e2eTest('Verify theme toggle', async () => {
        const currentTheme = await testContext.homePage.getTheme();
        await testContext.homePage.toggleTheme();
        expect(await testContext.homePage.getTheme()).not.toBe(currentTheme);
    });
});
