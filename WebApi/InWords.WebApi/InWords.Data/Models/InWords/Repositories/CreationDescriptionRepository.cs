namespace InWords.Data.Models
{
    using System.Linq;

    public class CreationDescriptionRepository : Repository<CreationDescription>
    {
        private readonly InWordsDataContext context;
        public CreationDescriptionRepository(InWordsDataContext context) : base(context)
        {
            this.context = context;
        }
    }
}
