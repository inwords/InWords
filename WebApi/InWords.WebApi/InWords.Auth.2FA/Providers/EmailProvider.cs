namespace InWords.Auth.TFA.Providers
{
    using InWords.Auth.TFA.Interface;
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Net;
    using System.Net.Mail;
    using System.Reflection;
    using System.Linq;
    using System.Text;
    using InWords.Auth.TFA.Models;

    public class EmailProvider : I2FAProvider
    {
        public const string RESOURCE = "InWords.Auth.TFA.Resource.EmailConfig.security.json";

        string I2FAProvider.GetKey(string identity)
        {
            throw new NotImplementedException();
        }

        bool I2FAProvider.IsValidKey(string identity, string key)
        {
            throw new NotImplementedException();
        }

        public void SendMail()
        {
            EmailConfig config = new StringJsonConverter<EmailConfig>()
                .Convert(EmbeddedResource.GetApiRequestFile(RESOURCE));

            SmtpClient client = new SmtpClient(config.SMTPserver, config.Port)
            {
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(config.Login, config.Password)
            };

            MailMessage mailMessage = new MailMessage
            {
                From = new MailAddress("no-reply@InWords.ru")
            };
            mailMessage.To.Add("anzer987@ya.ru");
            mailMessage.Body = "Здорова, бать";
            mailMessage.Subject = "Авторизация";
            client.Send(mailMessage);
        }
    }
}
