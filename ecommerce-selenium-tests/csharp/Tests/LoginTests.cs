using ECommerceTests.Pages;

namespace ECommerceTests.Tests;

[TestFixture]
public class LoginTests : BaseTest
{
    private LoginPage _login;

    [SetUp]
    public void Open() => _login = new LoginPage(Driver).Load();

    [Test, Category("Smoke"), Category("Regression")]
    public void TC_L01_ValidLogin()
    {
        _login.Login("standard_user", "secret_sauce");
        Assert.That(new ProductsPage(Driver).IsLoaded(), Is.True);
    }

    [TestCase("standard_user", "wrong_pass", "do not match")]
    [TestCase("", "secret_sauce", "Username is required")]
    [TestCase("standard_user", "", "Password is required")]
    [TestCase("locked_out_user", "secret_sauce", "locked out")]
    [TestCase("' OR '1'='1", "' OR '1'='1", "do not match")]
    [Category("Regression")]
    public void TC_L02_InvalidLogin_ShowsError(string user, string pass, string expectedError)
    {
        _login.Login(user, pass);
        Assert.That(_login.ErrorMessage(), Does.Contain(expectedError));
    }
}
