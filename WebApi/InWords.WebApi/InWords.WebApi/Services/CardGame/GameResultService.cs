using InWords.Data.DTO.Extentions;
using InWords.Data.DTO.GameBox.LevelMetric;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.GameService;
using InWords.WebApi.Services.UserWordPairService;
using InWords.WebApi.Services.UserWordPairService.Abstraction;
using InWords.WebApi.Services.UserWordPairService.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
        /// This is to get score by level and update information of memorising user word pairs
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="cardGameScore"></param>
        /// <returns></returns>
        public async Task<LevelScore> SetResults(int userId, CardGameScore cardGameScore)
        {
            // set sore;
            LevelScore levelScore = gameScoreService.GetLevelScore(cardGameScore.ToLevelResult());
            // save score to storage
            await gameScoreService.UpdateUserScore(userId, levelScore);
            // Calculate word metric;
            IKnowledgeQualifier knowledgeQualifier = new CardGameKnowledge(cardGameScore);
            // update wordas pairs license in store
            await knowledgeUpdateService.UpdateKnowledge(userId, knowledgeQualifier);
            return levelScore;
        }
    }
}
