using InWords.Auth.TFA.Providers;
using System;
using Xunit;

namespace InWords.Auth.TFA.Tests
{
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
