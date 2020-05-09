// ReSharper disable once CheckNamespace

using InWords.Data.Domains;
using InWords.Data.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InWords.Data.Creations.GameBox
{
    public class UserGameLevel
    {
        [Key] public int UserGameLevelId { get; set; }

        [Required] public int UserId { get; set; }

        [ForeignKey(nameof(UserId))] public virtual User User { get; set; }

        [Required] public int GameLevelId { get; set; }

        [ForeignKey(nameof(GameLevelId))] public virtual GameLevel GameLevel { get; set; }

        [Required] public int UserStars { get; set; }
        [Required] public GameType GameType { get; set; }

        #region ctor

        public UserGameLevel()
        {
        }

        public UserGameLevel(int userId, int gameLevelId = 0, int userStars = 0)
        {
            UserId = userId;
            GameLevelId = gameLevelId;
            UserStars = userStars;
        }

        #endregion
    }
}