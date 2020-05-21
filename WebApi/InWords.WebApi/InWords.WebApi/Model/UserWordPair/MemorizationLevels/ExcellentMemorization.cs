namespace InWords.WebApi.Model.UserWordPair.MemorizationLevels
{
    public class ExcellentMemorization : BaseMemorization
    {
        public override Memorization Grant(Memorization currentMemorization, double complexity)
        {
            currentMemorization.Period += 1;
            return base.Grant(currentMemorization, complexity);
        }
    }
}