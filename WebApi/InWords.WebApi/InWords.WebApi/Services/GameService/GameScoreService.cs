using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.Data.Creations.GameBox;
using InWords.Data.DTO.GameBox;
using InWords.Data.DTO.GameBox.LevelMetric;
using InWords.Data.Repositories;
using InWords.WebApi.Services.Abstractions;

namespace InWords.WebApi.Services.GameService
{
    [Obsolete]
    public class GameScoreService : IGameScoreService
    {
        private readonly UserGameLevelRepository userGameLevelRepository;

        public GameScoreService(UserGameLevelRepository userGameLevelRepository)
        {
            this.userGameLevelRepository = userGameLevelRepository;
        }

        Task<GameObject> IGameScoreService.GetGameStarsAsync(int userId, GameObject game)
        {
            return Task.Run(() => GetGameStarsAction(userId, game));
        }

        /// <summary>
        ///     This is to local compute score
        /// </summary>
        /// <param name="levelResult"></param>
        /// <returns></returns>
        LevelMetricQueryResult IGameScoreService.GetLevelScore(LevelResult levelResult)
        {
            int score = Data.DTO.Services.CardGame.Score(levelResult.WordsCount, levelResult.OpeningQuantity);

            var levelScore = new LevelMetricQueryResult(levelResult.LevelId, score);

            return levelScore;
        }

        async Task IGameScoreService.PostScoreAsync(int userId, LevelMetricQueryResult levelMetricQueryResult)
        {
            IEnumerable<UserGameLevel> levels = userGameLevelRepository.GetWhere(ugl =>
                ugl.UserId.Equals(userId) && ugl.GameLevelId.Equals(levelMetricQueryResult.LevelId));

            UserGameLevel level = levels.FirstOrDefault();

            // if exist update  
            if (level != null)
            {
                // don't update if worth
                if (level.UserStars > levelMetricQueryResult.Score) return;

                level.UserStars = levelMetricQueryResult.Score;
                await userGameLevelRepository.Update(level).ConfigureAwait(false);
            }
            // add if not exist
            else
            {
                await AddLevelsAsync(userId, levelMetricQueryResult).ConfigureAwait(false);
            }
        }

        async Task IGameScoreService.UploadScoreAsync(int userId, IEnumerable<LevelMetricQueryResult> levelScores)
        {
            levelScores = levelScores.Where(l => l.LevelId > 0);
            // to prevent multiply enumerable
            LevelMetricQueryResult[] levelScoresArray = levelScores.ToArray();
            // find all that exist
            UserGameLevel[] levelsExist = GetExistingLevels(userId, levelScoresArray);
            // add any that not in existing in database
            LevelMetricQueryResult[] levelScoresToAdd = GetScoresExceptExist(levelScoresArray, levelsExist);

            await UpdateLevelsAsync(levelsExist, levelScoresArray).ConfigureAwait(false);
            await AddLevelsAsync(userId, levelScoresToAdd).ConfigureAwait(false);
        }

        private GameObject GetGameStarsAction(int userId, GameObject game)
        {
            GameObject gameCopy = game;

            UserGameLevel[] levels = userGameLevelRepository.GetWhere(
                g => gameCopy.LevelInfos.Any(i => i.LevelId.Equals(g.GameLevelId))
                     && g.UserId.Equals(userId)).ToArray();

            return SetStarsToLevels(gameCopy, levels);
        }

        // todo to dictionary
        private static GameObject SetStarsToLevels(GameObject game, UserGameLevel[] levels)
        {
            Parallel.ForEach(game.LevelInfos,
                level =>
                {
                    level.PlayerStars =
                        levels.SingleOrDefault(l => l.GameLevelId.Equals(level.LevelId))?.UserStars ?? 0;
                });
            return game;
        }

        /// <summary>
        /// </summary>
        /// <param name="levelsToUpdate">All levels that exist in database</param>
        /// <param name="levelScores">All score that user send</param>
        /// <returns></returns>
        private Task UpdateLevelsAsync(IEnumerable<UserGameLevel> levelsToUpdate, IEnumerable<LevelMetricQueryResult> levelScores)
        {
            levelsToUpdate = from userGameLevel in levelsToUpdate
                join scores in levelScores on userGameLevel.GameLevelId equals scores.LevelId
                where scores.Score > userGameLevel.UserStars
                select new UserGameLevel
                {
                    GameLevelId = userGameLevel.GameLevelId,
                    UserStars = scores.Score,
                    UserId = userGameLevel.UserId,
                    UserGameLevelId = userGameLevel.UserGameLevelId
                };
            return userGameLevelRepository.UpdateAsync(levelsToUpdate.ToArray());
        }

        private Task AddLevelsAsync(int userId, params LevelMetricQueryResult[] levels)
        {
            // TODO CHECK IF LEVEL EXIST
            UserGameLevel[] userGameLevels = levels.Select(levelScore => new UserGameLevel
            {
                UserId = userId,
                UserStars = levelScore.Score,
                GameLevelId = levelScore.LevelId
            }).ToArray();
            return userGameLevelRepository.Create(userGameLevels);
        }

        private UserGameLevel[] GetExistingLevels(int userId, LevelMetricQueryResult[] levelScores)
        {
            return userGameLevelRepository.GetWhere(ugl => ugl.UserId.Equals(userId)
                                                           && levelScores.Any(ls => ls.LevelId.Equals(ugl.GameLevelId)))
                .ToArray();
        }

        private static LevelMetricQueryResult[] GetScoresExceptExist(IEnumerable<LevelMetricQueryResult> levelScoresArray,
            IEnumerable<UserGameLevel> levelsExist)
        {
            return (from ls in levelScoresArray
                where !levelsExist.Any(ltu => ltu.GameLevelId.Equals(ls.LevelId))
                select ls).ToArray();
        }
    }
}