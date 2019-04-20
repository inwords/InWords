namespace InWords.Transfer.Data.Models.GameBox.LevelMetric
{
    public class LevelScore
    {
        public int LevelId { get; set; }

        public int Score { get; set; }

        #region ctor
        public LevelScore(int levelId, int score)
        {
            this.LevelId = levelId;
            this.Score = score;
        }
        #endregion
    }
}