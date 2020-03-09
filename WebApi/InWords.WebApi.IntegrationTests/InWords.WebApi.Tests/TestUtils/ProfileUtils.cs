using Grpc.Core;
using InWords.WebApiTest.gRPC.Services;
using InWords.WebApiTests.CLI.TestUtils;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using static InWords.WebApiTest.gRPC.Services.Profile;

namespace InWords.WebApi.Tests.TestUtils
{
    public static class ProfileUtils
    {
        public static readonly string LoginPass = "1@inwordstest";
        public static TokenReply GetToken(TokenRequest tokenRequest)
        {
            using var clientFabric = new GetClient<ProfileClient>(d => new ProfileClient(d));
            var client = clientFabric.Client;
            return client.GetToken(tokenRequest);
        }

        public static string GetTokenForce()
        {
            var request = new TokenRequest() { Email = LoginPass, Password = LoginPass };
            try
            {
                var response = GetToken(request);
            }
            catch (RpcException e)
            {
                Debug.WriteLine($"Error on loggin on testing account {e.Message}");
            }

            using var clientFabric = new GetClient<ProfileClient>(d => new ProfileClient(d));
            var client = clientFabric.Client;
            var registrationRequest = new RegistrationRequest() { Email = LoginPass, Password = LoginPass, IsAnonymous = true };

            try
            {
                var response = client.Register(registrationRequest);
                return response.Token;
            }
            catch (RpcException e)
            {
                Debug.WriteLine($"Error on Registring on testing account {e.Message}");
            }
            throw new MethodAccessException();
        }
    }
}
