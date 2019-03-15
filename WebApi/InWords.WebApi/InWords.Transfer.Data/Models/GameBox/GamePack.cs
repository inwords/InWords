
using System.Collections.Generic;
using InWords.Transfer.Data.Models.Creation;

namespace InWords.Transfer.Data.Models.GameBox
{
    public class GamePack
    {
        public CreationInfo CreationInfo { get; set; }

        public List<LevelPack> LevelPacks { get; set; }
    }
}
