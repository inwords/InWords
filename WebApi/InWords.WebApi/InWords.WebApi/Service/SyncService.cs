using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Service
{
    public class SyncService : ServiceBase
    {
        public SyncService(Data.InWordsDataContext context) : base(context)
        {

        }
    }
}
