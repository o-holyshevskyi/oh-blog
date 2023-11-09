import { Locator, Page, expect } from '@playwright/test';
import Base from '../base';
import * as selectors from '../../selectors/selectors.json';

class PostPage extends Base {
    private readonly reactions: Locator = this.page.locator(selectors.postPage.reactionSelector);
    private readonly addCommentTextarea: Locator = this.page.getByPlaceholder(selectors.postPage.addCommentTextareaPlaceholderSelector);
    private readonly submitButton: Locator = this.page.getByText(selectors.postPage.submitButtonSelector);

    constructor(page: Page) {
        super(page);
    }

    async verifyReactionsCount(reactionsCount: number) {
        await expect(this.reactions).toHaveCount(reactionsCount);
    }

    async verifySubmitButtonDisabled() {
        await expect(this.submitButton).toHaveCSS('pointer-events', 'none');
    }

    async verifySubmitButtonNotDisabled() {
        await expect(this.submitButton).not.toHaveCSS('pointer-events', 'none');
    }

    async insertComment(commentText: string) {
        await this.addCommentTextarea.fill(commentText);
    }

    async verifyTextareaInError() {
        await expect(this.submitButton).toHaveCSS('border', '2px solid red');
    }
}

export default PostPage;
