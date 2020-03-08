using InWords.Data;
using InWords.Data.Domains;
using InWords.Data.Enums;
using InWords.Service.Auth.Interfaces;
using InWords.Service.Encryption.Interfaces;
using InWords.WebApi.gRPC.Services;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.Users.Token;
using InWords.WebApiTests.TestUtils;
using Moq;
using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Xunit;

namespace InWords.WebApiTests.Services.Users.Token
{
    public class UserTokenTests
    {
        const string email = "test@mail.com";
        const string nickname = "nickname";
        const RoleType role = RoleType.Unverified;

        [Fact]
        public async void GetTokenOnExistRightPassword()
        {
            // arrange
            await using InWordsDataContext context = InWordsDataContextFactory.Create();
            AddFakeUser(context);

            var mock = new Mock<IPasswordSalter>();
            mock.Setup(a => a.EqualsSequence(It.IsAny<string>(), It.IsAny<byte[]>())).Returns(true);

            var jwtMock = new Mock<IJwtProvider>();
            jwtMock.Setup(a => a.GenerateToken(It.IsAny<ClaimsIdentity>())).Returns("token");
            // act 
            var token = new UserToken(context, jwtMock.Object, mock.Object);
            var test = await HandleRequest(token).ConfigureAwait(false);

            // assert
            Assert.Equal(1, test.UserId);
        }

        [Fact]
        public async void GetTokenOnExistFalsePassword()
        {
            // arrange
            await using InWordsDataContext context = InWordsDataContextFactory.Create();
            AddFakeUser(context);

            var mock = new Mock<IPasswordSalter>();
            mock.Setup(a => a.EqualsSequence(It.IsAny<string>(), It.IsAny<byte[]>())).Returns(false);
            var jwtMock = new Mock<IJwtProvider>();
            jwtMock.Setup(a => a.GenerateToken(It.IsAny<ClaimsIdentity>())).Returns("token");

            // act 
            var token = new UserToken(context, jwtMock.Object, mock.Object);
            var response = await HandleRequest(token);
            // assert
            Assert.True(string.IsNullOrWhiteSpace(response.Token));
        }

        private async void AddFakeUser(InWordsDataContext context)
        {
            context.Accounts.Add(new Account()
            {
                AccountId = 1,
                Email = email,
                Hash = new byte[255],
                Role = role
            });
            context.Users.Add(new User()
            {
                UserId = 1,
                NickName = nickname
            });
            await context.SaveChangesAsync();
        }

        private Task<TokenReply> HandleRequest(UserToken token)
        {
            return token.HandleRequest(
                new RequestObject<TokenRequest, TokenReply>(
                    new TokenRequest()
                    {
                        Email = email,
                        Password = "truePassword"
                    }));
        }
    }
}
