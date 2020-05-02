using Grpc.Net.Client;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;

namespace InWords.WebApiTests.CLI.TestUtils
{
    public class GetClient<T> : IDisposable
    {
        private GrpcChannel channel;
        public readonly T Client;
        public GetClient(Func<GrpcChannel, T> create)
        {
            var url = Variables.GetEnvironmentVariable(VariablesType.URL);
            channel = GrpcChannel.ForAddress(url);
            Client = create(channel);
            Console.WriteLine(url);
        }

        public void Dispose()
        {
            channel.Dispose();
        }
    }
}
