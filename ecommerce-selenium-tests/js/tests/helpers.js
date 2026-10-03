const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');
const config = require('../config');

async function createDriver() {
  const opts = new chrome.Options();
  opts.addArguments('--window-size=1366,900', '--disable-notifications');
  // Disable Chrome password-manager popups that can block clicks
  opts.setUserPreferences({ credentials_enable_service: false, 'profile.password_manager_enabled': false });
  if (config.headless) opts.addArguments('--headless=new');
  return new Builder().forBrowser('chrome').setChromeOptions(opts).build();
}

// Save a screenshot when a test fails (attach to Jira defect)
async function screenshotOnFailure(driver, ctx) {
  if (ctx.currentTest && ctx.currentTest.state === 'failed') {
    const dir = path.join(__dirname, '..', 'screenshots');
    fs.mkdirSync(dir, { recursive: true });
    const name = ctx.currentTest.title.replace(/[^a-z0-9]+/gi, '_') + '.png';
    fs.writeFileSync(path.join(dir, name), await driver.takeScreenshot(), 'base64');
  }
}

module.exports = { createDriver, screenshotOnFailure };
