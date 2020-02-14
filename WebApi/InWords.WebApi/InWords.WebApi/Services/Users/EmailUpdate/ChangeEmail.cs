using System;
using System.Threading;
using System.Threading.Tasks;
using InWords.Data;
using InWords.Data.Domains.EmailEntitys;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.Email.EmailSenders;
using InWords.WebApi.Services.Email.Template;
using ProfilePackage.V2;

namespace InWords.WebApi.Services.Users.EmailUpdate
{
    public class ChangeEmail : AuthorizedRequestObjectHandler<EmailChangeRequest, EmailChangeReply, InWordsDataContext>
    {
        private readonly EmailTemplateSender emailTemplateSender;
        public ChangeEmail(InWordsDataContext context, EmailTemplateSender emailTemplateSender) : base(context)
        {
            this.emailTemplateSender = emailTemplateSender;
        }

        // input code 
        // userid 
        // email 
        // output ok
        public override async Task<EmailChangeReply> HandleRequest(
            AuthorizedRequestObject<EmailChangeRequest, EmailChangeReply> request,
            CancellationToken cancellationToken = default)
        {
            
            if (request == null)
                throw new ArgumentNullException($"{request} is null");

            // TODO: add time to change delay

            EmailChangeRequest requestValue = request.Value;
            string email = requestValue.Email;
            // Create email
            ApproveEmailTemplate approveEmailTemplate = new ApproveEmailTemplate();
            // send email
            await emailTemplateSender.SendMailAsync(email, approveEmailTemplate).ConfigureAwait(false);

            // add code
            EmailVerifies emailVerifies = new EmailVerifies()
            {
                Code = approveEmailTemplate.Code,
                SentTime = DateTime.UtcNow,
                Attempts = 0,
                UserId = request.UserId,
                Guid = Guid.Parse(approveEmailTemplate.Link),
                Email = email
            };
            Context.EmailVerifies.Add(emailVerifies);
            await Context.SaveChangesAsync().ConfigureAwait(false);


            EmailChangeReply confirmReply = new EmailChangeReply
            {
                Email = email
            };
            return confirmReply;
        }
    }
}
