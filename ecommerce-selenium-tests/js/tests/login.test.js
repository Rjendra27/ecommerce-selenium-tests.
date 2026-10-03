const { expect } = require('chai');
const config = require('../config');
const { createDriver, screenshotOnFailure } = require('./helpers');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');

describe('Login', function () {
  let driver, login;

  beforeEach(async () => { driver = await createDriver(); login = new LoginPage(driver); await login.load(); });
  afterEach(async function () { await screenshotOnFailure(driver, this); await driver.quit(); });

  it('TC-L01 valid user can log in @smoke @regression', async () => {
    await login.login(config.users.standard.username, config.users.standard.password);
    expect(await new ProductsPage(driver).isLoaded()).to.be.true;
  });

  it('TC-L02 wrong password shows error @regression', async () => {
    await login.login(config.users.standard.username, 'wrong_pass');
    expect(await login.errorMessage()).to.include('do not match');
  });

  it('TC-L03 empty username shows required error @regression', async () => {
    await login.login('', 'secret_sauce');
    expect(await login.errorMessage()).to.include('Username is required');
  });

  it('TC-L04 empty password shows required error @regression', async () => {
    await login.login('standard_user', '');
    expect(await login.errorMessage()).to.include('Password is required');
  });

  it('TC-L05 locked out user is blocked @regression', async () => {
    await login.login(config.users.locked.username, config.users.locked.password);
    expect(await login.errorMessage()).to.include('locked out');
  });

  it('TC-L06 SQL-injection style input is rejected @regression', async () => {
    await login.login("' OR '1'='1", "' OR '1'='1");
    expect(await login.errorMessage()).to.include('do not match');
  });
});
