using InWords.Data.Domains;
using InWords.Data.Domains.EmailEntitys;
using InWords.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Email
{
    public class EmailVerifierService
    {
        private const int EMAIL_TIMEOUT = 2; // MINUTES;
        //TODO: From tamplate
        private static readonly string EmailSubject = "Пожалуйста, подтвердите свой e-mail";
        private readonly EmailCodeGeneratorService codeGenerator = null;
        private readonly EmailSender emailSender = null;
        private readonly EmailVerifierRepository emailVerifierRepository = null;
        private readonly AccountRepository accountRepository = null;


        public EmailVerifierService(EmailSender emailSender,
            EmailCodeGeneratorService codeGenerator,
            EmailVerifierRepository emailVerifier,
            AccountRepository accountRepository)
        {
            this.emailSender = emailSender;
            this.codeGenerator = codeGenerator;
            this.emailVerifierRepository = emailVerifier;
            this.accountRepository = accountRepository
        }

        public async Task InstatiateVerifierMessage(int userId, string email)
        {
            int timeout = await GetTimeout(userId);
            if (await GetTimeout(userId) > 0)
            {
                throw new TimeoutException($"Email can be sent later after {timeout} seconds");
            }

            //send email
            int code = codeGenerator.Generate();
            string codeMsg = $"{code}";
            // TODO to const string;
            await emailSender.SendEmailAsync(email, EmailSubject, codeMsg);
            //set database
            await emailVerifierRepository.CreateEmailVerifier(userId, code);
        }

        public async Task<int> GetTimeout(int id)
        {
            EmailVerifier emailVerifier = await emailVerifierRepository.FindById(id);
            TimeSpan currentSpan = DateTime.Now - emailVerifier.SentTime - TimeSpan.FromMinutes(EMAIL_TIMEOUT);
            int seconds = Convert.ToInt32(currentSpan.TotalSeconds);
            return seconds;
        }

        public async Task<bool> TryConfirmEmail(int userId, string email, int code)
        {
            bool isCorrect = await IsCodeСorrect(userId, email, code);

            {
                // Delete email verification
                await emailVerifierRepository.RemoveAt(userId);
                // Update user email state
                Account account = await accountRepository.FindById(userId);
                account.EmailState = Data.Enums.EmailStates.Verified;
                await accountRepository.Update(account);
            }
            else
            {
                EmailVerifier emailVerifier = await emailVerifierRepository.FindById(userId);
                emailVerifier.Attempts++;
                await emailVerifierRepository.Update(emailVerifier);
            }

            return isCorrect;
        }

        private async Task<bool> IsCodeСorrect(int userId, string email, int code)
        {
            EmailVerifier emailVerifier = await emailVerifierRepository.FindById(userId);
            return emailVerifier.Equals(userId, email, code);
        }
    }
}
