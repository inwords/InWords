namespace InWords.Data.Models
{
    using Microsoft.EntityFrameworkCore;

    public class SeriaWordRepository : Repository<SeriaWord>
    {
        public SeriaWordRepository(InWordsDataContext context) : base(context)
        {

        }
    }
}
