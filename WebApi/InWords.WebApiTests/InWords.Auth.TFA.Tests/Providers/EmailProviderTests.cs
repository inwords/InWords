namespace InWords.Service.TFA.Tests
{
    using InWords.Service.TFA;
    using InWords.Service.TFA.Providers;
    using Xunit;

    public class EmailProviderTests
    {
        [Fact]
        public void SendMailTest1()
        {
            IEmailProvider emailProvider = new EmailProvider();

            Email email = new Email()
            {
                Recipients = { "anzer987@ya.ru" },
                Subject = "Авторизация",
                Body = "Это тестовое сообщение на него не нужно отвечать",
                Sender = "no-reply@inwords.ru"
            };

            emailProvider.Send(email);
        }
    }
}
