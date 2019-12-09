using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InWords.Data.Creations.GameBox
{
    public class GameLevel
    {
        public GameLevel()
        {
            GameLevelWords = new HashSet<GameLevelWord>(0);
        }

        [Key] public int GameLevelId { get; set; }
        public int Level { get; set; }

        public int GameId { get; set; }
        public virtual Game Game { get; set; }
        public HashSet<GameLevelWord> GameLevelWords { get; set; }
    }
}