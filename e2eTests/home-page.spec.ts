import { test, expect } from '@playwright/test';

test.describe('Home page tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });
    
    test('verify the header', async ({ page }) => {
        expect(await page.locator('h1').innerText()).toBe('Oleksandr Holyshevskyi');
    });

    test('verify the text about', async ({ page }) => {
        expect(await page.locator('main > section > p').innerText()).toBe('Hi, my name is Oleksandr. I\'m a certificated Test Automation Engineer based in Ukraine. I am dedicated to improving the experiences of both people and customers alike, using my skills to deliver top-notch results that drive success.');
    });

    test('verify recent posts', async ({ page }) => {
        await expect(page.locator('ul > li > a')).toHaveCount(5);
    });

    test('verify more posts button', async ({ page }) => {
        await expect(page.getByText('More posts')).toBeVisible();
    });

    test('verify min read', async ({ page }) => {
        await expect(page.locator('small > div:nth-child(3)')).toHaveCount(5);
    });

    test('verify time', async ({ page }) => {
        await expect(page.locator('small > time')).toHaveCount(5);
    });

    test('verify theme toggle', async ({ page }) => {
        const currentTheme = await page.locator('html').getAttribute('data-theme');

        await page.locator('label > span').click();

        expect(await page.locator('html').getAttribute('data-theme')).not.toBe(currentTheme);
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });
});