namespace InWords.Data.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class UserGameLevel
    {
        [Key]
        public int UserGameLevelId { get; set; }

        public int UserGameBoxId { get; set; }

        [ForeignKey("UserGameBoxID")]
        public virtual UserGameBox UserGameBox { get; set; }

        public int GameLevelId { get; set; }

        [ForeignKey("GameLevelID")]
        public virtual GameLevel GameLevel { get; set; }

        public int UserStars { get; set; }
    }
}
