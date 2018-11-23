namespace InWords.Auth.TFA.Tests
{
    using InWords.Auth.TFA.Providers;
    using System;
    using Xunit;

    public class MailgunProviderTests
    {
        [Theory]
        [InlineData("anzer987@yandex.ru")]
        public void SendMailTest1(string email)
        {
            var req = MailgunProvider.SendSimpleMessage(email);
            string content = req.Content;
            Assert.True(req.StatusCode == System.Net.HttpStatusCode.OK);
        }
    }
}
