const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('http://127.0.0.1:5501/index.html');
});

test('add single todo', async ({ page }) => {
    await page.waitForSelector('#input');
    await page.fill('#input', 'todo added');
    await page.press('#input', 'Enter');
    await page.waitForSelector('li.todo-item');
    await expect(page.getByText('todo added')).toBeVisible();

    await page.waitForTimeout(4000);
});