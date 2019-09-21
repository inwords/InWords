using InWords.WebApi.Services.Email.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Email.Template
{
    /// <summary>
    ///    Abstract class provide information about email to 
    ///    send it by <see cref="EmailSenders.EmailTemplateSender"/>
    /// </summary>
    public abstract class EmailTemplateBase
    {
        public abstract string Subject { get; set; }
        public abstract string HtmlBody { get; set; }
        public abstract string AltText { get; set; }

        protected async void LoadTemplate(EmailTemplates template,Dictionary<string,string> keyValuePairs)
        {
            await TemplateResolver.LoadTemplate(template, keyValuePairs);
        }

    }
}
