using System.Collections.Generic;
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

namespace InWords.WebApi.Service
{
    public class GameService : CreationService
    {
        private readonly GameBoxRepository gameBoxRepository;
        private readonly GameLevelRepository gameLevelRepository;
        private readonly GameLevelWordRepository gameLevelWordRepository;
        private readonly UserRepository usersRepository;
        private readonly WordsService wordsService;

        public GameService(InWordsDataContext context) : base(context)
        {
            wordsService = new WordsService(this.context);
            gameBoxRepository = new GameBoxRepository(context);
            gameLevelRepository = new GameLevelRepository(context);
            gameLevelWordRepository = new GameLevelWordRepository(context);
            usersRepository = new UserRepository(context);
        }

        /// <summary>
        ///     This is to add game pack to database with UserID as CreationID
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="gamePack"></param>
        /// <returns></returns>
        public async Task<SyncBase> AddGamePack(int userID, GamePack gamePack)
        {
            // TODO: if admin then any creators id

            // else
            gamePack.CreationInfo.CreatorId = userID;

            // Add creation description
            int creationID = await AddCreation(gamePack.CreationInfo);

            // Add game information
            var gameBox = new GameBox
            {
                CreationId = creationID
            };
            gameBox = await gameBoxRepository.Create(gameBox);

            // Add levels
            foreach (LevelPack levelPack in gamePack.LevelPacks)
            {
                var gameLevel = new GameLevel
                {
                    GameBoxId = gameBox.GameBoxId,
                    TotalStars = levelPack.TotalStars,
                    SuccessStars = levelPack.SuccessStars,
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

        public List<GameInfo> GetGameInfo()
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

        public async Task<Game> GetGameInfo(int userID, int gameID)
        {
            // TODO: Add level to user

            GameBox gameBox = await gameBoxRepository.FindById(gameID);
            CreationInfo creation = await GetCreation(gameBox.CreationId);
            User userCreator = await usersRepository.FindById(creation.CreatorId);


            IEnumerable<GameLevel> gameLevels = gameLevelRepository.Get(l => l.GameBoxId == gameBox.GameBoxId);

            List<LevelInfo> levelInfos = gameLevels.Select(level => new LevelInfo
                {
                    IsAvailable = true,
                    LevelId = level.GameLevelId,
                    Level = level.Level,
                    PlayerStars = 0,
                    SuccessStars = level.SuccessStars,
                    TotalStars = level.TotalStars
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
    }
}