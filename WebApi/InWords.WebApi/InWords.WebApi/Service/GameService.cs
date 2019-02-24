namespace InWords.WebApi.Service
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using InWords.Data;
    using InWords.Data.Models;
    using InWords.Transfer.Data;

    public class GameService : CreationService
    {
        private readonly WordsService wordsService = null;
        private readonly GameBoxRepository gameBoxRepository = null;//seriaRepository
        private readonly GameLevelRepository gameLevelRepository = null; //seriaWordRepository
        private readonly GameLevelWordRepository gameLevelWordRepository = null;

        public GameService(InWordsDataContext context) : base(context)
        {
            wordsService = new WordsService(this.context);
            gameBoxRepository = new GameBoxRepository(context);
            gameLevelRepository = new GameLevelRepository(context);
            gameLevelWordRepository = new GameLevelWordRepository(context);
        }

        /// <summary>
        /// This is to add game pack to database with UserID as CreationID
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="gamePack"></param>
        /// <returns></returns>
        public async Task<SyncBase> AddGamePack(int userID, GamePack gamePack)
        {
            // TODO: if admin then any creators id

            // else
            gamePack.CreationInfo.CreatorID = userID;

            // Add creation description
            int creationID = await AddCreation(gamePack.CreationInfo);

            // Add game information
            GameBox gameBox = new GameBox()
            {
                CreationID = creationID
            };
            gameBox = await gameBoxRepository.Create(gameBox);

            // Add levels
            foreach (var levelPack in gamePack.LevelPacks)
            {
                GameLevel gameLevel = new GameLevel()
                {
                    GameBoxID = gameBox.GameBoxID,
                    Title = levelPack.Title,
                    TotalStars = levelPack.TotalStars,
                    SuccessStars = levelPack.SuccessStars,
                    Level = levelPack.Level
                };
                gameLevel = await gameLevelRepository.Create(gameLevel);

                //add words

                foreach (var pair in levelPack.WordTranslations)
                {
                    var wordPair = await wordsService.AddPair(pair);

                    GameLevelWord gameLevelWord = new GameLevelWord()
                    {
                        GameLevelID = gameLevel.GameLevelID,
                        WordPairID = wordPair.WordPairID
                    };

                    await gameLevelWordRepository.Create(gameLevelWord);
                }
            }

            SyncBase answer = new SyncBase(gameBox.GameBoxID);

            return answer;
        }

        public async Task<IAsyncEnumerable<GameInfo>> GetGameInfo()
        {
            Game
        }
    }
}
