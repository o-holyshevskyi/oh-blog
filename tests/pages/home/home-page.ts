import { Locator, Page } from '@playwright/test';
import Base from '../base';
import * as selectors from '../../selectors/selectors.json';
import AboutPage from '../about/about-page';
import AllPostsPage from '../all-posts/all-posts-page';
import '../../utils/extensions/index';
import PostPage from '../post/post-page';

class HomePage extends Base {
    readonly avatarImage: Locator = this.page.locator(selectors.homePage.avatarImageSelector);
    readonly headerText: Locator = this.page.locator(selectors.homePage.headerSelector);
    readonly aboutText: Locator = this.page.locator(selectors.homePage.aboutSelector);
    readonly recentPosts: Locator = this.page.locator(selectors.homePage.recentPostsSelector);
    readonly minRead: Locator = this.page.locator(selectors.homePage.minReadSelector);
    readonly time: Locator = this.page.locator(selectors.homePage.timeSelector);
    readonly morePostsButton: Locator = this.page.getByText(selectors.homePage.morePostsButtonSector);
    readonly theme: Locator = this.page.locator(selectors.homePage.themeSelector);
    readonly themeToggle: Locator = this.page.locator(selectors.homePage.themeToggleSelector);
    

    constructor(page: Page) {
        super(page);
    }

    getTheme(): Promise<string> {
        return this.theme.getAttribute('data-theme');
    }

    toggleTheme(): Promise<void> {
        return this.themeToggle.click();
    }

    async gotoAbout(): Promise<AboutPage> {
        await this.avatarImage.click();
        return new AboutPage(this.page);
    }

    async gotoAllPosts(): Promise<AllPostsPage> {
        await this.morePostsButton.click();
        return new AllPostsPage(this.page);
    }

    async gotoPost(i = 1): Promise<PostPage> {
        const post: Locator = this.page.locator(selectors.homePage.postSelector.format(i.toString()));
        await post.click();
        return new PostPage(this.page);
    }
}

export default HomePage;