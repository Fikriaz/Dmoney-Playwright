import { test, expect } from "@playwright/test";
const { getOtp } = require("../../gmail");
import { LoginPage } from "../../pages/LoginPage";
import { otp } from "../../pages/otp";


test("should show error when OTP is invalid", async ({ page }) => {

  const loginpage = new LoginPage(page);
  const codeotp = new otp(page);
  await expect(page.getByText('Welcome Back')).toBeVisible();

  await loginpage.goto();
  await loginpage.login('freetestemail77@gmail.com','testmail123');


  await page.getByRole('button', {
    name: 'Login →'
  }).click();

  await expect(page.getByText('Verify Your Identity')).toBeVisible();

  await codeotp.otp('5234');

  await page.getByRole('button', {
    name: 'Verify OTP →'
  }).click();

  await expect(
    page.getByText('Invalid OTP. Please try again.')
  ).toBeVisible();

});


test("should show error when OTP format is invalid", async ({ page }) => {

  const codeotp = new otp(page);
  await expect(page.getByText('Welcome Back')).toBeVisible();

  await loginpage.goto();
  await loginpage.login('freetestemail77@gmail.com','testmail123');


  await page.getByRole('button', {
    name: 'Login →'
  }).click();

  await expect(page.getByText('Verify Your Identity')).toBeVisible();

  await codeotp.otp('dfga');

  await page.getByRole('button', {
    name: 'Verify OTP →'
  }).click();

  await expect(
    page.getByText('Please enter the 4-digit OTP.')
  ).toBeVisible();

});


test("should show error when OTP length is less than 4 digits", async ({ page }) => {

 const codeotp = new otp(page);
  await expect(page.getByText('Welcome Back')).toBeVisible();

  await loginpage.goto();
  await loginpage.login('freetestemail77@gmail.com','testmail123');


  await page.getByRole('button', {
    name: 'Login →'
  }).click();

  await expect(page.getByText('Verify Your Identity')).toBeVisible();

  await codeotp.otp('524');

  await page.getByRole('button', {
    name: 'Verify OTP →'
  }).click();

  await expect(
    page.getByText('Please enter the 4-digit OTP.')
  ).toBeVisible();

});


test("should show error when OTP is expired or reused", async ({ page }) => {

  const codeotp = new otp(page);
  await expect(page.getByText('Welcome Back')).toBeVisible();

  await loginpage.goto();
  await loginpage.login('freetestemail77@gmail.com','testmail123');


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