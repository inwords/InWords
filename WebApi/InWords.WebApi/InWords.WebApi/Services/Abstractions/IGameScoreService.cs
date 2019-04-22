using System;
using System.Threading.Tasks;
using InWords.Transfer.Data.Models.GameBox;
using InWords.Transfer.Data.Models.GameBox.LevelMetric;

namespace InWords.WebApi.Services.Abstractions
{
    public interface IGameScoreService
    {
        Task<GamePack> GetGameStars(int userId, GamePack game);

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
        Task UpdateUserScore(int userId, LevelScore levelScore);
    }
}