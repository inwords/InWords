namespace InWords.WebApi.Service
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using InWords.Data;

    public class GameService : ServiceBase
    {
        public GameService(InWordsDataContext context) : base(context)
        {
        }
    }
}
