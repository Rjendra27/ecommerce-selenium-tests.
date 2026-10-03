const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');
const config = require('../config');

class LoginPage extends BasePage {
  username = By.id('user-name');
  password = By.id('password');
  loginBtn = By.id('login-button');
  error    = By.css('[data-test="error"]');

  async load() { await this.open(config.baseUrl); }

  async login(user, pass) {
    await this.type(this.username, user);
    await this.type(this.password, pass);
    await this.click(this.loginBtn);
  }

  async errorMessage() { return this.text(this.error); }
}

module.exports = LoginPage;
