using InWords.Data.Models;

namespace InWords.WebApi.Service
{
    public abstract class ServiceBase
    {
        protected readonly InWordsDataContext Context;

        protected ServiceBase(InWordsDataContext context)
        {
            Context = context;
        }
    }
}