const { test } = require('../fixtures/auth.fixture');
const  ProductsPage  = require('../pages/products.page');
import { LoginPage } from '../pages/login.page';
import dotenv from 'dotenv';
dotenv.config();


test.describe('Login Feature', () => {
test('user fill valid login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(process.env.USERNAME, process.env.PASSWORD);

    await loginPage.assertLoggedIn();
});

test('user fill invalid username and password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login('qwert', '123');

    await loginPage.assertLoginNotMatch();
});

test('user fill valid username and invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(process.env.USERNAME, '123');

    await loginPage.assertLoginNotMatch();
});

test('user fill invalid username and valid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login('qwerty', process.env.PASSWORD);

    await loginPage.assertLoginNotMatch();
});

test('user fill empty username and valid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login('', process.env.PASSWORD);

    await loginPage.assertLoginBlankUsername();
});

test('user fill valid username and empty password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(process.env.USERNAME, '');

    await loginPage.assertLoginBlankPassword();
});

test('user fill blank username and password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login('', '');

    await loginPage.assertLoginBlankUsername();
});

test('user fill locked username and password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login('locked_out_user', process.env.PASSWORD);

    await loginPage.assertLoginLocked();
});

});

test.describe('Logout Feature', () => {
    test('user can logout', async ({ authenticatedPage }) => {
    const productsPage = new ProductsPage(authenticatedPage);

    await productsPage.logout();

    await productsPage.assertLoggedOut();
});

});