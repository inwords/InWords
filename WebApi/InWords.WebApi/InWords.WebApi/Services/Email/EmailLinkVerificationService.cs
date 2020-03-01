using InWords.Data.Domains.EmailEntitys;
using InWords.Data.Repositories;
using System;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Email
{
    [Obsolete]
    public class EmailLinkVerificationService
    {
        private readonly AccountRepository accountRepository;
        private readonly EmailVerifierRepository emailVerifierRepository;

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

            EmailVerifies emailVerifier = await emailVerifierRepository.FindById(guid);
            bool isCorrect = emailVerifier != null;
            if (isCorrect)
            {
                await RemoveStorageVerification(emailVerifier);
                await accountRepository.SetEmail(emailVerifier.UserId, emailVerifier.Email);
            }

            return isCorrect;
        }


        private async Task RemoveStorageVerification(EmailVerifies emailVerifier)
        {
            await emailVerifierRepository.Delete(e => e.UserId.Equals(emailVerifier.UserId));
        }
    }
}