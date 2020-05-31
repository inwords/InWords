using Grpc.Core;
using InWords.Data;
using InWords.Data.Domains.EmailEntitys;
using InWords.Data.Enums;
using InWords.Protobuf;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.Email.Abstractions;
using InWords.WebApi.Services.Email.Template;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Users.EmailUpdate
{
    public class ChangeEmail : AuthReqHandler<EmailChangeRequest, EmailChangeReply, InWordsDataContext>
    {
        private readonly IEmailTemplateSender emailTemplateSender;
        public ChangeEmail(InWordsDataContext context, IEmailTemplateSender emailTemplateSender) : base(context)
        {
            this.emailTemplateSender = emailTemplateSender;
        }


        // input code 
        // userid 
        // email 
        // output ok
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Design", "CA1062:Проверить аргументы или открытые методы", Justification = "<Ожидание>")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Design", "CA1031:Do not catch general exception types", Justification = "<Ожидание>")]
        public override async Task<EmailChangeReply> HandleRequest(
            AuthorizedRequestObject<EmailChangeRequest, EmailChangeReply> request,
            CancellationToken cancellationToken = default)
        {
            // TODO: add time change email timelock
            EmailChangeRequest requestValue = request.Value;
            string email = requestValue.Email;

            // check if email aldeary linked
            var linkedEmail = Context.Accounts.Any(a => a.Email == email && a.Role > RoleType.Unverified);
            if (linkedEmail)
            {
                request.StatusCode = StatusCode.AlreadyExists;
                request.Detail = $"Email address '{ email }' is already linked to another account";
                return new EmailChangeReply();
            }

            ApproveEmailTemplate approveEmailTemplate = new ApproveEmailTemplate();
            try
            {
                await emailTemplateSender.SendMailAsync(email, approveEmailTemplate).ConfigureAwait(false);
            }
            catch (Exception e)
            {
                request.StatusCode = StatusCode.InvalidArgument;
                request.Detail = $"The mail server could not send the email {email} to the address and threw an error {e.Message}";
                return new EmailChangeReply();
            }

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
