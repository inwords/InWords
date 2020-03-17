using InWords.Data.Enums;
using InWords.Protobuf;
using InWords.Service.Auth.Interfaces;
using InWords.Service.Auth.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Swashbuckle.AspNetCore.Filters;

namespace InWords.WebApi.Swagger.Examples
{
    public class TokenResponceExample : IExamplesProvider<TokenReply>
    {
        public TokenReply GetExamples()
        {
            return new TokenReply()
            {
                Token = "ASDJASDgfhadssidlSadasdADKJHA1231IDJAS",
                UserId = 123
            };
        }
    }
}
