using InWords.WebApi.Services.Email.Models;
using System.Collections.Generic;

namespace InWords.WebApi.Services.Email.Template
{
    /// <summary>
    ///     Abstract class provide information about email to
    ///     send it by <see cref="EmailSenders.EmailTemplateSender" />
    /// </summary>
    public abstract class EmailTemplateBase
    {
        public string Subject { get; protected set; }
        public string HtmlBody { get; protected set; }
        public string AltText { get; protected set; }

        protected async void LoadTemplate(EmailTemplates template, Dictionary<string, string> keyValuePairs)
        {
            await TemplateResolver.LoadTemplateAsync(template, keyValuePairs).ConfigureAwait(false);
        }
    }
}