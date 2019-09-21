using InWords.Abstractions;
using InWords.Data.Domains.EmailEntitys;
using InWords.Data.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace InWords.Data.Repositories
{
    public class EmailVerifierRepository : Repository<EmailVerifies>, IEmailVerifierRepository
    {
        public EmailVerifierRepository(InWordsDataContext context) : base(context)
        {

        }

        public async Task<EmailVerifies> CreateEmailVerifier(int userId, string email, int code, Guid guid)
        {
            EmailVerifies emailVerifier = new EmailVerifies
            {
                Guid = guid,
                UserId = userId,
                Email = email,
                Code = code,
                SentTime = DateTime.UtcNow
            };
            return await Create(emailVerifier);
        }
    }
}
