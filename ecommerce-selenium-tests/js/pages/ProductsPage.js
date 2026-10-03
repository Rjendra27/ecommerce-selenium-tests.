const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');

class ProductsPage extends BasePage {
  title      = By.css('.title');
  items      = By.css('.inventory_item');
  names      = By.css('.inventory_item_name');
  prices     = By.css('.inventory_item_price');
  sortSelect = By.css('[data-test="product-sort-container"]');
  cartLink   = By.css('.shopping_cart_link');
  cartBadge  = By.css('.shopping_cart_badge');

  slug(name) { return name.toLowerCase().replace(/\s+/g, '-'); }

  async isLoaded() { return (await this.text(this.title)) === 'Products'; }

  async productNames() {
    const els = await this.driver.findElements(this.names);
    return Promise.all(els.map(e => e.getText()));
  }

  async productPrices() {
    const els = await this.driver.findElements(this.prices);
    return Promise.all(els.map(async e => parseFloat((await e.getText()).replace('$', ''))));
  }

  // "Search": filter the product list by keyword (client-side match on names)
  async search(keyword) {
    const all = await this.productNames();
    return all.filter(n => n.toLowerCase().includes(keyword.toLowerCase()));
  }

  async sortBy(optionText) {
    const select = await this.find(this.sortSelect);
    const option = await select.findElement(By.xpath(`.//option[text()="${optionText}"]`));
    await option.click();
  }

  async addToCart(productName) {
    await this.click(By.id(`add-to-cart-${this.slug(productName)}`));
  }

  async removeFromCart(productName) {
    await this.click(By.id(`remove-${this.slug(productName)}`));
  }

  async cartCount() {
    if (!(await this.exists(this.cartBadge))) return 0;
    return parseInt(await this.text(this.cartBadge), 10);
  }

  async openCart() { await this.click(this.cartLink); }
}

module.exports = ProductsPage;
