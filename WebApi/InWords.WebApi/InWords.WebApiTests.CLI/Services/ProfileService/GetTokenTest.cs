using Grpc.Net.Client;
using InWords.WebApiTest.gRPC.Services;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace InWords.WebApiTests.CLI.Services.ProfileService
{
    public class GetTokenTest
    {
        [Fact]
        public async void GetValidToken()
        {
            using LaunchSettingsFixture fixture = new LaunchSettingsFixture();
            var url = TestEnvironment.GetEnvironmentVariable(Variables.URL);
            // arrange
            using var channel = GrpcChannel.ForAddress(url);
            var client = new Profile.ProfileClient(channel);


            TokenRequest tokenRequest = new TokenRequest
            {
                Email = "1@1",
                Password = "1"
            };

            // act
            var reply = await client.GetTokenAsync(tokenRequest);

            // assert
            Assert.False(string.IsNullOrEmpty(reply.Token));
        }
    }
}
