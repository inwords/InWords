using Grpc.Core;
using InWords.WebApiTest.gRPC.Services;
using InWords.WebApiTests.CLI.TestUtils;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;
using static InWords.WebApiTest.gRPC.Services.Profile;

namespace InWords.WebApi.Tests.Services.ProfileService
{
    public class RegisterProfileTest
    {
        [Fact]
        public async void RegisterAccount()
        {
            string username = "1@1";
            string validPassword = "1";
            using var clientFabric = new GetClient<ProfileClient>(d => new ProfileClient(d));
            var client = clientFabric.Client;

            var request = new RegistrationRequest() { Email = username, Password = validPassword, IsAnonymous = true };

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
