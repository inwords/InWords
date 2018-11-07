namespace InWords.Auth
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Claims;
    using System.Text;


    public static class ClaimsExtentions
    {
        public static int GetUserID(this IEnumerable<Claim> claims)
        {
            // todo check claims exist
            Claim nameIdentifier = claims.Where(c => c.Type == ClaimTypes.NameIdentifier).First();
            int authorizedID = int.Parse(nameIdentifier.Value);
            return authorizedID;
        }

        public static string GetUserEmail(this IEnumerable<Claim> claims)
        {
            // todo check claims exist
            Claim nameIdentifier = claims.Where(c => c.Type == ClaimTypes.Email).First();
            return nameIdentifier.Value;
        }

        public static string GetUserRole(this IEnumerable<Claim> claims)
        {
            throw new NotImplementedException();
            // todo check claims exist
            Claim nameIdentifier = claims.Where(c => c.Type == ClaimTypes.Role).First();
            int authorizedID = int.Parse(nameIdentifier.Value); //todo Extention
            return null;
        }
    }
}