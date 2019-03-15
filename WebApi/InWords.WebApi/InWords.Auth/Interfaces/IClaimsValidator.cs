using InWords.Auth.Models;

namespace InWords.Auth.Interfaces
{
    public interface IClaimsValidator
    {
        bool IsValid(BasicAuthClaims claims);
    }
}
