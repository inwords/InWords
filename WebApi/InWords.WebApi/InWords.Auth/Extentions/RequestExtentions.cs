using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace InWords.Auth
{
    public class BasicAuthClaims
    {
        public string Email { get; set; }
        public string Password { get; set; }

        public BasicAuthClaims(string email, string password)
        {
            Email = email;
            Password = password;
        }

        public BasicAuthClaims(object[] args)
        {
            if (args.Length == 2)
            {
                Email = args[0].ToString();
                Password = args[1].ToString();
            }
            else
            {
                throw new ArgumentException("Neded args.lengs == 2 is email and pass");
            }
        }
    }

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
