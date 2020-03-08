using InWords.WebApiTest.gRPC.Services;
using InWords.WebApiTests.CLI.TestUtils;
using System;
using System.Collections.Generic;
using System.Text;
using static InWords.WebApiTest.gRPC.Services.Profile;

namespace InWords.WebApi.Tests.TestUtils
{
    public static class ProfileUtils
    {
        public static TokenReply GetToken(TokenRequest tokenRequest)
        {
            using var clientFabric = new GetClient<ProfileClient>(d => new ProfileClient(d));
            var client = clientFabric.Client;
            return client.GetToken(tokenRequest);
        }
    }
}
