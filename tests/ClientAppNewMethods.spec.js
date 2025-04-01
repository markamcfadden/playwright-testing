const { test, expect } = require("@playwright/test");

test("broswer context validating login", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/");

  const userEmail = "auto_tests_account@proton.me";

  await page.getByPlaceholder("email@example.com").fill(userEmail);
  await page.getByPlaceholder("enter your passsword").fill("Testing4455$");
  await page.getByRole("button", { name: "Login" }).click();

  await page.waitForLoadState("networkidle");

  await page
    .locator(".card-body")
    .filter({ hasText: "ADIDAS ORIGINAL" })
    .getByRole("button", { name: "Add To Cart" })
    .click();

  await page
    .getByRole("listitem")
    .getByRole("button", { name: "Cart" })
    .click();

  await page.locator("div li").first().waitFor();

  await expect(page.getByText("ADIDAS ORIGINAL")).toBeVisible();

  await page.getByRole("button", { name: "Checkout" }).click();

  await page.getByPlaceholder("Select Country").pressSequentially("ind");
  await page.getByRole("button", { name: " Indonesia" }).click();

  await page.getByText("PLACE ORDER").click();
  await page.waitForSelector("text=Thankyou for the order.", {
    timeout: 15000,
  });
  await expect(page.getByText("Thankyou for the order.")).toBeVisible();
});
