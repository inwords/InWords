namespace InWords.Data.DTO.GameBox
{
    /// <summary>
    /// Level info provides Level id, player stars, level number.
    /// Is Available property.
    /// </summary>
    public class LevelInfo
    {
        public int LevelId { get; set; }

        public int PlayerStars { get; set; }

        public bool IsAvailable { get; set; }

        public int Level { get; set; }
    }
}