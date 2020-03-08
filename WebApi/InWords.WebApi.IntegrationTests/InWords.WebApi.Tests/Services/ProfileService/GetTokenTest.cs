using Grpc.Core;
using Grpc.Net.Client;
using InWords.WebApiTest.gRPC.Services;
using InWords.WebApiTests.CLI.TestUtils;
using Xunit;
using static InWords.WebApiTest.gRPC.Services.Profile;

namespace InWords.WebApiTests.CLI.Services.ProfileService
{
    public class GetTokenTest
    {
        private readonly string username = "1@1";
        private readonly string validPassword = "1";
        private readonly string InvalidUserName = "2";
        private readonly string invalidPassword = "2";

        [Fact]
        public async void GetValidToken()
        {
            // arrange
            using var clientFabric = new GetClient<ProfileClient>(d => new ProfileClient(d));
            var client = clientFabric.Client;
            TokenRequest tokenRequest = new TokenRequest { Email = username, Password = validPassword };
            // act
            var reply = await client.GetTokenAsync(tokenRequest);

            // assert
            Assert.False(string.IsNullOrEmpty(reply.Token));
        }

        [Fact]
        public async void InvalidPasswordTest()
        {
            using var clientFabric = new GetClient<ProfileClient>(d => new ProfileClient(d));
            var client = clientFabric.Client;

            TokenRequest tokenRequest = new TokenRequest { Email = username, Password = invalidPassword };

            // act
            // assert
            try
            {
                var x = await client.GetTokenAsync(tokenRequest);
            }
            catch (RpcException e)
            {
                Assert.Equal(expected: StatusCode.NotFound, e.StatusCode);
                Assert.False(string.IsNullOrEmpty(e.Message));
            }
        }

        [Fact]
        public async void InvalidAccountTest()
        {
            using var clientFabric = new GetClient<ProfileClient>(d => new ProfileClient(d));
            var client = clientFabric.Client;

            TokenRequest tokenRequest = new TokenRequest { Email = InvalidUserName, Password = invalidPassword };

            // act
            // assert
            try
            {
                var x = await client.GetTokenAsync(tokenRequest);
            }
            catch (RpcException e)
            {
                Assert.Equal(expected: StatusCode.NotFound, e.StatusCode);
                Assert.False(string.IsNullOrEmpty(e.Message));
            }
        }
    }
}
