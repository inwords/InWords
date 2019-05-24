using InWords.Abstractions;
using InWords.Data.Creations;

namespace InWords.Data.Repositories
{
    public class CreationDescriptionRepository : Repository<CreationDescription>
    {
        public CreationDescriptionRepository(InWordsDataContext context) : base(context)
        {
        }
    }
}