using InWords.Data.DTO.Extensions;
using InWords.Data.DTO.GameBox.LevelMetric;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.GameService;
using InWords.WebApi.Services.UserWordPairService;
using InWords.WebApi.Services.UserWordPairService.Abstraction;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.CardGame
{
    [Obsolete]
    public class GameResultService
    {
        private readonly IGameScoreService gameScoreService;
        private readonly KnowledgeUpdateService knowledgeUpdateService;

        public GameResultService(GameScoreService gameScoreService, KnowledgeUpdateService knowledgeUpdateService)
        {
            this.gameScoreService = gameScoreService;
            this.knowledgeUpdateService = knowledgeUpdateService;
        }

        /// <summary>
        ///     This is to get score by level and update information of memorizing user word pairs
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="levelMetricQuery"></param>
        /// <returns></returns>
        public async Task<LevelMetricQueryResult> SetResultsAsync(int userId, LevelMetricQuery levelMetricQuery)
        {
            // set sore;
            LevelMetricQueryResult levelMetricQueryResult = gameScoreService.GetLevelScore(levelMetricQuery.ToLevelResult());

            // save score to storage
            await gameScoreService.PostScoreAsync(userId, levelMetricQueryResult).ConfigureAwait(false);
            // Calculate word metric;
            IKnowledgeQualifier knowledgeQualifier = new CardGameKnowledge(levelMetricQuery);
            // update words pairs license in store
            await knowledgeUpdateService.UpdateKnowledge(userId, knowledgeQualifier).ConfigureAwait(false);
            return levelMetricQueryResult;
        }

        public async Task<IEnumerable<LevelMetricQueryResult>> SetResultsAsync(int userId, params LevelMetricQuery[] cardGameScores)
        {
            // set sore;
            IEnumerable<LevelMetricQueryResult> levelScores =
                cardGameScores.Select(c => gameScoreService.GetLevelScore(c.ToLevelResult())).ToHashSet();

            // save score to storage
            await gameScoreService.UploadScoreAsync(userId, levelScores).ConfigureAwait(false);

            // Calculate word metric;
            IKnowledgeQualifier[] knowledgeQualifiers
                = cardGameScores.Select(k => new CardGameKnowledge(k) as IKnowledgeQualifier).ToArray();

            // update words pairs license in store
            await knowledgeUpdateService.UpdateKnowledge(userId, knowledgeQualifiers).ConfigureAwait(false);

            return levelScores;
        }
    }
}