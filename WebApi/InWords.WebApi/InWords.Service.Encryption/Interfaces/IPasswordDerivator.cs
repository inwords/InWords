namespace InWords.Service.Encryption
{
    public interface IPasswordDerivator
    {
        byte[] SaltPassword(string password);

        bool EqualsSequence(string password, byte[] saltedKey);
    }
}