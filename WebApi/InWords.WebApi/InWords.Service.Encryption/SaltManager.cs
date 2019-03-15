using InWords.Service.Encryption.Interfaces;

namespace InWords.Service.Encryption
{
    using System;
    using System.Linq;
    using System.Security.Cryptography;

    public class SaltManager : IPasswordSalter
    {
        private const int MysqlBuffer = 128;
        private const int SaltBuffer = 32;
        private const int KeyBuffer = MysqlBuffer - SaltBuffer;

        public byte[] SaltPassword(string password)
        {
            byte[] salt, key;

            // specify that we want to randomly generate a 32-byte salt
            using (var deriveBytes = new Rfc2898DeriveBytes(password, SaltBuffer))
            {
                salt = deriveBytes.Salt;
                key = deriveBytes.GetBytes(KeyBuffer);  // derive a 96-byte key
            }

            byte[] saltedKey = salt.Concat(key).ToArray(); ;

            return saltedKey;
        }

        public bool EqualsSequence(string password, byte[] saltedKey)
        {
            byte[] key = saltedKey.Skip(SaltBuffer).ToArray();
            byte[] salt = saltedKey.Take(SaltBuffer).ToArray();

            using (var deriveBytes = new Rfc2898DeriveBytes(password, salt))
            {
                byte[] newKey = deriveBytes.GetBytes(KeyBuffer);  // derive a 96-byte key

                return newKey.SequenceEqual(key);
            }
        }
    }
}