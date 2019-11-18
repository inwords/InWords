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
    public class Creation
    {
        [NotMapped] public static int MainGames = 122;
        public Creation()
        {
            GameLevels = new HashSet<GameLevel>(0);
        }

        [Key] public int CreationId { get; set; }
        [ForeignKey(nameof(CreationId))] public HashSet<GameLevel> GameLevels { get; set; }

        public int CreatorId { get; set; }

        [ForeignKey(nameof(CreatorId))] public virtual User Creator { get; set; }

    }
}