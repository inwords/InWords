namespace InWords.Auth.TFA.Providers
{
    using InWords.Auth.TFA.Interface;
    using System;
    using System.Net;
    using System.Net.Mail;
    using InWords.Auth.TFA.Models;
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
            mailMessage.To.Add(mail.Recipient);//todo add RecipienеS
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
            configRes = configRes ?? "InWords.Auth.TFA.Resource.EmailConfig.security.json";

            Config = new StringJsonConverter<EmailConfig>().Convert(EmbeddedResource.GetApiRequestFile(configRes));
        }
        #endregion
    }
}
