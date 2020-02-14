using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using InWords.Data;
using InWords.WebApi.Services.Abstractions;
using ProfilePackage.V2;

namespace InWords.WebApi.Services.Users.EmailUpdate
{
    public class ConfirmEmail : AuthorizedRequestObjectHandler<EmailConfirmRequest, EmailConfirmReply, InWordsDataContext>
    {
        public ConfirmEmail(InWordsDataContext context) : base(context)
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

            throw new NotImplementedException();
        }
    }
}
