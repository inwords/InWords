using InWords.Data.Domains.EmailEntitys;
using InWords.Data.Repositories;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Email
{
    [Obsolete]
    public class EmailCodeVerificationService
    {
        private readonly EmailVerifierRepository emailVerifierRepository;

        public EmailCodeVerificationService(EmailVerifierRepository emailVerifierRepository)
        {
            this.emailVerifierRepository = emailVerifierRepository;
        }

        /// <summary>
        ///     This is to check code and if it's right code dispose all email verification.
        ///     information about this user
        /// </summary>
        /// <param name="userId">System user's id</param>
        /// <param name="email">System user's email</param>
        /// <param name="code">Code from request</param>
        /// <returns>State if operation is success (true)/(false)</returns>
        /// <exception cref="ArgumentNullException">Email not found or not registred</exception>
        public async Task<bool> HasCorrectCode(int userId, string email, int code)
        {
            bool isCorrect = HasCode(userId, email, code);
            await ProccedMessageVerification(userId, email, isCorrect);
            return isCorrect;
        }

        private bool HasCode(int userId, string email, int code)
        {
            EmailVerifies emailVerifier = emailVerifierRepository
                .GetWhere(e => IsRequestedEmailVerifier(e, userId, email)).FirstOrDefault();

            if (emailVerifier == null)
                throw new ArgumentNullException();

            return emailVerifier.Equals(userId, email, code);
        }

        private async Task ProccedMessageVerification(int userId, string email, bool isCorrect)
        {
            if (isCorrect)
            {
                await emailVerifierRepository.Delete(e => IsRequestedEmailVerifier(e, userId, email));
            }
            else
            {
                EmailVerifies emailVerifier = emailVerifierRepository
                    .GetWhere(e => IsRequestedEmailVerifier(e, userId, email)).FirstOrDefault();
                emailVerifier.Attempts++;
                await emailVerifierRepository.Update(emailVerifier);
            }
        }

        public bool IsRequestedEmailVerifier(EmailVerifies e, int userId, string email)
        {
            return e.UserId.Equals(userId) && e.Email.Equals(email);
        }
    }
}