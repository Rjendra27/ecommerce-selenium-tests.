namespace ECommerceTests.Tests;

[TestFixture, Category("Regression")]
public class CartTests : BaseTest
{
    private const string Backpack = "Sauce Labs Backpack";
    private const string Light = "Sauce Labs Bike Light";

    [Test, Category("Smoke")]
    public void TC_C01_AddItemUpdatesBadge()
    {
        var page = LoginAsStandardUser();
        page.AddToCart(Backpack);
        Assert.That(page.CartCount(), Is.EqualTo(1));
    }

    [Test]
    public void TC_C02_MultipleItemsAppearInCart()
    {
        var page = LoginAsStandardUser();
        page.AddToCart(Backpack);
        page.AddToCart(Light);
        page.OpenCart();
        var cart = new Pages.CartPage(Driver);
        Assert.That(cart.ItemNames(), Is.EquivalentTo(new[] { Backpack, Light }));
    }

    [Test]
    public void TC_C03_RemoveItemClearsBadge()
    {
        var page = LoginAsStandardUser();
        page.AddToCart(Backpack);
        page.RemoveFromCart(Backpack);
        Assert.That(page.CartCount(), Is.EqualTo(0));
    }
}
