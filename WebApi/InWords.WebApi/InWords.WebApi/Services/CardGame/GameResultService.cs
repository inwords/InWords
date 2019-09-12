using InWords.Data.DTO.GameBox.LevelMetric;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.GameService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.CardGame
{
    public class GameResultService
    {
        private readonly IGameScoreService gameScoreService;
        private readonly IUserWordPairService wordPairMetric;

        public GameResultService(GameScoreService gameScoreService)
        {
            this.gameScoreService = gameScoreService;
        }

        public async Task<LevelScore> SetResults(int userId, CardGameScore cardGameScore)
        {
            // set sore;
            LevelScore levelScore = gameScoreService.GetLevelScore(cardGameScore.LevelResult);
            await gameScoreService.UpdateUserScore(userId, levelScore);
            // update word metric;

            return levelScore;
        }
    }
}
