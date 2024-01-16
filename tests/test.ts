import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Welcome to SvelteKit' })).toBeVisible();
});

test('submit button should be disabled when adding a contact', async ({ page }) => {
	await page.goto('/contact');
	const placeHolders = {
		fullname: "Enter full name",
		email: "Enter email address"
	}
	await page.getByPlaceholder(placeHolders.email).fill('asldfj@gmail.com')
	await page.getByPlaceholder(placeHolders.fullname).fill('asldfj')
	const submitButton = page.getByRole('button', { name: "Submit" })
	await submitButton.click()

	await expect(submitButton).toBeDisabled()
});
