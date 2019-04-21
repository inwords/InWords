using InWords.Data.Models.InWords.Creations.GameBox;
using InWords.Data.Models.InWords.Domains;
using InWords.Data.Models.InWords.Repositories;
using InWords.Transfer.Data.Models;
using InWords.Transfer.Data.Models.GameBox;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.GameService
{
    public class GameLevelService
    {
        #region ctor
        private readonly GameLevelRepository gameLevelRepository;
        private readonly GameLevelWordService gameLevelWordService;

        public GameLevelService(GameLevelRepository gameLevelRepository,
            GameLevelWordService gameLevelWordService)
        {
            this.gameLevelRepository = gameLevelRepository;
            this.gameLevelWordService = gameLevelWordService;
        }
        #endregion

        public async Task<GameLevel> AddLevel(GameBox gameBox, LevelPack levelPack)
        {
            var gameLevel = new GameLevel
            {
                GameBoxId = gameBox.GameBoxId,
                Level = levelPack.Level
            };
            gameLevel = await gameLevelRepository.Create(gameLevel);
            await gameLevelWordService.AddWordsToLevel(levelPack.WordTranslations, gameLevel.GameLevelId);
            return gameLevel;
        }

        public IEnumerable<LevelInfo> GetLevels(GameBox gameBox)
        {
            // find all game levels 
            IEnumerable<GameLevel> gameLevels = gameLevelRepository.GetWhere(l => l.GameBoxId == gameBox.GameBoxId);
            // convert to level info
            return gameLevels.Select(GetLevelInfo);
        }

        public async Task<LevelInfo> GetLevel(int levelId)
        {
            GameLevel level = await gameLevelRepository.FindById(levelId);

            return GetLevelInfo(level);
        }

        public LevelInfo GetLevelInfo(GameLevel level)
        {
            var levelInfo = new LevelInfo
            {
                IsAvailable = true,
                LevelId = level.GameLevelId,
                Level = level.Level,
                PlayerStars = 0
            });
            return levelInfo;
        }
    }
}
