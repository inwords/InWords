using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.Data.Models.InWords.Creations.GameBox;
using InWords.Data.Models.InWords.Repositories;
using InWords.Domain;
using InWords.Transfer.Data.Models.GameBox;
using InWords.Transfer.Data.Models.GameBox.LevelMetric;

namespace InWords.WebApi.Services.GameService
{
    public class GameScoreService
    {
        //TODO : return full game info
        public async Task<GameObject> GetGameStars(int userId, GameObject game)
        {
            // find user game box to find all user levels
            UserGameBox userGameBox = userGameBoxRepository
                .GetWhere(usb => usb.UserId.Equals(userId) && usb.GameBoxId.Equals(game.GameId))
                .SingleOrDefault();
            // if no saves found return default game value
            if (userGameBox == null) return game;

            // load all saves
            IEnumerable<UserGameLevel> userLevels =
                userGameLevelRepository.GetWhere(ugl => ugl.UserGameBoxId.Equals(userGameBox.UserGameBoxId));
            await SetLevelStars(game, userLevels);
            return game;
        }

        private async Task SetLevelStars(GameObject game, IEnumerable<UserGameLevel> userLevels)
        {
            // merge by level number
            foreach (UserGameLevel level in userLevels)
            {
                LevelInfo userLevel = game.LevelInfos.Find(l => l.LevelId.Equals(level.GameLevelId));

                if (userLevel == null)
                {
                    var nullGame = await userGameLevelRepository.FindById(level.UserGameLevelId);
                    await userGameLevelRepository.Remove(nullGame);
                }
                else
                {
                    userLevel.PlayerStars = level.UserStars;
                }
            }
        }

        /// <summary>
        ///     This is to update user score on game level
        /// </summary>
        /// <param name="levelResult"></param>
        /// <returns></returns>
        public LevelScore GetLevelScore(LevelResult levelResult)
        {
            int score = GameLogic.GameScore(levelResult.WordsCount, levelResult.OpeningQuantity);

            LevelScore levelScore = new LevelScore(levelResult.LevelId, score);

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
            GameLevel gameLevel = await gameLevelRepository.FindById(levelScore.LevelId);

            // if game level is not exits
            if (gameLevel == null) throw new ArgumentNullException(nameof(gameLevel));

            // find user game box that's contains user progress
            UserGameBox userGameBox = userGameBoxRepository
                .GetWhere(ugb => ugb.UserId.Equals(userId) && ugb.GameBoxId.Equals(gameLevel.GameBoxId)).SingleOrDefault()
                // create if not exists
                ?? await userGameBoxRepository.Create(new UserGameBox(userId, gameLevel.GameBoxId));

            return userGameBox;
        }

        private async Task EnsureLevelScore(LevelScore levelScore, UserGameBox userGameBox)
        {
            // find user game level
            UserGameLevel userGameLevel = userGameLevelRepository
                .GetWhere(g =>
                    g.GameLevelId.Equals(levelScore.LevelId) && g.UserGameBoxId.Equals(userGameBox.UserGameBoxId))
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

        #region Ctor

        private readonly UserGameBoxRepository userGameBoxRepository;
        private readonly UserGameLevelRepository userGameLevelRepository;
        private readonly GameLevelRepository gameLevelRepository;

        public GameScoreService(
            UserGameBoxRepository userGameBoxRepository,
            UserGameLevelRepository userGameLevelRepository,
            GameLevelRepository gameLevelRepository
            )
        {
            this.userGameBoxRepository = userGameBoxRepository;
            this.userGameLevelRepository = userGameLevelRepository;
            this.gameLevelRepository = gameLevelRepository;
        }

        #endregion
    }
}
