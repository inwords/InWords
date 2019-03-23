using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace InWords.Auth.Extensions
{
    public static class ClaimsExtensions
    {
        public static int GetUserId(this IEnumerable<Claim> claims)
        {
            Claim nameIdentifier = claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier);

            if (nameIdentifier == null) throw new ArgumentNullException();

            int authorizedId = int.Parse(nameIdentifier.Value);
            return authorizedId;
        }

        public static string GetUserEmail(this IEnumerable<Claim> claims)
        {
            Claim nameIdentifier = claims.SingleOrDefault(c => c.Type == ClaimTypes.Email);
            return nameIdentifier?.Value;
        }

        public static string GetUserRole(this IEnumerable<Claim> claims)
        {
            Claim nameIdentifier = claims.First(c => c.Type == ClaimTypes.Role);
            return nameIdentifier?.Value;
        }
    }
}