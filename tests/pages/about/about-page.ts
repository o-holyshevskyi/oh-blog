import { Page } from '@playwright/test';
import Base from '../base';

class AboutPage extends Base {
    constructor(page: Page) {
        super(page);
    }
}

export default AboutPage;
