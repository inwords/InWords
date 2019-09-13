using InWords.Data.DTO.GameBox.LevelMetric;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.GameService;
using InWords.WebApi.Services.UserWordPairService;
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

        public async Task<LevelScore> SetResults(int userId, CardGameScore cardGameScore)
        {
            // set sore;
            LevelScore levelScore = gameScoreService.GetLevelScore(cardGameScore.LevelResult);
            // save score to storage
            await gameScoreService.UpdateUserScore(userId, levelScore);
            // Calculate word metric;
            Dictionary<int,KnowledgeQualitys> keyValuePairs = 
            // update wordas pairs license in store
            knowledgeUpdateService.ByDicrinary()
            return levelScore;
        }
    }
}
