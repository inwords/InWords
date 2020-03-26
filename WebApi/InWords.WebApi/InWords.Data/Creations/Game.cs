using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using InWords.Data.Creations.GameBox;
using InWords.Data.Domains;

namespace InWords.Data.Creations
{
    /// <summary>
    ///     Words Set with levels
    /// </summary>
    public class Game
    {
        [NotMapped] public static int MainGames = 122;
        public Game()
        {
            GameLevels = new HashSet<GameLevel>(0);
            CreationDescriptions = new List<CreationDescription>(0);
        }
        [Key] public int GameId { get; set; }
        public int CreatorId { get; set; }

        [MaxLength(128)] public string Picture { get; set; }
        [ForeignKey(nameof(GameId))] public HashSet<GameLevel> GameLevels { get; set; }
        [ForeignKey(nameof(CreatorId))] public virtual User Creator { get; set; }
        public List<CreationDescription> CreationDescriptions { get; set; }

    }
}