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
    public class FindProfileNickname : AuthorizedRequestObjectHandler<FindUsernameRequest, PublicProfilesReply, InWordsDataContext>
    {
        public FindProfileNickname(InWordsDataContext context) : base(context) { }

        public override Task<PublicProfilesReply> HandleRequest(
            AuthorizedRequestObject<FindUsernameRequest, PublicProfilesReply> request,
            CancellationToken cancellationToken = default)
        {
            if (request == null)
                throw new ArgumentNullException(nameof(request));

            PublicProfilesReply profilesReply = new PublicProfilesReply();

            var userId = request.UserId;
            var value = request.Value;

            var totalMatch = Context.PublicProfile(u => u.NickName == value.UserName)
                .Take(5);
            var startWith = Context.PublicProfile(u => u.NickName != value.UserName
            && u.NickName.StartsWith(value.UserName, StringComparison.InvariantCultureIgnoreCase))
                .Take(5);

            var users = totalMatch.Union(startWith);

            if (!users.Any())
            {
                request.StatusCode = StatusCode.NotFound;
                request.Detail = Strings.GetDetailMessage(Locale.RuRu, DetailMessage.UserNickNotFound);
                return Task.Run(() => profilesReply);
            }

            profilesReply.Users.Add(users);

            return Task.Run(() => profilesReply);
        }
    }
}
