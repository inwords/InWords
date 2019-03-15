using InWords.Data.Models.InWords.Creations;

namespace InWords.Data.Models.InWords.Repositories
{
    public class CreationRepository : Repository<Creation>
    {
        private readonly InWordsDataContext context;

        public CreationRepository(InWordsDataContext context) : base(context)
        {
            this.context = context;
        }
    }
}