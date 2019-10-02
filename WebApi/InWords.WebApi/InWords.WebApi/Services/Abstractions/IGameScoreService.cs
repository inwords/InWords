using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using InWords.Data.DTO.GameBox;
using InWords.Data.DTO.GameBox.LevelMetric;

namespace InWords.WebApi.Services.Abstractions
{
    public interface IGameScoreService
    {
        /// <summary>
        ///     This is to read user score on game level
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="game"></param>
        /// <returns></returns>
        Task<GameObject> GetGameStars(int userId, GameObject game);

        /// <summary>
        ///     This is to update user score on game level
        /// </summary>
        /// <param name="levelResult"></param>
        /// <returns></returns>
        LevelScore GetLevelScore(LevelResult levelResult);

        /// <summary>
        ///     This is to set level score to user level storage
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="levelScore"></param>
        /// <exception cref="ArgumentNullException">Null game box is not find</exception>
        /// <returns></returns>
        Task PostScore(int userId, LevelScore levelScore);

        /// <summary>
        ///     This is to push all score from cache storage
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="levelScores"></param>
        /// <returns></returns>
        Task UploadScore(int userId, IEnumerable<LevelScore> levelScores);
    }
}