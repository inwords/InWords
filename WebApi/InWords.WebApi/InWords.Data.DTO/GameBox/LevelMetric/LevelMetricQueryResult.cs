namespace InWords.Data.DTO.GameBox.LevelMetric
{
    public class LevelMetricQueryResult
    {
        public LevelMetricQueryResult(int levelId, int score)
        {
            LevelId = levelId;
            Score = score;
        }

        public int LevelId { get; set; }

        public int Score { get; set; }
    }
}