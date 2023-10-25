import { Locator, Page } from '@playwright/test';
import * as selectors from '../../selectors/selectors.json';

class Footer {
    readonly about: Locator = this.page.getByText(selectors.footer.aboutSelector);
    readonly home: Locator = this.page.getByText(selectors.footer.homeSelector);
    readonly linkedIn: Locator = this.page.locator(selectors.footer.linkedInSelector);
    readonly gitHub: Locator = this.page.locator(selectors.footer.gitHubSelector);
    readonly devTo: Locator = this.page.locator(selectors.footer.devToSelector);
    readonly backToHomeLocator: Locator = this.page.getByText(selectors.footer.backToHomeSelector);
    
    constructor (private readonly page: Page) {}

    gotoAbout(): Promise<void> {
        return this.about.click();
    }

    gotoHome(): Promise<void> {
        return this.home.click();
    }

    backToHome(): Promise<void> {
        return this.backToHomeLocator.click();
    }
}

export default Footer;
