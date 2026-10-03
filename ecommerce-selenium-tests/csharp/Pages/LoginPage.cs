using OpenQA.Selenium;

namespace ECommerceTests.Pages;

public class LoginPage : BasePage
{
    private readonly By _user = By.Id("user-name");
    private readonly By _pass = By.Id("password");
    private readonly By _btn = By.Id("login-button");
    private readonly By _error = By.CssSelector("[data-test='error']");

    public LoginPage(IWebDriver d) : base(d) { }

    public LoginPage Load()
    {
        Driver.Navigate().GoToUrl("https://www.saucedemo.com/");
        return this;
    }

    public void Login(string user, string pass)
    {
        Type(_user, user);
        Type(_pass, pass);
        Click(_btn);
    }

    public string ErrorMessage() => TextOf(_error);
}
