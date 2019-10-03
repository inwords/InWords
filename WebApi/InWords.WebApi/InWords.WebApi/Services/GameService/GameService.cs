using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.Data.Creations.GameBox;
using InWords.Data.DTO;
using InWords.Data.DTO.Creation;
using InWords.Data.DTO.GameBox;
using InWords.Data.Repositories;
using InWords.WebApi.Extensions.Transfer;

namespace InWords.WebApi.Services.GameService
{
    /// <summary>
    ///     Service that contain CRUD for Game
    /// </summary>
    /// <see cref="T:InWords.Data.Models.InWords.Creations.Creation" />
    public class GameService
    {
        private readonly CreationService creationService;
        private readonly GameLevelService gameLevelService;
        private readonly GameBoxRepository gameBoxRepository;

        /// <summary>
        ///     Basic constructor
        /// </summary>
        /// <param name="creationService"></param>
        /// <param name="gameBoxRepository"></param>
        /// <param name="gameLevelService"></param>
        public GameService(CreationService creationService,
            GameBoxRepository gameBoxRepository,
            GameLevelService gameLevelService)
        {
            this.creationService = creationService;
            this.gameBoxRepository = gameBoxRepository;
            this.gameLevelService = gameLevelService;
        }

        public async Task<SyncBase> AddGamePack(int userId, GamePack gamePack)
        {
            // allow gamePack.CreatorId if admin
            gamePack.CreationInfo.CreatorId = userId;

            GameBox gameBox = await CreateGameBox(gamePack);

            // Loading behind the scenes, the level will be processed on the server
            // Does not affect user experience

            // Add levels
            foreach (LevelPack levelPack in gamePack.LevelPacks) await gameLevelService.AddLevel(gameBox, levelPack);

            var answer = new SyncBase(gameBox.GameBoxId);

            return answer;
        }

        public List<GameInfo> GetGames()
        {
            List<GameBox> games = gameBoxRepository.GetAllEntities().ToList();

            return (from game in games
                let creationInfo = creationService.GetCreationInfo(game.CreationId)
                let russianDescription = creationInfo.Descriptions.GetRus()
                select new GameInfo
                {
                    CreatorId = creationInfo.CreatorId ?? 0,
                    GameId = game.GameBoxId,
                    IsAvailable = true,
                    Title = russianDescription.Title,
                    Description = russianDescription.Description
                }).ToList();
        }

        public async Task<GameBox> CreateGameBox(GamePack gamePack)
        {
            int creationId = await creationService.AddCreationInfo(gamePack.CreationInfo);

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
                Creator = creationInfo
                    .CreatorNickname, //TODO: V3080 https://www.viva64.com/en/w/v3080/ Possible null dereference. Consider inspecting 'creationInfo'.
                LevelInfos = levelInfos.ToList()
            };

            return game;
        }
    }
}