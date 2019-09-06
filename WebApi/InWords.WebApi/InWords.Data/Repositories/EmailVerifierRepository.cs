using InWords.Abstractions;
using InWords.Data.Domains.EmailEntitys;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace InWords.Data.Repositories
{
    public class EmailVerifierRepository : Repository<EmailVerifier>
    {
        public EmailVerifierRepository(InWordsDataContext context) : base(context)
        {

        }

        public async Task<EmailVerifier> CreateEmailVerifier(int userId, string email, int code, Guid guid)
        {
            EmailVerifier emailVerifier = new EmailVerifier
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
