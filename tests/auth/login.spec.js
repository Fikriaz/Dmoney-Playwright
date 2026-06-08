import { test, expect } from "@playwright/test";
const { getOtp } = require("../../gmail");
test("login validation", async ({ page }) => {
  await page.goto("https://dmoneyportal.roadtocareer.net/login");
  await expect(
    page.getByText('Welcome Back')
  ).toBeVisible();
  await page.getByRole("textbox").first().fill("freetestemail77@gmail.com");
  await page.getByRole("textbox").nth(1).fill("testmail123");
  //kalau pake id best practice pakai id test
  // await page 
  // .locator('#_r_2_'
  //   )
  //   .fill("testmail123");
  await page.getByRole('button', {
      name : 'Login →'
    }).click();

  //otp EMAIL
  await expect(
    page.getByText('Verify Your Identity')
  ).toBeVisible();
  await page.waitForTimeout(8000);
  // ambil OTP dari Gmail
  const otp = await getOtp();
  console.log("OTP:", otp);
  if (!otp) {
    throw new Error("OTP tidak ditemukan dari Gmail");
  }
  await page.getByRole("textbox").fill(otp);
  await page.getByRole('button', {
      name : 'Verify OTP →'
    }).click();

  await page.waitForTimeout(5000);
  await expect(
    page.getByText('Customer Dashboard')
  ).toBeVisible();
});

