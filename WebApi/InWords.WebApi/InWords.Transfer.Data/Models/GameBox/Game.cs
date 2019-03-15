using System.Collections.Generic;

namespace InWords.Transfer.Data.Models.GameBox
{
    public class Game
    {
        public int GameId { get; set; }

        public string Creator { get; set; }

        public List<LevelInfo> LevelInfos { get; set; }
    }
}