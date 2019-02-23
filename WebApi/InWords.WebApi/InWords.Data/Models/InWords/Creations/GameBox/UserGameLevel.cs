namespace InWords.Data.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class UserGameLevel
    {
        [Key]
        public int UserGameLevelID { get; set; }

        public int UserGameBoxID { get; set; }

        [ForeignKey("UserGameBoxID")]
        public virtual UserGameBox UserGameBox { get; set; }

        public int GameLevelID { get; set; }

        [ForeignKey("GameLevelID")]
        public virtual GameLevel GameBox { get; set; }

        public int UserStars { get; set; }
    }
}
