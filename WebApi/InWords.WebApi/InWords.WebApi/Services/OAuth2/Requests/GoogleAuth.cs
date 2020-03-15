using InWords.Data;
using InWords.WebApi.gRPC.Services;
using InWords.WebApi.Services.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.OAuth2.Requests
{
    public class GoogleAuth : StructRequestHandler<OAuthTokenRequest, TokenReply, InWordsDataContext>
    {
        public GoogleAuth(InWordsDataContext context) : base(context)
        {
        }

        public override Task<TokenReply> HandleRequest(RequestObject<OAuthTokenRequest, TokenReply> request, 
            CancellationToken cancellationToken = default)
        {

            return base.HandleRequest(request, cancellationToken);
        }
    }
}
