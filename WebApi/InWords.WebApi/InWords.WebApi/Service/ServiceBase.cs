using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Service
{
    public class ServiceBase
    {
        protected readonly Data.InWordsDataContext context = null;

        public ServiceBase(Data.InWordsDataContext context)
        {
            this.context = context;
        }
    }
}
