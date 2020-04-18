using Grpc.Core;
using InWords.Data;
using InWords.Protobuf;
using InWords.WebApi.Services.Abstractions;
using Microsoft.Extensions.Configuration;
using System;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Modules.DictionaryService.Words
{
    public class Lookup : StructRequestHandler<LookupRequest, LookupReply, InWordsDataContext>
    {
        private static string requestKey = "";
        private readonly IHttpClientFactory clientFactory;
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Design", "CA1062:Проверить аргументы или открытые методы", Justification = "<Ожидание>")]
        public Lookup(InWordsDataContext context,
            IConfiguration configuration,
            IHttpClientFactory clientFactory) : base(context)
        {
            if (string.IsNullOrWhiteSpace(requestKey))
            {
                requestKey = configuration.GetSection("Yandex").GetValue<string>("Dictionary");
            }
            this.clientFactory = clientFactory;
        }

        public override async Task<LookupReply> HandleRequest(RequestObject<LookupRequest, LookupReply> request, CancellationToken cancellationToken = default)
        {
            LookupReply lookupReply;
            LookupRequest requestData = request.Value;
            Uri requestUri = new Uri($"https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key={requestKey}&lang={requestData.Lang}&text={requestData.Text}");
            using var client = clientFactory.CreateClient();
            var response = await client.GetAsync(requestUri).ConfigureAwait(false);

            if (response.IsSuccessStatusCode)
            {
                var responseString = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                lookupReply = LookupReply.Parser.ParseJson(responseString);
            }
            else
            {
                request.StatusCode = StatusCode.Aborted;
                lookupReply = new LookupReply();
            }

            return lookupReply;
        }
    }
}
