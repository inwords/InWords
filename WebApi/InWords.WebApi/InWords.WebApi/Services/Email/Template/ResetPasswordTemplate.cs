using InWords.WebApi.Services.Email.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Email.Template
{
    public class ResetPasswordTemplate : EmailTemplateBase
    {
        public void Configure(int code,string link)
        {
            Dictionary<string, string> keyValuePairs = new Dictionary<string, string>()
            {
                { "{code}",$"{code}"}, //-V3138
                { "{link}",link} //-V3138
            };
            base.LoadTemplate(EmailTemplates.ResetPasswordEmail, keyValuePairs);
        }
    }
}
