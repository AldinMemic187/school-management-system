import { test, expect } from '@playwright/test';

test.describe('School Management System E2E Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Intercept login API call
    await page.route('**/api/auth/login', async (route) => {
      const requestBody = route.request().postDataJSON();
      if (requestBody.email === 'admin@school.com' && requestBody.password === 'admin123') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            email: 'admin@school.com',
            isAdmin: true,
            token: 'mocked-jwt-token-admin'
          })
        });
      } else {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: false
          })
        });
      }
    });

    // Intercept teacher list API call
    await page.route('**/api/teacher/getall', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { id: 1, name: 'Alice Smith', email: 'alice@school.com', password: 'pass' }
        ])
      });
    });
  });

  // ==================== ALDIN MEMIC E2E TESTS ====================

  test('[Aldin Memic] should login as admin and view the dashboard', async ({ page }) => {
    await page.goto('/#/auth/login');
    
    // Fill credentials
    await page.locator('#email1').fill('admin@school.com');
    await page.locator('#password1-input, input[placeholder="Password"]').fill('admin123');
    
    // Click Sign In
    await page.getByRole('button', { name: 'Sign In' }).click();
    
    // Should navigate to admin root (dashboard)
    await expect(page).toHaveURL(/.*#\/$/);
  });

  test('[Aldin Memic] should login as admin, navigate to teachers, and see the teacher list', async ({ page }) => {
    await page.goto('/#/auth/login');
    await page.locator('#email1').fill('admin@school.com');
    await page.locator('#password1-input, input[placeholder="Password"]').fill('admin123');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Wait for login redirection to complete first!
    await expect(page).toHaveURL(/.*#\/$/);

    // Navigate to teacher management page
    await page.goto('/#/teacher/index');

    // Confirm that the page header or content is visible
    await expect(page.locator('h1.header-title')).toContainText('Teacher Management');
    await expect(page.locator('.teacher-name').first()).toContainText('Alice Smith');
  });

  // ==================== LJUNDRIM GANIJI E2E TESTS ====================

  test('[Ljundrim Ganiji] should login as admin, navigate to teachers, and open create new teacher dialog', async ({ page }) => {
    await page.goto('/#/auth/login');
    await page.locator('#email1').fill('admin@school.com');
    await page.locator('#password1-input, input[placeholder="Password"]').fill('admin123');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Wait for login redirection to complete first!
    await expect(page).toHaveURL(/.*#\/$/);

    await page.goto('/#/teacher/index');
    
    // Open New Teacher dialog
    await page.getByRole('button', { name: 'New Teacher' }).click();

    // The dialog should be visible
    await expect(page.locator('p-dialog[header="Create New Teacher"] .p-dialog-title')).toBeVisible();
  });

  test('[Ljundrim Ganiji] should handle login failure with incorrect credentials', async ({ page }) => {
    // We spy on console.log
    const logs: string[] = [];
    page.on('console', msg => logs.push(msg.text()));

    await page.goto('/#/auth/login');
    await page.locator('#email1').fill('wrong@school.com');
    await page.locator('#password1-input, input[placeholder="Password"]').fill('wrongpassword');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Redirection should NOT happen, remaining on login page
    await expect(page).toHaveURL(/.*#\/auth\/login/);
    
    // Expect "Login failed!" log or console error message
    expect(logs).toContain('Login failed!');
  });

});
