const { expect } = require('@playwright/test');

class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('#checkout')
        this.infoText = page.locator('[data-test="title"]');
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.alertInformationText = page.locator('[data-test="error"]');
    }

    getCartItemLocator(productName) {
        if (typeof productName !== 'string') {
            throw new Error(`productName must be string, got: ${typeof productName} (${productName})`);
        }
        return this.page.locator('.cart_item .inventory_item_name',{ hasText: productName });
    }

    async getProductPrice(productName) {
        if (Array.isArray(productName)) {
            throw new Error(
                `getProductPrice expects STRING, got ARRAY: ${productName.join(', ')}`
            );
        }
        const cartItem = this.page
            .locator('.cart_item')
            .filter({ hasText: productName });

        await expect(cartItem).toBeVisible();

        const priceText = await cartItem
            .locator('.inventory_item_price')
            .innerText();

        return Number(priceText.replace('$', ''));
    }

    async getTotalPrice(products) {
        if (!Array.isArray(products)) {
            throw new Error(
                `getTotalPrice expects ARRAY, got ${typeof products}: ${products}`
            );
        }
        let total = 0;
        for (const product of products) {
            total += await this.getProductPrice(product);
        }
        return total;
    }

    async assertProductInCart(productName) {
        await expect(this.getCartItemLocator(productName)).toBeVisible();
    }

    async assertAllProductsInCart(products) {
        for (const product of products) {
            await this.assertProductInCart(product);
        }
    }

    async removeProductFromCart(productName) {
        const removeButton = this.page.locator(`.cart_item:has-text("${productName}") button`);
   
        await expect(removeButton).toBeVisible();
        await removeButton.click();

        const cartItem = this.getCartItemLocator(productName);
        await expect(cartItem).toHaveCount(0);
    }

    async removeAllProductsFromCart() {

        const count = await this.cartItems.count();

        for (let i = 0; i < count; i++) {
            const removeButton = this.page.locator('.cart_item button').first();
            await removeButton.click();
        }
        await expect(this.cartItems).toHaveCount(0);
    }

    async assertCartCount(count) {
        await expect(this.cartItems).toHaveCount(count);
    }

    async gotoCheckoutPage(fristName, lastName, postalCode) {
        await this.checkoutButton.click();
        await expect(this.infoText).toContainText('Checkout: Your Information');
        await this.firstNameInput.fill(fristName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
    }

    async assertInformationFirstName() {
        await expect(this.alertInformationText).toContainText('Error: First Name is required');
    }

    async assertInformationLastName() {
        await expect(this.alertInformationText).toContainText('Error: Last Name is required');
    }

    async assertInformationPostalCode() {
        await expect(this.alertInformationText).toContainText('Error: Postal Code is required');
    }
}

module.exports = CartPage;