const { expect } = require('chai');
const config = require('../config');
const { createDriver, screenshotOnFailure } = require('./helpers');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');

describe('Cart', function () {
  let driver, products, cart;
  const BACKPACK = 'Sauce Labs Backpack';
  const LIGHT = 'Sauce Labs Bike Light';

  beforeEach(async () => {
    driver = await createDriver();
    const login = new LoginPage(driver);
    await login.load();
    await login.login(config.users.standard.username, config.users.standard.password);
    products = new ProductsPage(driver);
    cart = new CartPage(driver);
  });
  afterEach(async function () { await screenshotOnFailure(driver, this); await driver.quit(); });

  it('TC-C01 add one item updates badge @smoke @regression', async () => {
    await products.addToCart(BACKPACK);
    expect(await products.cartCount()).to.equal(1);
  });

  it('TC-C02 add multiple items shows all in cart @regression', async () => {
    await products.addToCart(BACKPACK);
    await products.addToCart(LIGHT);
    await products.openCart();
    expect(await cart.itemNames()).to.have.members([BACKPACK, LIGHT]);
  });

  it('TC-C03 remove item clears badge @regression', async () => {
    await products.addToCart(BACKPACK);
    await products.removeFromCart(BACKPACK);
    expect(await products.cartCount()).to.equal(0);
  });

  it('TC-C04 empty cart has no items (negative) @regression', async () => {
    await products.openCart();
    expect(await cart.itemCount()).to.equal(0);
  });
});
