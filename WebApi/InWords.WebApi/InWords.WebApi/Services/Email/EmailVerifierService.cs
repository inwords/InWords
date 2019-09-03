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
        private readonly TemplateSender emailSender = null;
        private readonly EmailVerifierRepository emailVerifierRepository = null;


        public EmailVerifierService(TemplateSender emailSender,
            EmailCodeGeneratorService codeGenerator,
            EmailVerifierRepository emailVerifier)
        {
            this.emailSender = emailSender;
            this.codeGenerator = codeGenerator;
            this.emailVerifierRepository = emailVerifier;
        }

        public async Task InstatiateVerifierMessage(User user, string email)
        {
            int userId = user.UserId;
            int timeout = await GetTimeout(user.UserId);

            if (await GetTimeout(userId) > 0)
            {
                // TODO to const string;
                throw new TimeoutException($"Email can be sent later after {timeout} seconds");
            }

            int code = codeGenerator.Generate();

            // send email
            Dictionary<string, string> keyValuePairs = ReplaceTemplateData(user.NickName, code);

            await emailSender.SendEmailAsync(Models.EmailTemplates.ConfirmEmail, keyValuePairs, EmailSubject, email);

            //set database
            await emailVerifierRepository.CreateEmailVerifier(userId, email, code);
        }

        public async Task<int> GetTimeout(int id)
        {
            EmailVerifier emailVerifier = await emailVerifierRepository.FindById(id);

            if (emailVerifier == null) return 0;

            TimeSpan currentSpan = DateTime.Now - emailVerifier.SentTime - TimeSpan.FromMinutes(EMAIL_TIMEOUT);
            int seconds = Convert.ToInt32(currentSpan.TotalSeconds);
            return seconds;
        }

        public async Task<bool> IsCodeCorrect(int userId, string email, int code)
        {
            bool isCorrect = await IsCodeСorrect(userId, email, code);
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

            return isCorrect;
        }

        private async Task<bool> IsCodeСorrect(int userId, string email, int code)
        {
            EmailVerifier emailVerifier = await emailVerifierRepository.FindById(userId);
            return emailVerifier.Equals(userId, email, code);
        }

        private Dictionary<string, string> ReplaceTemplateData(string username, int code)
        {
            return new Dictionary<string, string>()
            {
                { "{username}",username },
                { "{code}",$"{code}" }
            };
        }
    }
}
