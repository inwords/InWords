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

        public EmailVerifierService(EmailSender emailSender, EmailCodeGeneratorService codeGenerator, EmailVerifierRepository emailVerifier)
        {
            this.emailSender = emailSender;
            this.codeGenerator = codeGenerator;
            this.emailVerifierRepository = emailVerifier;
        }

        public async Task InstatiateVerifierMessage(User user)
        {
            int timeout = await GetTimeout(user.UserId);
            if (await GetTimeout(user.UserId) > 0)
            {
                throw new TimeoutException($"Email can be sent later after {timeout} seconds");
            }

            //send email
            int code = codeGenerator.Generate();
            string codeMsg = $"{code}";
            // TODO to const string;
            await emailSender.SendEmailAsync(user.Account.Email, EmailSubject, codeMsg);
            //set database
            await emailVerifierRepository.CreateEmailVerifier(user.UserId, code);
        }

        public async Task<int> GetTimeout(int id)
        {
            EmailVerifier emailVerifier = await emailVerifierRepository.FindById(id);
            TimeSpan currentSpan = DateTime.Now - emailVerifier.SentTime - TimeSpan.FromMinutes(EMAIL_TIMEOUT);
            int seconds = Convert.ToInt32(currentSpan.TotalSeconds);
            return seconds;
        }

        public async Task<bool> TryConfirmEmail(int userId, int code)
        {
            bool state = await IsCodeСorrect(userId, code);
            if (await IsCodeСorrect(userId, code))
            {
                emailVerifierRepository.Remove(userId)
                // DELETE EMAIL VEREFICATION
                // UPDATE USER STATE
            }
            else
            {
            }
            return state;
        }

        private async Task<bool> IsCodeСorrect(int userId, int code)
        {
            EmailVerifier emailVerifier = await emailVerifierRepository.FindById(userId);
            return code.Equals(emailVerifier.Code);
        }
    }
}
