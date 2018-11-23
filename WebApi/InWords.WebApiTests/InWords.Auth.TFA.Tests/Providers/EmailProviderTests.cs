namespace InWords.Auth.TFA.Tests
{
    using InWords.Auth.TFA.Providers;
    using Xunit;

    public class EmailProviderTests
    {
        [Fact]
        public void SendMailTest1()
        {
            IEmailProvider emailProvider = new EmailProvider();

            Email email = new Email()
            {

            };

            emailProvider.Send(email);
        }
    }
}
