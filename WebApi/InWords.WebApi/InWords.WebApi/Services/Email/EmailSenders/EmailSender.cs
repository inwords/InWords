using System.Threading.Tasks;
using InWords.WebApi.Services.Email.Models;
using MailKit.Net.Smtp;
using MimeKit;

namespace InWords.WebApi.Services.Email.EmailSenders
{
    public class EmailSender
    {
        private readonly EmailIdentity emailIdentity;
        protected MimeMessage emailMessage;

        public EmailSender(EmailIdentity emailIdentity)
        {
            this.emailIdentity = emailIdentity;
            emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress(emailIdentity.Name, emailIdentity.Address));
        }

        public void SetSubject(string subject)
        {
            emailMessage.Subject = subject;
        }

        public virtual void AddAddressees(string name, string address)
        {
            emailMessage.To.Add(new MailboxAddress(name, address));
        }

        /// <summary>
        ///     Reset body and set text message
        /// </summary>
        /// <param name="message">text message</param>
        protected void SetText(string message)
        {
            SetHTML("", message);
        }

        /// <summary>
        ///     Reset body and set html boyd and alttext
        /// </summary>
        /// <param name="html"></param>
        /// <param name="altText"></param>
        protected void SetHTML(string html, string altText)
        {
            var bodyBuilder = new BodyBuilder
            {
                HtmlBody = html,
                TextBody = altText
            };
            emailMessage.Body = bodyBuilder.ToMessageBody();
        }

        protected virtual async Task SendEmailAsync()
        {
            using (var client = new SmtpClient())
            {
                await client.ConnectAsync(emailIdentity.Host, emailIdentity.Port, emailIdentity.UseSsl);
                await client.AuthenticateAsync(emailIdentity.Username, emailIdentity.Password);
                await client.SendAsync(emailMessage);
                await client.DisconnectAsync(true);
            }
        }
    }
}