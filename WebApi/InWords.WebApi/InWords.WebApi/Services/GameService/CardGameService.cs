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
    public class CardGameService
    {
        #region ctor

        private readonly GameService gameService;
        private readonly GameLevelService gameLevelService;


        public CardGameService(GameService gameService, GameLevelService gameLevelService)
        {

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
    }
}
