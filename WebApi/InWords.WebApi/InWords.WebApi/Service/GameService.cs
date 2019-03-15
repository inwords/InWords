﻿using InWords.Data.Models;
using InWords.Data.Models.InWords.Creations.GameBox;
using InWords.Data.Models.InWords.Repositories;
using InWords.Transfer.Data.Models;
using InWords.Transfer.Data.Models.GameBox;

namespace InWords.WebApi.Service
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using InWords.Data;
    using InWords.Transfer.Data;

    public class GameService : CreationService
    {
        private readonly WordsService wordsService = null;
        private readonly GameBoxRepository gameBoxRepository = null;//seriaRepository
        private readonly GameLevelRepository gameLevelRepository = null; //seriaWordRepository
        private readonly GameLevelWordRepository gameLevelWordRepository = null;
        private readonly UserRepository usersRepository = null;

        public GameService(InWordsDataContext context) : base(context)
        {
            wordsService = new WordsService(this.context);
            gameBoxRepository = new GameBoxRepository(context);
            gameLevelRepository = new GameLevelRepository(context);
            gameLevelWordRepository = new GameLevelWordRepository(context);
            usersRepository = new UserRepository(context);

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
            gamePack.CreationInfo.CreatorId = userID;

            // Add creation description
            int creationID = await AddCreation(gamePack.CreationInfo);

            // Add game information
            GameBox gameBox = new GameBox()
            {
                CreationId = creationID
            };
            gameBox = await gameBoxRepository.Create(gameBox);

            // Add levels
            foreach (var levelPack in gamePack.LevelPacks)
            {
                GameLevel gameLevel = new GameLevel()
                {
                    GameBoxId = gameBox.GameBoxId,
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
                        GameLevelId = gameLevel.GameLevelId,
                        WordPairId = wordPair.WordPairId
                    };

                    await gameLevelWordRepository.Create(gameLevelWord);
                }
            }

            SyncBase answer = new SyncBase(gameBox.GameBoxId);

            return answer;
        }

        public async Task<List<GameInfo>> GetGameInfo()
        {
            List<GameInfo> gameInfos = new List<GameInfo>();

            var games = gameBoxRepository.Get().ToList();

            foreach (var game in games)
            {
                // TODO: (LNG) title 
                var description = GetDescriptions(game.CreationId).FirstOrDefault();

                GameInfo gameInfo = new GameInfo()
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

            var gameBox = await gameBoxRepository.FindById(gameID);
            var creation = await GetCreation(gameBox.CreationId);
            var userCreator = await usersRepository.FindById(creation.CreatorId);


            List<LevelInfo> levelinfos = new List<LevelInfo>();

            var gamelevels = gameLevelRepository.Get(l => l.GameBoxId == gameBox.GameBoxId);
            foreach (var level in gamelevels)
            {
                var levelInfo = new LevelInfo()
                {
                    IsAvailable = true,
                    LevelId = level.GameLevelId,
                    Level = level.Level,
                    PlayerStars = 0,
                    SuccessStars = level.SuccessStars,
                    TotalStars = level.TotalStars
                };
                levelinfos.Add(levelInfo);
            }

            Game game = new Game()
            {
                GameId = gameBox.GameBoxId,
                Creator = userCreator.NickName,
                LevelInfos = levelinfos
            };

            return game;
        }

        public async Task<Level> GetLevel(int userID, int levelID)
        {
            // TODO: Add level to user

            var gameLevelWords = gameLevelWordRepository.Get(l => l.GameLevelId == levelID);

            List<WordTranslation> wordTranslations = new List<WordTranslation>();

            var ids = gameLevelWords.Select(gl => gl.WordPairId);

            wordTranslations.AddRange((wordsService.GetWordsById(ids)));

            Level level = new Level()
            {
                LevelId = levelID,
                WordTranslations = wordTranslations
            };

            return level;
        }
    }
}
