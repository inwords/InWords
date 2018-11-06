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


    public class EmailProvider : I2FAProvider
    {
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
            SmtpClient client = new SmtpClient("mysmtpserver")
            {
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential("username", "password")
            };

            MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress("whoever@me.com");
            mailMessage.To.Add("receiver@me.com");
            mailMessage.Body = "body";
            mailMessage.Subject = "subject";
            client.Send(mailMessage);
        }
    }
}
