namespace InWords.Data.DTO.GameBox.LevelMetric
{
    public class LevelScore
    {
        #region ctor

        public LevelScore(int levelId, int score)
        {
            LevelId = levelId;
            Score = score;
        }

        #endregion

        public int LevelId { get; set; }

        public int Score { get; set; }
    }
}