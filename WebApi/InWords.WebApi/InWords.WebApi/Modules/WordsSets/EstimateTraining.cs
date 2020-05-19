using InWords.Data;
using InWords.Data.Enums;
using InWords.Protobuf;
using InWords.WebApi.Business.GameEvaluator.Game;
using InWords.WebApi.Modules.WordsSets.Extentions;
using InWords.WebApi.Modules.WordsSets.GameEvaluator.Game;
using InWords.WebApi.Services.Abstractions;
using Microsoft.AspNetCore.Mvc.Formatters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using static InWords.Protobuf.TrainingScoreReply.Types;
using static InWords.Protobuf.TrainingScoreReply.Types.TrainigScore.Types;

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

            // configure game level managers
            List<IGameLevel> levelsManage = new List<IGameLevel>();
            int trainingId = 0;
            foreach (var metric in metrics)
            {
                var currentGameLevelid = metric.GameLevelId;
                if (currentGameLevelid == default)
                {
                    currentGameLevelid = trainingId--;
                }

                if (metric.CardsMetric != null && metric.CardsMetric.WordIdOpenCount != null)
                {
                    levelsManage.Add(new CardGameLevel(currentGameLevelid, metric.CardsMetric.WordIdOpenCount));
                }

                if (metric.AuditionMetric != null && metric.AuditionMetric.WordIdOpenCount != null)
                {
                    levelsManage.Add(new AudioGameLevel(currentGameLevelid, metric.AuditionMetric.WordIdOpenCount));
                }
                if (metric.OpenCardsMetric != null && metric.OpenCardsMetric.WordIdOpenCount != null)
                {
                    levelsManage.Add(new OpenCardGameLevel(currentGameLevelid, metric.OpenCardsMetric.WordIdOpenCount));
                }
                // TO-DO just union more levels types
            }


            // Save custom trainings
            await levelsManage.SaveCustomLevels(Context, userId).ConfigureAwait(false);

            var scoreTask = levelsManage.Select(d => d.Score());
            var scoreTaskResult = Context.AddOrUpdateUserGameLevel(scoreTask, userId);

            // TODO save history games
            var wordsMemoryTask = levelsManage.SelectMany(d => d.Qualify());
            Context.UpdateMemorization(wordsMemoryTask, userId);
            await Context.SaveChangesAsync().ConfigureAwait(false);


            var dictionary = scoreTaskResult
                .GroupBy(d => d.GameLevelId, d => d)
                .ToDictionary(d => d.Key, d => d.ToList());

            TrainingScoreReply trainingScoreReply = new TrainingScoreReply();
            foreach (var key in dictionary.Keys)
            {
                TrainigScore trainigScore = new TrainigScore
                {
                    GameLevelId = key
                };

                foreach (var score in dictionary[key])
                {
                    if (score.GameType == GameType.AudioGame)
                    {
                        if (trainigScore.AuditionStatus == null)
                            trainigScore.AuditionStatus = new AuditionStatus();
                        trainigScore.AuditionStatus.Score = score.UserStars;
                    }
                    else if (score.GameType == GameType.ClassicCardGame)
                    {
                        if (trainigScore.CardsStatus == null)
                            trainigScore.CardsStatus = new CardsStatus();
                        trainigScore.CardsStatus.Score = score.UserStars;
                    }
                    else if (score.GameType == GameType.OpenCardGame)
                    {
                        if (trainigScore.OpenCardsStatus == null)
                            trainigScore.OpenCardsStatus = new OpenCardsStatus();
                        trainigScore.OpenCardsStatus.Score = score.UserStars;
                    }
                    else if (score.GameType == GameType.Total)
                    {
                        trainigScore.Score = score.UserStars;
                    }
                }

                trainingScoreReply.Scores.Add(trainigScore);
            }

            return trainingScoreReply;
        }

    }
}
