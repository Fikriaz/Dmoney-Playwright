import { test, expect } from "@playwright/test";
import { RegisterPage } from "../../pages/RegisterPage";


test.describe("Register Negative Test", () => {

  test("should show error when account already exists", async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.register(
      "testcobaa",
      "freetestemail77@gmail.com",
      "cobadulu123",
      "08229944923",
      "aefaefef321212eds"
    );


    await expect(
      page.getByText("An account with this email already exists")
    ).toBeVisible();
  });

  test("should show error when required fields are empty", async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
     await registerPage.register(
      "testcobaa",
      "freetestemail77@gmail.com",
      "",
      "",
      "aefaefef321212eds"
    );

    await expect(
      page.getByText("All fields are required.")
    ).toBeVisible();
  });

  test("should show error when phone number is less than 11 digits", async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.register(
      "testcobaa",
      "freetestemail77@gmail.com",
      "cobadulu123",
      "0994923",
      "aefaefef3212ds"
    );

    await expect(
      page.getByText("Phone number must be exactly 11 digits.")
    ).toBeVisible();
  });

  test("should show error when NID is less than 7 characters", async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.register(
      "testcobaa",
      "freetestemail77@gmail.com",
      "cobadulu123",
      "08229944923",
      "212eds"
    );

    await expect(
      page.getByText('"nid" length must be at least 7 characters long')
    ).toBeVisible();
  });

  test("should show error when name is less than 3 characters", async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.register(
      "a",
      "freetestemail77@gmail.com",
      "cobadulu123",
      "08229944923",
      "aefaefef321212eds"
    );
    await expect(
      page.getByText('"name" length must be at least 3 characters long')
    ).toBeVisible();
  });

});