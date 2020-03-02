using InWords.Data;
using InWords.WebApi.Services.Email.Abstractions;
using InWords.WebApi.Services.Users.Registration;
using InWords.WebApiTests.Controllers.v1._0;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using InWords.WebApi.Services.Abstractions;
using Xunit;
using System.Linq;
using InWords.Data.Domains;
using InWords.WebApi.gRPC.Services;

namespace InWords.WebApiTests.Services.Users.Registration
{
    public class UserRegistrationTests
    {
        [Fact]
        public async void RegisterUser()
        {
            // arrange
            await using InWordsDataContext context = InWordsDataContextFactory.Create();
            var mock = new Mock<IEmailVerifierService>();
            mock.Setup(a => a.InstatiateVerifierMessage(It.IsAny<User>(), It.IsAny<string>()));
            // act 
            var registration = new UserRegistration(context, mock.Object);
            var test = await registration.HandleRequest(
                new RequestObject<RegistrationRequest, RegistrationReply>(
                    new RegistrationRequest()
                    {
                        Email = "test@email.ru",
                        Password = "testPassword"
                    }))
                    .ConfigureAwait(false);
            // assert 
            Assert.Equal(1, context.Accounts.Count());

            mock.Verify(a => a.InstatiateVerifierMessage(It.IsAny<User>(), It.IsAny<string>()), Times.Once());
        }

        [Fact]
        public async void RegisterExistedEmail()
        {
            string email = "test@email.ru";
            // arrange
            await using InWordsDataContext context = InWordsDataContextFactory.Create();
            Account account = new Account()
            {
                Email = email,
                Hash = new byte[256],
                Role = InWords.Data.Enums.RoleType.Unverified
            };
            User user = new User() { Account = account, NickName = "nick" };
            context.Accounts.Add(account);
            await context.SaveChangesAsync().ConfigureAwait(false);

            var mock = new Mock<IEmailVerifierService>();
            mock.Setup(a => a.InstatiateVerifierMessage(It.IsAny<User>(), It.IsAny<string>()));
            // act 
            var registration = new UserRegistration(context, mock.Object);
            // assert 
            await Assert.ThrowsAsync<ArgumentException>(() => registration.HandleRequest(
                new RequestObject<RegistrationRequest, RegistrationReply>(
                new RegistrationRequest()
                {
                    Email = email,
                    Password = "testPassword"
                })));

            Assert.Equal(1, context.Accounts.Count());
            mock.Verify(a => a.InstatiateVerifierMessage(It.IsAny<User>(), It.IsAny<string>()), Times.Never());
        }
    }
}
