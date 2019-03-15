using InWords.Data.Models;

namespace InWords.WebApi.Service
{
    public class ServiceBase
    {
        protected readonly InWordsDataContext context;

        public ServiceBase(InWordsDataContext context)
        {
            this.context = context;
        }
    }
}