using InWords.Data.Models;

namespace InWords.WebApi.Services
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