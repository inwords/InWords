﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.Data.Domains;
using InWords.Data.Domains.EmailEntitys;
using InWords.Data.Repositories.Interfaces;
using InWords.WebApi.Services.Email.EmailSenders;
using InWords.WebApi.Services.Email.Models;

namespace InWords.WebApi.Services.Email
{
    public class EmailCodeSenderService
    {
        public const int EMAIL_TIMEOUT = 2; // MINUTES;

        //TODO: From tamplate
        private static readonly string EmailSubject = "Пожалуйста, подтвердите свой e-mail";
        private readonly TemplateSender emailSender;
        private readonly IEmailVerifierRepository emailVerifierRepository;


        public EmailCodeSenderService(IEmailVerifierRepository emailVerifierRepository, TemplateSender emailSender)
        {
            this.emailVerifierRepository = emailVerifierRepository;
            this.emailSender = emailSender;
        }

        public int GetTimeout(int userId)
        {
            EmailVerifies emailVerifier = emailVerifierRepository.GetWhere(e => e.UserId.Equals(userId))
                .OrderByDescending(x => x.SentTime)
                .FirstOrDefault();

            if (emailVerifier == null) return 0;

            TimeSpan currentSpan = emailVerifier.SentTime + TimeSpan.FromMinutes(EMAIL_TIMEOUT) - DateTime.UtcNow;
            int seconds = Convert.ToInt32(currentSpan.TotalSeconds);
            return seconds;
        }

        public async Task SendCodeByEmail(User user, string email, int code, string link)
        {
            int timeout = GetTimeout(user.UserId);

            if (timeout > 0)
                // TODO to const string;
                throw new TimeoutException($"Email can be sent later after {timeout} seconds");

            Dictionary<string, string> keyValuePairs = ReplaceTemplateData(user.NickName, code, link);

            await emailSender.SendEmailAsync(EmailTemplates.ConfirmEmail, keyValuePairs, EmailSubject, email);
        }

        private Dictionary<string, string> ReplaceTemplateData(string username, int code, string link)
        {
            return new Dictionary<string, string>
            {
                {"{username}", username}, //-V3138
                {"{code}", $"{code}"}, //-V3138
                {"{link}", $"{link}"} //-V3138
            };
        }
    }
}