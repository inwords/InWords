using InWords.WebApi.Services.Email.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Email.Template
{
    public class ResetPasswordTemplate : EmailTemplateBase
    {
        public void Configure(int code)
        {
            Dictionary<string, string> keyValuePairs = new Dictionary<string, string>()
            {
                { "{code}",$"{code}"}
            };
            base.LoadTemplate(EmailTemplates.ResetPasswordEmail, keyValuePairs);
        }
    }
}
