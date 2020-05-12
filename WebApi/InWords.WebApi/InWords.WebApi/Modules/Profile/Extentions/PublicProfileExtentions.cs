using InWords.Common;
using InWords.Data;
using InWords.Data.Domains;
using InWords.Protobuf;
using InWords.WebApi.Services;
using InWords.WebApi.Services.Localization;
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
        public static IEnumerable<PublicProfileReply> PublicProfile(this InWordsDataContext context, Expression<Func<User, bool>> predicate)
        {
            if (context == null)
                return Array.Empty<PublicProfileReply>();

            return (from user in context.Users.Where(predicate)
                    join account in context.Accounts on user.UserId equals account.AccountId
                    select new PublicProfileReply()
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

        public static IEnumerable<ProfileReply> GetProfile(this InWordsDataContext context, Expression<Func<User, bool>> predicate)
        {
            if (context == null)
                return Array.Empty<ProfileReply>();

            return (from user in context.Users.Where(predicate)
                    join account in context.Accounts on user.UserId equals account.AccountId
                    select new ProfileReply()
                    {
                        UserId = user == null ? 0 : user.UserId,
                        Email = account == null || account.Email == null
                        ? "*@*" : EmailHider.Hide(account.Email),
                        Experience = user == null ? 0 : user.Experience,
                        LastLogin = user == null ? "" : user.LastLogin.ToString("o", CultureInfo.InvariantCulture),
                        NickName = user == null ? "" : user.NickName,
                        AvatarPath = user == null || string.IsNullOrWhiteSpace(user.AvatarPath) ?
                        "" : user.AvatarPath,
                        RegistrationDate = account == null || account.RegistrationDate == null ?
                        "" : account.RegistrationDate.ToString("o", CultureInfo.InvariantCulture),
                        Role = account == null ? "-/-" : Strings.GetDetailMessage(Locale.RuRu, account.Role)
                    });
        }
    }
}
