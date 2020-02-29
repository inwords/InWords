using InWords.Data;
using InWords.Data.Domains;
using InWords.Data.Domains.EmailEntitys;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.Users.Extentions;
using ProfilePackage.V2;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Users.EmailUpdate
{
    public class ConfirmEmailLink 
        : AuthorizedRequestObjectHandler<ConfirmEmailRequest, ConfirmEmailReply, InWordsDataContext>
    {
        public ConfirmEmailLink(InWordsDataContext context) : base(context)
        {
        }

        
    }
}
