using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.Data.Models.InWords.Creations.GameBox;
using InWords.Data.Models.InWords.Domains;
using InWords.Data.Models.InWords.Repositories;
using InWords.Transfer.Data.Models;
using InWords.Transfer.Data.Models.Creation;
using InWords.Transfer.Data.Models.GameBox;
using InWords.WebApi.Extentions.Transfer;

namespace InWords.WebApi.Services.GameService
{
    /// <inheritdoc />
    /// <summary>
    ///     Service that contain CRUD for Game
    /// </summary>
    /// <see cref="T:InWords.Data.Models.InWords.Creations.Creation" />
    public class GameService
    {
        public async Task<SyncBase> AddGamePack(int userId, GamePack gamePack)
        {
            // allow gamePack.CreatorId if admin
            gamePack.CreationInfo.CreatorId = userId;

            GameBox gameBox = await CreateGameBox(gamePack);

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

        public List<GameInfo> GetGames()
        {
            var gameInfos = new List<GameInfo>();

            List<GameBox> games = gameBoxRepository.GetAllEntities().ToList();

            foreach (GameBox game in games)
            {
                CreationInfo creationInfo = creationService.GetCreationInfo(game.CreationId);

                // TODO: (LNG) title 
                DescriptionInfo russianDescription = creationInfo.Descriptions.GetRus();

                var gameInfo = new GameInfo
                {
                    CreatorId = creationInfo.CreatorId ?? 0,
                    GameId = game.GameBoxId,
                    IsAvailable = true,
                    Title = russianDescription.Title,
                    Description = russianDescription.Description
                };

                gameInfos.Add(gameInfo);
            }

            return gameInfos;
        }

        public async Task<GameBox> CreateGameBox(GamePack gamePack)
        {
            int creationId = await creationService.AddCreation(gamePack.CreationInfo);

            // Add game information
            var gameBox = new GameBox
            {
                CreationId = creationId
            };

            gameBox = await gameBoxRepository.Create(gameBox);
            return gameBox;
        }

        /// <summary>
        ///     This is to get full information about certain game
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="gameId"></param>
        /// <returns></returns>
        public async Task<GameObject> GetGameObject(int gameId)
        {
            // find game in database
            GameBox gameBox = await gameBoxRepository.FindById(gameId);

            if (gameBox == null) return null;

            // find the creator of the game
            CreationInfo creationInfo = creationService.GetCreationInfo(gameBox.CreationId);

            // load level infos
            IEnumerable<LevelInfo> levelInfos = gameLevelService.GetLevels(gameBox);

            var game = new GameObject
            {
                GameId = gameBox.GameBoxId,
                Creator = creationInfo.CreatorNickname,
                LevelInfos = levelInfos.ToList()
            };

            return game;
        }

        #region PropsAndCtor

        private readonly CreationService creationService;
        private readonly GameLevelService gameLevelService;
        private readonly GameBoxRepository gameBoxRepository;

        /// <summary>
        ///     Basic constructor
        /// </summary>
        /// <param name="context"></param>
        public GameService(CreationService creationService,
        GameBoxRepository gameBoxRepository,
        GameLevelService gameLevelService)
        {
            this.creationService = creationService;
            this.gameBoxRepository = gameBoxRepository;
            this.gameLevelService = gameLevelService;
        }

        #endregion
    }
}