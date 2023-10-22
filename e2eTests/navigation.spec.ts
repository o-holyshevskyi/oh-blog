import { test, expect } from '@playwright/test';

test.describe('Navigation tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });
    
    test('start page has title', async ({ page }) => {
        await expect(page).toHaveTitle('Oleksandr Holyshevskyi');
    });

    test('open about page by clicking the main image', async ({ page }) => {
        await page.locator('a > div> img').click();
        await expect(page).toHaveTitle('About me');
        await expect(page).toHaveURL(/about/);
    });

    test('open about page by clicking the About', async ({ page }) => {
        await page.getByText('About').click();
        await expect(page).toHaveTitle('About me');
        await expect(page).toHaveURL(/about/);
    });

    test('open about page by clicking the Home', async ({ page }) => {
        await page.locator('a > div> img').click();
        await page.getByText('Home').click();
        await expect(page).toHaveTitle('Oleksandr Holyshevskyi');
    });

    test('open home page by clicking the main image', async ({ page }) => {
        await page.locator('a > div> img').click();
        await page.locator('header > a > img').click();
        await expect(page).toHaveTitle('Oleksandr Holyshevskyi');
    });

    test('open home page by clicking the name', async ({ page }) => {
        await page.locator('a > div> img').click();
        await page.getByText('Oleksandr Holyshevskyi').click();
        await expect(page).toHaveTitle('Oleksandr Holyshevskyi');
    });

    test('open home page by clicking the back to home', async ({ page }) => {
        await page.locator('a > div> img').click();
        await page.getByText('Back to home').click();
        await expect(page).toHaveTitle('Oleksandr Holyshevskyi');
    });

    test('open all posts page by clicking the more posts button', async ({ page }) => {
        await page.getByText('More posts').click();
        await expect(page).toHaveTitle('All posts');
        await expect(page).toHaveURL(/all-posts/);
    });

    test('open any post on the home page', async ({ page }) => {
        await page.locator('ul > li:nth-child(1) > a').click();
        await expect(page).not.toHaveTitle('Oleksandr Holyshevskyi');
    });

    test('open any post on the more posts page', async ({ page }) => {
        await page.getByText('More posts').click();
        await page.locator('ul > li:nth-child(1) > a').click();
        await expect(page).not.toHaveTitle('All posts');
        await expect(page).not.toHaveURL(/all-posts/);
    });

    test('verify the linkedIn url', async ({ page }) => {
        const linkedInNav = page.locator('footer > a:nth-child(7)');
        await expect(linkedInNav).toHaveCount(1);
        expect(await linkedInNav.getAttribute('href')).toBe('https://www.linkedin.com/in/oleksandr-holyshevskyi/');
        expect(await linkedInNav.getAttribute('target')).toBe('_blank');
    });

    test('verify the github url', async ({ page }) => {
        const linkedInNav = page.locator('footer > a:nth-child(5)');
        await expect(linkedInNav).toHaveCount(1);
        expect(await linkedInNav.getAttribute('href')).toBe('https://github.com/o-holyshevskyi');
        expect(await linkedInNav.getAttribute('target')).toBe('_blank');
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });
});
