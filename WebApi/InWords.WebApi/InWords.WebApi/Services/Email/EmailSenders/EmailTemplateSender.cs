using System.Threading.Tasks;
using InWords.WebApi.Services.Email.Models;
using InWords.WebApi.Services.Email.Template;

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