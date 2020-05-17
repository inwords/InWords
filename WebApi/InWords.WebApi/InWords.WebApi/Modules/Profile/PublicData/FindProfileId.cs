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
    public class FindProfileId : AuthorizedRequestObjectHandler<FindIdRequest, PublicProfileReply, InWordsDataContext>
    {
        public FindProfileId(InWordsDataContext context) : base(context) { }

        public override Task<PublicProfileReply> HandleRequest(
            AuthorizedRequestObject<FindIdRequest, PublicProfileReply> request,
            CancellationToken cancellationToken = default)
        {
            if (request == null)
                throw new ArgumentNullException(nameof(request));

            var userId = request.UserId;
            var value = request.Value;

            var publicInfo = Context.PublicProfile(u => u.UserId == value.UserId).SingleOrDefault();

            if (publicInfo == null)
            {
                request.StatusCode = StatusCode.NotFound;
                request.Detail = Strings.GetDetailMessage(Locale.RuRu, DetailMessage.UserIdNotFound);
                return Task.Run(() => new PublicProfileReply());
            }

            return Task.Run(() => publicInfo);
        }
    }
}
