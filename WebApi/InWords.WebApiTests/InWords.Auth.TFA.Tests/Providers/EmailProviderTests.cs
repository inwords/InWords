namespace InWords.Auth.TFA.Tests
{
    using InWords.Auth.TFA.Providers;
    using System;
    using Xunit;

    public class EmailProviderTests
    {
        [Fact]
        public void SendMailTest1()
        {
            var EmailProvider = new EmailProvider();

            EmailProvider.SendMail();
        }
    }
}
