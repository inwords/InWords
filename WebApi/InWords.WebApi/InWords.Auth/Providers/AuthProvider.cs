using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace InWords.Auth.Providers
{
    public class AuthProvider
    {
        public static int GetUserID(ClaimsPrincipal user)
        {
            // todo check claims exist
            Claim nameIdentifier = user.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).First();
            int authorizedID = int.Parse(nameIdentifier.Value); //todo Extention
            return authorizedID;
        }
    }
}
