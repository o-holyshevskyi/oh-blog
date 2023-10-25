import { test as base } from '@playwright/test';
import HomePage from '../pages/home/home-page';

interface Fixture {
    homePage: HomePage;
}

export const e2eTest = base.extend<Fixture>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
        await page.close();
    }
});

export { expect } from '@playwright/test';
