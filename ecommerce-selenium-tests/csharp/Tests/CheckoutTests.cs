using ECommerceTests.Pages;

namespace ECommerceTests.Tests;

[TestFixture, Category("Regression")]
public class CheckoutTests : BaseTest
{
    private CheckoutPage _checkout;

    [SetUp]
    public void GoToCheckout()
    {
        var products = LoginAsStandardUser();
        products.AddToCart("Sauce Labs Backpack");
        products.OpenCart();
        new CartPage(Driver).Checkout();
        _checkout = new CheckoutPage(Driver);
    }

    [Test, Category("Smoke")]
    public void TC_K01_CompletePurchase()
    {
        _checkout.FillInfo("Test", "User", "110001");
        _checkout.Finish();
        Assert.That(_checkout.ConfirmationText(), Is.EqualTo("Thank you for your order!"));
    }

    [TestCase("", "User", "110001", "First Name is required")]
    [TestCase("Test", "", "110001", "Last Name is required")]
    [TestCase("Test", "User", "", "Postal Code is required")]
    public void TC_K02_MissingField_ShowsError(string first, string last, string zip, string expected)
    {
        _checkout.FillInfo(first, last, zip);
        Assert.That(_checkout.ErrorMessage(), Does.Contain(expected));
    }
}
