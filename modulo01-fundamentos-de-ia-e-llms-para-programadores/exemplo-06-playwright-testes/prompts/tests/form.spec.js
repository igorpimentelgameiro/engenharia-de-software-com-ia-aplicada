const { test, expect } = require('@playwright/test');

const titleInput = (page) => page.getByRole('textbox', { name: 'Image Title' });
const imageUrlInput = (page) => page.getByRole('textbox', { name: 'Image URL' });
const submitButton = (page) => page.getByRole('button', { name: 'Submit Form' });

test('adds a submitted image to the gallery', async ({ page }) => {
  await page.goto('./');

  const title = `Playwright image ${Date.now()}`;
  const imageUrl = `https://picsum.photos/seed/${Date.now()}/640/480`;
  const cards = page.getByRole('heading', { level: 4 });
  const initialCardCount = await cards.count();

  await titleInput(page).fill(title);
  await imageUrlInput(page).fill(imageUrl);
  await submitButton(page).click();

  await expect(cards).toHaveCount(initialCardCount + 1);
  await expect(page.getByRole('heading', { level: 4, name: title })).toBeVisible();
});

test('shows validation errors for missing required values', async ({ page }) => {
  await page.goto('./');

  await submitButton(page).click();

  expect(await titleInput(page).evaluate((input) => input.checkValidity())).toBe(false);
  expect(await imageUrlInput(page).evaluate((input) => input.checkValidity())).toBe(false);
  await expect(page.getByText('Please type a title for the image.', { exact: true })).toBeVisible();
  await expect(page.getByText('Please type a valid URL', { exact: true })).toBeVisible();
});

test('shows URL validation feedback for an invalid image URL', async ({ page }) => {
  await page.goto('./');

  await titleInput(page).fill('Valid title');
  await imageUrlInput(page).fill('not-a-url');
  await submitButton(page).click();

  expect(await titleInput(page).evaluate((input) => input.checkValidity())).toBe(true);
  expect(await imageUrlInput(page).evaluate((input) => input.checkValidity())).toBe(false);
  await expect(page.getByText('Please type a valid URL', { exact: true })).toBeVisible();
});
