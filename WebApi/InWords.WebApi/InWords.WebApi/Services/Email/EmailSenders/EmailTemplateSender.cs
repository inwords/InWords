using InWords.WebApi.Services.Email.Template;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Email.EmailSenders
{
    public class EmailTemplateSender : EmailSender
    {
        public EmailTemplateSender(EmailIdentity emailIdentity) : base(emailIdentity)
        {
        }

        public async Task SendMailAsync(string email, EmailTemplateBase emailTemplateBase)
        {
            AddAddressees("", email);
            SetSubject(emailTemplateBase.Subject);
            SetHTML(emailTemplateBase.HtmlBody, emailTemplateBase.AltText);
            await base.SendEmailAsync();
        }
    }
}
