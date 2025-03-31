const { test, expect } = require("@playwright/test");

test.only("broswer context validating login", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/");

  const email = page.locator("input#userEmail");
  const password = page.locator("input#userPassword");
  const loginBtn = page.locator("input#login");
  const products = page.locator(".card-body");
  const productWanted = "ADIDAS ORIGINAL";

  await email.fill("auto_tests_account@proton.me");
  await password.fill("Testing4455$");
  await loginBtn.click();

  //await page.waitForLoadState("networkidle"); a little flaky
  await page.locator(".card-body b").first().waitFor();

  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
  const count = await products.count();
  for (let i = 0; i < count; i++) {
    if ((await products.nth(i).locator("b").textContent()) === productWanted) {
      await products.nth(i).locator("text=Add To Cart").click();
      break;
    }
  }
  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor();
  const bool = await page.locator("h3:has-text('Adidas Original')").isVisible();
  expect(bool).toBeTruthy();
});
