using System;
using System.Text;
using InWords.Auth.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;

namespace InWords.Auth.Extensions
{
    public static class RequestExtensions
    {
        public static BasicAuthClaims GetBasicAuthorizationCalms(this HttpRequest request)
        {
            BasicAuthClaims result = null;
            StringValues header = request.Headers["Authorization"];
            if (header.ToString().StartsWith("Basic"))
            {
                string credentialValue = header.ToString().Substring("basic".Length + 1).Trim();
                string userCredentials = Encoding.UTF8.GetString(Convert.FromBase64String(credentialValue));
                string[] userNamePass = userCredentials.Split(":");

                result = new BasicAuthClaims(userNamePass);
            }

            return result;
        }
    }
}