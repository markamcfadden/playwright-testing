const { test, expect } = require("@playwright/test");

test("broswer context validating login", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/");

  const email = page.locator("input#userEmail");
  const password = page.locator("input#userPassword");
  const loginBtn = page.locator("input#login");

  await email.fill("auto_tests_account@proton.me");
  await password.fill("Testing4455$");
  await loginBtn.click();

  //await page.waitForLoadState("networkidle"); a little flaky
  await page.locator(".card-body b").first().waitFor();

  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
});
