using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.Data.Creations;
using InWords.Data.Creations.GameBox;
using InWords.Data.DTO.GameBox;
using InWords.Data.Repositories;

namespace InWords.WebApi.Services.GameService
{
    public class GameLevelService
    {
        private readonly GameLevelRepository gameLevelRepository;
        private readonly GameLevelWordService gameLevelWordService;

        public GameLevelService(GameLevelRepository gameLevelRepository,
            GameLevelWordService gameLevelWordService)
        {
            this.gameLevelRepository = gameLevelRepository;
            this.gameLevelWordService = gameLevelWordService;
        }

        public async Task<GameLevel> AddLevelAsync(Creation gameBox, LevelPack levelPack)
        {
            var gameLevel = new GameLevel
            {
                GameBoxId = gameBox.CreationId,
                Level = levelPack.Level
            };
            gameLevel = await gameLevelRepository.CreateAsync(gameLevel).ConfigureAwait(false);
            await gameLevelWordService.AddWordsToLevelAsync(levelPack.WordTranslations, gameLevel.GameLevelId)
                .ConfigureAwait(false);
            return gameLevel;
        }

        public IEnumerable<LevelInfo> GetLevels(Creation gameBox)
        {
            // find all game levels 
            IEnumerable<GameLevel> gameLevels = gameLevelRepository.GetWhere(l => l.GameBoxId == gameBox.CreationId);
            // convert to level info
            return gameLevels.Select(GetLevelInfo);
        }

        //public async Task<LevelInfo> GetLevel(int levelId)
        //{
        //    GameLevel level = await gameLevelRepository.FindById(levelId).ConfigureAwait(false);

        //    return GetLevelInfo(level);
        //}

        public LevelInfo GetLevelInfo(GameLevel level)
        {
            var levelInfo = new LevelInfo
            {
                IsAvailable = true,
                LevelId = level.GameLevelId,
                Level = level.Level,
                PlayerStars = 0
            };
            return levelInfo;
        }
    }
}