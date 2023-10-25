import { Page, expect } from '@playwright/test';
import Footer from './footer/footer';
import Header from './header/header';

class Base {
    readonly header: Header = new Header(this.page);
    readonly footer: Footer = new Footer(this.page);

    constructor (protected readonly page: Page) {}

    async goto(url?: string): Promise<void> {
        if (url) {
            await this.page.goto(url);
        } else {
            await this.page.goto('/');
        }
    }

    verifyPageTitle(title: string | RegExp): Promise<void> {
        return expect(this.page).toHaveTitle(title);
    }

    verifyPageTitleNotEqualTo(title: string | RegExp): Promise<void> {
        return expect(this.page).not.toHaveTitle(title);
    }

    verifyPageUrl(title: string | RegExp): Promise<void> {
        return expect(this.page).toHaveURL(title);
    }

    verifyPageUrlNotEqualTo(title: string | RegExp): Promise<void> {
        return expect(this.page).not.toHaveURL(title);
    }
}

export default Base;
