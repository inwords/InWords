using InWords.Data.Domains;
using InWords.Data.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InWords.Data.Creations
{
    public class GameTag
    {
        [Key]
        public int GameTagId { get; set; }
        public int GameId { get; set; }

        [ForeignKey(nameof(GameId))]
        public Game Game { get; set; }

        public int UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public User User { get; set; }

        public GameTags Tags { get; set; }
    }
}
