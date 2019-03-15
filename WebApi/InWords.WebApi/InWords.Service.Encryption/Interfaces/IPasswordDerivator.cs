namespace InWords.Service.Encryption.Interfaces
{
    public interface IPasswordDerivator
    {
        byte[] SaltPassword(string password);

        bool EqualsSequence(string password, byte[] saltedKey);
    }
}