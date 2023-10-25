import { Page } from '@playwright/test';
import Base from '../base';

class PostPage extends Base {
    constructor(page: Page) {
        super(page);
    }
}

export default PostPage;
