const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');

class CartPage extends BasePage {
  items       = By.css('.cart_item');
  names       = By.css('.inventory_item_name');
  checkoutBtn = By.id('checkout');

  async itemNames() {
    const els = await this.driver.findElements(this.names);
    return Promise.all(els.map(e => e.getText()));
  }

  async itemCount() { return (await this.driver.findElements(this.items)).length; }

  async checkout() { await this.click(this.checkoutBtn); }
}

module.exports = CartPage;
