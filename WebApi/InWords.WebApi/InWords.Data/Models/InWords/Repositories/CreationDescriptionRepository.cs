using InWords.Data.Models.InWords.Creations;

namespace InWords.Data.Models.InWords.Repositories
{
    public class CreationDescriptionRepository : Repository<CreationDescription>
    {
        private readonly InWordsDataContext context;

        public CreationDescriptionRepository(InWordsDataContext context) : base(context)
        {
            this.context = context;
        }
    }
}