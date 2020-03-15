using Grpc.Core;
using InWords.Data;
using InWords.Data.Domains;
using InWords.Protobuf;
using InWords.Service.Auth.Interfaces;
using InWords.WebApi.gRPC.Services;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.Email.Abstractions;
using InWords.WebApi.Services.Users.Registration;
using InWords.WebApiTests.TestUtils;
using Moq;
using System;
using System.Linq;
using System.Security.Claims;
using Xunit;

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

            var jwtMock = new Mock<IJwtProvider>();
            jwtMock.Setup(a => a.GenerateToken(It.IsAny<ClaimsIdentity>())).Returns("token");
            // act 
            var registration = new UserRegistration(context, jwtMock.Object, mock.Object);
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
            jwtMock.Verify(a => a.GenerateToken(It.IsAny<ClaimsIdentity>()), Times.Once());
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
            var jwtMock = new Mock<IJwtProvider>();
            jwtMock.Setup(a => a.GenerateToken(It.IsAny<ClaimsIdentity>())).Returns("token");
            // act 
            var registration = new UserRegistration(context, jwtMock.Object, mock.Object);
            // assert 
            var request = new RequestObject<RegistrationRequest, RegistrationReply>(
                new RegistrationRequest()
                {
                    Email = email,
                    Password = "testPassword"
                });
            var reply = registration.HandleRequest(request);


            Assert.Equal(StatusCode.AlreadyExists, request.StatusCode);
            Assert.Equal(1, context.Accounts.Count());
            mock.Verify(a => a.InstatiateVerifierMessage(It.IsAny<User>(), It.IsAny<string>()), Times.Never());
        }
    }
}
