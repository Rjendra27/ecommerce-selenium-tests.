const { expect } = require('chai');
const config = require('../config');
const { createDriver, screenshotOnFailure } = require('./helpers');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');

describe('Product search & sort', function () {
  let driver, products;

  beforeEach(async () => {
    driver = await createDriver();
    const login = new LoginPage(driver);
    await login.load();
    await login.login(config.users.standard.username, config.users.standard.password);
    products = new ProductsPage(driver);
  });
  afterEach(async function () { await screenshotOnFailure(driver, this); await driver.quit(); });

  it('TC-S01 keyword returns matching products @regression', async () => {
    const results = await products.search('Backpack');
    expect(results).to.deep.equal(['Sauce Labs Backpack']);
  });

  it('TC-S02 keyword is case-insensitive @regression', async () => {
    expect((await products.search('bOlT')).length).to.equal(1);
  });

  it('TC-S03 unknown keyword returns no results (negative) @regression', async () => {
    expect(await products.search('xyz-not-a-product')).to.be.empty;
  });

  it('TC-S04 sort price low to high @regression', async () => {
    await products.sortBy('Price (low to high)');
    const prices = await products.productPrices();
    expect(prices).to.deep.equal([...prices].sort((a, b) => a - b));
  });

  it('TC-S05 sort name Z to A @regression', async () => {
    await products.sortBy('Name (Z to A)');
    const names = await products.productNames();
    expect(names).to.deep.equal([...names].sort().reverse());
  });
});
