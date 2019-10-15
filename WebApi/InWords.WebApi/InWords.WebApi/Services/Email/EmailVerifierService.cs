using System;
using System.Threading.Tasks;
using InWords.Data.Domains;
using InWords.Data.Repositories;

namespace InWords.WebApi.Services.Email
{
    /// <summary>
    ///     This is register a user's profile for review by email
    /// </summary>
    public class EmailVerifierService
    {
        private readonly ShortCodeGeneratorService codeGenerator;
        private readonly EmailCodeSenderService emailCodeSenderService;
        private readonly EmailVerifierRepository emailVerifierRepository;

        public EmailVerifierService(EmailCodeSenderService emailCodeSenderService,
            ShortCodeGeneratorService codeGenerator,
            EmailVerifierRepository emailVerifier)
        {
            this.codeGenerator = codeGenerator;
            emailVerifierRepository = emailVerifier;
            this.emailCodeSenderService = emailCodeSenderService;
        }

        /// <summary>
        ///     Send message to user and register message in system
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

        public async Task InstatiateVerifierMessage(int userId, string nickname, string email)
        {
            var user = new User
            {
                UserId = userId,
                NickName = nickname
            };
            await InstatiateVerifierMessage(user, email);
        }
    }
}