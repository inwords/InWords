namespace InWords.Service.TFA.Providers
{
    using System;
    using System.Net;
    using System.Net.Mail;
    using InWords.Service.TFA.Models;
    using System.Collections.Generic;

    public class EmailProvider : IEmailProvider
    {
        private readonly EmailConfig Config = null;

        private EventHandler<Email> OnGetMailEvent = null;

        event EventHandler<Email> IEmailProvider.OnGetMail
        {
            add
            {
                OnGetMailEvent += value;
            }

            remove
            {
                OnGetMailEvent -= value;
            }
        }

        void IEmailProvider.Send(Email mail)
        {
            SmtpClient client = new SmtpClient(Config.SMTPserver, Config.Port)
            {
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(Config.Login, Config.Password)
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

            Config = new StringJsonConverter<EmailConfig>().Convert(EmbeddedResource.GetApiRequestFile(configRes));
        }
        #endregion
    }
}
