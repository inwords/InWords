using System;
using System.Collections.Generic;
using System.Linq;
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
    public class ConfirmEmail : AuthorizedRequestObjectHandler<EmailConfirmRequest, EmailConfirmReply, InWordsDataContext>
    {
        public ConfirmEmail(InWordsDataContext context, EmailTemplateSender emailTemplateSender) : base(context)
        {

        }

        // input code 
        // userid 
        // email 
        // output ok
        public override Task<EmailConfirmReply> HandleRequest(
            AuthorizedRequestObject<EmailConfirmRequest, EmailConfirmReply> request,
            CancellationToken cancellationToken = default)
        {
            // Create email
            ApproveEmailTemplate approveEmailTemplate = new ApproveEmailTemplate(); 
            // send email

            // add code

            // Context.EmailVerifies.Add()
            throw new NotImplementedException();
        }
    }
}
