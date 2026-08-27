import { test, expect } from '@playwright/test';

test.describe('Portfolio E2E & API Contract', () => {
  
  test('UI Render: Home page loads and displays core identity', async ({ page }) => {
    await page.goto('/');
    
    const heading = page.locator('h1');
    await expect(heading).toContainText('Oleksandr Holyshevskyi');
    
    const impactSection = page.locator('h2', { hasText: 'Impact & Milestones' });
    await expect(impactSection).toBeVisible();
  });

  test('Routing: Navigation to Biometrics case study works correctly', async ({ page }) => {
    await page.goto('/');
    
    await page.click('text=Architected hardware mocks for biometric scanners');
    
    await expect(page).toHaveURL(/\/work\/biometrics/);
    
    const contextHeading = page.locator('h2', { hasText: 'The Context' });
    await expect(contextHeading).toBeVisible();
  });

  test('API Contract: /api/resume returns valid structured JSON', async ({ request }) => {
    const response = await request.get('/api/resume');
    
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
    
    const data = await response.json();
    
    expect(data.name).toBe('Oleksandr Holyshevskyi');
    expect(data.title).toBe('Senior SDET');
    expect(Array.isArray(data.experience)).toBeTruthy();
    expect(data.experience.length).toBeGreaterThan(0);
  });
});