using Grpc.Core;
using InWords.Data;
using InWords.Protobuf;
using InWords.WebApi.Services;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.Localization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Modules.Profile.PublicData
{
    public class UpdateProfile : AuthorizedRequestObjectHandler<UpdateRequest, Empty, InWordsDataContext>
    {
        public UpdateProfile(InWordsDataContext context) : base(context) { }

        public override async Task<Empty> HandleRequest(
            AuthorizedRequestObject<UpdateRequest, Empty> request,
            CancellationToken cancellationToken = default)
        {
            if (request == null)
                throw new ArgumentNullException(nameof(request));

            var userId = request.UserId;
            var value = request.Value;

            var currentUser = Context.Users.SingleOrDefault(u => u.UserId == userId);

            if (currentUser == null)
            {
                request.StatusCode = StatusCode.NotFound;
                request.Detail = Strings.GetDetailMessage(request.Locale, DetailMessage.UserIdNotFound);
            }
            else
            {
                currentUser.NickName = value.NickName;
                await Context.SaveChangesAsync().ConfigureAwait(false);
            }

            return new Empty();
        }
    }
}
