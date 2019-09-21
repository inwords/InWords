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
        public EmailPasswordResetService(EmailTemplateSender emailTemplateSender,ShortCodeGeneratorService generatorService)
        {
            this.emailTemplateSender = emailTemplateSender;
        }

        // By email, send token and guid 
        public async Task SendResetPasswordMail(string email)
        {
            // send email
            ResetPasswordTemplate resetPasswordTemplate = new ResetPasswordTemplate();
            resetPasswordTemplate.Configure();
            await emailTemplateSender.SendMailAsync(email, resetPasswordTemplate);
            // EmailSender.Send(resetPasswordEmail,email);
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
