using InWords.Data.Domains;
using InWords.Data.Domains.EmailEntitys;
using InWords.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Email
{
    /// <summary>
    /// This is register a user's profile for review by email
    /// </summary>
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

        /// <summary>
        /// Send message to user and register message in system
        /// </summary>
        /// <param name="user"></param>
        /// <param name="email"></param>
        /// <returns></returns>
        public async Task InstatiateVerifierMessage(User user, string email)
        {
            int userId = user.UserId;
            int code = codeGenerator.Generate();
            Guid guid = Guid.NewGuid();
            // send code information
            await emailCodeSenderService.SendCodeByEmail(user, email, code, $"{guid}");
            // write storage
            await emailVerifierRepository.CreateEmailVerifier(userId, email, code, guid);
        }
    }
}
