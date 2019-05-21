using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.Data.Creations.GameBox;
using InWords.Data.DTO.GameBox;
using InWords.Data.DTO.GameBox.LevelMetric;
using InWords.Data.Repositories;
using InWords.Domain;
using InWords.WebApi.Services.Abstractions;

namespace InWords.WebApi.Services.GameService
{
    public class GameScoreService : IGameScoreService
    {
        public async Task<GameObject> GetGameStars(int userId, GameObject game)
        {
            UserGameLevel[] levels = userGameLevelRepository.GetWhere(
                g => game.LevelInfos.Any(i => i.LevelId.Equals(g.GameLevelId))
                     && g.UserId.Equals(userId)).ToArray();

            foreach (LevelInfo level in game.LevelInfos)
            {
                level.PlayerStars = levels.SingleOrDefault(l => l.GameLevelId.Equals(level.LevelId))?.UserStars ?? 0;
            }
            return game;
        }

        public LevelScore GetLevelScore(LevelResult levelResult)
        {
            int score = GameLogic.GameScore(levelResult.WordsCount, levelResult.OpeningQuantity);

            var levelScore = new LevelScore(levelResult.LevelId, score);

            return levelScore;
        }

        public async Task UpdateUserScore(int userId, LevelScore levelScore)
        {
            var levels = userGameLevelRepository.GetWhere(ugl =>
                ugl.UserId.Equals(userId) && ugl.GameLevelId.Equals(levelScore.LevelId));

            UserGameLevel level = levels.FirstOrDefault();

            // if exist update if better
            if (level != null)
            {
                if (level.UserStars > levelScore.Score) return;
                level.UserStars = levelScore.Score;
                await userGameLevelRepository.Update(level);
            }
            // add if not exist
            else
            {
                await AddLevels(userId, levelScore);
            }

        }

        public async Task PushLevelScoreList(int userId, IEnumerable<LevelScore> levelScores)
        {
            // to prevent multiply enumerable
            LevelScore[] levelScoresArray = levelScores.ToArray();
            // find all that exist
            UserGameLevel[] levelsExist = GetExistingLevels(userId, levelScoresArray);
            // add any that not in existing in database
            LevelScore[] levelScoresToAdd = GetScoresExceptExist(levelScoresArray, levelsExist);

            await UpdateLevels(levelsExist, levelScoresArray);
            await AddLevels(userId, levelScoresToAdd);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="levelsToUpdate">All levels that exist in database</param>
        /// <param name="levelScores">All score that user send</param>
        /// <returns></returns>
        private async Task UpdateLevels(IEnumerable<UserGameLevel> levelsToUpdate, IEnumerable<LevelScore> levelScores)
        {
            levelsToUpdate = from userGameLevel in levelsToUpdate
                             join scores in levelScores on userGameLevel.GameLevelId equals scores.LevelId
                             where scores.Score > userGameLevel.UserStars
                             select new UserGameLevel()
                             {
                                 GameLevelId = userGameLevel.GameLevelId,
                                 UserStars = scores.Score,
                                 UserId = userGameLevel.UserId,
                                 UserGameLevelId = userGameLevel.UserGameLevelId
                             };
            await userGameLevelRepository.Update(levelsToUpdate.ToArray());
        }

        private async Task AddLevels(int userId, params LevelScore[] levels)
        {
            UserGameLevel[] userGameLevels = levels.Select(levelScore => new UserGameLevel()
            {
                UserId = userId,
                UserStars = levelScore.Score,
                GameLevelId = levelScore.LevelId
            }).ToArray();
            await userGameLevelRepository.Create(userGameLevels);
        }

        private UserGameLevel[] GetExistingLevels(int userId, LevelScore[] levelScores)
        {
            return userGameLevelRepository.GetWhere(ugl => ugl.UserId.Equals(userId)
                                                     && levelScores.Any(ls => ls.LevelId.Equals(ugl.GameLevelId))).ToArray();
        }

        private static LevelScore[] GetScoresExceptExist(IEnumerable<LevelScore> levelScoresArray, IEnumerable<UserGameLevel> levelsExist)
        {
            return (from ls in levelScoresArray
                    where !levelsExist.Any(ltu => ltu.GameLevelId.Equals(ls.LevelId))
                    select ls).ToArray();
        }

        #region ctor

        private readonly UserGameLevelRepository userGameLevelRepository;
        public GameScoreService(UserGameLevelRepository userGameLevelRepository)
        {
            this.userGameLevelRepository = userGameLevelRepository;
        }

        #endregion
    }
}
