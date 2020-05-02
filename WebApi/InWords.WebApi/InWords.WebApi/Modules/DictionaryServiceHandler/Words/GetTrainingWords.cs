using InWords.Data;
using InWords.Protobuf;
using InWords.WebApi.Services.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Modules.DictionaryServiceHandler.Words
{
    public class GetTrainingWords : AuthorizedRequestObjectHandler<DeleteWordsRequest, Empty, InWordsDataContext>
    {
        public GetTrainingWords(InWordsDataContext context) : base(context) { }

        public override Task<Empty> HandleRequest(AuthorizedRequestObject<DeleteWordsRequest, Empty> request, 
            CancellationToken cancellationToken = default)
        {
            return base.HandleRequest(request, cancellationToken);
        }
    }
}
