namespace InWords.Data.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class GameLevelWord
    {
        [Key]
        public int GameLevelWordID { get; set; }

        /// <summary>
        /// Seria owner of word pair;
        /// </summary>
        public int GameLevelID { get; set; }

        [ForeignKey("GameLevelID")]
        public virtual GameLevel GameLevel { get; set; }

        /// <summary>
        /// Word pairs provided by user who config Seria
        /// </summary>
        public int WordPairID { get; set; }

        [ForeignKey("WordPairID")]
        public virtual WordPair WordPair { get; set; }
    }
}
