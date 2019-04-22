using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using InWords.Data.Creations.GameBox;

namespace InWords.Data.Repositories
{
    public class UserGameBoxRepository : Repository<UserGameBox>
    {
        private readonly InWordsDataContext context;

        public UserGameBoxRepository(InWordsDataContext context) : base(context)
        {
            this.context = context;
        }
    }
}