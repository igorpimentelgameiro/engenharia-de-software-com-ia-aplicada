const { test, expect } = require('@playwright/test');

test('displays the initial image gallery', async ({ page }) => {
  const response = await page.goto('./');

  expect(response).not.toBeNull();
  expect(response.status()).toBe(200);
  await expect(page).toHaveURL(
    'https://erickwendel.github.io/vanilla-js-web-app-example/',
  );

  await expect(page.getByRole('heading', { name: 'AI Alien' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Predator Night Vision' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'ET Bilu' })).toBeVisible();
});
