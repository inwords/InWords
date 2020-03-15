using Google.Apis.Auth;
using Grpc.Core;
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

        public override async Task<TokenReply> HandleRequest(RequestObject<OAuthTokenRequest, TokenReply> request,
            CancellationToken cancellationToken = default)
        {
            var requestData = request.Value;
            // TODO: hashSet
            if (requestData.ServiceName.Equals("google", StringComparison.InvariantCultureIgnoreCase))
            {
                var payload = GoogleJsonWebSignature.ValidateAsync(requestData.Token, new GoogleJsonWebSignature.ValidationSettings()).Result;
            }
            else
            {
                request.StatusCode = StatusCode.OutOfRange;
                request.Detail = "Authorization provider is not supported";
            }
            return new TokenReply();
        }
    }
}
