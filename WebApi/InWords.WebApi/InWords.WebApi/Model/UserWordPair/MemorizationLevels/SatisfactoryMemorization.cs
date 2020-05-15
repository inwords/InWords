namespace InWords.WebApi.Model.UserWordPair.MemorizationLevels
{
    public class SatisfactoryMemorization : BaseMemorization
    {
        public override Memorization Grant(Memorization currentMemorization, double complexity)
        {
            return base.Grant(currentMemorization, complexity);
        }
    }
}