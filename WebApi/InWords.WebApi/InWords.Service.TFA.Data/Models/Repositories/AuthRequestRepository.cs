// ReSharper disable once CheckNamespace

using InWords.Data;
using Microsoft.EntityFrameworkCore;

namespace InWords.Service.TFA.Data.Models.Repositories
{
    public class AuthRequestRepository : Repository<AuthRequest>
    {
        public AuthRequestRepository(DbContext context) : base(context)
        {
        }
    }
}