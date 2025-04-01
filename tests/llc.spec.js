import { test, expect } from "@playwright/test";

test("Playwright Special locators", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");

  await page.getByLabel("Check me out if you Love IceCreams!").click();
  await page.getByLabel("Employed").check();
  await page.getByLabel("Gender").selectOption("Male");

  await page.getByPlaceholder("Password").fill("testpassword");

  await page.getByRole("button", { name: "Submit" }).click();

  const visible = await page
    .getByText("Success! The Form has been submitted successfully!.")
    .isVisible();

  expect(visible).toBeTruthy();

  await page.getByRole("link", { name: "Shop" }).click();

  await page
    .locator("app-card")
    .filter({ hasText: "Blackberry" })
    .getByRole("button")
    .click();
});
