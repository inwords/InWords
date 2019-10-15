namespace InWords.Data.DTO.GameBox.LevelMetric
{
    public class LevelScore
    {
        public int LevelId { get; set; }

        public int Score { get; set; }

        public LevelScore(int levelId, int score)
        {
            LevelId = levelId;
            Score = score;
        }
    }
}