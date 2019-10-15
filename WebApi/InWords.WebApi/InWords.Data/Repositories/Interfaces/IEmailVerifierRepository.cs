using System;
using System.Threading.Tasks;
using InWords.Abstractions.Interfaces;
using InWords.Data.Domains.EmailEntitys;

namespace InWords.Data.Repositories.Interfaces
{
    public interface IEmailVerifierRepository : IGenericRepository<EmailVerifies>
    {
        Task<EmailVerifies> CreateEmailVerifier(int userId, string email, int code, Guid guid);
    }
}