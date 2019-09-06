using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Email
{
    public class EmailCodeVerificationService
    {
        public async Task<bool> IsCodeCorrect(int userId, string email, int code)
        {
            bool isCorrect = await HasCode(userId, email, code);
            await ProccedMessageVerification(userId, isCorrect);
            return isCorrect;
        }

        private async Task<bool> HasCode(int userId, string email, int code)
        {
            EmailVerifier emailVerifier = await emailVerifierRepository.FindById(userId);
            return emailVerifier.Equals(userId, email, code);
        }

        private async Task ProccedMessageVerification(int userId, bool isCorrect)
        {
            if (isCorrect)
            {
                // Delete email verification
                await emailVerifierRepository.RemoveAt(userId);
            }
            else
            {
                EmailVerifier emailVerifier = await emailVerifierRepository.FindById(userId);
                emailVerifier.Attempts++;
                await emailVerifierRepository.Update(emailVerifier);
            }
        }
    }
}
