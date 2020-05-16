using InWords.Data;
using InWords.Data.Enums;
using InWords.Protobuf;
using InWords.WebApi.Business.GameEvaluator.Game;
using InWords.WebApi.Modules.WordsSets.Extentions;
using InWords.WebApi.Services.Abstractions;
using System;
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
            var levelsManage = metrics
                .Where(d => d.CardsMetric != null && d.CardsMetric.WordIdOpenCount != null)
                .Select(d => new CardGameLevel(d.GameLevelId, d.CardsMetric.WordIdOpenCount) as IGameLevel)
                .Union(
                metrics
                .Where(d => d.AuditionMetric != null && d.AuditionMetric.WordIdOpenCount != null)
                .Select(d => new AudioGameLevel(d.GameLevelId, d.AuditionMetric.WordIdOpenCount)))
                .ToList();
            // TO-DO just union more levels types

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
                    if (score.GameType == GameType.ClassicCardGame)
                    {
                        if (trainigScore.CardsStatus == null)
                            trainigScore.CardsStatus = new CardsStatus();
                        trainigScore.CardsStatus.Score = score.UserStars;
                    }
                    if (score.GameType == GameType.Total)
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
