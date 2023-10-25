import { createContext } from '../context/context';
import HomePage from '../pages/home/home-page';
import { e2eTest, expect } from '../fixture/fixture';
import * as testData from '../test-data/test-data.json';
import AboutPage from '../pages/about/about-page';
import AllPostsPage from '../pages/all-posts/all-posts-page';
import PostPage from '../pages/post/post-page';

const testContext = createContext<{
    homePage: HomePage;
    aboutPage: AboutPage;
    allPostsPage: AllPostsPage;
    postPage: PostPage;
}>();

e2eTest.describe('Navigation tests', () => {
    e2eTest.beforeEach(async ({ homePage }) => {
        testContext.homePage = homePage;
        await testContext.homePage.goto();
    });

    e2eTest('Start page has title', async () => {
        await testContext.homePage.verifyPageTitle(testData.homePage.pageTitle);
    });

    e2eTest('Open about page by clicking the avatar image', async () => {
        testContext.aboutPage = await testContext.homePage.gotoAbout();
        await testContext.aboutPage.verifyPageTitle(testData.aboutPage.pageTitle);
        await testContext.aboutPage.verifyPageUrl(new RegExp(testData.aboutPage.pageUrlRegExp));
    });

    e2eTest('Open about page by clicking the About in the footer', async () => {
        await testContext.homePage.footer.gotoAbout();
        await testContext.homePage.verifyPageTitle(testData.aboutPage.pageTitle);
        await testContext.homePage.verifyPageUrl(new RegExp(testData.aboutPage.pageUrlRegExp));
    });

    e2eTest('Open about page by clicking the Home', async () => {
        testContext.aboutPage = await testContext.homePage.gotoAbout();
        await testContext.aboutPage.footer.gotoHome();
        await testContext.homePage.verifyPageTitle(testData.homePage.pageTitle);
    });

    e2eTest('Open home page by clicking the avatar image', async () => {
        testContext.aboutPage = await testContext.homePage.gotoAbout();
        await testContext.aboutPage.header.gotoHomeWithAvatarImage();
        await testContext.homePage.verifyPageTitle(testData.homePage.pageTitle);
    });

    e2eTest('Open home page by clicking the name', async () => {
        testContext.aboutPage = await testContext.homePage.gotoAbout();
        await testContext.aboutPage.header.gotoHomeWithName();
        await testContext.homePage.verifyPageTitle(testData.homePage.pageTitle);
    });

    e2eTest('Open home page by clicking the back to home', async () => {
        testContext.aboutPage = await testContext.homePage.gotoAbout();
        await testContext.aboutPage.footer.backToHome();
        await testContext.homePage.verifyPageTitle(testData.homePage.pageTitle);
    });

    e2eTest('Open all posts page by clicking the more posts button', async () => {
        testContext.allPostsPage = await testContext.homePage.gotoAllPosts();
        await testContext.allPostsPage.verifyPageTitle(testData.allPostsPage.pageTitle);
        await testContext.allPostsPage.verifyPageUrl(new RegExp(testData.allPostsPage.pageUrlRegExp));
    });

    e2eTest('Open any post on the home page', async () => {
        testContext.postPage = await testContext.homePage.gotoPost();
        await testContext.postPage.verifyPageTitleNotEqualTo(testData.homePage.pageTitle);
    });

    e2eTest('Open any post on the more posts page', async () => {
        testContext.allPostsPage = await testContext.homePage.gotoAllPosts();
        testContext.postPage = await testContext.allPostsPage.gotoPost();
        await testContext.postPage.verifyPageTitleNotEqualTo(testData.allPostsPage.pageTitle);
        await testContext.postPage.verifyPageUrlNotEqualTo(testData.allPostsPage.pageUrlRegExp);
    });

    e2eTest('Verify the linkedIn url', async () => {
        await expect(testContext.homePage.footer.linkedIn).toHaveCount(testData.footer.uniqueItemsCount);
        expect(await testContext.homePage.footer.linkedIn.getAttribute('href')).toBe(testData.footer.linkedInUrl);
        expect(await testContext.homePage.footer.linkedIn.getAttribute('target')).toBe(testData.footer.target);
    });

    e2eTest('Verify the gitHub url', async () => {
        await expect(testContext.homePage.footer.gitHub).toHaveCount(testData.footer.uniqueItemsCount);
        expect(await testContext.homePage.footer.gitHub.getAttribute('href')).toBe(testData.footer.gitHubUrl);
        expect(await testContext.homePage.footer.gitHub.getAttribute('target')).toBe(testData.footer.target);
    });

    e2eTest('Verify the devTo url', async () => {
        await expect(testContext.homePage.footer.devTo).toHaveCount(testData.footer.uniqueItemsCount);
        expect(await testContext.homePage.footer.devTo.getAttribute('href')).toBe(testData.footer.devToUrl);
        expect(await testContext.homePage.footer.devTo.getAttribute('target')).toBe(testData.footer.target);
    });
});
