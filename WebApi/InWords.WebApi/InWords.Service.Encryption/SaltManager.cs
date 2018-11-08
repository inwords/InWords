namespace InWords.Service.Encryption
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Cryptography;
    using System.Text;

    public class SaltManager
    {
        public static byte[] SaltPassword(string password)
        {
            var saltbuffer = new byte[32];

            using (var rnd = RandomNumberGenerator.Create())
            {
                rnd.GetBytes(saltbuffer);
            }
            var salt = password.ToByteArray();

            var saltedpassword = password + salt;

            SHA256 sha = SHA256.Create();

            var byteAray = saltedpassword.ToByteArray();

            var shahash = sha.ComputeHash(byteAray);

            password = BitConverter.ToString(shahash);

            var saltPassword = salt + password;
#warning needtest
#warning need fix
            return null;
        }
    }
}