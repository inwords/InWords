using InWords.Data.Creations;

namespace InWords.Data.Repositories
{
    public class CreationRepository : Repository<Creation>
    {
        public CreationRepository(InWordsDataContext context) : base(context)
        {
        }
    }
}