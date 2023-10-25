import { Locator, Page } from '@playwright/test';
import Base from '../base';
import PostPage from '../post/post-page';
import * as selectors from '../../selectors/selectors.json';
import '../../utils/extensions/index';

class AllPostsPage extends Base {
    constructor(page: Page) {
        super(page);
    }

    async gotoPost(i = 1): Promise<PostPage> {
        const post: Locator = this.page.locator(selectors.homePage.postSelector.format(i.toString()));
        await post.click();
        return new PostPage(this.page);
    }
}

export default AllPostsPage;
