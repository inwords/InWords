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
using InWords.WebApi.Services.Abstractions;

namespace InWords.WebApi.Services.GameService
{
    /// <inheritdoc />
    /// <summary>
    ///     Service that contain CRUD for Game
    /// </summary>
    /// <see cref="T:InWords.Data.Models.InWords.Creations.Creation" />
    public class GameService
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
        ///     This is to get full information about certain game
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="gameId"></param>
        /// <returns></returns>
        public async Task<GamePack> GetGamePack(int userId, int gameId)
        {
            // find game in database
            GameBox gameBox = await gameBoxRepository.FindById(gameId);

            if (gameBox == null) return null;

            // find the creator of the game
            CreationInfo creation = await creationService.GetCreationInfo(gameBox.CreationId);

            if (gameBox == null) return null;

            User userCreator = await userRepository.FindById((int)creation.CreatorId);

            // find all game levels 
            IEnumerable<GameLevel> gameLevels = gameLevelRepository.GetWhere(l => l.GameBoxId == gameBox.GameBoxId);

            List<LevelInfo> levelInfos = gameLevels.Select(level => new LevelInfo
            {
                IsAvailable = true,
                LevelId = level.GameLevelId,
                Level = level.Level,
                PlayerStars = 0
            })
                .ToList();

            var game = new GamePack
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
                gameLevelWordRepository.GetWhere(l => l.GameLevelId.Equals(levelId));

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


        #region PropsAndCtor

        private readonly CreationService creationService;
        private readonly WordsService wordsService;
        private readonly GameBoxRepository gameBoxRepository;
        private readonly UserRepository userRepository;
        private readonly GameLevelRepository gameLevelRepository;
        private readonly GameLevelWordRepository gameLevelWordRepository;

        /// <summary>
        ///     Basic constructor
        /// </summary>
        /// <param name="context"></param>
        public GameService(CreationService creationService,
        WordsService wordsService,
        GameBoxRepository gameBoxRepository,
        UserRepository userRepository,
        GameLevelRepository gameLevelRepository,
        GameLevelWordRepository gameLevelWordRepository)
        {
            this.creationService = creationService;
            this.wordsService = wordsService;
            this.gameBoxRepository = gameBoxRepository;
            this.userRepository = userRepository;
            this.gameLevelRepository = gameLevelRepository;
            this.gameLevelWordRepository = gameLevelWordRepository;
        }

        #endregion
    }
}