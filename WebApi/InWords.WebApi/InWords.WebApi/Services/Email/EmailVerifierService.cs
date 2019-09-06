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
        private readonly EmailCodeGeneratorService codeGenerator = null;
        private readonly EmailCodeSenderService emailCodeSenderService = null;
        private readonly EmailVerifierRepository emailVerifierRepository = null;

        public EmailVerifierService(EmailCodeSenderService emailCodeSenderService,
            EmailCodeGeneratorService codeGenerator,
            EmailVerifierRepository emailVerifier)
        {
            this.codeGenerator = codeGenerator;
            this.emailVerifierRepository = emailVerifier;
            this.emailCodeSenderService = emailCodeSenderService;
        }

        public async Task InstatiateVerifierMessage(User user, string email)
        {
            int userId = user.UserId;
            int code = codeGenerator.Generate();

            await emailCodeSenderService.SendCodeByEmail(user, email, code);
            //set database
            await emailVerifierRepository.CreateEmailVerifier(userId, email, code);
        }
    }
}
