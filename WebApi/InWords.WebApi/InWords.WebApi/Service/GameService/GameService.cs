using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.Data.Models;
using InWords.Data.Models.InWords.Creations.GameBox;
using InWords.Data.Models.InWords.Domains;
using InWords.Transfer.Data.Models;
using InWords.Transfer.Data.Models.Creation;
using InWords.Transfer.Data.Models.GameBox;

namespace InWords.WebApi.Service.GameService
{
    /// <inheritdoc />
    /// <summary>
    ///     Service that contain CRUD for Game
    /// </summary>
    /// <see cref="T:InWords.Data.Models.InWords.Creations.Creation" />
    public class GameService : BaseGameService
    {
        /// <summary>
        ///     Add a game using the userId as the CreatorId
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="gamePack"></param>
        /// <returns></returns>
        public async Task<SyncBase> AddGamePack(int userId, GamePack gamePack)
        {
            // TODO: if admin then any creators id

            // else
            gamePack.CreationInfo.CreatorId = userId;

            // Add creation description
            int creationId = await creationService.AddCreation(gamePack.CreationInfo);

            // Add game information
            var gameBox = new GameBox
            {
                CreationId = creationId
            };

            gameBox = await GameBoxRepository.Create(gameBox);

            // Loading behind the scenes, the level will be processed on the server
            // Does not affect user experience

            // Add levels
            foreach (LevelPack levelPack in gamePack.LevelPacks)
            {
                var gameLevel = new GameLevel
                {
                    GameBoxId = gameBox.GameBoxId,
                    Level = levelPack.Level
                };
                gameLevel = await GameLevelRepository.Create(gameLevel);

                //add words

                foreach (WordTranslation pair in levelPack.WordTranslations)
                {
                    WordPair wordPair = await wordsService.AddPair(pair);

                    var gameLevelWord = new GameLevelWord
                    {
                        GameLevelId = gameLevel.GameLevelId,
                        WordPairId = wordPair.WordPairId
                    };

                    await GameLevelWordRepository.Create(gameLevelWord);
                }
            }

            var answer = new SyncBase(gameBox.GameBoxId);

            return answer;
        }

        /// <summary>
        ///     Get information about all existing games
        /// </summary>
        /// <returns></returns>
        public async Task<List<GameInfo>> GetGames()
        {
            var gameInfos = new List<GameInfo>();

            List<GameBox> games = GameBoxRepository.GetAllEntities().ToList();

            foreach (GameBox game in games)
            {
                CreationInfo creationInfo = await creationService.GetCreationInfo(game.CreationId);

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

        /// <summary>
        ///     This is to get full information about certain game
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="gameId"></param>
        /// <returns></returns>
        public async Task<Game> GetGame(int userId, int gameId)
        {
            // find game in database
            GameBox gameBox = await GameBoxRepository.FindById(gameId);

            if (gameBox == null) throw new ArgumentNullException();

            // find the creator of the game
            CreationInfo creation = await creationService.GetCreationInfo(gameBox.CreationId);

            if (creation.CreatorId == null) throw new ArgumentNullException();

            User userCreator = await UserRepository.FindById((int)creation.CreatorId);

            // find all game levels 
            IEnumerable<GameLevel> gameLevels = GameLevelRepository.GetEntities(l => l.GameBoxId == gameBox.GameBoxId);

            List<LevelInfo> levelInfos = gameLevels.Select(level => new LevelInfo
            {
                IsAvailable = true,
                LevelId = level.GameLevelId,
                Level = level.Level,
                PlayerStars = 0
            })
                .ToList();

            var game = new Game
            {
                GameId = gameBox.GameBoxId,
                Creator = userCreator.NickName,
                LevelInfos = levelInfos
            };

            return game;
        }

        /// <summary>
        ///     This is to get game level information
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="levelId"></param>
        /// <see cref="Level" />
        /// <returns></returns>
        public Level GetLevel(int userId, int levelId)
        {
            IEnumerable<GameLevelWord> gameLevelWords =
                GameLevelWordRepository.GetEntities(l => l.GameLevelId.Equals(levelId));

            IEnumerable<int> ids = gameLevelWords.Select(gl => gl.WordPairId);

            var wordTranslations = new List<WordTranslation>();
            wordTranslations.AddRange(wordsService.GetWordsById(ids));

            var level = new Level
            {
                LevelId = levelId,
                WordTranslations = wordTranslations
            };

            return level;
        }

        /// <summary>
        ///     This is to delete the whole game and levels.
        ///     Method doesn't delete words and word pairs
        ///     Need review.
        /// </summary>
        /// <exception cref="NullReferenceException"></exception>
        /// <param name="gameId"></param>
        public async Task<int> DeleteGames(params int[] gameId)
        {
            IEnumerable<int> creationsId =
                GameBoxRepository.GetEntities(g => gameId.Contains(g.GameBoxId)).Select(c => c.CreationId);

            int deletionsCount = await creationService.DeleteCreation(creationsId);

            return deletionsCount;
        }

        /// <summary>
        ///     This is to delete games as user, safe delete game if userId os owner
        /// </summary>
        /// <param name="userId">game owner user id</param>
        /// <param name="gameId">server id of the game</param>
        /// <returns></returns>
        // ReSharper disable once TooManyDeclarations
        public async Task<int> DeleteOwnGames(int userId, params int[] gameId)
        {
            // find all users game that id equals gameId
            IQueryable<int> id = from games in Context.GameBoxs
                                 join creations in Context.Creations on games.CreationId equals creations.CreationId
                                 where creations.CreatorId.Equals(userId) && gameId.Contains(games.GameBoxId)
                                 select creations.CreationId;

            return await creationService.DeleteCreation(id);
        }

        #region PropsAndCtor

        private readonly WordsService wordsService;
        private readonly CreationService creationService;
        /// <summary>
        ///     Basic constructor
        /// </summary>
        /// <param name="context"></param>
        public GameService(InWordsDataContext context) : base(context)
        {
            wordsService = new WordsService(context);
            creationService = new CreationService(context);
        }

        #endregion
    }
}