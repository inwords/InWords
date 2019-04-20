using InWords.Data.Models.InWords.Creations.GameBox;
using Microsoft.EntityFrameworkCore;

namespace InWords.Data.Models.InWords.Repositories
{
    public class UserGameBoxRepository : Repository<UserGameBox>
    {
        public UserGameBoxRepository(InWordsDataContext context) : base(context) { }
    }
}