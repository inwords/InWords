using MailKit.Net.Smtp;
using MimeKit;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Email
{
    public class EmailSender
    {
        private readonly EmailIdentity emailIdentity;
        public EmailSender(EmailIdentity emailIdentity)
        {
            this.emailIdentity = emailIdentity;
        }

        public async Task SendEmailAsync(string address, string subject, string message, string name = "")
        {
            var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress(emailIdentity.Name, emailIdentity.Address));
            emailMessage.To.Add(new MailboxAddress(name, address));
            emailMessage.Subject = subject;
            BodyBuilder bodyBuilder = new BodyBuilder
            {
                TextBody = message
            };
            emailMessage.Body = bodyBuilder.ToMessageBody();

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
