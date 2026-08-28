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

  test('Security & Resilience: Rate Limiter blocks excessive requests and updates UI', async ({ page }) => {
    await page.goto('/');
    
    const logsAccordion = page.locator('details').filter({ hasText: 'Live E2E Verification' });
    const summary = logsAccordion.locator('summary');
    
    for (let i = 0; i < 5; i++) {
      await summary.click();
      await page.waitForTimeout(100); 
      if (i < 4) await summary.click(); 
    }

    const isOpen = await logsAccordion.getAttribute('open') !== null;
    if (!isOpen) await summary.click();

    const securityFaultText = page.locator('text=[ SECURITY FAULT ]');
    await expect(securityFaultText).toBeVisible({ timeout: 5000 });
    
    const rateLimitMessage = page.locator('text=RATE LIMIT EXCEEDED FOR IP');
    await expect(rateLimitMessage).toBeVisible();
  });

  test('Event-Driven Architecture: Command Palette triggers global state changes', async ({ page }) => {
    await page.goto('/');
    
    const modifier = process.platform === 'darwin' ? 'Meta' : 'Control';
    await page.keyboard.press(`${modifier}+k`);
    
    const cmdInput = page.locator('input[type="text"]');
    await expect(cmdInput).toBeFocused();
    
    await cmdInput.fill('toggle_logs');
    await page.keyboard.press('Enter');
    
    const terminalOutput = page.locator('text=Signal \'toggle-e2e-logs\' dispatched');
    await expect(terminalOutput).toBeVisible();
    
    const logsAccordion = page.locator('details').filter({ hasText: 'Live E2E Verification' });
    
    await expect(logsAccordion).toHaveAttribute('open', '');
  });
});