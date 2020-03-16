using Google.Apis.Auth;
using Grpc.Core;
using InWords.Data;
using InWords.Data.Domains;
using InWords.Data.Enums;
using InWords.Protobuf;
using InWords.Service.Auth.Interfaces;
using InWords.Service.Auth.Models;
using InWords.WebApi.Services.Abstractions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.OAuth2.Requests
{
    public class GoogleAuth : StructRequestHandler<OAuthTokenRequest, TokenReply, InWordsDataContext>
    {
        IRequestHandler<RequestObject<RegistrationRequest, RegistrationReply>, RegistrationReply> registration;
        IJwtProvider jwtProvider;
        public GoogleAuth(InWordsDataContext context,
            IRequestHandler<RequestObject<RegistrationRequest, RegistrationReply>, RegistrationReply> registration,
            IJwtProvider jwtProvider) : base(context)
        {
            this.jwtProvider = jwtProvider;
            this.registration = registration;
        }

        public override async Task<TokenReply> HandleRequest(RequestObject<OAuthTokenRequest, TokenReply> request,
            CancellationToken cancellationToken = default)
        {
            var requestData = request.Value;
            // TODO: hashSet
            if (requestData.ServiceName.Equals("google", StringComparison.InvariantCultureIgnoreCase))
            {
                var payload = GoogleJsonWebSignature.ValidateAsync(requestData.Token, new GoogleJsonWebSignature.ValidationSettings()).Result;

                OAuth oAuth = Context.OAuths
                    .Where(o => o.OpenId == payload.Subject)
                    .Include(d => d.Account)
                    .SingleOrDefault(o => o.OpenId == payload.Subject);
                if (oAuth == null)
                {

                    RegistrationRequest registrationRequest = new RegistrationRequest
                    {
                        Email = payload.Email,
                        Password = Guid.NewGuid().ToString()
                    };
                    var requestObject = new RequestObject<RegistrationRequest, RegistrationReply>(registrationRequest);
                    var registrationResult = await registration.Handle(requestObject, cancellationToken).ConfigureAwait(false);

                    oAuth = new OAuth()
                    {
                        AccountId = (int)registrationResult.Userid,
                        Email = payload.Email,
                        Locale = payload.Locale,
                        EmailVerified = payload.EmailVerified,
                        OpenId = payload.Subject,
                        Picture = payload.Picture,
                        Name = payload.Name,
                        Provider = OAuth2Providers.Google
                    };
                    Context.Add(oAuth);

                    await Context.SaveChangesAsync().ConfigureAwait(false);

                    return new TokenReply()
                    {
                        Token = registrationResult.Token,
                        UserId = registrationResult.Userid
                    };
                }
                else
                {
                    oAuth.Email = payload.Email;
                    oAuth.Locale = payload.Locale;
                    oAuth.EmailVerified = payload.EmailVerified;
                    oAuth.OpenId = payload.Subject;
                    oAuth.Picture = payload.Picture;
                    oAuth.Name = payload.Name;
                    return new TokenReply()
                    {
                        UserId = oAuth.AccountId,
                        Token = new TokenResponse(oAuth.AccountId, oAuth.Account.Role, jwtProvider).Token
                    };
                }
            }

            request.StatusCode = StatusCode.OutOfRange;
            request.Detail = "Authorization provider is not supported";

            return new TokenReply();
        }
    }
}
