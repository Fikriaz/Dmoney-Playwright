import { test, expect } from "@playwright/test";
const { getOtp } = require("../../gmail");
test("login using valid username and password ", async ({ page }) => {
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

test ("Validation login with wrong username and valid password", async ({page}) => {
  await page.goto('https://dmoneyportal.roadtocareer.net/login');

  await page.getByRole("textbox").first().fill('abcd21@gmail.com');
  await page.getByRole("textbox").nth(1).fill('testmail123');

  await page.getByRole('button', {
    name : 'Login →'
  }).click();

  await page.waitForTimeout(3000);
  await expect(page.getByText('User not found'))
  .toBeVisible();
});

test ("Validation login with valid username and wrong password", async ({page}) => {
  await page.goto('https://dmoneyportal.roadtocareer.net/login');

  await page.getByRole("textbox").first().fill('freetestemail77@gmail.com');
  await page.getByRole("textbox").nth(1).fill('ddfsfeaefae');

  await page.getByRole('button', {
    name : 'Login →'
  }).click();

  await page.waitForTimeout(3000);
  await expect(page.getByText('Login failed. Please input correct email/phone number or password.'))
  .toBeVisible();
});

test ("Validation login with wrong username and password", async ({page}) => {
  await page.goto('https://dmoneyportal.roadtocareer.net/login');

  await page.getByRole("textbox").first().fill('abcd21@gmail.com');
  await page.getByRole("textbox").nth(1).fill('testmzdfdail123');

  await page.getByRole('button', {
    name : 'Login →'
  }).click();

  await page.waitForTimeout(3000);
  await expect(page.getByText('User not found'))
  .toBeVisible();
});

test ("Validation login with blank username and password", async ({page}) => {
  await page.goto('https://dmoneyportal.roadtocareer.net/login');

  await page.getByRole('button', {
    name : 'Login →'
  }).click();

  await page.waitForTimeout(3000);
  await expect(page.getByText('Email/Phone Number and Password cannot be empty.'))
  .toBeVisible();
});

test ("Validation login with blank username", async ({page}) => {
  await page.goto('https://dmoneyportal.roadtocareer.net/login');

//  await page.getByRole("textbox").first().fill('freetestemail77@gmail.com');
  await page.getByRole("textbox").nth(1).fill('testmail123');
  await page.getByRole('button', {
    name : 'Login →'
  }).click();

  await page.waitForTimeout(3000);
  await expect(page.getByText('Email/Phone Number and Password cannot be empty.'))
  .toBeVisible();
});

test ("Validation login with blank password", async ({page}) => {
  await page.goto('https://dmoneyportal.roadtocareer.net/login');

  await page.getByRole("textbox").first().fill('freetestemail77@gmail.com');
 // await page.getByRole("textbox").nth(1).fill('testmail123');
  await page.getByRole('button', {
    name : 'Login →'
  }).click();

  await page.waitForTimeout(3000);
  await expect(page.getByText('Email/Phone Number and Password cannot be empty.'))
  .toBeVisible();
});