using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using InWords.Data.Domains;

namespace InWords.Data.Creations.GameBox
{
    public class UserGameBox
    {
        #region Ctor

        public UserGameBox(int userId, int gameBoxId, int userGameBoxId = 0)
        {
            UserId = userId;
            GameBoxId = gameBoxId;
            UserGameBoxId = userGameBoxId;
        }

        #endregion

        [Key] public int UserGameBoxId { get; set; }

        public int UserId { get; set; }

        [ForeignKey(nameof(UserId))] public virtual User User { get; set; }

        public int GameBoxId { get; set; }

        [ForeignKey(nameof(GameBoxId))] public virtual GameBox GameBox { get; set; }
    }
}