using Grpc.Net.Client;
using InWords.WebApiTest.gRPC.Services;
using InWords.WebApiTests.CLI.TestUtils;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;
using static InWords.WebApiTest.gRPC.Services.Profile;

namespace InWords.WebApiTests.CLI.Services.ProfileService
{
    public class GetTokenTest
    {
        private readonly string username = "1@1";
        private readonly string validPassword = "1";
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
        public async void GetInValidToken()
        {
            using var clientFabric = new GetClient<ProfileClient>(d => new ProfileClient(d));
            var client = clientFabric.Client;

            TokenRequest tokenRequest = new TokenRequest { Email = username, Password = invalidPassword };

            // act
            var reply = await client.GetTokenAsync(tokenRequest);

            // assert
            Assert.False(string.IsNullOrEmpty(reply.Token));
        }
    }
}
