using InWords.Data;
using InWords.Protobuf;
using InWords.WebApi.Services.Abstractions;
using Org.BouncyCastle.Ocsp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Modules.WordsSets
{
    public class GetTrainingLevelsHistory
        : AuthorizedRequestObjectHandler<Empty, GameScoreReply, InWordsDataContext>
    {
        public GetTrainingLevelsHistory(InWordsDataContext context) : base(context) { }

        public override Task<GameScoreReply> HandleRequest(AuthorizedRequestObject<Empty, GameScoreReply> request, 
            CancellationToken cancellationToken = default)
        {

            if (request == null)
                throw new ArgumentNullException(nameof(request));

            var value = request.Value;
            var userId = request.UserId;



            return base.HandleRequest(request, cancellationToken);
        }
    }
}
