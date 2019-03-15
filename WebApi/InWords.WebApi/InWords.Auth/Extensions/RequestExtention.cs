using System;
using System.Text;
using InWords.Auth.Models;
using Microsoft.AspNetCore.Http;

namespace InWords.Auth.Extensions
{
    public static class RequestExtention
    {
        public static BasicAuthClaims GetBasicAuthorizationCalms(this HttpRequest request)
        {
            BasicAuthClaims result = null;
            var header = request.Headers["Authorization"];
            if (header.ToString().StartsWith("Basic"))
            {
                var credentialValue = header.ToString().Substring("basic".Length + 1).Trim();
                var userCredentials = Encoding.UTF8.GetString(Convert.FromBase64String(credentialValue));
                var userNamePass = userCredentials.Split(":");

                result = new BasicAuthClaims(userNamePass);
            }

            return result;
        }
    }
}
