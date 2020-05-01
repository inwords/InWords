using InWords.Data.DTO.Creation;
using System.Collections.Generic;

namespace InWords.Data.DTO.GameBox
{
    public class GamePack
    {
        public CreationInfo CreationInfo { get; set; }

        public List<LevelPack> LevelPacks { get; set; }
    }
}