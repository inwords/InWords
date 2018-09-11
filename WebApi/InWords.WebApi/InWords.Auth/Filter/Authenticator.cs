namespace InWords.Auth.Filter
{
    using Microsoft.AspNetCore.Mvc.Filters;
    using System;
    using System.Linq;

    public class Authenticator : Attribute, IAuthorizationFilter
    {
        //client на входе
        public Authenticator()
        {

        }

        public string GetToken()
        {
            return "Roflan token";
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var request = context.HttpContext.Request;
            var auth = request.Headers.FirstOrDefault(h => h.Key.Contains("Authorization"));
            var tokenString = auth.Value.FirstOrDefault().ToString().Substring("bearer".Length + 1);
        }
    }
}
