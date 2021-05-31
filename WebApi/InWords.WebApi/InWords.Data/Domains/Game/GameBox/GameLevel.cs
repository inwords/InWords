using InWords.Data.Domains.Game;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace InWords.Data.Creations.GameBox
{
    public class GameLevel
    {
        [Key] public int GameLevelId { get; set; }

        public int GameId { get; set; }
        public virtual Game Game { get; set; }
        public int Level { get; set; }
        public HashSet<GameLevelWord> GameLevelWords { get; set; }
        public virtual Historylevel Historylevel { get; set; }

        public GameLevel()
        {
            GameLevelWords = new HashSet<GameLevelWord>(0);
        }
    }
}