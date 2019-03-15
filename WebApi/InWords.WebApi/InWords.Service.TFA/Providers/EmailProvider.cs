using System.Diagnostics;
using InWords.Common.Converters;
using InWords.Common.Providers;
using InWords.Service.TFA.Interfaces;
using InWords.Service.TFA.Models.Email;

namespace InWords.Service.TFA.Providers
{
    using System;
    using System.Net;
    using System.Net.Mail;
    using InWords.Service.TFA.Models;
    using System.Collections.Generic;
    using InWords.Common;

    public class EmailProvider : IEmailProvider
    {
        private readonly EmailConfig config = null;

        private EventHandler<Email> onGetMailEvent = null;

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
            SmtpClient client = new SmtpClient(config.SmtpServer, config.Port)
            {
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(config.Login, config.Password)
            };

            MailMessage mailMessage = new MailMessage
            {
                From = new MailAddress(mail.Sender)
            };

            foreach (var recipent in mail.Recipients)
            {
                mailMessage.To.Add(recipent);
            }

            mailMessage.Body = mail.Body;
            mailMessage.Subject = mail.Subject;
            client.Send(mailMessage);
        }

        IEnumerable<Email> IEmailProvider.GetMail(string msg)
        {
            throw new NotImplementedException();
        }

        #region Ctor

        public EmailProvider(string configRes = null)
        {
            configRes = configRes ?? "InWords.Service.TFA.Resource.EmailConfig.security.json";
            var assembly = typeof(EmailConfig).Assembly;
            config = new StringJsonConverter<EmailConfig>().Convert(EmbeddedResource.GetApiRequestFile(configRes, assembly));
        }
        #endregion
    }
}
