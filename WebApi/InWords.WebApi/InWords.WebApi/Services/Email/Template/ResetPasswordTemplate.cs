using System.Collections.Generic;
using InWords.WebApi.Services.Email.Models;

namespace InWords.WebApi.Services.Email.Template
{
    public class ResetPasswordTemplate : EmailTemplateBase
    {
        public void Configure(int code, string link)
        {
            var keyValuePairs = new Dictionary<string, string>
            {
                {"{code}", $"{code}"}, //-V3138
                {"{link}", link} //-V3138
            };
            LoadTemplate(EmailTemplates.ResetPasswordEmail, keyValuePairs);
        }
    }
}