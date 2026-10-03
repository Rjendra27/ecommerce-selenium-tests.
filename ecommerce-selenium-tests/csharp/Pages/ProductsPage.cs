using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;

namespace ECommerceTests.Pages;

public class ProductsPage : BasePage
{
    private readonly By _title = By.CssSelector(".title");
    private readonly By _names = By.CssSelector(".inventory_item_name");
    private readonly By _prices = By.CssSelector(".inventory_item_price");
    private readonly By _sort = By.CssSelector("[data-test='product-sort-container']");
    private readonly By _cartLink = By.CssSelector(".shopping_cart_link");
    private readonly By _badge = By.CssSelector(".shopping_cart_badge");

    public ProductsPage(IWebDriver d) : base(d) { }

    private static string Slug(string name) => name.ToLower().Replace(' ', '-');

    public bool IsLoaded() => TextOf(_title) == "Products";

    public List<string> ProductNames() =>
        Driver.FindElements(_names).Select(e => e.Text).ToList();

    public List<double> ProductPrices() =>
        Driver.FindElements(_prices)
              .Select(e => double.Parse(e.Text.Replace("$", "")))
              .ToList();

    public List<string> Search(string keyword) =>
        ProductNames()
            .Where(n => n.Contains(keyword, StringComparison.OrdinalIgnoreCase))
            .ToList();

    public void SortBy(string option) =>
        new SelectElement(Find(_sort)).SelectByText(option);

    public void AddToCart(string product) => Click(By.Id($"add-to-cart-{Slug(product)}"));
    public void RemoveFromCart(string product) => Click(By.Id($"remove-{Slug(product)}"));

    public int CartCount() => Exists(_badge) ? int.Parse(TextOf(_badge)) : 0;
    public void OpenCart() => Click(_cartLink);
}
