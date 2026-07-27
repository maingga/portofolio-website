import { test, expect } from '@playwright/test';

const baseURL = 'http://localhost:3000';

test.describe('E2E Testing Web Portfolio', () => {
  test('Homepage should load successfully', async ({ page }) => {
    await page.goto(baseURL);
    await expect(page).toHaveTitle(/Portfolio|Maingga|Developer/i);
  });

  test('Scroll-spy navigation to "About" section works', async ({ page }) => {
    await page.goto(baseURL);
    await page.getByText('About').click();
    await expect(page.locator('#about')).toBeVisible();
  });

  test('Navigation to "Skills" section works', async ({ page }) => {
    await page.goto(baseURL);
    await page.getByText('Skills').click();
    await expect(page.locator('#skills')).toBeVisible();
  });

  test('Navigation to "Portfolio" section works', async ({ page }) => {
    await page.goto(baseURL);
    await page.getByText('Portfolio').click();
    await expect(page.locator('#portfolio')).toBeVisible();
  });

  test('Navigation to "Contact" section works', async ({ page }) => {
    await page.goto(baseURL);
    await page.getByText('Contact').click();
    await expect(page.locator('#contact')).toBeVisible();
  });

  test('"Download CV" button is clickable', async ({ page }) => {
    await page.goto(baseURL);
    const downloadButton = page.getByRole('link', { name: /download cv/i });
    await expect(downloadButton).toBeVisible();
    await expect(downloadButton).toHaveAttribute('href', /cv\.pdf/i);
  });

  test('GitHub or social media links are clickable', async ({ page }) => {
    await page.goto(baseURL);
    const githubLink = page.locator('a[href*="github.com"]');
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('target', '_blank');
  });

  test('Responsive navbar works on mobile view', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(baseURL);

    const menuButton = page.locator('button[aria-label="Toggle Menu"]');
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    await expect(page.getByText('Contact')).toBeVisible();
    await page.getByText('Contact').click();
    await expect(page.locator('#contact')).toBeVisible();
  });
});
