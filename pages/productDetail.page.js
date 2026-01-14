const { expect } = require('@playwright/test');

class DetailProductPage {
    constructor(page) {
        this.page = page;
        this.btpButton = page.locator('[data-test="back-to-products"]');
    }

    getAddButtonLocator() {
        return this.page.locator('button:has-text("Add to cart"), button:has-text("Remove")');
    }

    getProductCardLocator(productName) {
        return this.page.locator('.inventory_item').filter({ hasText: productName });
    }

    async openProductDetail(productName) {
        await this.getProductCardLocator(productName).locator('.inventory_item_name').click();
    }

    async addProductToCart(productName) {
        await expect(this.page.locator('.inventory_details_name')).toHaveText(productName);

        const addButton = this.getAddButtonLocator();
        await expect(addButton).toBeVisible();

        await addButton.click();

        await expect(addButton).toHaveText('Remove');
    }

    async removeProductFromCart(productName) {
        await expect(this.page.locator('.inventory_details_name')).toHaveText(productName);

        const addButton = this.getAddButtonLocator();
        await expect(addButton).toBeVisible();

        await addButton.click();

        await expect(addButton).toHaveText('Add to cart');
    }

    async addMultipleProducts(products) {
        for (const product of products) {
            await this.openProductDetail(product);
            await this.addProductToCart(product);
            await this.btpButton.click();
        }
    }
}

module.exports = DetailProductPage;