using Grpc.Core;
using InWords.Protobuf;
using InWords.WebApi.Tests.TestUtils;
using InWords.WebApiTests.CLI.TestUtils;
using Xunit;
using static InWords.Protobuf.Authenticator;

namespace InWords.WebApi.Tests.Services.ProfileService
{
    public partial class ProfileRegistrator
    {
        public static async void InvalidPasswordTest(string login)
        {
            using var clientFabric = new GetClient<AuthenticatorClient>(d => new AuthenticatorClient(d));
            var client = clientFabric.Client;

            TokenRequest tokenRequest = new TokenRequest { Email = login, Password = login + "1" };

            try
            {
                var x = await client.BasicAsync(tokenRequest);
            }
            catch (RpcException e)
            {
                Assert.Equal(expected: StatusCode.NotFound, e.StatusCode);
                Assert.False(string.IsNullOrEmpty(e.Message));
            }
        }

        public async static void InvalidAccountTest(string login)
        {
            using var clientFabric = new GetClient<AuthenticatorClient>(d => new AuthenticatorClient(d));
            var client = clientFabric.Client;

            TokenRequest tokenRequest = new TokenRequest { Email = login + "1", Password = login + "1" };

            try
            {
                var x = await client.BasicAsync(tokenRequest);
            }
            catch (RpcException e)
            {
                Assert.Equal(expected: StatusCode.NotFound, e.StatusCode);
                Assert.False(string.IsNullOrEmpty(e.Message));
            }
        }
    }
}
