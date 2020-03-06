using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace InWords.Service.Auth.Extensions
{
    public static class ClaimsExtensions
    {
        /// <summary>
        /// Get user id credentials
        /// </summary>
        /// <param name="claims"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException">User id claim is not dound</exception>
        public static int GetUserId(this IEnumerable<Claim> claims)
        {
            Claim nameIdentifier = claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier);

            if (nameIdentifier != null && int.TryParse(nameIdentifier.Value, out int authorizedId))
                return authorizedId;
            throw new ArgumentNullException();
        }

        /// <summary>
        /// Get user id credentials
        /// </summary>
        /// <param name="claims"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException">User id claim is not dound</exception>
        public static int GetUserId(this ClaimsPrincipal user)
        {
            return user.Claims.GetUserId();
        }

        public static string GetUserRole(this IEnumerable<Claim> claims)
        {
            Claim roleClaim = claims.SingleOrDefault(c => c.Type == ClaimTypes.Role);

            if (roleClaim != null)
                return roleClaim.Value;
            throw new ArgumentNullException();
        }

        public static string GetUserRole(this ClaimsPrincipal user)
        {
            return user.Claims.GetUserRole();
        }
    }
}