import { expect } from '@playwright/test';
require('dotenv').config();

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.productText = page.locator('[data-test="title"]');
        this.alertLoginText = page.locator('[data-test="error"]');
    }

    async goto(){
        await this.page.goto(process.env.URL);
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async assertLoggedIn() {
        await expect(this.productText).toContainText('Products');
    }

    async assertLoginBlankUsername() {
        await expect(this.alertLoginText).toContainText('Epic sadface: Username is required');
    }

     async assertLoginBlankPassword() {
        await expect(this.alertLoginText).toContainText('Epic sadface: Password is required');
    }

    async assertLoginNotMatch() {
        await expect(this.alertLoginText).toContainText('Epic sadface: Username and password do not match any user in this service');
    }

    async assertLoginLocked() {
        await expect(this.alertLoginText).toContainText('Epic sadface: Sorry, this user has been locked out.');
    }
}