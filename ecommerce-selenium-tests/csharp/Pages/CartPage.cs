using OpenQA.Selenium;

namespace ECommerceTests.Pages;

public class CartPage : BasePage
{
    private readonly By _items = By.CssSelector(".cart_item");
    private readonly By _names = By.CssSelector(".inventory_item_name");
    private readonly By _checkout = By.Id("checkout");

    public CartPage(IWebDriver d) : base(d) { }

    public List<string> ItemNames() => Driver.FindElements(_names).Select(e => e.Text).ToList();
    public int ItemCount() => Driver.FindElements(_items).Count;
    public void Checkout() => Click(_checkout);
}
