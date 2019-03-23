using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Threading.Tasks;
using InWords.Data.Models;
using InWords.Data.Models.InWords.Creations;
using InWords.Data.Models.InWords.Creations.GameBox;
using InWords.Data.Models.InWords.Domains;
using InWords.Data.Models.InWords.Repositories;
using InWords.Transfer.Data.Models;
using InWords.Transfer.Data.Models.Creation;
using InWords.Transfer.Data.Models.GameBox;
using InWords.Transfer.Data.Models.GameBox.LevelMetric;

namespace InWords.WebApi.Service
{
    public class GameService : CreationService
    {
        #region PropsAndCtor

        private readonly GameBoxRepository gameBoxRepository;
        private readonly GameLevelRepository gameLevelRepository;
        private readonly GameLevelWordRepository gameLevelWordRepository;
        private readonly UserGameBoxRepository userGameBoxRepository;
        private readonly UserGameLevelRepository userGameLevelRepository;
        private readonly UserRepository usersRepository;
        private readonly WordsService wordsService;


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

        /// <summary>
        ///     This is to add game pack to database with UserID as CreationID
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
            await Task.Run(async () =>
            {
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

            });

            var answer = new SyncBase(gameBox.GameBoxId);

            return answer;
        }

        /// <summary>
        ///     This is to get short information about all created games
        /// </summary>
        /// <returns></returns>
        public List<GameInfo> GetGamesInfos()
        {
            var gameInfos = new List<GameInfo>();

            List<GameBox> games = gameBoxRepository.Get().ToList();

            foreach (GameBox game in games)
            {
                // TODO: (LNG) title 
                CreationDescription description = GetDescriptions(game.CreationId).FirstOrDefault();

                var gameInfo = new GameInfo
                {
                    GameId = game.GameBoxId,
                    IsAvailable = true,
                    Title = description?.Title
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

            User userCreator = await usersRepository.FindById(creation.CreatorId);

            // find all game levels 
            IEnumerable<GameLevel> gameLevels = gameLevelRepository.Get(l => l.GameBoxId == gameBox.GameBoxId);

            List<LevelInfo> levelInfos = gameLevels.Select(level => new LevelInfo
                {
                    IsAvailable = true,
                    LevelId = level.GameLevelId,
                    Level = level.Level,
                    PlayerStars = 0,
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

        public Level GetLevel(int userId, int levelId)
        {
            // TODO: Add level to user

            IEnumerable<GameLevelWord> gameLevelWords = gameLevelWordRepository.Get(l => l.GameLevelId == levelId);

            var wordTranslations = new List<WordTranslation>();

            IEnumerable<int> ids = gameLevelWords.Select(gl => gl.WordPairId);

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
        public void DeleteGames(params int[] gameId)
        {
            int creationsId = gameBoxRepository.Get(g => gameId.Contains(g.GameBoxId)).Select(c => c.CreationId)
                .SingleOrDefault();

            if (creationsId == 0) return;

            DeleteCreation(creationsId);
        }

        public void DeleteGames(int userId, params int[] gameId)
        {
            int id = (from games in Context.GameBoxs
                join creations in Context.Creations on games.CreationId equals creations.CreationId
                where creations.CreationId == userId && gameId.Contains(games.GameBoxId)
                select creations.CreationId).SingleOrDefault();

            if (id == 0) throw new NullReferenceException();

            DeleteCreation(id);
        }

        /// <summary>
        ///     This is to update user score on game level
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="levelResult"></param>
        /// <returns></returns>
        public async Task<LevelScore> LevelResultToScore(int userId, LevelResult levelResult)
        {
            // Create user game stats
            GameLevel gameLevel = gameLevelRepository.Get(gl => gl.GameLevelId == levelResult.LevelId).FirstOrDefault();

            // if game level is not exits
            if (gameLevel == null) throw new ArgumentNullException(nameof(gameLevel));

            // get word pairs count
            int wordPairsCount = gameLevelWordRepository.Get(glw => glw.GameLevelId == levelResult.LevelId).Count();

            // words count is pair multiply by 2 
            int wordsCount = wordPairsCount * 2;

            // calculate score
            var score = 0;
            int quantity = levelResult.OpeningQuantity;
            if (quantity < wordsCount * 2 - 2)
                score = 3;
            else if (quantity < wordsCount * 2.25)
                score = 2;
            else if (quantity < wordsCount * 2.5) score = 3;

            var levelScore = new LevelScore
            {
                LevelId = levelResult.LevelId,
                Score = score
            };

            // set results async
            UserGameBox userGameBox = userGameBoxRepository.Get(ugb => ugb.UserId == userId).SingleOrDefault();

            // if user never play this game 
            // create user stats object
            if (userGameBox == null)
            {
                int gameBoxId = gameLevel.GameBoxId;
                // Get GameBoxId
                userGameBox = new UserGameBox
                {
                    UserId = userId,
                    GameBoxId = gameBoxId
                };
                await userGameBoxRepository.Create(userGameBox);
            }

            // if user already play this game
            else
            {
                // find level score information
                UserGameLevel userGameLevel = userGameLevelRepository
                    .Get(ugl => ugl.UserGameBoxId == userGameBox.GameBoxId && ugl.GameLevelId == levelResult.LevelId)
                    .FirstOrDefault();

                // create note if user level score information not found
                if (userGameLevel == null)
                {
                    userGameLevel = new UserGameLevel
                    {
                        UserGameBoxId = userGameBox.UserGameBoxId,
                        GameLevelId = levelResult.LevelId,
                        UserStars = score
                    };
                    await userGameLevelRepository.Create(userGameLevel);
                }

                // in level score information found 
                else
                {
                    // if score less or equals return current score
                    if (userGameLevel.UserStars >= score) return levelScore;

                    // else update score
                    userGameLevel.UserStars = score;
                    await userGameLevelRepository.Update(userGameLevel);
                }
            }

            return levelScore;
        }
    }
}