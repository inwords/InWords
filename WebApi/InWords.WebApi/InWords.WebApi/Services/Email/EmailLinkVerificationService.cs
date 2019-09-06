using InWords.Data.Domains.EmailEntitys;
using InWords.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Email
{
    public class EmailLinkVerificationService
    {
        private readonly EmailVerifierRepository emailVerifierRepository = null;
        private readonly AccountRepository accountRepository = null;
        public EmailLinkVerificationService(EmailVerifierRepository emailVerifierRepository,
            AccountRepository accountRepository)
        {
            this.emailVerifierRepository = emailVerifierRepository;
            this.accountRepository = accountRepository;
        }

        public async Task<bool> HasCorrectLink(string link)
        {
            // if link is not guid this is broken link so return
            if (!Guid.TryParse(link, out Guid guid)) return false;

            EmailVerifier emailVerifier = await emailVerifierRepository.FindById(guid);
            bool isCorrect = emailVerifier != null;
            if (isCorrect)
            {
                await RemoveStorageVerification(emailVerifier);
                await accountRepository.SetEmail(emailVerifier.UserId, emailVerifier.Email);
            }
            return isCorrect;
        }


        private async Task RemoveStorageVerification(EmailVerifier emailVerifier)
        {
            EmailVerifier[] emailVerifiers = emailVerifierRepository.GetWhere(e => e.UserId.Equals(emailVerifier.UserId)).ToArray();
            await emailVerifierRepository.Remove(emailVerifiers);
        }
    }
}
