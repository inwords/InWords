namespace InWords.Service.Encryption
{
    using System;
    using System.Linq;
    using System.Security.Cryptography;

    public class SaltManager : IPasswordDerivator
    {
        private const int MYSQL_BUFFER = 128;
        private const int SALT_BUFFER = 32;
        private const int KEY_BUFFER = MYSQL_BUFFER - SALT_BUFFER;

        public byte[] SaltPassword(string password)
        {
            byte[] salt, key;

            // specify that we want to randomly generate a 32-byte salt
            using (var deriveBytes = new Rfc2898DeriveBytes(password, SALT_BUFFER))
            {
                salt = deriveBytes.Salt;
                key = deriveBytes.GetBytes(KEY_BUFFER);  // derive a 96-byte key
            }

            byte[] saltedkey = salt.Concat(key).ToArray(); ;

            return saltedkey;
        }

        public bool EqualsSequence(string password, byte[] saltedkey)
        {
            byte[] key = saltedkey.Skip(SALT_BUFFER).ToArray();
            byte[] salt = saltedkey.Take(SALT_BUFFER).ToArray();

            using (var deriveBytes = new Rfc2898DeriveBytes(password, salt))
            {
                byte[] newKey = deriveBytes.GetBytes(KEY_BUFFER);  // derive a 96-byte key

                return newKey.SequenceEqual(key);
            }
        }
    }
}