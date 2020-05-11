using InWords.Data.Enums;
using InWords.Protobuf;
using InWords.WebApi.Services;
using InWords.WebApi.Services.Localization;
using Swashbuckle.AspNetCore.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Swagger.Examples
{
    public class ProfileReplyExample : IExamplesProvider<ProfileReply>
    {
        public ProfileReply GetExamples()
        {
            return new ProfileReply()
            {
                AvatarPath = "https://static.inwords.ru/Avatars/03db6504dad804515.jpeg",
                Email = "***@1",
                Experience = 0,
                LastLogin = "2020-03-16T11:36:04.0000000",
                NickName = "Prometium",
                Role = Strings.GetDetailMessage(Locale.RuRu, RoleType.Unverified),
                RegistrationDate = "2020-03-09T00:00:00.0000000",
                UserId = 259
            };
        }
    }
}
