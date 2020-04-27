using InWords.Data;
using InWords.Protobuf;
using InWords.WebApi.Modules.Abstractions;
using InWords.WebApi.Modules.ClassicCardGame.Service;
using InWords.WebApi.Services.Abstractions;
using Microsoft.CodeAnalysis.Operations;
using Org.BouncyCastle.Ocsp;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Modules.ClassicCardGame
{
    public class EstimateClassicCardGame
        : AuthorizedRequestObjectHandler<CardGameMetrics, LevelPoints, InWordsDataContext>
    {
        public EstimateClassicCardGame(InWordsDataContext context) : base(context)
        {

        }

        public override Task<LevelPoints> HandleRequest(
            AuthorizedRequestObject<CardGameMetrics, LevelPoints> request,
            CancellationToken cancellationToken = default)
        {
            if (request == null)
                throw new ArgumentNullException($"{nameof(request)}");

            var userId = request.UserId;
            var value = request.Value;

            // for safety objective
            var userWords = Context.UserWordPairs.Where(u => u.UserId == userId);

            // find words knowlenge info in user's words pairs
            int[] metricsWordIds = value.WordIdOpenCount.Keys.ToArray();
            var existedWords = userWords.Where(d => metricsWordIds.Contains(d.UserWordPairId)).ToArray();
            // update knowlenge
            IKnowledgeQualifier knowledgeQualifier = new CardGameQualifier(value.WordIdOpenCount.ToDictionary(t => t.Key, t => t.Value));
            var license = knowledgeQualifier.Qualify();
            
            // save changes return score

            return base.HandleRequest(request, cancellationToken);
        }
    }
}
