namespace InWords.Auth.TFA.Tests
{
    using InWords.Auth.TFA.Providers;
    using Xunit;

    public class EmailProviderTests
    {
        [Fact]
        public void SendMailTest1()
        {
            var EmailProvider = new EmailProvider();

            EmailProvider.SendMail();
        }

        [Theory]
        [InlineData("anzer987@ya.ru")]
        public void SendMailMailgunSMTP(string email)
        {
            MailgunProvider.SendMessageSmtp(email);
        }
    }
}
