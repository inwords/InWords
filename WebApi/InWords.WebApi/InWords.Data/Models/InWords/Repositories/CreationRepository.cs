namespace InWords.Data.Models
{
    using System.Linq;

    public class CreationRepository : Repository<Creation>
    {
        private readonly InWordsDataContext context;
        public CreationRepository(InWordsDataContext context) : base(context)
        {
            this.context = context;
        }
    }
}
