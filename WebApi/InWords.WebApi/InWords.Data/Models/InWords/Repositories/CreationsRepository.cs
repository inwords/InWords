namespace InWords.Data.Models
{
    using System.Linq;

    public class CreationsRepository : Repository<Creation>
    {
        InWordsDataContext context = null;
        public CreationsRepository(InWordsDataContext context) : base(context) { };
    }
}
