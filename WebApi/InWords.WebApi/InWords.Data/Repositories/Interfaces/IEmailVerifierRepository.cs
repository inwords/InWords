using InWords.Abstractions.Interfaces;
using InWords.Data.Domains.EmailEntitys;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace InWords.Data.Repositories.Interfaces
{
    public interface IEmailVerifierRepository : IGenericRepository<EmailVerifies>
    {
        Task<EmailVerifies> CreateEmailVerifier(int userId, string email, int code, Guid guid);
    }
}
