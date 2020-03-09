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
    public class DeleteProfileTest
    {
        [Fact]
        public async void DeleteExistedProfileTest()
        {
            string username = "1@1";
            string validPassword = "1";
            using var clientFabric = new GetClient<ProfileClient>(d => new ProfileClient(d));
            var client = clientFabric.Client;
            try
            {
                TokenRequest tokenRequest = new TokenRequest { Email = username, Password = validPassword };
                var reply = await client.GetTokenAsync(tokenRequest);
                var headers = new Metadata
                {
                    { "Authorization", $"Bearer {reply.Token}" }
                };
                var empty = client.DeleteAccount(new DeleteAccountRequest() { Text = "" }, headers);
                Assert.True(empty != null);
            }
            catch (RpcException e)
            {
                Assert.Equal(expected: StatusCode.NotFound, e.StatusCode);
                Assert.False(string.IsNullOrEmpty(e.Message));
            }
        }
    }
}
