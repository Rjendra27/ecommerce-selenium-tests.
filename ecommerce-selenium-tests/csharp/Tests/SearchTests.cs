namespace ECommerceTests.Tests;

[TestFixture, Category("Regression")]
public class SearchTests : BaseTest
{
    [Test]
    public void TC_S01_KeywordReturnsMatch()
    {
        var results = LoginAsStandardUser().Search("Backpack");
        Assert.That(results, Is.EqualTo(new[] { "Sauce Labs Backpack" }));
    }

    [Test]
    public void TC_S02_UnknownKeywordReturnsNothing()
    {
        Assert.That(LoginAsStandardUser().Search("xyz-not-a-product"), Is.Empty);
    }

    [Test]
    public void TC_S03_SortPriceLowToHigh()
    {
        var page = LoginAsStandardUser();
        page.SortBy("Price (low to high)");
        var prices = page.ProductPrices();
        Assert.That(prices, Is.Ordered.Ascending);
    }
}
