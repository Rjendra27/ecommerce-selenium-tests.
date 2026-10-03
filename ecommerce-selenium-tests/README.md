# E-Commerce Web App Automation Testing

Selenium WebDriver suites in **JavaScript (Mocha + Chai)** and **C# (NUnit)** using the Page Object Model.
Target: https://www.saucedemo.com (public demo store). Swap locators in `Pages/` to point at your own app.

## JavaScript
```bash
cd js
npm install
npm test                  # all tests
npm run test:smoke        # @smoke only
npm run test:regression   # @regression only
HEADLESS=true npm test    # headless Chrome
```

## C#
```bash
cd csharp
dotnet test
dotnet test --filter "Category=Smoke"
dotnet test --filter "Category=Regression"
HEADLESS=true dotnet test
```

Requires Chrome. Selenium 4.6+ downloads the matching driver automatically.
Failed tests save a screenshot (`js/screenshots/`, `csharp/.../screenshots/`) to attach to Jira bugs; see `docs/JIRA_BUG_TEMPLATE.md`.
