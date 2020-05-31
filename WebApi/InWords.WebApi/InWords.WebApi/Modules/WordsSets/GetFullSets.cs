using InWords.Data;
using InWords.Protobuf;
using InWords.WebApi.Services.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Modules.WordsSets
{
    public class GetFullSets : AuthReqHandler<SetsCountRequest, WordSetReply, InWordsDataContext>
    {
        public GetFullSets(InWordsDataContext context) : base(context)
        {

        }

        public override Task<WordSetReply> HandleRequest(AuthReq<SetsCountRequest, WordSetReply> request, 
            CancellationToken cancellationToken = default)
        {

            return base.HandleRequest(request, cancellationToken);
        }
    }
}
