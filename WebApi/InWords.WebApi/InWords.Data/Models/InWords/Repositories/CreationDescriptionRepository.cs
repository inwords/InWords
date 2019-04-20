using InWords.Data.Models.InWords.Creations;
using Microsoft.EntityFrameworkCore;

namespace InWords.Data.Models.InWords.Repositories
{
    public class CreationDescriptionRepository : Repository<CreationDescription>
    {
        public CreationDescriptionRepository(InWordsDataContext context) : base(context)
        {
        }
    }
}