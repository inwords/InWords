﻿namespace InWords.Transfer.Data
{
    using System.Collections.Generic;
    public class Game
    {
        public int GameId { get; set; }

        public string Creator { get; set; }

        public List<LevelInfo> LevelInfos { get; set; }
    }
}
