import { Locator, Page } from '@playwright/test';
import * as selectors from '../../selectors/selectors.json';

class Header {
    readonly avatar: Locator = this.page.locator(selectors.header.avatarImageSelector);
    readonly name: Locator = this.page.locator(selectors.header.nameSelector);
    
    constructor (private readonly page: Page) {}

    gotoHomeWithAvatarImage(): Promise<void> {
        return this.avatar.click();
    }

    gotoHomeWithName(): Promise<void> {
        return this.name.click();
    }
}

export default Header;
