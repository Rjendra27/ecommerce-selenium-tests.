using OpenQA.Selenium;

namespace ECommerceTests.Pages;

public class CheckoutPage : BasePage
{
    private readonly By _first = By.Id("first-name");
    private readonly By _last = By.Id("last-name");
    private readonly By _zip = By.Id("postal-code");
    private readonly By _continue = By.Id("continue");
    private readonly By _finish = By.Id("finish");
    private readonly By _error = By.CssSelector("[data-test='error']");
    private readonly By _confirm = By.CssSelector(".complete-header");

    public CheckoutPage(IWebDriver d) : base(d) { }

    public void FillInfo(string first, string last, string zip)
    {
        Type(_first, first);
        Type(_last, last);
        Type(_zip, zip);
        Click(_continue);
    }

    public void Finish() => Click(_finish);
    public string ErrorMessage() => TextOf(_error);
    public string ConfirmationText() => TextOf(_confirm);
}
