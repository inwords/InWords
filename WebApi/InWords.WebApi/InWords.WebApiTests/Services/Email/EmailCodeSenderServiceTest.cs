using InWords.Data.Domains;
using InWords.Data.Domains.EmailEntitys;
using InWords.Data.Repositories.Interfaces;
using InWords.WebApi.Services.Email;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace InWords.WebApiTests.Services.Email
{
    public class EmailCodeSenderServiceTest
    {
        private IEmailVerifierRepository MockEmailRepo(int userId, int secondsTimeout)
        {
            var mock = new Mock<IEmailVerifierRepository>();
            mock.Setup(a => a.GetWhere(It.IsAny<Func<EmailVerifies, bool>>())).Returns(new List<EmailVerifies>
            {
                new EmailVerifies
                {
                    SentTime = DateTime.UtcNow.AddSeconds(-secondsTimeout),
                    UserId = userId
                }
            });
            return mock.Object;
        }

        [Theory]
        [InlineData(3)]
        public void GetTimeoutTests(int seconds)
        {
            // Arrange
            var userId = 0;
            int expectedSeconds = EmailCodeSenderService.EMAIL_TIMEOUT * 60 - seconds;
            IEmailVerifierRepository repo = MockEmailRepo(userId, seconds);
            var emailCodeSenderService = new EmailCodeSenderService(repo, null);
            // act
            int actualSeconds = emailCodeSenderService.GetTimeout(userId);
            // assert
            Assert.Equal(expectedSeconds, actualSeconds);
        }

        [Fact]
        public async Task TrySendEmailOnTimeout()
        {
            var userId = 0;
            var user = new User
            {
                UserId = userId
            };
            var seconds = 3;
            IEmailVerifierRepository repo = MockEmailRepo(userId, seconds);
            var emailCodeSenderService = new EmailCodeSenderService(repo, null);
            await Assert.ThrowsAsync<TimeoutException>(() =>
                emailCodeSenderService.SendCodeByEmail(user, "email", 0, "Link"));
        }
    }
}