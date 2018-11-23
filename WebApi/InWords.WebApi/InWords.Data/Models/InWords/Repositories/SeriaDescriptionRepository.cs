namespace InWords.Data.Models.Repositories
{
    public class SeriaDescriptionRepository : Repository<SeriaDescription>
    {
        public SeriaDescriptionRepository(InWordsDataContext context) : base(context)
        {
        }
    }
}
