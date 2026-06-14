import { test, expect } from "@playwright/test";
const { getOtp } = require("../../gmail");

test("Validaton otp with wrong code", async ({page}) =>{

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

  await page.getByRole("textbox").first().fill("4235");

  await page.getByRole('button', 
    {
    name : 'Verify OTP →'
    }).click();

  await expect(
    page.getByText('Invalid OTP. Please try again.')
  ).toBeVisible();

});

test("Validaton otp with wrong fill format (e.g. adfg)", async ({page}) =>{

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

  await page.getByRole("textbox").first().fill("afgh");

  await page.getByRole('button', 
    {
    name : 'Verify OTP →'
    }).click();

  await expect(
    page.getByText('Please enter the 4-digit OTP.')
  ).toBeVisible();

});

test("Validaton otp with code otp less than 4 digit", async ({page}) =>{

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

  await page.getByRole("textbox").first().fill("425");

  await page.getByRole('button', 
    {
    name : 'Verify OTP →'
    }).click();

  await expect(
    page.getByText('Please enter the 4-digit OTP.')
  ).toBeVisible();

});


test("Validaton otp with expired code", async ({page}) =>{

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

test.setTimeout(130000);
  const otp = await getOtp();
  console.log("OTP:", otp);
  if (!otp) {
    throw new Error("OTP tidak ditemukan dari Gmail");
  }
  await page.getByRole("textbox").fill(otp);
  await page.getByRole('button', {
      name : 'Verify OTP →'
    }).click();


  await expect(
    page.getByText('OTP has expired. Please login again to receive a new OTP.')
  ).toBeVisible();

});