using Grpc.Core;
using InWords.Data;
using InWords.Protobuf;
using InWords.WebApi.Modules.Profile.Extentions;
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
    public class FindProfileNickname : AuthorizedRequestObjectHandler<FindUsernameRequest, ProfilesReply, InWordsDataContext>
    {
        public FindProfileNickname(InWordsDataContext context) : base(context) { }

        public override Task<ProfilesReply> HandleRequest(
            AuthorizedRequestObject<FindUsernameRequest, ProfilesReply> request, 
            CancellationToken cancellationToken = default)
        {
            if (request == null)
                throw new ArgumentNullException(nameof(request));

            ProfilesReply profilesReply = new ProfilesReply();

            var userId = request.UserId;
            var value = request.Value;

            var totalMatch = Context.GetProfile(u => u.NickName == value.UserName)
                .Take(5);
            var startWith = Context.GetProfile(u => u.NickName != value.UserName 
            && u.NickName.StartsWith(value.UserName,StringComparison.InvariantCultureIgnoreCase))
                .Take(5);

            var users = totalMatch.Union(startWith);

            if (!users.Any())
            {
                request.StatusCode = StatusCode.NotFound;
                request.Detail = Strings.GetDetailMessage(Locale.EnUs, DetailMessage.UserNickNotFound);
                return Task.Run(() => profilesReply);
            }

            profilesReply.Users.Add(users);

            return Task.Run(() => profilesReply);
        }
    }
}
