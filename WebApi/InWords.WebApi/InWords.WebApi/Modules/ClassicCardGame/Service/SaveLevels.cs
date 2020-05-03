using InWords.Common.Extensions;
using InWords.Data;
using InWords.Data.Creations;
using InWords.Data.Creations.GameBox;
using InWords.Data.Enums;
using InWords.Protobuf;
using InWords.WebApi.Modules.ClassicCardGame.Extentions;
using InWords.WebApi.Services.Abstractions;
using Org.BouncyCastle.Ocsp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Modules.ClassicCardGame.Service
{
    public class SaveLevels : AuthorizedRequestObjectHandler<CardGameInfos, LevelPoints, InWordsDataContext>
    {
        public SaveLevels(InWordsDataContext context) : base(context) { }

        public override async Task<LevelPoints> HandleRequest(
            AuthorizedRequestObject<CardGameInfos, LevelPoints> request,
            CancellationToken cancellationToken = default)
        {

            if (request == null)
                throw new ArgumentNullException(nameof(request));

            var userId = request.UserId;
            var value = request.Value;

            var historyGameId = await Context.AddOrGetUserHistoryGame(userId).ConfigureAwait(false);
            
            // add level
            value.Info.Select(new GameLevel)

            // calculate metrics

            throw new NotImplementedException();
        }
    }
}
