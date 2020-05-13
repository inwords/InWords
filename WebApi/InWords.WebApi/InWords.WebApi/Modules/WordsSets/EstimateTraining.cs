using InWords.Data;
using InWords.Protobuf;
using InWords.WebApi.Extensions.InWordsDataContextExtentions;
using InWords.WebApi.Model.UserWordPair;
using InWords.WebApi.Modules.ClassicCardGame.Extentions;
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
        private IEnumerable<object> knowledgeQualifiers;

        public EstimateTraining(InWordsDataContext context) : base(context) { }

        public override async Task<TrainingScoreReply> HandleRequest(
            AuthorizedRequestObject<TrainingDataRequest, TrainingScoreReply> request,
            CancellationToken cancellationToken = default)
        {
            if (request == null)
                throw new ArgumentNullException($"{request} is null");

            int userId = request.UserId;
            var metrics = request.Value.Metrics;

            // select levels to create
            var levelsToCreate = metrics
                .Select(
                d => d.AuditionWordIdOpenCount.Select(d => d.Key)
                .Union(d.CardsWordIdOpenCount.Select(d => d.Key))
                // union with others levles types
                .ToArray()).ToList();

            await Context.CreateLevels(userId, levelsToCreate).ConfigureAwait(false);

            // calculate words stats
            int[] metricsWordIds = metrics.SelectMany(m => m.CardsWordIdOpenCount.Keys).ToArray();
            metricsWordIds = metricsWordIds.Union(metrics.SelectMany(m => m.AuditionWordIdOpenCount.Keys)).ToArray();


            // update words stats
            var userWords = Context.UserWordPairs.Where(u => u.UserId == userId);
            var existedWords = userWords.Where(d => metricsWordIds.Contains(d.UserWordPairId)).ToArray();

            var dic2 = metrics.SelectMany(d => new AuditionQualifier(d.AuditionWordIdOpenCount).Qualify())
                .GroupBy(kvp => kvp.Key)
                .ToDictionary(g => g.Key, g => g.Max(x => x.Value));
            
            var dic1 = metrics.SelectMany(d => new CardGameQualifier(d.CardsWordIdOpenCount).Qualify())
                .GroupBy(kvp => kvp.Key)
                .ToDictionary(g => g.Key, g => g.Max(x => x.Value));

            Dictionary<int, double> weight = new Dictionary<int, double>(metricsWordIds.Length);

            foreach (var id in metricsWordIds)
            {
                double w = 0;
                if (dic1.ContainsKey(id))
                    w += 0.9;
                if (dic2.ContainsKey(id))
                    w += 0.1;
                weight.Add(id, w * 0.8);
            }
            existedWords.UpdateMemorisation(dic1.Union(dic2), 0.8);

            await Context.SaveChangesAsync().ConfigureAwait(false);

            // calculate card stars
            // calculat audition stars

            return await base.HandleRequest(request, cancellationToken);
        }
    }
}
