namespace InWords.Auth.Providers
{
    using System.Linq;
    using System.Security.Claims;

    public class AuthProvider
    {
        public static int GetUserID(ClaimsPrincipal user)
        {
            return user.Claims.GetUserID();
        }
    }
}