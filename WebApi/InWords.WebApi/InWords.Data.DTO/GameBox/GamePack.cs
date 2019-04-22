using System.Collections.Generic;
using InWords.Data.DTO.Creation;

namespace InWords.Data.DTO.GameBox
{
    public class GamePack
    {
        public CreationInfo CreationInfo { get; set; }

        public List<LevelPack> LevelPacks { get; set; }
    }
}