// ReSharper disable once CheckNamespace

using InWords.Data;

namespace InWords.Service.TFA.Data.Models.Repositories
{
    public class AuthRequestRepository : Repository<AuthRequest>
    {
        private readonly TFADataContext context;

        public AuthRequestRepository(TFADataContext context) : base(context)
        {
            this.context = context;
        }
    }
}