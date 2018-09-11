namespace InWords.Auth.Interface
{
    public interface ITokenProvider
    {
        string GenerateToken();

        bool ValidateToken(string tokenString);
    }
}
