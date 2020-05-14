using Google.Protobuf.Collections;
using InWords.Data;
using InWords.Protobuf;
using InWords.WebApi.Business.GameEvaluator.Game;
using InWords.WebApi.Extensions.InWordsDataContextExtentions;
using InWords.WebApi.Model.UserWordPair;
using InWords.WebApi.Modules.ClassicCardGame.Extentions;
using InWords.WebApi.Modules.WordsSets.Extentions;
using InWords.WebApi.Modules.WordsSets.Models;
using InWords.WebApi.Services.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Modules.WordsSets
{
    public class EstimateTraining
        : AuthorizedRequestObjectHandler<TrainingDataRequest, TrainingScoreReply, InWordsDataContext>
    {
        public EstimateTraining(InWordsDataContext context) : base(context) { }

        public override async Task<TrainingScoreReply> HandleRequest(
            AuthorizedRequestObject<TrainingDataRequest, TrainingScoreReply> request,
            CancellationToken cancellationToken = default)
        {
            if (request == null)
                throw new ArgumentNullException($"{request} is null");

            int userId = request.UserId;
            var metrics = request.Value.Metrics;

            // select levels to create neet to union inside
            // todo invent method that save cust training from IGamelevel ids
            metrics = await metrics.SaveCustomTraining(Context, userId).ConfigureAwait(false);

            // configure game level managers
            var cardGameManager = metrics
                .Select(d => new CardGameLevel(d.GameLevelId, d.CardsWordIdOpenCount) as IGameLevel)
                .Union(metrics.Select(d => new AudioGameLevel(d.GameLevelId, d.AuditionWordIdOpenCount)));
            // TO-DO just union more levels types

            var scoreTask = cardGameManager.Select(d => d.Score());
            var wordsMemoryTask = cardGameManager.Select(d => d.Qualify());
            
            // TODO save history games
            Context.AddOrUpdateUserGameLevel(scoreTask, userId);


            // calculate words metrics
            await Context.SaveChangesAsync().ConfigureAwait(false);
            return await base.HandleRequest(request, cancellationToken).ConfigureAwait(false);
        }

    }
}
