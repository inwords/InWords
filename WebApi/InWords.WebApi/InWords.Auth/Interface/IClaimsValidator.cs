namespace InWords.Auth.Interface
{
    public interface IClaimsValidator
    {
        bool IsValid(BasicAuthClaims claims);
    }
}
