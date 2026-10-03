const { expect } = require('chai');
const config = require('../config');
const { createDriver, screenshotOnFailure } = require('./helpers');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');

describe('Checkout', function () {
  let driver, checkout;

  beforeEach(async () => {
    driver = await createDriver();
    const login = new LoginPage(driver);
    await login.load();
    await login.login(config.users.standard.username, config.users.standard.password);
    const products = new ProductsPage(driver);
    await products.addToCart('Sauce Labs Backpack');
    await products.openCart();
    await new CartPage(driver).checkout();
    checkout = new CheckoutPage(driver);
  });
  afterEach(async function () { await screenshotOnFailure(driver, this); await driver.quit(); });

  it('TC-K01 complete purchase end-to-end @smoke @regression', async () => {
    await checkout.fillInfo('Test', 'User', '110001');
    await checkout.finish();
    expect(await checkout.confirmationText()).to.equal('Thank you for your order!');
  });

  it('TC-K02 missing first name shows error @regression', async () => {
    await checkout.fillInfo('', 'User', '110001');
    expect(await checkout.errorMessage()).to.include('First Name is required');
  });

  it('TC-K03 missing last name shows error @regression', async () => {
    await checkout.fillInfo('Test', '', '110001');
    expect(await checkout.errorMessage()).to.include('Last Name is required');
  });

  it('TC-K04 missing postal code shows error @regression', async () => {
    await checkout.fillInfo('Test', 'User', '');
    expect(await checkout.errorMessage()).to.include('Postal Code is required');
  });
});
