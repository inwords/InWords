using Grpc.Core;
using InWords.Protobuf;
using InWords.WebApi.Tests.TestUtils;
using InWords.WebApiTests.CLI.TestUtils;
using Microsoft.Extensions.DependencyInjection;
using Xunit;
using static InWords.Protobuf.Authenticator;

namespace InWords.WebApi.Tests.Services.ProfileService
{
    public partial class ProfileRegistrator
    {
        public static string RegisterAccount(string login)
        {
            using var clientFabric = new GetClient<AuthenticatorClient>(d => new AuthenticatorClient(d));
            var client = clientFabric.Client;

            var request = new RegistrationRequest()
            {
                Email = login,
                Password = login,
                IsAnonymous = true
            };
            TokenReply answer;
            try
            {
                answer = client.Register(request);
                Assert.False(string.IsNullOrWhiteSpace(answer.Token));
            }
            catch (RpcException e)
            {
                answer = new TokenReply();
                Assert.Equal(expected: StatusCode.AlreadyExists, e.StatusCode);
                Assert.False(string.IsNullOrEmpty(e.Message));
            }

            return answer.Token;
        }
    }
}
