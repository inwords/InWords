using InWords.Data.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.OAuth2.Abstractions
{
    public interface IAuthService
    {
        Task<User> Authenticate(Google.Apis.Auth.GoogleJsonWebSignature.Payload payload);
    }
}
