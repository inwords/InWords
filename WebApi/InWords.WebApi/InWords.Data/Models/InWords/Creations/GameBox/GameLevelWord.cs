namespace InWords.Data.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class GameLevelWord
    {
        [Key]
        public int GameLevelWordId { get; set; }

        public int GameLevelId { get; set; }

        [ForeignKey("GameLevelID")]
        public virtual GameLevel GameLevel { get; set; }

        public int WordPairId { get; set; }

        [ForeignKey("WordPairID")]
        public virtual WordPair WordPair { get; set; }
    }
}
