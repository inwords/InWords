namespace InWords.Data.DTO.GameBox.LevelMetric
{
    public class LevelScore
    {
        public LevelScore(int levelId, int score)
        {
            LevelId = levelId;
            Score = score;
        }

        public int LevelId { get; set; }

        public int Score { get; set; }
    }
}