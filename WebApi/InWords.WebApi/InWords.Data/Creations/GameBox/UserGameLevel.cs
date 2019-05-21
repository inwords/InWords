// ReSharper disable once CheckNamespace

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using InWords.Data.Domains;

namespace InWords.Data.Creations.GameBox
{
    public class UserGameLevel
    {
        [Key] public int UserGameLevelId { get; set; }

        public int UserGameBoxId { get; set; }
        [ForeignKey(nameof(UserGameBoxId))] public virtual UserGameBox UserGameBox { get; set; }
        
        [Required]
        public int UserId { get; set; }
        [ForeignKey(nameof(UserId))] public virtual User User { get; set; }
        
        [Required]
        public int GameLevelId { get; set; }
        [ForeignKey(nameof(GameLevelId))] public virtual GameLevel GameLevel { get; set; }
        
        [Required]
        public int UserStars { get; set; }

        #region ctor
        public UserGameLevel()
        {
        }

        public UserGameLevel(int userGameBoxId, int gameLevelId = 0, int userStars = 0)
        {
            UserGameBoxId = userGameBoxId;
            GameLevelId = gameLevelId;
            UserStars = userStars;
        }

        #endregion
    }
}