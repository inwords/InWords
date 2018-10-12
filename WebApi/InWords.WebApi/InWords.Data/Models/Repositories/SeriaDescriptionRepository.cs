namespace InWords.Data.Models.Repositories
{
    using Microsoft.EntityFrameworkCore;

    public class SeriaDescriptionRepository : Repository<SeriaDescription>
    {
        public SeriaDescriptionRepository(DbContext context) : base(context)
        {
        }
    }
}
