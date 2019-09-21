using MailKit.Net.Smtp;
using MimeKit;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Email
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

        public void SetText(string message)
        {
            SetHTML("", message);
        }

        public void SetHTML(string html, string altText)
        {
            BodyBuilder bodyBuilder = new BodyBuilder
            {
                HtmlBody = html,
                TextBody = altText,
            };
            emailMessage.Body = bodyBuilder.ToMessageBody();
        }

        public void AddAddressees(string name, string address)
        {
            emailMessage.To.Add(new MailboxAddress(name, address));
        }

        public async Task SendEmailAsync()
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
