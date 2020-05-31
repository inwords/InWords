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
using ClosedAudioCards = InWords.Protobuf.TrainingScoreReply.Types.TrainigScore.Types.ClosedAudioCards;
using OpenedAudioCards = InWords.Protobuf.TrainingScoreReply.Types.TrainigScore.Types.OpenedAudioCards;

namespace InWords.WebApi.Modules.WordsSets
{
    public class EstimateTraining
        : AuthReqHandler<TrainingDataRequest, TrainingScoreReply, InWordsDataContext>
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

                if (metric.ClosedCardsMetric != null && metric.ClosedCardsMetric.WordIdOpenCount != null)
                {
                    levelsManage.Add(new ClosedCardsLevel(currentGameLevelid, metric.ClosedCardsMetric.WordIdOpenCount));
                }
                if (metric.ClosedAudioCardsMetric != null && metric.ClosedAudioCardsMetric.WordIdOpenCount != null)
                {
                    levelsManage.Add(new ClosedAudioCardsLevel(currentGameLevelid, metric.ClosedAudioCardsMetric.WordIdOpenCount));
                }
                if (metric.ClosedAudioCards2Metric != null && metric.ClosedAudioCards2Metric.WordIdOpenCount != null)
                {
                    levelsManage.Add(new ClosedAudioCards2Level(currentGameLevelid, metric.ClosedAudioCards2Metric.WordIdOpenCount));
                }
                if (metric.OpenedCardsMetric != null && metric.OpenedCardsMetric.WordIdOpenCount != null)
                {
                    levelsManage.Add(new OpenCardGameLevel(currentGameLevelid, metric.OpenedCardsMetric.WordIdOpenCount));
                }
                if (metric.OpenedAudioCardsMetric != null && metric.OpenedAudioCardsMetric.WordIdOpenCount != null)
                {
                    levelsManage.Add(new OpenedAudioCardsLevel(currentGameLevelid, metric.OpenedAudioCardsMetric.WordIdOpenCount));
                }
                if (metric.OpenedAudioCards2Metric != null && metric.OpenedAudioCards2Metric.WordIdOpenCount != null)
                {
                    levelsManage.Add(new OpenedAudioCards2Level(currentGameLevelid, metric.OpenedAudioCards2Metric.WordIdOpenCount));
                }

                if (metric.AudioMetric != null && metric.AudioMetric.WordIdOpenCount != null)
                {
                    levelsManage.Add(new AudioLevel(currentGameLevelid, metric.AudioMetric.WordIdOpenCount));
                }

            }


            // Save custom trainings
            await levelsManage.SaveCustomLevels(Context, userId).ConfigureAwait(false);

            var scoreTask = levelsManage.Select(d => d.Score()).ToList();
            {
                var scoreTaskResult = Context.AddOrUpdateUserGameLevel(scoreTask, userId);
                var wordsMemoryTask = levelsManage.SelectMany(d => d.Qualify());
                Context.UpdateMemorization(wordsMemoryTask, userId);
                await Context.SaveChangesAsync().ConfigureAwait(false);
            }


            var dictionary = scoreTask
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
                    if (score.GameType == GameType.OpenedCardGame)
                    {
                        if (trainigScore.OpenedCards == null)
                            trainigScore.OpenedCards = new OpenedCards();
                        trainigScore.OpenedCards.Score = score.Score;
                    }
                    else if (score.GameType == GameType.OpenedAudioCards)
                    {
                        if (trainigScore.OpenedAudioCards == null)
                            trainigScore.OpenedAudioCards = new OpenedAudioCards();
                        trainigScore.OpenedAudioCards.Score = score.Score;
                    }
                    else if (score.GameType == GameType.OpenedAudioCards2)
                    {
                        if (trainigScore.OpenedAudioCards2 == null)
                            trainigScore.OpenedAudioCards2 = new OpenedAudioCardsTwo();
                        trainigScore.OpenedAudioCards2.Score = score.Score;
                    }
                    else if (score.GameType == GameType.ClosedCards)
                    {
                        if (trainigScore.ClosedCards == null)
                            trainigScore.ClosedCards = new ClosedCards();
                        trainigScore.ClosedCards.Score = score.Score;
                    }
                    else if (score.GameType == GameType.ClosedAudioCards)
                    {
                        if (trainigScore.ClosedAudioCards == null)
                            trainigScore.ClosedAudioCards = new ClosedAudioCards();
                        trainigScore.ClosedAudioCards.Score = score.Score;
                    }
                    else if (score.GameType == GameType.ClosedAudioCards2)
                    {
                        if (trainigScore.ClosedAudioCards2 == null)
                            trainigScore.ClosedAudioCards2 = new ClosedAudioCardsTwo();
                        trainigScore.ClosedAudioCards2.Score = score.Score;
                    }
                    else if (score.GameType == GameType.Audio)
                    {
                        if (trainigScore.Audio == null)
                            trainigScore.Audio = new Audio();
                        trainigScore.Audio.Score = score.Score;
                    }

                    else if (score.GameType == GameType.Total)
                    {
                        trainigScore.Score = score.Score;
                    }
                }

                trainingScoreReply.Scores.Add(trainigScore);
            }

            return trainingScoreReply;
        }

    }
}
