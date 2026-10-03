const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');

class CheckoutPage extends BasePage {
  firstName  = By.id('first-name');
  lastName   = By.id('last-name');
  postalCode = By.id('postal-code');
  continueBtn = By.id('continue');
  finishBtn   = By.id('finish');
  error       = By.css('[data-test="error"]');
  confirmation = By.css('.complete-header');
  total = By.css('.summary_total_label');

  async fillInfo(first, last, zip) {
    if (first !== undefined) await this.type(this.firstName, first);
    if (last  !== undefined) await this.type(this.lastName, last);
    if (zip   !== undefined) await this.type(this.postalCode, zip);
    await this.click(this.continueBtn);
  }

  async finish() { await this.click(this.finishBtn); }
  async errorMessage() { return this.text(this.error); }
  async confirmationText() { return this.text(this.confirmation); }
}

module.exports = CheckoutPage;
