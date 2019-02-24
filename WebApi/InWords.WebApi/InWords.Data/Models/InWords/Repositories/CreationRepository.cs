namespace InWords.Data.Models
{
    using System.Linq;

    public class CreationRepository : Repository<Creation>
    {
        InWordsDataContext context = null;
        public CreationRepository(InWordsDataContext context) : base(context) { }
    }
}
