namespace InWords.Service.Encryption.Interfaces
{
    public interface IPasswordSalter
    {
        byte[] SaltPassword(string password);

        bool EqualsSequence(string password, byte[] saltedKey);
    }
}