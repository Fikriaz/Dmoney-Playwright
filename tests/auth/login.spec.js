import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
const { getOtp } = require("../../gmail");

test.describe("Login - Positive Cases", () => {

  test("should login successfully with valid credentials", async ({ page }) => {
    
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await expect(page.getByText('Welcome Back')).toBeVisible();
    await loginPage.login(
      'freetestemail77@gmail.com',
      'testmail123'
    );

    await expect(page.getByText('Verify Your Identity')).toBeVisible();
    await page.waitForTimeout(8000);
    const otp = await getOtp();
    console.log("OTP:", otp);

    if (!otp) {
      throw new Error("OTP tidak ditemukan dari Gmail");
    }

    await page.getByRole("textbox", { 
      name: "Enter 4-Digit OTP" 
    }).fill(otp);

    await page.getByRole('button', {
      name: 'Verify OTP →'
    }).click();

    await page.waitForTimeout(5000);

    await expect(page).toHaveURL(
      'https://dmoneyportal.roadtocareer.net/profile'
    );

    await expect(page.getByText('Customer Dashboard')).toBeVisible();
  });

});


test.describe("Login - Negative Cases", () => {

  test("should show error when username is invalid", async ({ page }) => {

    const loginpage = new LoginPage(page);
    await loginpage.goto();

    await expect(page.getByText('Welcome Back'));
    await loginpage.login('freetest77@gmail.com','testmail123');
    
    await page.waitForTimeout(3000);

    await expect(page.getByText('User not found')).toBeVisible();
  });


  test("should show error when password is invalid", async ({ page }) => {
    const loginpage = new LoginPage(page);
    await loginpage.goto();
    await expect(page.getByText('Welcome Back'));
    await loginpage.login('freetestemail77@gmail.com','ddfsfeaefae');

    await page.waitForTimeout(3000);

    await expect(
      page.getByText('Login failed. Please input correct email/phone number or password.')
    ).toBeVisible();
  });


  test("should show error when username and password are invalid", async ({ page }) => {

    const loginpage = new LoginPage(page);
    await loginpage.goto();
    await expect(page.getByText('Welcome Back'));
    await loginpage.login('abcd21@gmail.com','testmzdfdail123');

    await page.waitForTimeout(3000);

    await expect(page.getByText('User not found')).toBeVisible();
  });


  test("should show error when fielad email and password  are empty", async ({ page }) => {

    const loginpage = new LoginPage(page);
    await loginpage.goto();

    await page.getByRole('button', {
      name: 'Login →'
    }).click();

    await page.waitForTimeout(3000);

    await expect(
      page.getByText('Email/Phone Number and Password cannot be empty.')
    ).toBeVisible();
  });


  test("should show error when username is empty", async ({ page }) => {

    const loginpage = new LoginPage(page);
    await loginpage.goto();
    await loginpage.login('','testmail123');

    await page.waitForTimeout(3000);

    await expect(
      page.getByText('Email/Phone Number and Password cannot be empty.')
    ).toBeVisible();
  });


  test("should show error when password is empty", async ({ page }) => {

    const loginpage = new LoginPage(page);
    await loginpage.goto();
    await loginpage.login('freetestemail77@gmail.com','');

    await page.waitForTimeout(3000);

    await expect(
      page.getByText('Email/Phone Number and Password cannot be empty.')
    ).toBeVisible();
  });

});