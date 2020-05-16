using InWords.Protobuf;
using Swashbuckle.AspNetCore.Filters;

namespace InWords.WebApi.Swagger.Examples
{
    public class PublicProfileExample : IExamplesProvider<PublicProfileReply>
    {
        public PublicProfileReply GetExamples()
        {
            return new PublicProfileReply
            {
                AvatarPath = "https://static.inwords.ru/Avatars/a5b55193a3ae43f4.jpeg",
                UserId = 122,
                Experience = 0,
                LastLogin = "2020-05-11T14:10:18.5322102Z",
                NickName = "Alword",
                RegistrationDate = "2019-01-13T11:12:11.5322102Z"
            };
        }
    }
}
