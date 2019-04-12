using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.Data.Models;
using InWords.Data.Models.InWords.Creations.GameBox;
using InWords.Data.Models.InWords.Domains;
using InWords.Data.Models.InWords.Repositories;
using InWords.Transfer.Data.Models;
using InWords.Transfer.Data.Models.Creation;
using InWords.Transfer.Data.Models.GameBox;
using InWords.Transfer.Data.Models.GameBox.LevelMetric;

namespace InWords.WebApi.Service.GameService
{
    /// <inheritdoc />
    /// <summary>
    ///     Service that contain CRUD for Game
    /// </summary>
    /// <see cref="T:InWords.Data.Models.InWords.Creations.Creation" />
    public class GameService : CreationService
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
            int creationId = await AddCreation(gamePack.CreationInfo);

            // Add game information
            var gameBox = new GameBox
            {
                CreationId = creationId
            };

            gameBox = await gameBoxRepository.Create(gameBox);

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
                gameLevel = await gameLevelRepository.Create(gameLevel);

                //add words

                foreach (WordTranslation pair in levelPack.WordTranslations)
                {
                    WordPair wordPair = await wordsService.AddPair(pair);

                    var gameLevelWord = new GameLevelWord
                    {
                        GameLevelId = gameLevel.GameLevelId,
                        WordPairId = wordPair.WordPairId
                    };

                    await gameLevelWordRepository.Create(gameLevelWord);
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

            List<GameBox> games = gameBoxRepository.GetAllEntities().ToList();

            foreach (GameBox game in games)
            {
                CreationInfo creationInfo = await GetCreationInfo(game.CreationId);

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
            GameBox gameBox = await gameBoxRepository.FindById(gameId);

            if (gameBox == null) throw new ArgumentNullException();

            // find the creator of the game
            CreationInfo creation = await GetCreationInfo(gameBox.CreationId);

            if (creation.CreatorId == null) throw new ArgumentNullException();

            User userCreator = await usersRepository.FindById((int) creation.CreatorId);

            // find all game levels 
            IEnumerable<GameLevel> gameLevels = gameLevelRepository.GetEntities(l => l.GameBoxId == gameBox.GameBoxId);

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

        public Game GetGameStars(int userId, Game game)
        {
            // find user game box to find all user levels
            UserGameBox userGameBox = userGameBoxRepository
                .GetEntities(usb => usb.UserId.Equals(userId) && usb.GameBoxId.Equals(game.GameId))
                .SingleOrDefault();
            // if no saves found return default game value
            if (userGameBox == null) return game;

            // load all saves
            IEnumerable<UserGameLevel> userLevels =
                userGameLevelRepository.GetEntities(ugl => ugl.UserGameBoxId.Equals(userGameBox.UserGameBoxId));
            SetLevelStars(game, userLevels);
            return game;
        }

        private static void SetLevelStars(Game game, IEnumerable<UserGameLevel> userLevels)
        {
            // merge by level number
            foreach (UserGameLevel level in userLevels)
            {
                LevelInfo userLevel = game.LevelInfos.Find(l => l.LevelId.Equals(level.GameLevelId));
                userLevel.PlayerStars = level.UserStars;
            }
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
                gameLevelWordRepository.GetEntities(l => l.GameLevelId.Equals(levelId));

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
                gameBoxRepository.GetEntities(g => gameId.Contains(g.GameBoxId)).Select(c => c.CreationId);

            int deletionsCount = await DeleteCreation(creationsId);

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

            return await DeleteCreation(id);
        }

        /// <summary>
        ///     This is to update user score on game level
        /// </summary>
        /// <param name="levelResult"></param>
        /// <returns></returns>
        public LevelScore GetLevelScore(LevelResult levelResult)
        {
            // get word pairs count
            int wordsCount =
                gameLevelWordRepository.GetEntities(glw => glw.GameLevelId == levelResult.LevelId).Count() * 2;
            // calculate best openings count
            int bestOpeningsCount = wordsCount * 2 - 2;
            // calculate score
            var score = 0;
            if (levelResult.OpeningQuantity <= bestOpeningsCount)
                score = 3;
            else if (levelResult.OpeningQuantity <= wordsCount * 2.25)
                score = 2;
            else if (levelResult.OpeningQuantity <= wordsCount * 2.5) score = 1;

            var levelScore = new LevelScore
            {
                LevelId = levelResult.LevelId,
                Score = score
            };

            return levelScore;
        }

        /// <summary>
        ///     This is to set level score to user level storage
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="levelScore"></param>
        /// <exception cref="ArgumentNullException">Null game box is not find</exception>
        /// <returns></returns>
        public async Task UpdateUserScore(int userId, LevelScore levelScore)
        {
            UserGameBox userGameBox = await EnsureUserGameBox(userId, levelScore);

            await EnsureLevelScore(levelScore, userGameBox);
        }

        private async Task<UserGameBox> EnsureUserGameBox(int userId, LevelScore levelScore)
        {
            // Create user game stats
            GameLevel gameLevel = gameLevelRepository.GetEntities(gl => gl.GameLevelId == levelScore.LevelId)
                .FirstOrDefault();

            // if game level is not exits
            if (gameLevel == null) throw new ArgumentNullException(nameof(gameLevel));

            // find user game box that's contains user progress
            UserGameBox userGameBox = userGameBoxRepository.GetEntities(ugb => ugb.UserId == userId).SingleOrDefault()
                                      // create if not exists
                                      ?? await userGameBoxRepository.Create(
                                          new UserGameBox(userId, gameLevel.GameBoxId));
            return userGameBox;
        }

        private async Task EnsureLevelScore(LevelScore levelScore, UserGameBox userGameBox)
        {
            // find user game level
            UserGameLevel userGameLevel = userGameLevelRepository
                .GetEntities(g =>
                    g.GameLevelId.Equals(levelScore.LevelId) && g.UserGameBoxId.Equals(userGameBox.GameBoxId))
                .SingleOrDefault();

            // create note if user level score information not found
            if (userGameLevel == null)
            {
                userGameLevel = new UserGameLevel(userGameBox.UserGameBoxId, levelScore.LevelId, levelScore.Score);
                await userGameLevelRepository.Create(userGameLevel);
            }

            // in level score information found 
            else
            {
                // if score less or equals return current score
                if (userGameLevel.UserStars >= levelScore.Score) return;

                // else update score
                userGameLevel.UserStars = levelScore.Score;
                await userGameLevelRepository.Update(userGameLevel);
            }
        }

        #region PropsAndCtor

        private readonly GameBoxRepository gameBoxRepository;
        private readonly GameLevelRepository gameLevelRepository;
        private readonly GameLevelWordRepository gameLevelWordRepository;
        private readonly UserGameBoxRepository userGameBoxRepository;
        private readonly UserGameLevelRepository userGameLevelRepository;
        private readonly UserRepository usersRepository;
        private readonly WordsService wordsService;

        /// <summary>
        ///     Basic constructor
        /// </summary>
        /// <param name="context"></param>
        public GameService(InWordsDataContext context) : base(context)
        {
            usersRepository = new UserRepository(context);
            wordsService = new WordsService(context);
            gameBoxRepository = new GameBoxRepository(context);
            gameLevelRepository = new GameLevelRepository(context);
            gameLevelWordRepository = new GameLevelWordRepository(context);
            userGameBoxRepository = new UserGameBoxRepository(context);
            userGameLevelRepository = new UserGameLevelRepository(context);
        }

        #endregion
    }
}