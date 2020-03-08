using Grpc.Net.Client;
using InWords.WebApiTest.gRPC.Services;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;

namespace InWords.WebApiTests.CLI.TestUtils
{
    public class GetClient<T> : IDisposable
    {
        private LaunchSettingsFixture fixture;
        private GrpcChannel channel;
        public readonly T Client;
        public GetClient(Func<GrpcChannel, T> create)
        {
            fixture = new LaunchSettingsFixture(); // should be in start
            var url = TestEnvironment.GetEnvironmentVariable(Variables.URL);
            channel = GrpcChannel.ForAddress(url);
            Client = create(channel);
            Debug.WriteLine(url);
            Console.WriteLine(url);
        }

        public void Dispose()
        {
            fixture.Dispose();
            channel.Dispose();
        }
    }
}
