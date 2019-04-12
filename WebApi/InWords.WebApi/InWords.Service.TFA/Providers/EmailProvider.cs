using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Reflection;
using InWords.Common.Converters;
using InWords.Common.Providers;
using InWords.Service.TFA.Interfaces;
using InWords.Service.TFA.Models;
using InWords.Service.TFA.Models.Email;

namespace InWords.Service.TFA.Providers
{
    public class EmailProvider : IEmailProvider
    {
        private readonly EmailConfig config;

        private EventHandler<Email> onGetMailEvent;

        #region Ctor

        public EmailProvider(string configRes = null)
        {
            configRes = configRes ?? "InWords.Service.TFA.Resource.EmailConfig.security.json";
            Assembly assembly = typeof(EmailConfig).Assembly;
            config = new StringJsonConverter<EmailConfig>().Convert(
                EmbeddedResource.GetApiRequestFile(configRes, assembly));
        }

        #endregion

        event EventHandler<Email> IEmailProvider.OnGetMail
        {
            add
            {
                if (onGetMailEvent != null) onGetMailEvent += value;
            }

            remove
            {
                if (onGetMailEvent != null) onGetMailEvent -= value;
            }
        }

        void IEmailProvider.Send(Email mail)
        {
            var client = new SmtpClient(config.SmtpServer, config.Port)
            {
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(config.Login, config.Password)
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(mail.Sender)
            };

            foreach (string recipient in mail.Recipients) mailMessage.To.Add(recipient);

            mailMessage.Body = mail.Body;
            mailMessage.Subject = mail.Subject;
            client.Send(mailMessage);
        }

        IEnumerable<Email> IEmailProvider.GetMail(string msg)
        {
            throw new NotImplementedException();
        }
    }
}