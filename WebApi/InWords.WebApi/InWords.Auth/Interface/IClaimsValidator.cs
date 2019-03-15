using InWords.Auth.Models;

namespace InWords.Auth.Interface
{
    public interface IClaimsValidator
    {
        bool IsValid(BasicAuthClaims claims);
    }
}
