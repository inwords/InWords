using Grpc.Net.Client;
using InWords.WebApiTest.gRPC.Services;
using System;
using Xunit;

namespace InWords.WebApiTests.CLI
{
    public class SayHelloTest
    {
        [Fact]
        public async void JustSayHello()
        {
            using LaunchSettingsFixture fixture = new LaunchSettingsFixture();
            var url = TestEnvironment.GetEnvironmentVariable(Variables.URL);
            using var channel = GrpcChannel.ForAddress(url);
            string request = "Test";
            var client = new Greeter.GreeterClient(channel);
            var reply = await client.SayHelloAsync(
                              new HelloRequest { Name = request });
            Assert.Contains(request, reply.Message);
        }
    }
}
