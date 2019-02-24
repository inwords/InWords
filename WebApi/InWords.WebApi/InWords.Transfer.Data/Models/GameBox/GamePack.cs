
namespace InWords.Transfer.Data
{
    using System.Collections.Generic;

    public class GamePack
    {
        public CreationInfo CreationInfo { get; set; }

        public List<LevelPack> LevelPacks { get; set; }
    }
}
