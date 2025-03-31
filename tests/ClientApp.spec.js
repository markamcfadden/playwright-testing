const { test, expect } = require("@playwright/test");

test.only("broswer context validating login", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/");

  const userEmail = "auto_tests_account@proton.me";

  const email = page.locator("input#userEmail");
  const password = page.locator("input#userPassword");
  const loginBtn = page.locator("input#login");
  const products = page.locator(".card-body");
  const productWanted = "ADIDAS ORIGINAL";

  await email.fill(userEmail);
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

  await page.locator("text=Checkout").click();

  await page
    .locator("[placeholder*='Country']")
    .pressSequentially("ind", { delay: 100 });
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator("button").count();
  for (let i = 0; i < optionsCount; i++) {
    if (
      (await dropdown.locator("button").nth(i).textContent()) === " Indonesia"
    ) {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }

  expect(page.locator(".user__name [type='text']").first()).toHaveText(
    userEmail
  );
  await page.locator("input[value*='4542']").fill("");
  await page.locator("input[value*='4542']").fill("1111 2222 3333 4444");

  await page.locator(".action__submit").click();
  await expect(page.locator(".hero-primary")).toHaveText(
    "Thankyou for the order. "
  );

  const orderID = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();

  await page.locator("button[routerlink*='myorders']").first().click();

  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");

  for (let i = 0; i < (await rows.count()); ++i) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderID.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  await page.locator(".col-text").waitFor({ state: "visible", timeout: 60000 });
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderID.includes(orderIdDetails)).toBeTruthy();
});
