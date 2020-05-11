using InWords.Data;
using InWords.Data.Domains;
using InWords.Protobuf;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace InWords.WebApi.Modules.Profile.Extentions
{
    public static class PublicProfileExtentions
    {
        public static IEnumerable<PublicProfile> GetProfile(this InWordsDataContext context, Expression<Func<User, bool>> predicate)
        {
            if (context == null)
                return Array.Empty<PublicProfile>();

            return (from user in context.Users.Where(predicate)
                    join account in context.Accounts on user.UserId equals account.AccountId
                    select new PublicProfile()
                    {
                        UserId = user == null ? 0 : user.UserId,
                        Experience = user == null ? 0 : user.Experience,
                        LastLogin = user == null ? "" : user.LastLogin.ToString("o", CultureInfo.InvariantCulture),
                        NickName = user == null ? "" : user.NickName,
                        AvatarPath = user == null || string.IsNullOrWhiteSpace(user.AvatarPath) ?
                        "" : user.AvatarPath,
                        RegistrationDate = account == null || account.RegistrationDate == null ?
                        "" : account.RegistrationDate.ToString("o", CultureInfo.InvariantCulture),
                    });
        }
    }
}
