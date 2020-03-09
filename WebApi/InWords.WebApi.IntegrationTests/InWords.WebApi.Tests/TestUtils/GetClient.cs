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
        private VariablesType fixture;
        private GrpcChannel channel;
        public readonly T Client;
        public GetClient(Func<GrpcChannel, T> create)
        {
            var url = Variables.GetEnvironmentVariable(VariablesType.URL);
            channel = GrpcChannel.ForAddress(url);
            Client = create(channel);
            Debug.WriteLine(url);
            Console.WriteLine(url);
        }

        public void Dispose()
        {
            channel.Dispose();
        }
    }
}
