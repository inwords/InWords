﻿using InWords.WebApi.Services.Email.Abstractions;
using InWords.WebApi.Services.Email.Models;
using InWords.WebApi.Services.Email.Template;
using System;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Email.EmailSenders
{
    public class EmailTemplateSender : EmailSender, IEmailTemplateSender
    {
        public EmailTemplateSender(EmailIdentity emailIdentity) : base(emailIdentity)
        {
        }

        public Task SendMailAsync(string email, EmailTemplateBase emailTemplateBase)
        {
            if (emailTemplateBase == null)
                throw new ArgumentNullException($"{emailTemplateBase} is null");

            AddAddressees("", email);
            SetSubject(emailTemplateBase.Subject);
            SetHTML(emailTemplateBase.HtmlBody, emailTemplateBase.AltText);
            return base.SendEmailAsync();
        }
    }
}