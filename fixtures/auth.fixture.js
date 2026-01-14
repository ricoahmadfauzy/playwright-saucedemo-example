import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import dotenv from 'dotenv';
dotenv.config();

export const test = base.extend({
    authenticatedPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);

         await loginPage.goto();
         await loginPage.login(process.env.USERNAME, process.env.PASSWORD);
         await loginPage.assertLoggedIn();

         await use(page);
    },
});

exports.expect = require('@playwright/test').expect;