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

test.only("UI Controls", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const userName = page.locator("input#username");
  const password = page.locator("input#password");
  const signInBtn = page.locator("input#signInBtn");
  const dropdown = page.locator("select.form-control");
  const documentLink = page.locator("[href*='documents-request']");

  await userName.fill("rahulshettyacademy");
  await password.fill("learning");
  await dropdown.selectOption("consult");

  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();
  await expect(page.locator(".radiotextsty").last()).toBeChecked();
  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();
  //console.log(await page.locator(".radiotextsty").last().isChecked());
  await expect(documentLink).toHaveAttribute("class", "blinkingText");
  //await page.pause();
});
