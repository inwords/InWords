using Google.Apis.Auth;
using InWords.Data.Domains;
using InWords.WebApi.Services.OAuth2.Abstractions;
using System.Threading.Tasks;
using static Google.Apis.Auth.GoogleJsonWebSignature;

namespace InWords.WebApi.Services.OAuth2.Providers
{
    public class GoogleAuthentication : IAuthService
    {
        public Task<User> Authenticate(Payload payload)
        {
            throw new System.NotImplementedException();
        }        
    }
}
