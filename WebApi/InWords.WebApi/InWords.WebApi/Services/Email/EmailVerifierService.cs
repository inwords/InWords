using InWords.Data.Domains;
using InWords.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Email
{
    public class EmailVerifierService
    {
        private readonly EmailCodeGeneratorService codeGenerator = null;
        private readonly EmailSender emailSender = null;
        private readonly EmailVerifierRepository emailVerifier = null;

        public EmailVerifierService(EmailSender emailSender, EmailCodeGeneratorService codeGenerator, EmailVerifierRepository emailVerifier)
        {
            this.emailSender = emailSender;
            this.codeGenerator = codeGenerator;
            this.emailVerifier = emailVerifier;
        }

        public async Task InstatiateVerifierMessage(User user)
        {
            // TODO to const string;
            //send email
            int code = codeGenerator.Generate();
            string codeMsg = $"{code}";
            await emailSender.SendEmailAsync(user.Account.Email, "Подтверждение имейла InWords", codeMsg);
            //set database
            await emailVerifier.CreateEmailVerifier(user.UserId, code);
        }
    }
}
