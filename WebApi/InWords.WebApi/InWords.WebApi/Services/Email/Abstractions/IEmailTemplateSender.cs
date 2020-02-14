using InWords.WebApi.Services.Email.Template;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Email.Abstractions
{
    public interface IEmailTemplateSender
    {
        Task SendMailAsync(string email, EmailTemplateBase emailTemplateBase);
    }
}
