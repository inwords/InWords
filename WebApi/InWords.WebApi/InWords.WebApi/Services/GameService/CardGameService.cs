using InWords.Data.Models.InWords.Creations.GameBox;
using InWords.Transfer.Data.Models;
using InWords.Transfer.Data.Models.GameBox;
using InWords.WebApi.Services.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.GameService
{
    public class CardGameService : IGameService
    {
        #region ctor
        public readonly GameLevelService gameLevelService;
        public readonly GameService gameService;
        public readonly BaseGameService baseGameService;
        public CardGameService(GameService gameService, GameLevelService gameLevelService, BaseGameService baseGameService)
        {
            this.gameService = gameService;
            this.gameLevelService = gameLevelService;
            this.baseGameService = baseGameService;
        }
        #endregion

        public async Task<SyncBase> AddGamePack(int userId, GamePack gamePack)
        {
            // allow gamePack.CreatorId if admin
            gamePack.CreationInfo.CreatorId = userId;

            GameBox gameBox = await gameService.CreateGameBox(gamePack);

            // Loading behind the scenes, the level will be processed on the server
            // Does not affect user experience

            // Add levels
            foreach (LevelPack levelPack in gamePack.LevelPacks)
            {
                await gameLevelService.AddLevel(gameBox, levelPack);
            }

            var answer = new SyncBase(gameBox.GameBoxId);

            return answer;
        }

        public Task<int> DeleteGames(params int[] gameId)
        {
            return baseGameService.DeleteGames(gameId);
        }

        public Task<int> DeleteOwnGames(int userId, params int[] gameId)
        {
            return baseGameService.DeleteOwnGames(userId, gameId);
        }

        public Task<GamePack> GetGame(int userId, int gameId)
        {
            return gameService.get
        }

        public Task<List<GameInfo>> GetGames()
        {
            throw new NotImplementedException();
        }

        public Level GetLevel(int userId, int levelId)
        {
            throw new NotImplementedException();
        }


        ///// <summary>
        /////     This is to get full information about certain game
        ///// </summary>
        ///// <param name="userId"></param>
        ///// <param name="gameId"></param>
        ///// <returns></returns>
        //public async Task<GameObject> GetGameObject(int userId, int gameId)
        //{
        //    // find game in database
        //    GameBox gameBox = await gameBoxRepository.FindById(gameId);

        //    if (gameBox == null) return null;

        //    // find the creator of the game
        //    CreationInfo creation = await creationService.GetCreationInfo(gameBox.CreationId);

        //    if (gameBox == null) return null;

        //    User userCreator = await userRepository.FindById((int)creation.CreatorId);

        //    // find all game levels 
        //    IEnumerable<GameLevel> gameLevels = gameLevelRepository.GetWhere(l => l.GameBoxId == gameBox.GameBoxId);

        //    List<LevelInfo> levelInfos = gameLevels.Select(level => new LevelInfo
        //    {
        //        IsAvailable = true,
        //        LevelId = level.GameLevelId,
        //        Level = level.Level,
        //        PlayerStars = 0
        //    })
        //        .ToList();

        //    var game = new GameObject
        //    {
        //        GameId = gameBox.GameBoxId,
        //        Creator = userCreator.NickName,
        //        LevelInfos = levelInfos
        //    };

        //    return game;
        //}

        ///// <summary>
        /////     This is to get game level information
        ///// </summary>
        ///// <param name="userId"></param>
        ///// <param name="levelId"></param>
        ///// <see cref="Level" />
        ///// <returns></returns>
        //public Level GetLevel(int userId, int levelId)
        //{
        //    IEnumerable<GameLevelWord> gameLevelWords =
        //        gameLevelWordRepository.GetWhere(l => l.GameLevelId.Equals(levelId));

        //    IEnumerable<int> ids = gameLevelWords.Select(gl => gl.WordPairId);

        //    var wordTranslations = new List<WordTranslation>();
        //    wordTranslations.AddRange(wordsService.GetWordsById(ids));

        //    var level = new Level
        //    {
        //        LevelId = levelId,
        //        WordTranslations = wordTranslations
        //    };

        //    return level;
        //}


        //fill level
    }
}
