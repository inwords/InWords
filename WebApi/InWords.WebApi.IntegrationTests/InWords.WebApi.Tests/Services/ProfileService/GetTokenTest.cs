using Grpc.Core;
using InWords.WebApi.Tests.TestUtils;
using InWords.WebApiTest.gRPC.Services;
using InWords.WebApiTests.CLI.TestUtils;
using Xunit;
using static InWords.WebApiTest.gRPC.Services.Profile;

namespace InWords.WebApiTests.CLI.Services.ProfileService
{
    public class GetTokenTest
    {
        [Fact]
        public async void GetValidToken()
        {
            string token = ProfileUtils.GetTokenForce();
            // arrange
            TokenRequest tokenRequest = new TokenRequest { Email = ProfileUtils.LoginPass, Password = ProfileUtils.LoginPass };
            // act
            var reply = ProfileUtils.GetToken(tokenRequest);
            // assert
            Assert.False(string.IsNullOrEmpty(reply.Token));
        }

        [Fact]
        public async void InvalidPasswordTest()
        {
            string token = ProfileUtils.GetTokenForce();
            using var clientFabric = new GetClient<ProfileClient>(d => new ProfileClient(d));
            var client = clientFabric.Client;

            TokenRequest tokenRequest = new TokenRequest { Email = ProfileUtils.LoginPass, Password = ProfileUtils.LoginPass + "1" };

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

            TokenRequest tokenRequest = new TokenRequest { Email = ProfileUtils.LoginPass + "1", Password = ProfileUtils.LoginPass + "1" };

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
