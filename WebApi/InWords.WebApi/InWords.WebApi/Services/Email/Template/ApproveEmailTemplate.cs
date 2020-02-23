using InWords.WebApi.Services.Email.Models;
using System.Collections.Generic;

namespace InWords.WebApi.Services.Email.Template
{
    public class ApproveEmailTemplate : EmailTemplateBase
    {
        public int Code { get; private set; }
        public string Link { get; private set; }
        public ApproveEmailTemplate(int code, string link)
        {
            this.Code = code;
            this.Link = link;

            var keyValuePairs = new Dictionary<string, string>
            {
                {"{code}", $"{code}"}, //-V3138
                {"{link}", link} //-V3138
            };
            LoadTemplate(EmailTemplates.ConfirmEmail, keyValuePairs);
        }

        public ApproveEmailTemplate() : this(ShortCode.Next(), EmailLink.Next()) { }
    }
}