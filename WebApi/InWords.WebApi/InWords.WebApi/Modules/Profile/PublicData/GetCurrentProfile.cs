using Grpc.Core;
using InWords.Data;
using InWords.Protobuf;
using InWords.WebApi.Modules.Profile.Extentions;
using InWords.WebApi.Services;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.Localization;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Modules.Profile.PublicData
{
    public class GetCurrentProfile : AuthorizedRequestObjectHandler<Empty, ProfileReply, InWordsDataContext>
    {
        public GetCurrentProfile(InWordsDataContext context) : base(context) { }

        public override Task<ProfileReply> HandleRequest(
            AuthorizedRequestObject<Empty, ProfileReply> request,
            CancellationToken cancellationToken = default)
        {
            if (request == null)
                throw new ArgumentNullException(nameof(request));

            var userId = request.UserId;
            var publicInfo = Context.GetProfile(u => u.UserId == userId).SingleOrDefault();

            if (publicInfo == null)
            {
                request.StatusCode = StatusCode.NotFound;
                request.Detail = Strings.GetDetailMessage(Locale.RuRu, DetailMessage.UserIdNotFound);
                return Task.Run(() => new ProfileReply());
            }

            return Task.Run(() => publicInfo);
        }
    }
}
