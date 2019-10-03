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
    public class GameScoreService : IGameScoreService
    {
        private readonly UserGameLevelRepository userGameLevelRepository;

        public GameScoreService(UserGameLevelRepository userGameLevelRepository)
        {
            this.userGameLevelRepository = userGameLevelRepository;
        }

        async Task<GameObject> IGameScoreService.GetGameStars(int userId, GameObject game)
        {
            return await Task.Run(() => GetGameStarsAction(userId, game));
        }

        /// <summary>
        ///     This is to local compute score
        /// </summary>
        /// <param name="levelResult"></param>
        /// <returns></returns>
        LevelScore IGameScoreService.GetLevelScore(LevelResult levelResult)
        {
            int score = Domain.CardGame.Score(levelResult.WordsCount, levelResult.OpeningQuantity);

            var levelScore = new LevelScore(levelResult.LevelId, score);

            return levelScore;
        }

        async Task IGameScoreService.PostScore(int userId, LevelScore levelScore)
        {
            IEnumerable<UserGameLevel> levels = userGameLevelRepository.GetWhere(ugl =>
                ugl.UserId.Equals(userId) && ugl.GameLevelId.Equals(levelScore.LevelId));

            UserGameLevel level = levels.FirstOrDefault();

            // if exist update  
            if (level != null)
            {
                // don't update if worth
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

        async Task IGameScoreService.UploadScore(int userId, IEnumerable<LevelScore> levelScores)
        {
            levelScores = levelScores.Where(l => l.LevelId > 0);
            // to prevent multiply enumerable
            LevelScore[] levelScoresArray = levelScores.ToArray();
            // find all that exist
            UserGameLevel[] levelsExist = GetExistingLevels(userId, levelScoresArray);
            // add any that not in existing in database
            LevelScore[] levelScoresToAdd = GetScoresExceptExist(levelScoresArray, levelsExist);

            await UpdateLevels(levelsExist, levelScoresArray);
            await AddLevels(userId, levelScoresToAdd);
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
        private async Task UpdateLevels(IEnumerable<UserGameLevel> levelsToUpdate, IEnumerable<LevelScore> levelScores)
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
            await userGameLevelRepository.Update(levelsToUpdate.ToArray());
        }

        private async Task AddLevels(int userId, params LevelScore[] levels)
        {
            // TODO CHECK IF LEVEL EXIST
            UserGameLevel[] userGameLevels = levels.Select(levelScore => new UserGameLevel
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
                                                           && levelScores.Any(ls => ls.LevelId.Equals(ugl.GameLevelId)))
                .ToArray();
        }

        private static LevelScore[] GetScoresExceptExist(IEnumerable<LevelScore> levelScoresArray,
            IEnumerable<UserGameLevel> levelsExist)
        {
            return (from ls in levelScoresArray
                    where !levelsExist.Any(ltu => ltu.GameLevelId.Equals(ls.LevelId))
                    select ls).ToArray();
        }
    }
}