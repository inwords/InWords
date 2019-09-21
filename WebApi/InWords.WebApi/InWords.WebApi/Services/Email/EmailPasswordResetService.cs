using InWords.Data.Domains.EmailEntitys;
using InWords.Data.Repositories;
using InWords.WebApi.Services.Email.EmailSenders;
using InWords.WebApi.Services.Email.Template;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Email
{
    public class EmailPasswordResetService
    {
        //IResetPasswordEmail resetPasswordEmail;
        private readonly EmailTemplateSender emailTemplateSender;
        private readonly ShortCodeGeneratorService generatorService;
        private readonly EmailVerifierRepository emailVerifierRepository;

        public EmailPasswordResetService(EmailTemplateSender emailTemplateSender,
            ShortCodeGeneratorService generatorService,
            EmailVerifierRepository emailVerifierRepository)
        {
            this.emailTemplateSender = emailTemplateSender;
            this.generatorService = generatorService;
            this.emailVerifierRepository = emailVerifierRepository;
        }

        // By email, send token and guid 
        public async Task SendResetPasswordMail(string email)
        {
            // Prepare mail 
            Guid guid = new Guid();
            string link = $"{guid}";
            int shortCode = generatorService.Generate();
            // configure mail
            ResetPasswordTemplate resetPasswordTemplate = new ResetPasswordTemplate();
            resetPasswordTemplate.Configure(shortCode, link);
            // send email
            await emailTemplateSender.SendMailAsync(email, resetPasswordTemplate);
            // save request
            await emailVerifierRepository.CreateEmailVerifier(0, email, shortCode, guid);
        }

        // By link guid set new password
        public void UpdatePassword(string guid, string password)
        {
            // find in repo
            // delete if exist
            // update password
        }

        // By email and key set new password
        public void UpdatePassword(string email, int key, string password)
        {
            // find in repo
            // delete if exist
            // update password
        }
    }
}
