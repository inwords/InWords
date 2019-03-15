using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using InWords.Service.TFA.Data;
using InWords.Service.TFA.Data.Models;
using InWords.Service.TFA.Data.Models.Repositories;
using InWords.Service.TFA.Interfaces;
using InWords.Service.TFA.Models.Email;

namespace InWords.Service.TFA.Services
{
    /// <summary>
    /// This is an email service configured for two-factor authentication
    /// Not for sending normal messages
    /// </summary>
    public class EmailService : I2FAProvider
    {
        private const string SENDER = "no-reply@inwords.ru";
        private const string SUBJECT = "Подтверждение электронной почты";

        private readonly IEmailProvider emailProvider = null;
        private readonly AuthRequestRepository authRequestRepository = null;

        public EmailService(TFADataContext context, IEmailProvider emailProvider = null)
        {
            emailProvider = emailProvider ?? new Providers.EmailProvider();
            this.emailProvider = emailProvider;
            authRequestRepository = new AuthRequestRepository(context);
        }

        public async Task<string> GetKey(string identity)
        {
            AuthRequest request = new AuthRequest()
            {
                Identity = identity,
                Code = KeyGen(),
                TimeToLive = DateTime.Now.AddMinutes(10)
            };
            await authRequestRepository.Create(request);

            Email email = new Email()
            {
                Sender = SENDER,
                Subject = SUBJECT,
                Body = $"Ваш проверочный код {request.Code}",
                Recipients = new List<string>() { identity }
            };

            emailProvider.Send(email);
            return request.Code;
        }

        public async Task<bool> IsValidKey(string identity, string key)
        {
            var request = authRequestRepository.ExistAny(a => a.Identity == identity && a.Code == key);
            return request;
        }

        private string KeyGen()
        {
            Random x = new Random();
            string key = x.Next(100000, 999999).ToString();
            return key;
        }
    }
}