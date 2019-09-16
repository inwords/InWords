using InWords.Data.Domains.EmailEntitys;
using InWords.Data.Repositories.Interfaces;
using InWords.WebApi.Services.Email;
using Moq;
using System;
using System.Collections.Generic;
using Xunit;
namespace InWords.BLTests.Service.Email
{
    public class EmailCodeSenderServiceTest
    {
        [Theory]
        [InlineData(3)]
        public void GetTimeoutTests(int seconds)
        {
            // Arrange
            int expectedSeconds = EmailCodeSenderService.EMAIL_TIMEOUT * 60 - seconds;
            var mock = new Mock<IEmailVerifierRepository>();
            mock.Setup(a => a.GetWhere(It.IsAny<Func<EmailVerifier, bool>>())).Returns(new List<EmailVerifier>()
            {
                new EmailVerifier()
                {
                    SentTime = DateTime.UtcNow.AddSeconds(-seconds),
                    UserId = 0
                }
            });
            EmailCodeSenderService emailCodeSenderService = new EmailCodeSenderService(mock.Object, null);
            // act
            int actualSeconds = emailCodeSenderService.GetTimeout(0);
            // assert
            Assert.Equal(expectedSeconds, actualSeconds);
        }
    }
}
