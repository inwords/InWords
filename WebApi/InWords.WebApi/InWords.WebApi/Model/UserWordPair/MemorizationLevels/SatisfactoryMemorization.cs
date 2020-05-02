namespace InWords.WebApi.Model.UserWordPair.MemorizationLevels
{
    public class SatisfactoryMemorization : BaseMemorization
    {
        public override Memorization Grant(Memorization knowledgeLicense)
        {
            return base.Grant(knowledgeLicense);
        }
    }
}