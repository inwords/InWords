using System.Collections.Generic;

namespace InWords.Transfer.Data.Models.GameBox
{
    /// <summary>
    /// Provide game id, creators Nickname and level info
    /// </summary>
    public class GameObject
    {
        /// <summary>
        /// Game box id
        /// </summary>
        public int GameId { get; set; }

        public string Creator { get; set; }

        public List<LevelInfo> LevelInfos { get; set; }
    }
}