namespace InWords.Transfer.Data
{
    public class LevelInfo : StarsInfo
    {
        public int LevelId { get; set; }

        public int PlayerStars { get; set; }

        public bool IsAvailable { get; set; }

        public int Level { get; set; }
    }
}
