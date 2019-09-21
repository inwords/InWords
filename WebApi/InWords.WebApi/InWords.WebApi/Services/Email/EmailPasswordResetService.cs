using InWords.Data.Domains.EmailEntitys;
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
        private readonly EmailVerifies emailVerifies;

        public EmailPasswordResetService(EmailTemplateSender emailTemplateSender,
            ShortCodeGeneratorService generatorService,
            EmailVerifies emailVerifies)
        {
            this.emailTemplateSender = emailTemplateSender;
            this.generatorService = generatorService;
            this.emailVerifies = emailVerifies;
        }

        // By email, send token and guid 
        public async Task SendResetPasswordMail(string email)
        {
            // send email
            int shortCode = generatorService.Generate();
            ResetPasswordTemplate resetPasswordTemplate = new ResetPasswordTemplate();
            resetPasswordTemplate.Configure(shortCode);
            await emailTemplateSender.SendMailAsync(email, resetPasswordTemplate);
            
            // write repo
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
