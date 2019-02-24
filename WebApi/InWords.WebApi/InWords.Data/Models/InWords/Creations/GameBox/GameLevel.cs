namespace InWords.Data.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class GameLevel
    {
        [Key]
        public int GameLevelID { get; set; }

        public int GameBoxID { get; set; }

        [ForeignKey("GameBoxID")]
        public virtual GameBox GameBox { get; set; }

        [StringLength(32)]
        public string Title { get; set; }

        public int TotalStars { get; set; }

        public int SuccessStars { get; set; }

        public int Level { get; set; }
    }
}
