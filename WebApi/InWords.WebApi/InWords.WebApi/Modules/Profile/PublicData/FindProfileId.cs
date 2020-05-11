using Grpc.Core;
using InWords.Data;
using InWords.Protobuf;
using InWords.WebApi.Services;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.Localization;
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
        public FindProfileId(InWordsDataContext context) : base(context) { }

        public override Task<PublicProfile> HandleRequest(
            AuthorizedRequestObject<FindIdRequest, PublicProfile> request,
            CancellationToken cancellationToken = default)
        {
            if (request == null)
                throw new ArgumentNullException(nameof(request));

            var userId = request.UserId;
            var value = request.Value;

            var publicInfo = (from user in Context.Users.Where(u => u.UserId == value.Id)
                              join account in Context.Accounts on user.UserId equals account.AccountId
                              select new PublicProfile()
                              {
                                  UserId = user == null ? 0 : user.UserId,
                                  Experience = user == null ? 0 : user.Experience,
                                  LastLogin = user == null ? "" : user.LastLogin.ToString("o", CultureInfo.InvariantCulture),
                                  NickName = user == null ? "" : user.NickName,
                                  RegistrationDate = account == null || account.RegistrationDate == null ?
                                  "" : account.RegistrationDate.ToString("o", CultureInfo.InvariantCulture),
                              }).SingleOrDefault();

            if (publicInfo == null)
            {
                request.StatusCode = StatusCode.NotFound;
                request.Detail = Strings.GetDetailMessage(Locale.EnUs, DetailMessage.UserIdNotFound);
                return Task.Run(() => new PublicProfile());
            }

            return Task.Run(() => publicInfo);
        }
    }
}
