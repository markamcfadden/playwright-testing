const { test, expect } = require("@playwright/test");

test("First Playwright Test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const userName = page.locator("input#username");
  const password = page.locator("input#password");
  const signInBtn = page.locator("input#signInBtn");
  const cardTitles = page.locator(".card-body a");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  await userName.fill("rahulshetty");
  await password.fill("learning");
  await signInBtn.click();
  console.log(await page.locator("[style*='block']").textContent(""));
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");

  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  await signInBtn.click();
  console.log(await cardTitles.nth(0).textContent());
  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);
});

test.only("E Commerce Sign In", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/");

  const email = page.locator("input#userEmail");
  const password = page.locator("input#userPassword");
  const loginBtn = page.locator("input#login");

  await email.fill("auto_tests_account@proton.me");
  await password.fill("Testing4455$");
  await loginBtn.click();

  const firstCardTitle = await page
    .locator(".card-body b")
    .nth(0)
    .textContent();

  await expect(firstCardTitle).toBe("ZARA COAT 3");
});

test("Page Playwright Test", async ({ page }) => {
  await page.goto("https://google.com");
  //get title - assertion
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
});
