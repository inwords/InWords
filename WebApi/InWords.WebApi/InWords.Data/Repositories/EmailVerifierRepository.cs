using System;
using System.Threading.Tasks;
using InWords.Common;
using InWords.Data.Domains.EmailEntitys;
using InWords.Data.Repositories.Interfaces;

namespace InWords.Data.Repositories
{
    public class EmailVerifierRepository : Repository<EmailVerifies>, IEmailVerifierRepository
    {
        public EmailVerifierRepository(InWordsDataContext context) : base(context)
        {
        }

        public async Task<EmailVerifies> CreateEmailVerifier(int userId, string email, int code, Guid guid)
        {
            var emailVerifier = new EmailVerifies
            {
                Guid = guid,
                UserId = userId,
                Email = email,
                Code = code,
                SentTime = DateTime.UtcNow
            };
            return await CreateAsync(emailVerifier);
        }
    }
}