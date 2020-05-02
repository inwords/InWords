namespace InWords.Data.DTO.Games.Levels
{
    public class ClassicCardLevelResult
    {
        public ClassicCardLevelResult(int levelId, int score)
        {
            LevelId = levelId;
            Score = score;
        }

        public int LevelId { get; set; }

        public int Score { get; set; }
    }
}
