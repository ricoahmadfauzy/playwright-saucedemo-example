const { expect } = require('@playwright/test');

class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.subtotalLabel = page.locator('.summary_subtotal_label');
        this.finishButton = page.locator('#finish');
        this.finishText = page.locator('[data-test="complete-header"]');
        this.homeButton = page.locator('#back-to-products');
    }

    async getSubtotal() {
        const text = await this.subtotalLabel.textContent();
        const match = text.match(/\$([\d\.]+)/);
        return parseFloat(match[1]);
    }

    async assertSubtotal(expectedTotal) {
        const actualTotal = await this.getSubtotal();
        expect(actualTotal).toBeCloseTo(expectedTotal, 2);
    }

    async assertFinishOrder() {
        await this.finishButton.click();
        await expect(this.finishText).toContainText('Thank you for your order!');
        await this.homeButton.click();
    }
}

module.exports = CheckoutPage;