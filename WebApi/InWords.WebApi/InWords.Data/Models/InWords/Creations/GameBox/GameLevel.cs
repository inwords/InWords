namespace InWords.Data.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class GameLevel
    {
        [Key]
        public int GameLevelId { get; set; }

        public int GameBoxId { get; set; }

        [ForeignKey(nameof(GameBoxId))]
        public virtual GameBox GameBox { get; set; }

        public int TotalStars { get; set; }

        public int SuccessStars { get; set; }

        public int Level { get; set; }
    }
}
