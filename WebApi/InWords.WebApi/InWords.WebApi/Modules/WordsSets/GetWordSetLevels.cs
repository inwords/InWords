using InWords.Data;
using InWords.Data.Enums;
using InWords.Protobuf;
using InWords.WebApi.Modules.WordsSets.Extentions;
using InWords.WebApi.Services.Abstractions;
using Org.BouncyCastle.Ocsp;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Modules.WordsSets
{
    public class GetWordSetLevels
        : AuthReqHandler<GetLevelsRequest, GetLevelsReply, InWordsDataContext>
    {
        public GetWordSetLevels(InWordsDataContext context) : base(context)
        {

        }

        public override Task<GetLevelsReply> HandleRequest(
            AuthReq<GetLevelsRequest, GetLevelsReply> request,
            CancellationToken cancellationToken = default)
        {
            if (request == null)
                throw new ArgumentNullException(nameof(request));

            var requestData = request.Value;
            int userId = request.UserId;
            GetLevelsReply getLevelsReply = new GetLevelsReply();
            // select levels
            var levelsOfGame = Context.GameLevels.Where(l => l.GameId.Equals(requestData.WordSetId));

            // join users score
            var starredLevels = Context.GetStarredLevels(levelsOfGame, request.UserId);

            getLevelsReply.Levels.AddRange(starredLevels);
            return Task.Run(() => { return getLevelsReply; });
        }
    }
}
