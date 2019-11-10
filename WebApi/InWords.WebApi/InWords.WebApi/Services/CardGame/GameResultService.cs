using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.Data.DTO.Extentions;
using InWords.Data.DTO.GameBox.LevelMetric;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.GameService;
using InWords.WebApi.Services.UserWordPairService;
using InWords.WebApi.Services.UserWordPairService.Abstraction;

namespace InWords.WebApi.Services.CardGame
{
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
        /// <param name="cardGameScore"></param>
        /// <returns></returns>
        public async Task<LevelScore> SetResultsAsync(int userId, CardGameScore cardGameScore)
        {
            // set sore;
            LevelScore levelScore = gameScoreService.GetLevelScore(cardGameScore.ToLevelResult());

            // save score to storage
            await gameScoreService.PostScoreAsync(userId, levelScore).ConfigureAwait(false);
            // Calculate word metric;
            IKnowledgeQualifier knowledgeQualifier = new CardGameKnowledge(cardGameScore);
            // update words pairs license in store
            await knowledgeUpdateService.UpdateKnowledge(userId, knowledgeQualifier).ConfigureAwait(false);
            return levelScore;
        }

        public async Task<IEnumerable<LevelScore>> SetResultsAsync(int userId, params CardGameScore[] cardGameScores)
        {
            // set sore;
            IEnumerable<LevelScore> levelScores =
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