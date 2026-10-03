using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;

namespace ECommerceTests.Pages;

public abstract class BasePage
{
    protected readonly IWebDriver Driver;
    protected readonly WebDriverWait Wait;

    protected BasePage(IWebDriver driver)
    {
        Driver = driver;
        Wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
    }

    protected IWebElement Find(By by) =>
        Wait.Until(d =>
        {
            var el = d.FindElement(by);
            return el.Displayed ? el : null;
        });

    protected void Click(By by) => Find(by).Click();

    protected void Type(By by, string text)
    {
        var el = Find(by);
        el.Clear();
        el.SendKeys(text);
    }

    protected string TextOf(By by) => Find(by).Text;
    protected bool Exists(By by) => Driver.FindElements(by).Count > 0;
}
