using InWords.Data;
using InWords.Protobuf;
using InWords.WebApi.Modules.WordsSets.Extentions;
using InWords.WebApi.Services.Abstractions;
using Org.BouncyCastle.Ocsp;
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
            if (request == null)
                throw new ArgumentNullException(nameof(request));

            var value = request.Value;
            var userId = request.UserId;
            
            var wordSets = Context.GetWordSets(value.Offset, value.Limit);

            // request levels in sets


            return base.HandleRequest(request, cancellationToken);
        }
    }
}
