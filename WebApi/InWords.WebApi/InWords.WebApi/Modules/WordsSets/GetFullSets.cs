using InWords.Data;
using InWords.Data.Creations.GameBox;
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

        public override async Task<WordSetReply> HandleRequest(AuthReq<SetsCountRequest, WordSetReply> request,
            CancellationToken cancellationToken = default)
        {
            if (request == null)
                throw new ArgumentNullException(nameof(request));

            var value = request.Value;
            var userId = request.UserId;

            var wordSets = await Context.GetWordSets(value.Offset, value.Limit).ConfigureAwait(false);

            var ids = wordSets.WordSets.Select(d => d.Id).ToArray();

            var gameLevels = Context.GameLevels.Where(d => ids.Contains(d.GameId));

            var levels = Context.GetStarredLevels(gameLevels, userId);

            var levelInSet = gameLevels.GroupBy(d => d.GameId).ToDictionary(d => d.Key, d => d.ToArray());

            foreach (var set in wordSets.WordSets)
            {
                if (levelInSet.ContainsKey(set.Id))
                {
                    var toAdd = levels.Where(d => levelInSet[set.Id].Any(w => w.GameLevelId == d.LevelId));
                    set.Levels.AddRange(toAdd);
                }
            }
            return wordSets;
        }
    }
}
