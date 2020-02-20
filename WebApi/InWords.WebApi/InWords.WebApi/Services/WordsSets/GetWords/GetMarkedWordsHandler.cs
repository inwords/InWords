using InWords.Data;
using InWords.WebApi.Services.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using WordSet.V2;

namespace InWords.WebApi.Services.WordsSets.GetWords
{
    public class GetMarkedWordsHandler 
        : AuthorizedRequestObjectHandler<WordSetWordsRequest, WordSetWordsReply, InWordsDataContext>
    {
        public GetMarkedWordsHandler(InWordsDataContext context) : base(context)
        {
        }

        public override Task<WordSetWordsReply> HandleRequest(
            AuthorizedRequestObject<WordSetWordsRequest, WordSetWordsReply> request, 
            CancellationToken cancellationToken = default)
        {

            return base.HandleRequest(request, cancellationToken);
        }
    }
}
