using Grpc.Core;
using InWords.WebApi.Tests.TestUtils;
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
            using var clientFabric = new GetClient<ProfileClient>(d => new ProfileClient(d));
            ProfileClient client = clientFabric.Client;
            try
            {
                TokenRequest tokenRequest = new TokenRequest { Email = ProfileUtils.LoginPass, Password = ProfileUtils.LoginPass };
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
