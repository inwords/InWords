using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.Data.Models;

namespace InWords.WebApi.Service
{
    public class ServiceBase
    {
        protected readonly InWordsDataContext context = null;

        public ServiceBase(InWordsDataContext context)
        {
            this.context = context;
        }
    }
}
