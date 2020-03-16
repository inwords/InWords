using Grpc.Core;
using InWords.WebApi.Tests.TestUtils;
using InWords.WebApiTest.gRPC.Services;
using InWords.WebApiTests.CLI.TestUtils;
using Xunit;
using static InWords.WebApiTest.gRPC.Services.Profile;

namespace InWords.WebApi.Tests.Services.ProfileService
{
    public class RegisterProfileTest
    {
        [Fact]
        public void RegisterAccount()
        {
            using var clientFabric = new GetClient<ProfileClient>(d => new ProfileClient(d));
            var client = clientFabric.Client;

            var request = new RegistrationRequest()
            {
                Email = ProfileUtils.LoginPass,
                Password = ProfileUtils.LoginPass,
                IsAnonymous = true
            };

            try
            {
                RegistrationReply answer = client.Register(request);
                Assert.True(answer.Userid > 0);
            }
            catch (RpcException e)
            {
                Assert.Equal(expected: StatusCode.AlreadyExists, e.StatusCode);
                Assert.False(string.IsNullOrEmpty(e.Message));
            }
        }
    }
}
