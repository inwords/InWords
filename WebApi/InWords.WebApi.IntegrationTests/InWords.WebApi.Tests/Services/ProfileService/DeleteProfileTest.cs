using Grpc.Core;
using InWords.Protobuf;
using InWords.WebApi.Tests.TestUtils;
using InWords.WebApiTests.CLI.TestUtils;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;
using static InWords.Protobuf.Profile;

namespace InWords.WebApi.Tests.Services.ProfileService
{
    public partial class ProfileRegistrator
    {
        public static void DeleteExistedProfileTest(string token)
        {
            using var clientFabric = new GetClient<ProfileClient>(d => new ProfileClient(d));
            ProfileClient client = clientFabric.Client;
            try
            {
                var headers = new Metadata
                {
                    { "Authorization", $"Bearer {token}" }
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
