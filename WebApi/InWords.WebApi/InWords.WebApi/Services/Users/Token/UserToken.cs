using InWords.Data;
using InWords.WebApi.Services.Abstractions;
using Registration.V2;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Users.Token
{
    public class UserToken : StructRequestHandler<RegistrationRequest, RegistrationReply, InWordsDataContext>
    {
        public UserToken(InWordsDataContext context) : base(context)
        {
        }
    }
}
