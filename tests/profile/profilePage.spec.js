import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { ProfilePage } from "../../pages/ProfilePage";
const { getOtp } = require("../../gmail");

test.describe("Login - Positive Cases", () => {
test.beforeEach(async ({ page }) => {
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

    test("Should Succesfully Edit Profile with valid data", async ({ page }) => {
    const profilepage = new ProfilePage(page);
    await page.getByRole('button', {name : 'Edit Profile'}).click();
    
    await profilepage.editProfile(
    'Coba 123',
    'freetestemail@gmail.com',
    '082257845632',
    '1232506278173');
        
    await expect(page.getByText('Profile updated successfully')).toBeVisible({ timeout: 10000 });

});

test.describe("Edit Profile - Negative Cases", () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await expect(
      page.getByText("Welcome Back")
    ).toBeVisible();

    await loginPage.login(
      "freetestemail77@gmail.com",
      "testmail123"
    );

    await expect(
      page.getByText("Verify Your Identity")
    ).toBeVisible();

    await page.waitForTimeout(8000);

    const otp = await getOtp();

    if (!otp) {
      throw new Error("OTP tidak ditemukan");
    }

    await page.getByRole("textbox", {
      name: "Enter 4-Digit OTP",
    }).fill(otp);

    await page.getByRole("button", {
      name: "Verify OTP →",
    }).click();

    await expect(page).toHaveURL(
      "https://dmoneyportal.roadtocareer.net/profile"
    );

    await expect(
      page.getByText("Customer Dashboard")
    ).toBeVisible();

    await page.getByRole("button", {
      name: "Edit Profile",
    }).click();
  });

  test("should show error when name is less than 3 characters", async ({ page }) => {

    const profilePage = new ProfilePage(page);

    await profilePage.editProfile(
      "ab",
      "freetestemail@gmail.com",
      "082257845632",
      "1232506278173"
    );

    await expect(
      page.getByText(
        '"name" length must be at least 3 characters long'
      )
    ).toBeVisible();
  });

  test("should show error when phone number is less than 11 digits", async ({ page }) => {

    const profilePage = new ProfilePage(page);

    await profilePage.editProfile(
      "Testing User",
      "freetestemail@gmail.com",
      "08225",
      "1232506278173"
    );

    await expect(
      page.getByText(
        "Phone number must be exactly 11 digits."
      )
    ).toBeVisible();
  });

  test("should show error when NID is less than 7 characters", async ({ page }) => {

    const profilePage = new ProfilePage(page);

    await profilePage.editProfile(
      "Testing User",
      "freetestemail@gmail.com",
      "082257845632",
      "123456"
    );

    await expect(
      page.getByText(
        '"nid" length must be at least 7 characters long'
      )
    ).toBeVisible();
  });

  test("should show error when email format is invalid", async ({ page }) => {

    const profilePage = new ProfilePage(page);

    await profilePage.editProfile(
      "Testing User",
      "emailinvalid",
      "082257845632",
      "1232506278173"
    );

    await expect(
      page.getByText(/email/i)
    ).toBeVisible();
  });

  test("should show error when all fields are empty", async ({ page }) => {

    const profilePage = new ProfilePage(page);

    await profilePage.editProfile(
      "",
      "",
      "",
      ""
    );

    await expect(
      page.getByText(
        "All fields are required."
      )
    ).toBeVisible();
  });

  test("should show error when email already exists", async ({ page }) => {

    const profilePage = new ProfilePage(page);

    await profilePage.editProfile(
      "Testing User",
      "existinguser@gmail.com",
      "082257845632",
      "1232506278173"
    );

    await expect(
      page.getByText(
        "An account with this email already exists"
      )
    ).toBeVisible();
  });

});

});