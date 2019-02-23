namespace InWords.Data.Models
{
    using System.Linq;

    public class CreationDescriptionRepository : Repository<CreationDescription>
    {
        InWordsDataContext context = null;
        public CreationDescriptionRepository(InWordsDataContext context) : base(context) { }
    }
}
