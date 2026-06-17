import { test, expect } from "@playwright/test";
const { getOtp } = require("../../gmail");

test("should show error when OTP is invalid", async ({ page }) => {

  await page.goto("https://dmoneyportal.roadtocareer.net/login");
  await expect(page.getByText('Welcome Back')).toBeVisible();

  await page.getByRole("textbox").first().fill("freetestemail77@gmail.com");
  await page.getByRole("textbox").nth(1).fill("testmail123");

  await page.getByRole('button', {
    name: 'Login →'
  }).click();

  await expect(page.getByText('Verify Your Identity')).toBeVisible();

  await page.getByRole("textbox").first().fill("4235");

  await page.getByRole('button', {
    name: 'Verify OTP →'
  }).click();

  await expect(
    page.getByText('Invalid OTP. Please try again.')
  ).toBeVisible();

});


test("should show error when OTP format is invalid", async ({ page }) => {

  await page.goto("https://dmoneyportal.roadtocareer.net/login");
  await expect(page.getByText('Welcome Back')).toBeVisible();

  await page.getByRole("textbox").first().fill("freetestemail77@gmail.com");
  await page.getByRole("textbox").nth(1).fill("testmail123");

  await page.getByRole('button', {
    name: 'Login →'
  }).click();

  await expect(page.getByText('Verify Your Identity')).toBeVisible();

  await page.getByRole("textbox").first().fill("afgh");

  await page.getByRole('button', {
    name: 'Verify OTP →'
  }).click();

  await expect(
    page.getByText('Please enter the 4-digit OTP.')
  ).toBeVisible();

});


test("should show error when OTP length is less than 4 digits", async ({ page }) => {

  await page.goto("https://dmoneyportal.roadtocareer.net/login");
  await expect(page.getByText('Welcome Back')).toBeVisible();

  await page.getByRole("textbox").first().fill("freetestemail77@gmail.com");
  await page.getByRole("textbox").nth(1).fill("testmail123");

  await page.getByRole('button', {
    name: 'Login →'
  }).click();

  await expect(page.getByText('Verify Your Identity')).toBeVisible();

  await page.getByRole("textbox").first().fill("425");

  await page.getByRole('button', {
    name: 'Verify OTP →'
  }).click();

  await expect(
    page.getByText('Please enter the 4-digit OTP.')
  ).toBeVisible();

});


test("should show error when OTP is expired or reused", async ({ page }) => {

  await page.goto("https://dmoneyportal.roadtocareer.net/login");
  await expect(page.getByText('Welcome Back')).toBeVisible();

  await page.getByRole("textbox").first().fill("freetestemail77@gmail.com");
  await page.getByRole("textbox").nth(1).fill("testmail123");

  await page.getByRole('button', {
    name: 'Login →'
  }).click();

  await expect(page.getByText('Verify Your Identity')).toBeVisible();

  test.setTimeout(130000);

  const otp = await getOtp();
  console.log("OTP:", otp);

  if (!otp) {
    throw new Error("OTP tidak ditemukan dari Gmail");
  }

  await page.getByRole("textbox").fill(otp);

  await page.getByRole('button', {
    name: 'Verify OTP →'
  }).click();

  await expect(
    page.getByText('Invalid OTP. Please try again.')
  ).toBeVisible();

});