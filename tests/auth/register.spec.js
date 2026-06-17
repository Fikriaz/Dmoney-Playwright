import { test, expect } from "@playwright/test";

test("should show error when account already exists", async ({ page }) => {

  await page.goto('https://dmoneyportal.roadtocareer.net/register');

  await expect(page.getByText('Create an Account')).toBeVisible();

  await page.getByRole('textbox').first().fill('testcobaa');
  await page.getByRole('textbox').nth(1).fill('freetestemail77@gmail.com');
  await page.getByRole('textbox').nth(2).fill('cobadulu123');
  await page.getByRole('textbox').nth(3).fill('08229944923');
  await page.getByRole('textbox').nth(4).fill('aefaefef321212eds');

  await page.getByRole('combobox').click();
  await page.getByRole('option', { name: 'Customer' }).click();

  await page.getByRole('button', { name: 'Create Account →' }).click();

  await expect(
    page.getByText('An account with this email already exists')
  ).toBeVisible();
});


test("should show error when required fields are empty", async ({ page }) => {

  await page.goto('https://dmoneyportal.roadtocareer.net/register');

  await expect(page.getByText('Create an Account')).toBeVisible();

  await page.getByRole('textbox').nth(1).fill('freetestemail77@gmail.com');
  await page.getByRole('textbox').nth(2).fill('cobadulu123');
  await page.getByRole('textbox').nth(3).fill('08229944923');
  await page.getByRole('textbox').nth(4).fill('aefaefef321212eds');

  await page.getByRole('combobox').click();
  await page.getByRole('option', { name: 'Customer' }).click();

  await page.getByRole('button', { name: 'Create Account →' }).click();

  await page.waitForTimeout(3000);

  await expect(
    page.getByText('All fields are required.')
  ).toBeVisible();
});


test("should show error when phone number is less than 11 digits", async ({ page }) => {

  await page.goto('https://dmoneyportal.roadtocareer.net/register');

  await expect(page.getByText('Create an Account')).toBeVisible();

  await page.getByRole('textbox').first().fill('testcobaa');
  await page.getByRole('textbox').nth(1).fill('freetestemail77@gmail.com');
  await page.getByRole('textbox').nth(2).fill('cobadulu123');
  await page.getByRole('textbox').nth(3).fill('0994923');
  await page.getByRole('textbox').nth(4).fill('aefaefef3212ds');

  await page.getByRole('combobox').click();
  await page.getByRole('option', { name: 'Customer' }).click();

  await page.getByRole('button', { name: 'Create Account →' }).click();

  await page.waitForTimeout(3000);

  await expect(
    page.getByText('Phone number must be exactly 11 digits.')
  ).toBeVisible();
});


test("should show error when NID is less than 7 characters", async ({ page }) => {

  await page.goto('https://dmoneyportal.roadtocareer.net/register');

  await expect(page.getByText('Create an Account')).toBeVisible();

  await page.getByRole('textbox').first().fill('testcobaa');
  await page.getByRole('textbox').nth(1).fill('freetestemail77@gmail.com');
  await page.getByRole('textbox').nth(2).fill('cobadulu123');
  await page.getByRole('textbox').nth(3).fill('08229944923');
  await page.getByRole('textbox').nth(4).fill('212eds');

  await page.getByRole('combobox').click();
  await page.getByRole('option', { name: 'Customer' }).click();

  await page.getByRole('button', { name: 'Create Account →' }).click();

  await expect(
    page.getByText('"nid" length must be at least 7 characters long')
  ).toBeVisible();
});


test("should show error when name is less than 3 characters", async ({ page }) => {

  await page.goto('https://dmoneyportal.roadtocareer.net/register');

  await expect(page.getByText('Create an Account')).toBeVisible();

  await page.getByRole('textbox').first().fill('a');
  await page.getByRole('textbox').nth(1).fill('freetestemail77@gmail.com');
  await page.getByRole('textbox').nth(2).fill('cobadulu123');
  await page.getByRole('textbox').nth(3).fill('08229944923');
  await page.getByRole('textbox').nth(4).fill('aefaefef321212eds');

  await page.getByRole('combobox').click();
  await page.getByRole('option', { name: 'Customer' }).click();

  await page.getByRole('button', { name: 'Create Account →' }).click();

  await expect(
    page.getByText('"name" length must be at least 3 characters long')
  ).toBeVisible();
});