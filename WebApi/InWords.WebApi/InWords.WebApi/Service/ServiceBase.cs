using InWords.Data.Models;

namespace InWords.WebApi.Service
{
    public class ServiceBase
    {
        protected readonly InWordsDataContext Context;

        public ServiceBase(InWordsDataContext context)
        {
            this.Context = context;
        }
    }
}