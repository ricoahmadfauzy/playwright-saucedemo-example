const { test } = require('../fixtures/auth.fixture');
const  ProductsPage  = require('../pages/products.page');


test.describe('Add Products Feature', () => {
    test('user can add product', async ({ authenticatedPage }) => {
        const productsPage = new ProductsPage(authenticatedPage);
        
        await productsPage.addProductToCart('Sauce Labs Backpack');

        await productsPage.assertCartCount();
    });

    test('user can add multiple products', async ({ authenticatedPage }) => {
        const productsPage = new ProductsPage(authenticatedPage);

        const products = [
            'Sauce Labs Backpack',
            'Sauce Labs Bolt T-Shirt'
        ];
        
        await productsPage.addMultipleProducts(products);

        await productsPage.assertCartCount();
    });

});

test.describe('Remove Products Feature', () => {
    test('user can remove product', async ({ authenticatedPage }) => {
        const productsPage = new ProductsPage(authenticatedPage);

        const product = 'Sauce Labs Backpack';
        
        await productsPage.addProductToCart(product);

        await productsPage.assertCartCount();

        await productsPage.removeProductFromCart(product);

        await productsPage.assertCartCount();
    });

    test('user can remove multiple products', async ({ authenticatedPage }) => {
        const productsPage = new ProductsPage(authenticatedPage);

        const products = [
            'Sauce Labs Backpack',
            'Sauce Labs Bolt T-Shirt'
        ];
        
        await productsPage.addMultipleProducts(products);

        await productsPage.assertCartCount();

        await productsPage.removeAllProducts(products);

        await productsPage.assertCartCount();
    });
});