﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Email
{
    public class TextSender : EmailSender
    {
        public TextSender(EmailIdentity emailIdentity) : base(emailIdentity) { }

        public async Task SendEmailAsync(string address, string subject, string message, string name = "")
        {
            SetSubject(subject);
            AddAddressees(name, address);
            SetText(message);
            await SendEmailAsync();
        }
    }
}
