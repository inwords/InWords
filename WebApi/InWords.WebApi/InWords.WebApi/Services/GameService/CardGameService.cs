using InWords.Data.Models.InWords.Creations.GameBox;
using InWords.Data.Models.InWords.Repositories;
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
        public readonly GameLevelWordService gameLevelWordService;
        public readonly GameBoxRepository gameBoxRepository;
        public CardGameService(GameService gameService,
            GameLevelService gameLevelService,
            GameBoxRepository gameBoxRepository,
            GameLevelWordService gameLevelWordService)
        {
            this.gameService = gameService;
            this.gameLevelService = gameLevelService;
            this.gameBoxRepository = gameBoxRepository;
            this.gameLevelWordService = gameLevelWordService;
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

        public async Task<int> DeleteGames(params int[] gameId)
        {
            return await gameBoxRepository.DeleteGames(gameId);
        }

        public async Task<int> DeleteOwnGames(int userId, params int[] gameId)
        {
            return await gameBoxRepository.DeleteOwnGames(userId, gameId);
        }

        public async Task<GameObject> GetGameObject(int gameId)
        {
            return await gameService.GetGameObject(gameId);
        }

        public List<GameInfo> GetGames()
        {
            return gameService.GetGames();
        }

        public Level GetLevelWords(int userId, int levelId)
        {
            return gameLevelWordService.GetLevelWords(levelId);
        }
    }
}
