const { until } = require('selenium-webdriver');

class BasePage {
  constructor(driver) { this.driver = driver; }

  async open(url) { await this.driver.get(url); }

  async find(locator, timeout = 10000) {
    const el = await this.driver.wait(until.elementLocated(locator), timeout);
    await this.driver.wait(until.elementIsVisible(el), timeout);
    return el;
  }

  async click(locator) { await (await this.find(locator)).click(); }

  async type(locator, text) {
    const el = await this.find(locator);
    await el.clear();
    await el.sendKeys(text);
  }

  async text(locator) { return (await this.find(locator)).getText(); }

  async exists(locator) {
    return (await this.driver.findElements(locator)).length > 0;
  }
}

module.exports = BasePage;
