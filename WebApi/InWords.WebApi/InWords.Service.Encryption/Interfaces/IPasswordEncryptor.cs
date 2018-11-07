namespace InWords.Service.Encryption
{
    public interface IPasswordDerivator
    {
        string Translate(string password);

        bool IsEquals(string password, string translatedPassword);
    }
}
