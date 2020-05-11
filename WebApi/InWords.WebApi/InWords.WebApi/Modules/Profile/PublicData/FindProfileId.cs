using Grpc.Core;
using InWords.Data;
using InWords.Protobuf;
using InWords.WebApi.Services;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.Localization;
using Org.BouncyCastle.Ocsp;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Modules.Profile.PublicData
{
    public class FindProfileId : AuthorizedRequestObjectHandler<FindIdRequest, PublicProfile, InWordsDataContext>
    {
        public FindProfileId(InWordsDataContext context) : base(context)
        {

        }

        public override Task<PublicProfile> HandleRequest(
            AuthorizedRequestObject<FindIdRequest, PublicProfile> request,
            CancellationToken cancellationToken = default)
        {
            if (request == null)
                throw new ArgumentNullException(nameof(request));

            var userId = request.UserId;
            var value = request.Value;

            var user = Context.Users.Find(value.Id);
            if (user == null)
            {
                request.StatusCode = StatusCode.NotFound;
                request.Detail = Strings.GetDetailMessage(Locale.EnUs, DetailMessage.UserNickNotFound);
            }


            return base.HandleRequest(request, cancellationToken);
        }
    }
}
