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

test('add single todo and check completed', async ({ page }) => {
    await page.waitForSelector('#input');
    await page.fill('#input', 'todo added');
    await page.press('#input', 'Enter');
    await page.waitForSelector('li.todo-item');
    await expect(page.getByText('todo added')).toBeVisible();
    await page.click('input.toggle');
    await page.waitForTimeout(4000);
});

test('add three todo and check completed of one', async ({ page }) => {
    await page.waitForSelector('#input');
    for (const todoText of ['todo1', 'todo2', 'todo3']) {
        await page.fill('#input', todoText);
        await page.press('#input', 'Enter');
    }
    await page.waitForSelector('li.todo-item');
    const data = await page.evaluate(() => window.todos);
    const todos = data;
    await page.check('input.toggle', { index: 1 });
    await page.waitForTimeout(4000);
});