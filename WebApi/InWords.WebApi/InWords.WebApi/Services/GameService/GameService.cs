using InWords.Data.Creations;
using InWords.Data.DTO;
using InWords.Data.DTO.Creation;
using InWords.Data.DTO.GameBox;
using InWords.Data.Repositories;
using InWords.WebApi.Extensions.Transfer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.GameService
{
    /// <summary>
    ///     Service that contain CRUD for Game
    /// </summary>
    /// <see cref="T:InWords.Data.Models.InWords.Games.Game" />
    [Obsolete]
    public class GameService
    {
        private readonly CreationRepository creationRepository;
        private readonly CreationService creationService;
        private readonly GameLevelService gameLevelService;

        /// <summary>
        ///     Basic constructor
        /// </summary>
        /// <param name="creationService"></param>
        /// <param name="creationRepository"></param>
        /// <param name="gameLevelService"></param>
        public GameService(CreationService creationService,
            CreationRepository creationRepository,
            GameLevelService gameLevelService)
        {
            this.creationService = creationService;
            this.creationRepository = creationRepository;
            this.gameLevelService = gameLevelService;
        }

        public async Task<SyncBase> AddGamePackAsync(int userId, GamePack gamePack)
        {
            // allow gamePack.CreatorId if admin
            gamePack.CreationInfo.CreatorId = userId;

            Game gameBox = await CreateGameBoxAsync(gamePack).ConfigureAwait(false);

            // Loading behind the scenes, the level will be processed on the server
            // Does not affect user experience

            // Add levels
            foreach (LevelPack levelPack in gamePack.LevelPacks)
                await gameLevelService.AddLevelAsync(gameBox, levelPack).ConfigureAwait(false);

            var answer = new SyncBase(gameBox.GameId);

            return answer;
        }

        public IEnumerable<GameInfo> GetGames()
        {
            return from creation in creationRepository.GetWhere(g => g.CreatorId == Game.MainGames).ToList()
                   let creationInfo = creationService.GetCreationInfo(creation.GameId)
                   let russianDescription = creationInfo.Descriptions.GetRus()
                   select new GameInfo
                   {
                       CreatorId = creationInfo.CreatorId ?? 0,
                       GameId = creation.GameId,
                       IsAvailable = true,
                       Title = russianDescription.Title,
                       Description = russianDescription.Description
                   };
        }

        public Task<Game> CreateGameBoxAsync(GamePack gamePack)
        {
            return creationService.AddCreationInfoAsync(gamePack.CreationInfo);
        }

        /// <summary>
        ///     This is to get full information about certain game
        /// </summary>
        /// <param name="gameId"></param>
        /// <returns></returns>
        public async Task<GameObject> GetGameObjectAsync(int gameId)
        {
            // find game in database
            Game gameBox = await creationRepository.FindById(gameId).ConfigureAwait(false);

            if (gameBox == null) return null;

            // find the creator of the game
            CreationInfo creationInfo = creationService.GetCreationInfo(gameBox.GameId);

            // load level infos
            IEnumerable<LevelInfo> levelInfos = gameLevelService.GetLevels(gameBox);

            var game = new GameObject
            {
                GameId = gameBox.GameId,
                Creator = creationInfo
                    .CreatorNickname, //TODO: V3080 https://www.viva64.com/en/w/v3080/ Possible null dereference. Consider inspecting 'creationInfo'.
                LevelInfos = levelInfos.ToList()
            };

            return game;
        }
    }
}