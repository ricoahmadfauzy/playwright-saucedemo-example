import { expect } from "@playwright/test";

class ProductsPage {
    constructor (page) {
        this.page = page;
        this.burgerButton = page.locator('#react-burger-menu-btn');
        this.logoutButton = page.locator('#logout_sidebar_link');
        this.loginContainer = page.locator('#login_button_container');
        this.cartButton = page.locator('[data-test="shopping-cart-link"]');
        this.cartText = page.locator('[data-test="title"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.addedProducts = [];
    }

    async logout() {
        await this.burgerButton.click();
        await this.logoutButton.click();
    }

    async assertLoggedOut() {
        await expect(this.loginContainer).toBeVisible();
    }

    getAddToCartLocator(productName) {
        const dataTestId = 'add-to-cart-' + productName
        .toLowerCase()
        .replace(/\s+/g, '-');
        return this.page.locator(`[data-test="${dataTestId}"]`);
    }

    getRemoveLocator(productName) {
        const dataTestId = 'remove-' + productName
        .toLowerCase()
        .replace(/\s+/g, '-');
        return this.page.locator(`[data-test="${dataTestId}"]`);
    }

    async addProductToCart(productName) {
        const addButton = this.getAddToCartLocator(productName);
        const removeButton = this.getRemoveLocator(productName);
        await addButton.click();
        this.addedProducts.push(productName);
        await expect(removeButton).toBeVisible();
    }

    async removeProductFromCart(productName) {
        await this.getRemoveLocator(productName).click();
        this.addedProducts = this.addedProducts.filter(p => p !== productName);
    }

    async assertCartCount() {
        const count = this.addedProducts.length;
        if (count === 0) {
            const exsits = await this.cartBadge.count();
            if (exsits > 0) {
                await expect(this.cartBadge).toHaveCount(0);
            }
        } else {
            const badge = this.cartBadge;
            await expect(badge).toHaveText(String(count));
        }
    }

    async addMultipleProducts(products) {
        for (const product of products) {
            await this.addProductToCart(product);
            await expect(this.getRemoveLocator(product)).toBeVisible();
        }
    }

    async removeAllProducts() {
        for (const product of [...this.addedProducts]) {
            await this.removeProductFromCart(product);
            await expect(this.getAddToCartLocator(product)).toBeVisible();
        }
    }

    async gotoCartPage() {
        await await this.cartButton.click();
        await expect(this.cartText).toContainText('Your Cart');
    }

}

module.exports = ProductsPage;