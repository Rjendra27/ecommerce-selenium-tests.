using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using ECommerceTests.Pages;

namespace ECommerceTests.Tests;

public abstract class BaseTest
{
    protected IWebDriver Driver;

    [SetUp]
    public void SetUp()
    {
        var options = new ChromeOptions();
        options.AddArgument("--window-size=1366,900");
        options.AddArgument("--disable-notifications");
        options.AddUserProfilePreference("credentials_enable_service", false);
        options.AddUserProfilePreference("profile.password_manager_enabled", false);
        if (Environment.GetEnvironmentVariable("HEADLESS") == "true")
            options.AddArgument("--headless=new");

        Driver = new ChromeDriver(options); // Selenium Manager resolves the driver
    }

    protected ProductsPage LoginAsStandardUser()
    {
        var login = new LoginPage(Driver).Load();
        login.Login("standard_user", "secret_sauce");
        return new ProductsPage(Driver);
    }

    [TearDown]
    public void TearDown()
    {
        if (TestContext.CurrentContext.Result.Outcome.Status == NUnit.Framework.Interfaces.TestStatus.Failed)
        {
            var dir = Path.Combine(TestContext.CurrentContext.WorkDirectory, "screenshots");
            Directory.CreateDirectory(dir);
            var file = Path.Combine(dir, $"{TestContext.CurrentContext.Test.Name}.png");
            ((ITakesScreenshot)Driver).GetScreenshot().SaveAsFile(file);
            TestContext.AddTestAttachment(file);
        }
        Driver.Quit();
        Driver.Dispose();
    }
}
