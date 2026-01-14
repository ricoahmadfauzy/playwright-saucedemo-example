const { test } = require('../fixtures/auth.fixture');
const  CheckoutPage  = require('../pages/checkout.page');
const CartPage = require('../pages/cart.page');
const DetailProductPage = require('../pages/productDetail.page')
const  ProductsPage  = require('../pages/products.page');
import dotenv from 'dotenv';
dotenv.config();


test.describe('Add Products Feature', () => {
    test('user can add product', async ({ authenticatedPage }) => {
        const productsPage = new ProductsPage(authenticatedPage);
        
        const product = 'Sauce Labs Backpack';

        await productsPage.addProductToCart(product);

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

test.describe('Add Products From Detail Feature', () => {
    test('user can add product from detail page', async ({ authenticatedPage }) => {
        const detailProductPage = new DetailProductPage(authenticatedPage);
        
        const product = 'Sauce Labs Backpack';

        await detailProductPage.openProductDetail(product);

        await detailProductPage.addProductToCart(product);

    });

    test('user can add multiple products from detail page', async ({ authenticatedPage }) => {
        const detailProductPage = new DetailProductPage(authenticatedPage);

        const products = [
            'Sauce Labs Backpack',
            'Sauce Labs Bolt T-Shirt'
        ];
        
        await detailProductPage.addMultipleProducts(products);

    });

});

test.describe('Remove Products From Detail Feature', () => {
    test('user can remove products from detail page', async ({ authenticatedPage }) => {
        const detailProductPage = new DetailProductPage(authenticatedPage);

        const products = [
            'Sauce Labs Backpack',
            'Sauce Labs Bolt T-Shirt'
        ];
        
        await detailProductPage.addMultipleProducts(products);

        await detailProductPage.openProductDetail('Sauce Labs Backpack');

        await detailProductPage.removeProductFromCart('Sauce Labs Backpack');

    });

});

test.describe('Add Products To Cart Feature', () => {
    test('user can add product to cart', async ({ authenticatedPage }) => {
        const productsPage = new ProductsPage(authenticatedPage);
        const cartPage = new CartPage(authenticatedPage);

        const product = 'Sauce Labs Backpack';
        
        await productsPage.addProductToCart(product);

        await productsPage.assertCartCount();

        await productsPage.gotoCartPage();

        await cartPage.assertProductInCart(product);

        await cartPage.assertCartCount(1);
    });

    test('user can add multiple products to cart', async ({ authenticatedPage }) => {
        const productsPage = new ProductsPage(authenticatedPage);
        const cartPage = new CartPage(authenticatedPage);

        const products = [
            'Sauce Labs Backpack',
            'Sauce Labs Bolt T-Shirt'
        ];
        
        await productsPage.addMultipleProducts(products);

        await productsPage.assertCartCount();

        await productsPage.gotoCartPage();

        await cartPage.assertAllProductsInCart(products);

        await cartPage.assertCartCount(products.length);
    });

});

test.describe('Remove Products To Cart Feature', () => {
    test('user can remove product to cart', async ({ authenticatedPage }) => {
        const productsPage = new ProductsPage(authenticatedPage);
        const cartPage = new CartPage(authenticatedPage);

        const product = 'Sauce Labs Backpack';
        
        await productsPage.addProductToCart(product);

        await productsPage.assertCartCount();

        await productsPage.gotoCartPage();

        await cartPage.assertAllProductsInCart(product);

        await cartPage.assertCartCount(1);

        await cartPage.removeProductFromCart(product);

        await cartPage.assertCartCount(0);
    });

    test('user can remove one products to cart', async ({ authenticatedPage }) => {
        const productsPage = new ProductsPage(authenticatedPage);
        const cartPage = new CartPage(authenticatedPage);

        const products = [
            'Sauce Labs Backpack',
            'Sauce Labs Bolt T-Shirt'
        ];
        
        await productsPage.addMultipleProducts(products);

        await productsPage.assertCartCount();

        await productsPage.gotoCartPage();

        await cartPage.assertAllProductsInCart(products);

        await cartPage.assertCartCount(products.length);

        await cartPage.removeProductFromCart('Sauce Labs Backpack');

        await cartPage.assertCartCount(1);
    });

    test('user can remove all products to cart', async ({ authenticatedPage }) => {
        const productsPage = new ProductsPage(authenticatedPage);
        const cartPage = new CartPage(authenticatedPage);

        const products = [
            'Sauce Labs Backpack',
            'Sauce Labs Bolt T-Shirt'
        ];
        
        await productsPage.addMultipleProducts(products);

        await productsPage.assertCartCount();

        await productsPage.gotoCartPage();

        await cartPage.assertAllProductsInCart(products);

        await cartPage.assertCartCount(products.length);

        await cartPage.removeAllProductsFromCart();

        await cartPage.assertCartCount(0);
    });

});

test.describe('Add Products To Checkout Feature', () => {
    test('user can add product until finish order', async ({ authenticatedPage }) => {
        const productsPage = new ProductsPage(authenticatedPage);
        const cartPage = new CartPage(authenticatedPage);
        const checkoutPage = new CheckoutPage(authenticatedPage);

        const product = 'Sauce Labs Backpack';
        
        await productsPage.addProductToCart(product);

        await productsPage.assertCartCount();

        await productsPage.gotoCartPage();

        await cartPage.assertProductInCart(product);

        await cartPage.assertCartCount(1);

        const total = await cartPage.getTotalPrice([product]);

        await cartPage.gotoCheckoutPage(process.env.FIRSTNAME, process.env.LASTNAME, process.env.POSTALCODE)

        await checkoutPage.assertSubtotal(total);

        await checkoutPage.assertFinishOrder();

    });

    test('user can add multiple products until finish order', async ({ authenticatedPage }) => {
        const productsPage = new ProductsPage(authenticatedPage);
        const cartPage = new CartPage(authenticatedPage);
        const checkoutPage = new CheckoutPage(authenticatedPage);

        const products = [
            'Sauce Labs Backpack',
            'Sauce Labs Bolt T-Shirt'
        ];
        
        await productsPage.addMultipleProducts(products);

        await productsPage.assertCartCount();

        await productsPage.gotoCartPage();

        await cartPage.assertAllProductsInCart(products);

        await cartPage.assertCartCount(products.length);

        const total = await cartPage.getTotalPrice(products);

        await cartPage.gotoCheckoutPage(process.env.FIRSTNAME, process.env.LASTNAME, process.env.POSTALCODE)

        await checkoutPage.assertSubtotal(total);

        await checkoutPage.assertFinishOrder();
    });

});