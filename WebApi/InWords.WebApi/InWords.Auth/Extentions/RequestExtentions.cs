using System;
using System.Text;
using InWords.Auth.Models;
using Microsoft.AspNetCore.Http;

namespace InWords.Auth.Extentions
{
    public static class RequestExtentions
    {
        public static BasicAuthClaims GetBasicAuthorizationCalms(this HttpRequest request)
        {
            BasicAuthClaims result = null;
            var header = request.Headers["Authorization"];
            if (header.ToString().StartsWith("Basic"))
            {
                var credval = header.ToString().Substring("basic".Length + 1).Trim();
                var usercred = Encoding.UTF8.GetString(Convert.FromBase64String(credval));
                var userNamePass = usercred.Split(":");

                result = new BasicAuthClaims(userNamePass);
            }

            return result;
        }
    }
}
