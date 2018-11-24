namespace InWords.Service.TFA.Tests.Controllers
{
    using InWords.Service.TFA.Controllers;
    using Xunit;
    public class EmailControllerTests
    {
        [Theory]
        [InlineData("anzer987@ya.ru")]
        public async void SendKeyLength6ToEmail(string email)
        {
            var emailController = new EmailController();
            var key = await emailController.ConfirmEmail(email);
            Assert.True(key.Length == 6);
        }
    }
}
