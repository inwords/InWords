using InWords.Data;
using InWords.WebApi.gRPC.Services;
using InWords.WebApi.Services.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.DictionaryService.Words
{
    public class GetWords : AuthorizedRequestObjectHandler<GetWordsRequest, WordsReply, InWordsDataContext>
    {
        public GetWords(InWordsDataContext context) : base(context)
        {
        }

        public override Task<WordsReply> HandleRequest(AuthorizedRequestObject<GetWordsRequest, WordsReply> request, 
            CancellationToken cancellationToken = default)
        {
            var requestData = request.Value;
            //requestData.Words
            return base.HandleRequest(request, cancellationToken);
        }
    }
}
