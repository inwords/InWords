using InWords.WebApi.Extensions;
using InWords.WebApi.Services.Email.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Email
{
    public class TemplateSender : EmailSender
    {
        [Obsolete]
        public TemplateSender(EmailIdentity emailIdentity) : base(emailIdentity)
        {
 
        }

        public async Task SendEmailAsync(EmailTemplates emailTemplate,
            Dictionary<string, string> templateReplace,
            string subject,
            string address,
            string name = "")
        {
            string htmlText = await TemplateResolver.LoadTemplate(emailTemplate, templateReplace);
            string altText = StripHTML(htmlText);
            SetSubject(subject);
            SetHTML(htmlText, altText);
            AddAddressees(name, address);
            await SendEmailAsync();
        }

        private static string StripHTML(string htmlText)
        {
            string starttag = $"<body ";
            string endTag = "</body>";
            string taggedText = $"{starttag}{htmlText.Substring(starttag, endTag)}{endTag}";
            return taggedText.StripHTML();
        }
    }
}
